#include "keypad.h"

#include <8051.h>
#include "mg84fl54bd.h"

void keypad_isr(void) __interrupt(13) __using(2)
{
	reboot_to_isp();
}

void keypad_init(void)
{
	P1M0 = 0xFF;
	P1M1 = 0xFF;
	P2M0 = 0xFF;
	P2M1 = 0xFF;
	P3M0 = 0x18;
	P3M0 = 0x18;

	P1 = 0;
	P2 = 0;
	P3 &= 0xE7;

	KBMASK = 0xFF;
	KBPATN = 0xFF;
	KBCON &= ~PATN_SEL;
	AUXIE |= EKBI;
}
