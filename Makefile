CC = sdcc
CFLAGS = --xram-size 576 --no-xinit-opt

all: test.ihx test.listing.orig

%.listing.orig: %.ihx
	dis51 -l 0 0x0B <$< >$@

%.ihx: %.c Makefile
	$(CC) $(CFLAGS) $<
