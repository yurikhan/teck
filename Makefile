CC = sdcc
CFLAGS =

all: test.listing.orig

%.listing.orig: %.ihx
	dis51 -l <$< >$@

%.ihx: %.c Makefile
	$(CC) $(CFLAGS) $<
