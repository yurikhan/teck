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

int main(void)
{
	reboot_to_isp();
}
