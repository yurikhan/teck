#pragma once

#define MG84_CATENATE(a,b) a ## b
#define MG84_UNUSED(n) MG84_CATENATE(MG84_UNUSED_, n)
#define _ MG84_UNUSED(__COUNTER__)

#define MG84_BITS(bit7, bit6, bit5, bit4, bit3, bit2, bit1, bit0) \
	enum { bit7 = 0x80, bit6 = 0x40, bit5 = 0x20, bit4 = 0x10, \
		   bit3 = 0x08, bit2 = 0x04, bit1 = 0x02, bit0 = 0x01 }
#define MG84_SFR(address, name) \
	__sfr __at(address) name
#define MG84_SFR_(address, name, bit7, bit6, bit5, bit4, bit3, bit2, bit1, bit0) \
	MG84_SFR(address, name); \
	MG84_BITS(bit7, bit6, bit5, bit4, bit3, bit2, bit1, bit0)
#define MG84_BIT_SFR(base, name, bit7, bit6, bit5, bit4, bit3, bit2, bit1, bit0) \
	MG84_SFR(base, name); \
	__sbit __at(base) bit0; \
	__sbit __at(base + 1) bit1; \
	__sbit __at(base + 2) bit2; \
	__sbit __at(base + 3) bit3; \
	__sbit __at(base + 4) bit4; \
	__sbit __at(base + 5) bit5; \
	__sbit __at(base + 6) bit6; \
	__sbit __at(base + 7) bit7
#define MG84_XSFR(address, name) \
	volatile unsigned char __xdata __at(address) name
#define MG84_XSFR_(address, name, bit7, bit6, bit5, bit4, bit3, bit2, bit1, bit0) \
	MG84_XSFR(address, name); \
	MG84_BITS(bit7, bit6, bit5, bit4, bit3, bit2, bit1, bit0)

/* Auxiliary SFRs */

MG84_BIT_SFR(0xC0, XICON, IL3, EX3, IE3, IT3, IL2, EX2, IE2, IT2); // External Interrupt Control
MG84_SFR_(0xAD, AUXIE, EUSB, ETWSI, EKB, _, _, _, _, ESPI); // Auxiliary Interrupt Enable
enum { EKBI = EKB };
MG84_SFR_(0xAE, AUXIP, PUSB, PTWSI, PKB, _, _, _, _, PSPI); // Auxiliary Interrupt Priority
enum { PKBI = PKB };

MG84_BIT_SFR(0xE8, P4, _, _, _, _, P4_3, P4_2, P4_1, P4_0); // Port 4
MG84_SFR_(0x93, P0M0, P0M0_7, P0M0_6, P0M0_5, P0M0_4, P0M0_3, P0M0_2, P0M0_1, P0M0_0); // Port 0 Mode Register 0
MG84_SFR_(0x94, P0M1, P0M1_7, P0M1_6, P0M1_5, P0M1_4, P0M1_3, P0M1_2, P0M1_1, P0M1_0); // Port 0 Mode Register 1
MG84_SFR_(0x91, P1M0, P1M0_7, P1M0_6, P1M0_5, P1M0_4, P1M0_3, P1M0_2, P1M0_1, P1M0_0); // Port 1 Mode Register 0
MG84_SFR_(0x92, P1M1, P1M1_7, P1M1_6, P1M1_5, P1M1_4, P1M1_3, P1M1_2, P1M1_1, P1M1_0); // Port 1 Mode Register 1
MG84_SFR_(0x95, P2M0, P2M0_7, P2M0_6, P2M0_5, P2M0_4, P2M0_3, P2M0_2, P2M0_1, P2M0_0); // Port 2 Mode Register 0
MG84_SFR_(0x96, P2M1, P2M1_7, P2M1_6, P2M1_5, P2M1_4, P2M1_3, P2M1_2, P2M1_1, P2M1_0); // Port 2 Mode Register 1
MG84_SFR_(0xB1, P3M0, P3M0_7, P3M0_6, P3M0_5, P3M0_4, P3M0_3, P3M0_2, P3M0_1, P3M0_0); // Port 3 Mode Register 0
MG84_SFR_(0xB2, P3M1, P3M1_7, P3M1_6, P3M1_5, P3M1_4, P3M1_3, P3M1_2, P3M1_1, P3M1_0); // Port 3 Mode Register 1
MG84_SFR_(0xB3, P4M0, P4M0_7, P4M0_6, P4M0_5, P4M0_4, P4M0_3, P4M0_2, P4M0_1, P4M0_0); // Port 4 Mode Register 0
MG84_SFR_(0xB4, P4M1, _, _, _, _, P4M1_3, P4M1_2, P4M1_1, P4M1_0); // Port 4 Mode Register 1

MG84_SFR_(0xD6, KBCON, _, _, _, _, _, _, PTNS, KPI); // Keypad Control
enum { PATN_SEL = PTNS };
MG84_SFR (0xD5, KBPATN); // Keypad Pattern
MG84_SFR (0xD7, KBMASK); // Keypad Mask

