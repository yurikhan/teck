#include <stdbool.h>
#include <8051.h>
#include "mg84fl54bd.h"
#include "timer.h"
#include "keypad.h"
#include "usb.h"

__sbit __at(0xEA) nDIP1;
__sbit __at(0xE9) nDIP2;
__sbit __at(0xB2) nDIP3;
__sbit __at(0xB1) nDIP4;
__sbit __at(0xEB) nDIP5;

__sbit __at(0xB6) nLED1;
__sbit __at(0xB7) nLED2;
__sbit __at(0xB5) nLED3;

int main(void)
{
	if (nDIP4)
	{
		reboot_to_isp();
	}

	CKCON = (12 - 1) << 3; // Set clock to 12MHz
	EA = true;
	timer_init();
	keypad_init();
	usb_init();
	while (true)
	{
		nLED2 = false;
		delay(250);
		nLED2 = true;
		delay(250);
	}
}
