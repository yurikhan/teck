#include "timer.h"

#include <stdbool.h>
#include <8051.h>

volatile unsigned char delay_count;

void timer_isr(void) __interrupt(1) __using(1)
{
	TR0 = false;
	if (delay_count)
	{
		--delay_count;
		TL0 = 0x18;
		TH0 = 0xFC;
		TR0 = true;
	}
}

void delay(unsigned char ms)
{
	TR0 = false;
	delay_count = ms;
	TL0 = 0x18;
	TH0 = 0xFC;
	TR0 = true;
	while (delay_count) {}
}

void timer_init(void)
{
	TMOD = T0_M0;
	PT0 = true;
	ET0 = true;
}
