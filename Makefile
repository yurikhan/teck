CC = sdcc
CFLAGS = --xram-size 576 --no-xinit-opt

all: main.ihx main.listing.orig

%.listing.orig: %.ihx
	dis51 -l 0 0x0B <$< >$@

%.ihx: %.c
	$(CC) $(CFLAGS) $<
