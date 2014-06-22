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
// [HID] Device Class Definition for Human Interface Devices (HID), Version 1.11
// [UT] HID Usage Tables, Version 1.12

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

// [USB] Table 9-5
typedef enum UsbDescriptorType
{
	dtype_DEVICE = 1,
	dtype_CONFIGURATION = 2,
	dtype_STRING = 3,
	dtype_INTERFACE = 4,
	dtype_ENDPOINT = 5,
	dtype_DEVICE_QUALIFIER = 6,
	dtype_OTHER_SPEED_CONFIGURATION = 7,
	dtype_INTERFACE_POWER = 8,
	// [HID] 7.1
	dtype_HID = 0x21,
	dtype_HID_REPORT = 0x22,
	dtype_HID_PHYSICAL = 0x23
} UsbDescriptorType;

typedef enum UsbDeviceClass
{
	dclass_PER_INTERFACE = 0, // [USB] Table 9-8
	dclass_HID = 3 // [HID] 4.1
} UsbDeviceClass;

typedef enum UsbDeviceSubClass
{
	dsubclass_PER_INTERFACE = 0, // [USB] Table 9-8
	dsubclass_HID_BOOT = 1 // [HID] 4.2
} UsbDeviceSubClass;

typedef enum UsbDeviceProtocol
{
	dproto_PER_INTERFACE = 0, // [USB] Table 9-8
	// [HID] 4.3
	dproto_HID_BOOT_KEYBOARD = 1,
	dproto_HID_BOOT_MOUSE = 2
} UsbDeviceProtocol;

// [USB] Table 9-8
typedef struct UsbDeviceDescriptor
{
	uint8_t bLength;
	UsbDescriptorType bDescriptorType;
	bcd bcdUSB;
	UsbDeviceClass bDeviceClass;
	UsbDeviceSubClass bDeviceSubClass;
	UsbDeviceProtocol bDeviceProtocol;
	uint8_t bMaxPacketSize0;
	uint16_t idVendor;
	uint16_t idProduct;
	bcd bcdDevice;
	string_id iManufacturer;
	string_id iProduct;
	string_id iSerialNumber;
	uint8_t bNumConfigurations;
} UsbDeviceDescriptor;

// [USB] Table 9-10
typedef enum UsbConfigurationAttributes
{
	cfa_reserved1 = 0x80,
	cfa_self_powered = 0x40,
	cfa_remote_wakeup = 0x20
} UsbConfigurationAttributes;

// [USB] Table 9-10
typedef struct UsbConfigurationDescriptor
{
	uint8_t bLength;
	UsbDescriptorType bDescriptorType;
	uint16_t wTotalLength;
	uint8_t bNumInterfaces;
	uint8_t bConfigurationValue;
	uint8_t iConfiguration;
	UsbConfigurationAttributes bmAttributes;
	uint8_t bMaxPower;
} UsbConfigurationDescriptor;

// [USB] Table 9-12
typedef struct UsbInterfaceDescriptor
{
	uint8_t bLength;
	UsbDescriptorType bDescriptorType;
	uint8_t bInterfaceNumber;
	uint8_t bAlternateSetting;
	uint8_t bNumEndpoints;
	UsbDeviceClass bInterfaceClass;
	UsbDeviceSubClass bInterfaceSubClass;
	UsbDeviceProtocol bInterfaceProtocol;
	uint8_t iInterface;
} UsbInterfaceDescriptor;

// [USB] Table 9-13
typedef enum UsbEndpointAttributes
{
	epattr_transfer_mask = 0x03,
	epattr_transfer_control = 0x00,
	epattr_transfer_isochronous = 0x01,
	epattr_transfer_bulk = 0x02,
	epattr_transfer_interrupt = 0x03,

	epattr_sync_mask = 0xC0,
	epattr_sync_none = 0x00,
	epattr_sync_asynchronous = 0x40,
	epattr_sync_adaptive = 0x80,
	epattr_sync_synchronous = 0xC0,

	epattr_usage_mask = 0x30,
	epattr_usage_data = 0x00,
	epattr_usage_feedback = 0x10,
	epattr_usage_implicit_feedback = 0x20,
} UsbEndpointAttributes;

