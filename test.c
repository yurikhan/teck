#include <stdbool.h>
#include <8051.h>

__sfr __at(0xE7) ISPCR;
#define ISPEN 0x80
#define SWBS  0x40
#define SWRST 0x20
#define CFAIL 0x10
#define MISPF 0x08
#define MS1   0x02
#define MS0   0x01

void _Noreturn reboot_to_isp(void)
{
	ISPCR = SWBS | SWRST | MISPF;
}

__sbit __at(0xB1) nDIP4;
__sbit __at(0xB2) nDIP3;
__sbit __at(0xE9) nDIP2;
__sbit __at(0xEA) nDIP1;

__sbit __at(0xB5) nLED3;
__sbit __at(0xB6) nLED1;
__sbit __at(0xB7) nLED2;

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

int main(void)
{
	if (nDIP4)
	{
		reboot_to_isp();
	}
	TMOD = T0_M0;
	PT0 = true;
	ET0 = true;
	EA = true;
	while (true)
	{
		nLED2 = true;
		delay(250);
		nLED2 = false;
		delay(250);
	}
}
