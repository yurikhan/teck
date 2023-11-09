This repository hosts the reverse-engineered and modded firmware for the [Truly Ergonomic][1] keyboard.

[1]: https://www.trulyergonomic.com/

This is for history only. No new work is being done.

If you have a Truly Ergonomic keyboard and want to customize the layout, I suggest that you open it up, chuck the MCU that powers it, and retrofit an MCU that is supported by the free QMK or ZMK firmwares. Be aware that the keyswitch matrix is highly irregularly organized, requiring as many as 26 GPIO pins (18 logical columns by 8 rows), and if you want LEDs, these will occupy 3 more. So a Pro Micro won’t cut it; Arduino Micro, with luck, will only barely be sufficient for the key matrix (no LEDs). Maybe get something RP2040-based, or use shift registers.

----

Features added by this mod:

* Table-based <kbd>Fn</kbd> and <kbd>Num Lock</kbd> layers, customizable independently of the main layer, for both PC and Mac layouts.
* Up to 23 different media/application launch/application control keys (limit raised from original 13).
* Media keys no longer confined to the <kbd>Fn</kbd> layer.
* Non-synchronized <kbd>Num Lock</kbd> no longer tied to the status of the LED. If you press a <kbd>Num Lock</kbd>-sensitive key and your OS <kbd>Num Lock</kbd> is off, the firmware will turn it on first and back off when you stop typing.
* Better debouncing algorithm.
* Visual web-based [configurator][2].

[2]: http://yurivkhan.github.io/teck/

Removed features:

* DIP switch–based key translation: <kbd>Henkan</kbd>→<kbd>Delete</kbd>, <kbd>Apps</kbd>→<kbd>Space</kbd>, <kbd>Euro2</kbd>→<kbd>Yen</kbd>.

Known problems:
* Non-synchronized <kbd>Num Lock</kbd> may be too invasive — it does not provide an easy way to press an affected key without <kbd>Num Lock</kbd> turning on. Meaning you can’t play games that expect you to use keypad in arrows mode.
* You cannot easily turn on MouseKeys (typically [<kbd>Alt</kbd>+]<kbd>Shift</kbd>+<kbd>Num Lock</kbd>). If you do inadvertently turn it on, you cannot easily turn it off. (You might work around this by configuring one of the keys as a real <kbd>Num Lock</kbd>.)