// [USB] Table 9-13
typedef struct UsbEndpointDescriptor
{
	uint8_t bLength;
	UsbDescriptorType bDescriptorType;
	uint8_t bEndpointAddress;
	UsbEndpointAttributes bmAttributes;
	uint16_t wMaxPacketSize;
	uint8_t bInterval;
} UsbEndpointDescriptor;

// [HID] 6.2.1
typedef struct HidClassDescriptorHeader
{
	UsbDescriptorType bDescriptorType;
	uint16_t wDescriptorLength;
} HidClassDescriptorHeader;

// [HID] 6.2.1
typedef struct HidDescriptor
{
	uint8_t bLength;
	UsbDescriptorType bDescriptorType;
	bcd bcdHID;
	uint8_t bCountryCode;
	uint8_t bNumDescriptors;
	HidClassDescriptorHeader descriptors[1];
} HidDescriptor;

// [HID] 6.2.2.2
typedef enum HidItemType
{
	item_main = 0x00,
	item_global = 0x04,
	item_local = 0x08
} HidItemType;

typedef enum HidItemTag
{
	// Main, [HID] 6.2.2.4
	item_input = 0x80,
	item_output = 0x90,
	item_feature = 0xB0,
	item_collection = 0xA0,
	item_end_collection = 0xC0,
	// Global, [HID] 6.2.2.7
	item_usage_page = 0x04,
	item_logical_minimum = 0x14,
	item_logical_maximum = 0x24,
	item_physical_minimum = 0x34,
	item_physical_maximum = 0x44,
	item_unit_exponent = 0x54,
	item_unit = 0x64,
	item_report_size = 0x74,
	item_report_id = 0x84,
	item_report_count = 0x94,
	item_push = 0xA4,
	item_pop = 0xB4,
	// Local, [HID] 6.2.2.8
	item_usage = 0x08,
	item_usage_minimum = 0x18,
	item_usage_maximum = 0x28,
	item_designator_index = 0x38,
	item_designator_minimum = 0x48,
	item_designator_maximum = 0x58,
	item_string_index = 0x78,
	item_string_minimum = 0x88,
	item_string_maximum = 0x98,
	item_delimiter = 0xA8,
} HidItemTag;

// [HID] 6.2.2.5
typedef enum HidItemFieldAttributes
{
	field_data = 0x00, field_constant = 0x01,
	field_array = 0x00, field_variable = 0x02,
	field_absolute = 0x00, field_relative = 0x04,
	field_no_wrap = 0x00, field_wrap = 0x08,
	field_linear = 0x00, field_non_linear = 0x10,
	field_preferred_state = 0x00, field_no_preferred = 0x20,
	field_no_null = 0x00, field_null_state = 0x40,
	field_bit_field = 0x00, field_buffered_bytes = 0x100
} HidItemDataAttributes;

// [HID] 6.2.2.6
typedef enum HidCollection
{
	coll_physical = 0x00,
	coll_application = 0x01,
	coll_logical = 0x02,
	coll_report = 0x03,
	coll_named_array = 0x04,
	coll_usage_switch = 0x05,
	coll_usage_modifier = 0x06
} HidCollection;

// [UT] 3
typedef enum HidUsagePage
{
	up_generic_desktop = 0x01,
	up_keyboard = 0x07,
	up_leds = 0x08,
	up_consumer = 0x0C
} HidUsagePage;

typedef enum HidUsage
{
	// Generic Desktop, [UT] 4
	usage_keyboard = 0x06,

	// Keyboard, [UT] 10
	usage_keyboard_left_control = 0xE0,
	usage_keyboard_right_gui = 0xE7,

	// LEDs, [UT] 11
	usage_num_lock = 0x01,
	usage_kana = 0x05,
} HidUsage;