MG84_SFR (0xB9, SADEN); // Slave Address Mask
MG84_SFR (0xA9, SADDR); // Slave Address

MG84_BIT_SFR(0xF8, SICON, CR2, ENSI, STA, STO, SI, AA, CR1, CR0); // TWSI Control Register
MG84_SFR_(0xD1, SIADR, _, _, _, _, _, _, _, GC); // TWSI Address Register
MG84_SFR (0xD2, SIDAT); // TWSI Data Register
MG84_SFR (0xD3, SISTA); // TWSI Status Register

MG84_SFR_(0x85, SPCTL, SSIG, SPEN, DORD, MSTR, CPOL, CPHA, SPR1, SPR0); // SPI Control Register
MG84_SFR_(0x84, SPSTAT, SPIF, THRE, _, _, _, _, _, SPR2); // SPI Status Register
MG84_SFR (0x86, SPDAT); // SPI Data Register

MG84_SFR_(0x8E, AUXR, _, _, BRADJ0, _, T2X12, _, _, DPS); // Auxiliary Register
MG84_SFR_(0xA6, AUXR2, T0X12, T1X12, URM0x6, _, _, _, _, T0CKOE); // Auxiliary Register 2
MG84_SFR_(0xC9, T2MOD, _, _, _, _, _, _, T2OE, DCEN); // Timer 2 Mode Control
MG84_SFR_(0xC7, CKCON, XCKS4, XCKS3, XCKS2, XCKS1, XCKS0, CKS2, CKS1, CKS0); // Clock Control
MG84_SFR_(0xBF, CKCON2, _, _, OSCDR0, _, EN_USB, EN_PLL, PLL_RDY, CK_SEL); // Clock Control 2
MG84_SFR_(0xE1, WDTCR, WRF, _, ENW, CLRW, WIDL, PS2, PS1, PS0); // Watch-dog Timer

MG84_SFR_(0xE7, ISPCR, ISPEN, SWBS, SWRST, CFAIL, MISPF, _, MS1, MS0); // ISP Control Register
MG84_SFR (0xE3, IFADRH); // ISP Flash Address High
MG84_SFR (0xE4, IFADRL); // ISP Flash Address Low
MG84_SFR (0xE2, IFD); // ISP Flash Data
MG84_SFR (0xE6, SCMD); // ISP Sequential Command

/* USB SFRs */

MG84_XSFR_(0xFFC0, DCON, _, _, _, SRWKP, EP3DIR, _, _, _); // Device Control
MG84_XSFR (0xFFD8, UADDR); // USB Address
MG84_XSFR_(0xFFC9, UPCON, CONEN, _, URWU, _, _, URST, URSM, USUS); // USB Power Control
MG84_XSFR_(0xFFD9, IEN, _, _, _, _, _, EFSR, EF, _); // Interrupt Enable
MG84_XSFR_(0xFFDA, UIE, SOFIE, ASOFIE, _, UTXIE2, _, UTXIE1, URXIE0, UTXIE0); // USB Interrupt Enable
MG84_XSFR_(0xFFDB, UIFLG, SOFIF, ASOFIF, _, UTXD2, _, UTXD1, URXD0, UTXD0); // USB Interrupt Flag
MG84_XSFR_(0xFFDC, UIE1, _, _, _, _, _, _, URXIE3, UTXIE3); // USB Interrupt Enable 1
MG84_XSFR_(0xFFDD, UIFLG1, _, _, _, _, _, _, URXD3, UTXD3); // USB Interrupt Flag 1
MG84_XSFR (0xFFF1, EPINDEX); // Endpoint Index
MG84_XSFR_(0xFFE1, EPCON, RXSTL, TXSTL, RXDBM, TXDBM, RXISO, RXEPEN, TXISO, TXEPEN); // Endpoint Control
MG84_XSFR_(0xFFE2, RXSTAT, RXSEQ, RXSETUP, STOVW, EDOVW, RXSOVW, ISOOVW, _, _); // Endpoint Receive Status
MG84_XSFR (0xFFE3, RXDAT); // FIFO Receive Data
MG84_XSFR_(0xFFE4, RXCON, RXCLR, _, _, RXFFRC, _, _, _, _); // FIFO Receive Control
MG84_XSFR (0xFFE6, RXCNT); // FIFO Receive Byte Count
MG84_XSFR_(0xFFF2, TXSTAT, TXSEQ, _, _, _, TXSOVW, _, _, _); // Endpoint Transmit Status
MG84_XSFR (0xFFF3, TXDAT); // FIFO Transmit Data
MG84_XSFR_(0xFFF4, TXCON, TXCLR, _, _, TXFFRC, _, _, _, _); // FIFO Transmit Control
MG84_XSFR (0xFFF6, TXCNT); // FIFO Transmit Byte Count
MG84_XSFR_(0xFFC2, SIOCTL, DPI, DMI, _, _, _, _, _, _); // Serial I/O Control

#undef _


void _Noreturn reboot_to_isp(void);
