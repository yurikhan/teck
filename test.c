#include <stdbool.h>

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

int main(void)
{
	if (nDIP4)
	{
		reboot_to_isp();
	}
	else
	{
		nLED2 = false;
		while (true);
	}
}
