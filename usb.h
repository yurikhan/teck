#pragma once

void usb_init(void);

void usb_isr(void) __interrupt(15) __using(3);
