#include "usb.h"

#include <8051.h>
#include "mg84fl54bd.h"
#include "timer.h"

void usb_init(void)
{
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
		UPCON |= URST;
		P3_6 = false;
	}
	else
	{
		P3_5 = !P3_6;
	}
}
