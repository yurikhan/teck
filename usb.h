#pragma once

#include <stdbool.h>

void init_usb(void);

void usb_isr(void) __interrupt(15) __using(3);
