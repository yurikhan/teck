#include <stdbool.h>
#include <8051.h>
#include "mg84fl54bd.h"
#include "timer.h"


__sbit __at(0xB1) nDIP4;
__sbit __at(0xB2) nDIP3;
__sbit __at(0xE9) nDIP2;
__sbit __at(0xEA) nDIP1;

__sbit __at(0xB5) nLED3;
__sbit __at(0xB6) nLED1;
__sbit __at(0xB7) nLED2;

void keypad_isr(void) __interrupt(13) __using(2)
{
	reboot_to_isp();
}

void init_keypad(void)
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

int main(void)
{
	if (nDIP4)
	{
		reboot_to_isp();
	}
	EA = true;
	init_keypad();
	init_timer();
	while (true)
	{
		nLED2 = true;
		delay(250);
		nLED2 = false;
		delay(250);
	}
}
