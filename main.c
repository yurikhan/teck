#include <stdbool.h>

__sfr __at(0xE7) ISPCR;
enum
{
	ISPEN = 0x80,
	SWBS  = 0x40,
	SWRST = 0x20,
	CFAIL = 0x10,
	MISPF = 0x08,
	MS1   = 0x02,
	MS0   = 0x01,
};

void _Noreturn reboot_to_isp(void)
{
	ISPCR = SWBS | SWRST | MISPF;
}

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

	nLED2 = false;
	while (true) {}
}