// [HID] 6.2.2
typedef uint8_t HidReportDescriptor[];
// [HID] 6.2.2.2
#define HID_ITEM0(bTag) (bTag)
#define HID_ITEM1(bTag, bData) ((bTag) | 1), (bData)
#define HID_ITEM2(bTag, wData) ((bTag) | 2), \
		((wData) & 0xFF), ((wData) >> 8)
#define HID_ITEM4(bTag, lData) ((bTag) | 3), \
		((lData) & 0xFF), (((lData) >> 8) & 0xFF), \
		(((lData) >> 16) & 0xFF), ((lData) >> 24)


// [USB] 9.6.3
typedef struct UsbFullConfigurationDescriptor
{
	UsbConfigurationDescriptor configuration_descriptor;
	UsbInterfaceDescriptor interface_descriptor;
	HidDescriptor hid_descriptor;
	UsbEndpointDescriptor endpoint_descriptor;
	// TODO: one more interface and endpoint for media keys
} UsbFullConfigurationDescriptor;


// [USB] Figure 9-4
typedef enum UsbDeviceStatus {
	devstatus_self_powered = 0x01,
	devstatus_remote_wakeup = 0x02,
} UsbDeviceStatus;

// [USB] Figure 9-6
typedef enum UsbEndpointStatus {
	epstatus_halt = 0x01,
} UsbEndpointStatus;


// [USB]
typedef enum UsbFeatureSelector {
	feature_ENDPOINT_HALT = 0,
	feature_DEVICE_REMOTE_WAKEUP = 1,
	feature_TEST_MODE = 2,
} UsbFeatureSelector;


// USB device state management

typedef enum UsbState {
	state_powered,
	state_default,
	state_address,
	state_configured
} UsbState;
UsbState usb_state = state_powered;
enum { NO_NEW_ADDRESS = 0xFF };
uint8_t new_address = NO_NEW_ADDRESS;
bool remote_wakeup_enabled = false;

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

	new_address = NO_NEW_ADDRESS;
	remote_wakeup_enabled = false;
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
	new_address = NO_NEW_ADDRESS;
	remote_wakeup_enabled = false;
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


// Descriptors

enum
{
	VID_MEGAWIN = htous(0x0E6A),
	PID_TECK = htous(0x030D), // TODO: change this to 030C
	DEVICE_VERSION = htous(0x350) // TODO: change to 0400
};

const UsbDeviceDescriptor __code device_descriptor = {
	.bLength = sizeof(UsbDeviceDescriptor),
	.bDescriptorType = dtype_DEVICE,
	.bcdUSB = htous(0x0200),
	.bDeviceClass = dclass_PER_INTERFACE,
	.bDeviceSubClass = dsubclass_PER_INTERFACE,
	.bDeviceProtocol = dproto_PER_INTERFACE,
	.bMaxPacketSize0 = 64,
	.idVendor = VID_MEGAWIN,
	.idProduct = PID_TECK,
	.bcdDevice = DEVICE_VERSION,
	.iManufacturer = 0, // TODO:
	.iProduct = 0, // TODO:
	.iSerialNumber = 0,
	.bNumConfigurations = 1
};

