#pragma once

void timer_isr(void) __interrupt(1) __using(1);
void delay(unsigned char ms);
void timer_init(void);
