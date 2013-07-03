#!/usr/bin/python

import argparse
import re
import sys

def x(rx):
    return rx.replace('x', '[0-9A-Fa-f]')

parser = argparse.ArgumentParser(description='Produce a HEX file from a listing and a reference HEX.')
parser.add_argument('ref', type=file, help='File containing the reference HEX')
parser.add_argument('dump', type=file, help='File containing a listing from dis51 -l')

args = parser.parse_args()

# Load the data
data = [0 for n in range(0x2800)]
for line in args.dump:
    line = re.sub(r'\s*(;.*)?$', '', line)
    if not line: continue
    if re.match(x(r'^\w+:$|^CSEG AT xxxxh$|^END$'), line): continue
    m = re.match(x(r'^  (xxxx) ((xx)*)'), line)
    if not m: print >> sys.stderr, '??dump %s' % line
    base, d = int(m.group(1), 16), m.group(2)
    for i in range(0, len(d), 2):
        data[base + i/2] = int(d[i:i+2], 16)

for line in args.ref:
    m = re.match(x(r':(xx)(xxxx)(xx)(?:xx)*xx(\r?\n?)$'), line)
    if not m:
        print >> sys.stderr, '??hex %s' % line,
        continue
    length, base, type_ = (int(g, 16) for g in m.groups()[:3])
    eol = m.group(4)
    if type_ == 1:
        print line,
        continue
    d = [length, base / 256, base % 256, type_]
    for i in range(length):
        d.append(data[base + i])
    d.append((256 - sum(d) % 256) % 256)
    print ':%s%s' % (''.join('%02X' % b for b in d), eol),