const UsbFullConfigurationDescriptor __code full_configuration_descriptor = {
	.configuration_descriptor = {
		.bLength = sizeof(UsbConfigurationDescriptor),
		.bDescriptorType = dtype_CONFIGURATION,
		.wTotalLength = htous(sizeof(UsbFullConfigurationDescriptor)),
		.bNumInterfaces = 1, // TODO: 2
		.bConfigurationValue = 1,
		.iConfiguration = 0,
		.bmAttributes = cfa_reserved1 | cfa_remote_wakeup,
		.bMaxPower = 50, // 100 mA
	},
	.interface_descriptor = {
		.bLength = sizeof(UsbInterfaceDescriptor),
		.bDescriptorType = dtype_INTERFACE,
		.bInterfaceNumber = 0,
		.bAlternateSetting = 0,
		.bNumEndpoints = 1,
		.bInterfaceClass = dclass_HID,
		.bInterfaceSubClass = dsubclass_HID_BOOT,
		.bInterfaceProtocol = dproto_HID_BOOT_KEYBOARD,
		.iInterface = 0,
	},
	.hid_descriptor = {
		.bLength = sizeof(HidDescriptor),
		.bDescriptorType = dtype_HID,
		.bcdHID = htous(0x111),
		.bCountryCode = 0,
		.bNumDescriptors = 1,
		.descriptors = {
			[0] = {
				.bDescriptorType = dtype_HID_REPORT,
				.wDescriptorLength = htous(sizeof(hid_report_descriptor))
			}
		}
	},
	.endpoint_descriptor = {
		.bLength = sizeof(UsbEndpointDescriptor),
		.bDescriptorType = dtype_ENDPOINT,
		.bEndpointAddress = device_to_host | 1,
		.bmAttributes = epattr_transfer_interrupt,
		.wMaxPacketSize = htous(64),
		.bInterval = 10
	}
};

const HidReportDescriptor __code hid_report_descriptor = {
	HID_ITEM1(item_usage_page, up_generic_desktop),
	HID_ITEM1(item_usage, usage_keyboard),
	HID_ITEM1(item_collection, coll_application),

	HID_ITEM1(item_report_size, 1),
	HID_ITEM1(item_report_count, 8),
	HID_ITEM1(item_usage_page, up_keyboard),
	HID_ITEM1(item_usage_minimum, usage_keyboard_left_control),
	HID_ITEM1(item_usage_maximum, usage_keyboard_right_gui),
	HID_ITEM1(item_logical_minimum, 0),
	HID_ITEM1(item_logical_maximum, 1),
	HID_ITEM1(item_input, field_data | field_variable | field_absolute),

	HID_ITEM1(item_report_count, 1),
	HID_ITEM1(item_report_size, 8),
	HID_ITEM1(item_input, field_constant),

	HID_ITEM1(item_report_count, 5),
	HID_ITEM1(item_report_size, 1),
	HID_ITEM1(item_usage_page, up_leds),
	HID_ITEM1(item_usage_minimum, usage_num_lock),
	HID_ITEM1(item_usage_maximum, usage_kana),
	HID_ITEM1(item_output, field_data | field_variable | field_absolute),

	HID_ITEM1(item_report_count, 1),
	HID_ITEM1(item_report_size, 3),
	HID_ITEM1(item_output, field_constant),

	HID_ITEM1(item_report_count, 6),
	HID_ITEM1(item_report_size, 8),
	HID_ITEM1(item_logical_minimum, 0),
	HID_ITEM1(item_logical_maximum, 255),
	HID_ITEM1(item_usage_page, up_keyboard),
	HID_ITEM1(item_usage_minimum, 0),
	HID_ITEM1(item_usage_maximum, 255),
	HID_ITEM1(item_input, field_data | field_array),

	HID_ITEM0(item_end_collection)
};


// USB request handling

UsbRequestSetup request;

void usb_transmit_descriptor(const void* buffer, uint8_t size) __using(3)
{
	if (size > utohs(request.wLength))
		size = utohs(request.wLength);
	EPINDEX = 0;
	usb_transmit(buffer, size);
}

bool usb_get_device_configuration_descriptor(void) __using(3)
{
	switch (utohs(request.wValue) & 0xFF) // Configuration index
	{
	case 0:
		usb_transmit_descriptor(&full_configuration_descriptor,
			sizeof(full_configuration_descriptor));
		return true;
	}
	return false;
}

bool usb_get_device_descriptor(void) __using(3)
{
	switch (utohs(request.wValue) >> 8) // Descriptor type
	{
	case dtype_DEVICE:
		usb_transmit_descriptor(&device_descriptor, sizeof(device_descriptor));
		return true;
	case dtype_CONFIGURATION:
		return usb_get_device_configuration_descriptor();
	}
	return false;
}

