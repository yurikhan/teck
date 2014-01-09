ENTRYPOINTS = 0 11 107 123 0x115f 0x1162 0x1165 0x1168  0x116b 0x116e 0x1171 0x1174  0x1177 0x117a 0x117d 0x1180  0x1183 \
	0x0a92 0x0a95 0x0a98 0x0a9b  0x0a9e 0x0aa1 0x0aa4 0x0aa7  0x0aaa 0x0aad 0x0ab0 0x0ab3  0x0ab6 0x0ab9 0x0abc 0x0abf  0x0ac2 0x0ac5 0x0ac8 \
	0x1409 0x140C 0x140F 0x1412  0x1415 0x1418 0x141B 0x141E

ENTRYPOINTS_MOD =  0 11 107 123 0x115f 0x1162 0x1165 0x1168  0x116b 0x116e 0x1171 0x1174  0x1177 0x117a 0x117d 0x1180  0x1183 \
	0x0226 0x0228 0x022A 0x022C  0x022E 0x0230 0x0232 0x0234

all: hex listing-mod www-all

clean:
	-rm -rf www _build

hex: _build/TrulyErgonomic_v3yk.hex

listing: _build/TrulyErgonomic_209_v3.lst.orig

listing-mod: _build/TrulyErgonomic_v3yk.lst.orig

check: listing-mod
	meld TrulyErgonomic_209_v3.lst.annotated _build/TrulyErgonomic_v3yk.lst.orig

WWW_FILES = index.html styles.css

www-all: www/configurator.js $(addprefix www/,$(WWW_FILES))

_build:
	mkdir -p _build


www:
	mkdir -p www

$(addprefix www/,$(WWW_FILES)): $(addprefix configurator/,$(WWW_FILES)) | www
	install -m 644 -t www $?

www/configurator.js: configurator/configurator.js _build/TrulyErgonomic_v3yk_code.jsi | www
	sed -e "/^:/d; /^var firmware_code/r_build/TrulyErgonomic_v3yk_code.jsi" configurator/configurator.js >$@
	chmod 644 $@

_build/TrulyErgonomic_v3yk_code.jsi: TrulyErgonomic_209_v3.lst.annotated TrulyErgonomic_v3yk_code.refi | _build
	tools/undump.py TrulyErgonomic_v3yk_code.refi TrulyErgonomic_209_v3.lst.annotated | sed -e 's/\r\?\n\?$$/\\r\\n\\/' >$@

_build/TrulyErgonomic_v3yk.ref: TrulyErgonomic_v3yk_conf.refi TrulyErgonomic_v3yk_code.refi | _build
	cat $+ >$@

_build/TrulyErgonomic_209_v3.lst.orig: _build/TrulyErgonomic_209_v3.hex Makefile
	dis51 -l $(ENTRYPOINTS) <$< >$@
_build/TrulyErgonomic_v3yk.lst.orig: _build/TrulyErgonomic_v3yk.hex Makefile
	dis51 -l $(ENTRYPOINTS_MOD) <$< >$@

_build/TrulyErgonomic_v3yk.hex: TrulyErgonomic_209_v3.lst.annotated _build/TrulyErgonomic_v3yk.ref
	tools/undump.py _build/TrulyErgonomic_v3yk.ref TrulyErgonomic_209_v3.lst.annotated >$@
