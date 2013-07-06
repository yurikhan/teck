This repository hosts the reverse-engineered and modded firmware for the [Truly Ergonomic][1] keyboard.

[1]: https://www.trulyergonomic.com/

Added features:

* Table-based <kbd>Fn</kbd> and <kbd>Num Lock</kbd> layers, customizable independently of the main layer, for both PC and Mac layouts.
* Up to 23 different media/application launch/application control keys (limit raised from original 13).
* Media keys no longer confined to the <kbd>Fn</kbd> layer.
* Non-synchronized <kbd>Num Lock</kbd> no longer tied to the status of the LED. If you press a <kbd>Num Lock</kbd>-sensitive key and your OS <kbd>Num Lock</kbd> is off, the firmware will turn it on first and back off when you stop typing.
* Visual web-based [configurator][2].

[2]: http://yurivkhan.github.io/teck/

Removed features:

* DIP switch–based key translation: <kbd>Henkan</kbd>→<kbd>Delete</kbd>, <kbd>Apps</kbd>→<kbd>Space</kbd>, <kbd>Euro2</kbd>→<kbd>Yen</kbd>.

Known problems:
* Non-synchronized <kbd>Num Lock</kbd> may be too invasive — it does not provide an easy way to press an affected key without <kbd>Num Lock</kbd> turning on. Meaning you can’t play games that expect you to use keypad in arrows mode.
* You cannot easily turn on MouseKeys (typically [<kbd>Alt</kbd>+]<kbd>Shift</kbd>+<kbd>Num Lock</kbd>). If you do inadvertently turn it on, you cannot easily turn it off. (You might work around this by configuring one of the keys as a real <kbd>Num Lock</kbd>.)