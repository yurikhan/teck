CC = sdcc
CFLAGS = --xram-size 576 --no-xinit-opt

all: test.listing.orig

%.listing.orig: %.ihx
	dis51 -l <$< >$@

%.ihx: %.c Makefile
	$(CC) $(CFLAGS) $<
