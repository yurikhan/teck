#include "usb.h"

#include <stdbool.h>
#include <stdint.h>
#include <8051.h>
#include "mg84fl54bd.h"
#include "timer.h"

typedef uint8_t string_id;
typedef uint16_t bcd;

// USB to host byte order
#define utohs(x) (x) // Both USB and SDCC use little-endian order
// Host to USB byte order
#define htous(x) (x)

// Data types and constants from:
// [USB] Universal Serial Bus Specification, Revision 2.0, Chapter 9

// [USB] Table 9-2
typedef enum UsbRequestType {
	host_to_device = 0x00,
	device_to_host = 0x80,

	rtype_mask = 0x60,
	rtype_standard = 0x00,
	rtype_class = 0x20,
	rtype_vendor = 0x40,

	recipient_mask = 0x1F,
	recipient_device = 0x00,
	recipient_interface = 0x01,
	recipient_endpoint = 0x02,
	recipient_other = 0x03
} UsbRequestType;

// [USB] Table 9-4
typedef enum UsbRequest
{
	request_GET_STATUS = 0,
	request_CLEAR_FEATURE = 1,
	request_SET_FEATURE = 3,
	request_SET_ADDRESS = 5,
	request_GET_DESCRIPTOR = 6,
	request_SET_DESCRIPTOR = 7,
	request_GET_CONFIGURATION = 8,
	request_SET_CONFIGURATION = 9,
	request_GET_INTERFACE = 10,
	request_SET_INTERFACE = 11,
	request_SYNCH_FRAME = 12
} UsbRequest;

// [USB] Table 9-2
typedef struct UsbRequestSetup
{
	UsbRequestType bmRequestType;
	UsbRequest bRequest;
	uint16_t wValue;
	uint16_t wIndex;
	uint16_t wLength;
} UsbRequestSetup;


// USB device state management

typedef enum UsbState {
	state_powered,
	state_default,
	state_address,
	state_configured
} UsbState;
UsbState usb_state = state_powered;
uint8_t new_address = 0;

void set_state(UsbState new_state) __using(3)
{
	usb_state = new_state;
	P3_5 = !(new_state & 1);
	P3_6 = !(new_state & 2);
}


// Low-level functions

void usb_reset(void) __using(3)
{
	// Enable transmit and receive for endpoint 0
	EPINDEX = 0;
	EPCON = RXEPEN | TXEPEN;
	TXCON = TXCLR;
	RXCON = RXCLR;

	// Enable USB interrupts for reset/suspend/resume and endpoint 0 transmit/receive
	IEN = EFSR | EF;
	UIE = URXIE0 | UTXIE0;

	new_address = 0;
	set_state(state_default);
}

void usb_receive(uint8_t __near * buffer, uint8_t size) __using(3)
{
	if (size < RXCNT) size = RXCNT;
	while (size --> 0)
	{
		*buffer++ = RXDAT;
	}
}

const uint8_t* usb_transmit_ptr;
uint8_t usb_transmit_size;
enum { MAX_DATA_PACKET_SIZE = 64 };

void usb_transmit_chunk(void) __using(3)
{
	uint8_t chunk_size = usb_transmit_size, remaining;
	if (chunk_size > MAX_DATA_PACKET_SIZE)
		chunk_size = MAX_DATA_PACKET_SIZE;

	for (remaining = chunk_size; remaining --> 0 ;)
	{
		TXDAT = *usb_transmit_ptr++;
	}
	TXCNT = chunk_size;
	usb_transmit_size -= chunk_size;
	if (chunk_size < MAX_DATA_PACKET_SIZE)
	{
		usb_transmit_ptr = 0;
	}
	TXCON |= TXFFRC;
}

void usb_transmit(const uint8_t* buffer, uint8_t size) __using(3)
{
	usb_transmit_ptr = buffer;
	usb_transmit_size = size;
	usb_transmit_chunk();
}

void usb_transmit_dynamic(uint8_t size) __using(3)
{
	usb_transmit_ptr = 0;
	usb_transmit_size = 0;
	TXCNT = size;
}

void usb_init(void)
{
	new_address = 0;
	set_state(state_powered);

	// Set up clock
	CKCON2 |= EN_PLL;
	while (!(CKCON2 & PLL_RDY)) {}
	delay(2);
	// Enable USB
	CKCON2 |= EN_USB;

	// Enable USB interrupts for reset/suspend/resume
	IEN = EFSR;
	AUXIE |= EUSB;
	// Connect to USB host
	UPCON = CONEN;
}


// USB request handling

UsbRequestSetup request;

void usb_transmit_descriptor(const void* buffer, uint8_t size) __using(3)
{
	if (size > utohs(request.wLength))
		size = utohs(request.wLength);
	EPINDEX = 0;
	usb_transmit(buffer, size);
}

bool usb_get_device_descriptor(void) __using(3)
{
	switch (utohs(request.wValue) >> 8) // Descriptor type
	{
	case dtype_DEVICE:
		usb_transmit_descriptor(&device_descriptor, sizeof(device_descriptor));
		return true;
	}
	return false;
}

bool usb_standard_device_request(void) __using(3)
{
	switch (request.bRequest)
	{
	case request_GET_DESCRIPTOR:
		return usb_get_device_descriptor();
	case request_SET_ADDRESS:
		new_address = utohs(request.wValue);
		usb_transmit_dynamic(0);
		return true;
	}
	return false;
}

bool usb_device_request(void) __using(3)
{
	switch (request.bmRequestType & rtype_mask)
	{
	case rtype_standard:
		return usb_standard_device_request();
	}
	return false;
}

bool usb_request(void) __using(3)
{
	switch (request.bmRequestType & recipient_mask)
	{
	case recipient_device:
		return usb_device_request();
	}
	return false;
}


// USB interrupt handling

void usb_transmit_done(void) __using(3)
{
	if (new_address)
	{
		UADDR = new_address;
		new_address = 0;
		set_state(state_address);
	}
}

void usb_isr(void) __interrupt(15) __using(3)
{
	unsigned char upcon, uiflg;

	upcon = UPCON;
	if (upcon & URST)
	{
		UPCON = upcon & ~(URST | URSM | USUS) | URST;
		usb_reset();
		return;
	}

	uiflg = UIFLG;
	if (uiflg & URXD0) // Received some bytes
	{
		UIFLG = URXD0; // Acknowledge them
		EPINDEX = 0;
		if (RXSTAT & RXSETUP) // Got a complete Setup token
		{
			EPCON &= ~(TXSTL | RXSTL); // Recover from previous error if any
			RXSTAT &= ~EDOVW;
			usb_receive((unsigned char __near *)&request, sizeof(request));
			RXSTAT &= ~RXSETUP;
			RXCON |= RXFFRC;
			if (!usb_request())
			{
				EPCON |= TXSTL | RXSTL; // Signal error
			}
		}
		return;
	}
	if (uiflg & UTXD0) // Chunk transmit done
	{
		UIFLG = UTXD0; // Acknowledge it
		EPINDEX = 0;
		if (!usb_transmit_ptr) // Anything else?
			usb_transmit_done();
		else
			usb_transmit_chunk(); // Yes, set up next chunk
		return;
	}
}
