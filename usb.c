#include "usb.h"

#include <8051.h>
#include "mg84fl54bd.h"
#include "timer.h"

typedef enum UsbState {
	state_powered,
	state_default,
	state_address,
	state_configured
} UsbState;
UsbState usb_state = state_powered;

void set_state(UsbState new_state) __using(3)
{
	usb_state = new_state;
	P3_5 = !(new_state & 1);
	P3_6 = !(new_state & 2);
}

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

	set_state(state_default);
}

void usb_init(void)
{
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

void usb_isr(void) __interrupt(15) __using(3)
{
	unsigned char upcon = UPCON;
	if (upcon & URST)
	{
		UPCON = upcon & ~(URST | URSM | USUS) | URST;
		usb_reset();
		return;
	}
}
