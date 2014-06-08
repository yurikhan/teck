CC = sdcc -c
CFLAGS = --xram-size 576 --no-xinit-opt
LINK = sdcc
LINKFLAGS =

SOURCES = $(wildcard *.c)
OBJS = $(SOURCES:.c=.rel)
EXE = test.ihx
LISTING = test.listing.orig

all: $(EXE) $(LISTING)

clean:
	-rm -f $(OBJS) $(SOURCES:.c=.lst) $(SOURCES:.c=.rst) $(SOURCES:.c=.sym) $(SOURCES:.c=.asm) \
		$(EXE) $(EXE:.ihx=.lk) $(EXE:.ihx=.map) $(EXE:.ihx=.mem) $(LISTING)

%.listing.orig: %.ihx
	dis51 -l 0 0x0B <$< >$@

%.rel: %.c
	$(CC) $(CFLAGS) $<

test.ihx: $(OBJS)
	$(LINK) -o $@ $(LINKFLAGS) $(OBJS)