bool usb_get_device_status(void) __using(3)
{
	TXDAT = remote_wakeup_enabled ? devstatus_remote_wakeup : 0;
	TXDAT = 0;
	usb_transmit_dynamic(2);
	return true;
}

bool usb_clear_device_feature(void) __using(3)
{
	switch (request.wValue) // Feature selector
	{
	case feature_DEVICE_REMOTE_WAKEUP:
		remote_wakeup_enabled = false;
		usb_transmit_dynamic(0);
		return true;
	}
	return false;
}

bool usb_set_device_feature(void) __using(3)
{
	switch (request.wValue) // Feature selector
	{
	case feature_DEVICE_REMOTE_WAKEUP:
		remote_wakeup_enabled = true;
		usb_transmit_dynamic(0);
		return true;
	}
	return false;
}

bool usb_standard_device_request(void) __using(3)
{
	switch (request.bRequest)
	{
	case request_GET_STATUS:
		return usb_get_device_status();
	case request_CLEAR_FEATURE:
		return usb_clear_device_feature();
	case request_SET_FEATURE:
		return usb_set_device_feature();
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

bool usb_get_interface_hid_descriptor(void) __using(3)
{
	switch (utohs(request.wIndex)) // Interface number
	{
	case 1:
		switch (utohs(request.wValue) & 0xFF) // HID descriptor index
		{
		case 0:
			usb_transmit_descriptor(&full_configuration_descriptor.hid_descriptor,
				sizeof(HidDescriptor));
			return true;
		}
	}
	return false;
}

bool usb_get_interface_report_descriptor(void) __using(3)
{
	switch (utohs(request.wIndex)) // Interface number
	{
	case 1:
		switch (utohs(request.wValue) & 0xFF) // Report descriptor index
		{
		case 0:
			usb_transmit_descriptor(&hid_report_descriptor,
				sizeof(hid_report_descriptor));
			return true;
		}
	}
	return false;
}

bool usb_get_interface_descriptor(void) __using(3)
{
	switch (utohs(request.wValue) >> 8) // Descriptor type
	{
	case dtype_HID:
		return usb_get_interface_hid_descriptor();
	case dtype_HID_REPORT:
		return usb_get_interface_report_descriptor();
	}
	return false;
}

bool usb_standard_interface_request(void) __using(3)
{
	switch (request.bRequest)
	{
	case request_GET_DESCRIPTOR:
		return usb_get_interface_descriptor();
	}
}

bool usb_interface_request(void) __using(3)
{
	switch (request.bmRequestType & rtype_mask)
	{
	case rtype_standard:
		return usb_standard_interface_request();
	}
}

bool usb_get_endpoint_status(void) __using(3)
{
	switch (request.wIndex) // Endpoint index
	{
	case 0:
		TXDAT = 0; // Not halted
		TXDAT = 0;
		usb_transmit_dynamic(2);
		return true;
	}
	return false;
}

bool usb_standard_endpoint_request(void) __using(3)
{
	switch (request.bRequest)
	{
	case request_GET_STATUS:
		return usb_get_endpoint_status();
	}
	return false;
}

bool usb_endpoint_request(void) __using(3)
{
	switch (request.bmRequestType & rtype_mask)
	{
	case rtype_standard:
		return usb_standard_endpoint_request();
	}
	return false;
}

bool usb_request(void) __using(3)
{
	switch (request.bmRequestType & recipient_mask)
	{
	case recipient_device:
		return usb_device_request();
	case recipient_interface:
		return usb_interface_request();
	case recipient_endpoint:
		return usb_endpoint_request();
	}
	return false;
}


// USB interrupt handling

void usb_transmit_done(void) __using(3)
{
	if (new_address != NO_NEW_ADDRESS)
	{
		UADDR = new_address;
		set_state(new_address ? state_address : state_default);
		new_address = NO_NEW_ADDRESS;
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
