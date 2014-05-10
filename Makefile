CC = sdcc
CFLAGS =

all: main.listing.orig

%.listing.orig: %.ihx
	dis51 -l <$< >$@

%.ihx: %.c
	$(CC) $(CFLAGS) $<
