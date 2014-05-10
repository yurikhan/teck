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

int main(void)
{
	reboot_to_isp();
}
