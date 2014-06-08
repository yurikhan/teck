#pragma once

void keypad_isr(void) __interrupt(13) __using(2);

void keypad_init(void);
