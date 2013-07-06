window.onload=function(){

var _ = null;

function warn(warning) {
	function _warn(data)
	{
		if (typeof(data) === 'string')
		{
			return _warn([data]);
		}
		var result = data;
		result.warning = warning;
		return result;
	}
	return _warn;
}

var L = warn('Ignored by Linux kernel module');
var W = warn('Wide Linux keycode, unusable by XKB');

var usages = [
	'', '01h', '02h', '03h', 'A', 'B', 'C', 'D',
	'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
	'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
	'U', 'V', 'W', 'X', 'Y', 'Z', ['1!', '1'], ['2@', '2'],
	['3#', '3'], ['4$', '4'], ['5%', '5'], ['6^', '6'], ['7&', '7'], ['8*', '8'], ['9(', '9'], ['0)', '0'],
	['⏎', 'Enter'], ['⎋', 'Esc'], ['⌫', 'Backspace', 'Bksp'], ['↹', 'Tab'], ['␣', 'Space'], ['-_', '-'], ['=+', '='], ['[{', '['],
	[']}', ']'], ['\\|', '\\'], ['€#~', 'Euro1'], [';:', ';'], ['\'"', '\''], ['`~', '`'], [',<', ','], ['.>', '.'],
	['/?', '/'], ['⇬', 'Caps Lock', 'Caps'], 'F1', 'F2', 'F3', 'F4', 'F5', 'F6',
	'F7', 'F8', 'F9', 'F10', 'F11', 'F12', ['⎙', 'PrtScr', 'PrtSc'], ['⇳⃢', 'Scroll Lock', 'Scroll'],
	['⎉', 'Pause'], ['⎀', 'Insert', 'Ins'], ['⇱', 'Home'], ['⎗', 'Page Up', 'PgUp'], ['⌦', 'Delete', 'Del'], ['⇲', 'End'], ['⎘', 'Page Down', 'PgDn'], ['→', 'Right'],
	['←', 'Left'], ['↓', 'Down'], ['↑', 'Up'], ['⇭', 'Num Lock', 'Num'], ['÷', 'K/'], ['×', 'K*'], ['−', 'K-'], ['+', 'K+'],
	['⎆', 'KEnter'], ['1⇲', 'K1'], ['2↓', 'K2'], ['3⎘', 'K3'], ['4←', 'K4'], ['5⎅', 'K5'], ['6→', 'K6'], ['7⇱', 'K7'],
	['8↑', 'K8'], ['9⎗', 'K9'], ['0⎀', 'K0'], ['.⌦', 'K.'], ['€\\|', 'Euro2'], ['▤', 'Apps', 'App'], ['Ⓘ', 'Power'], ['=', 'K='],
	'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20',
	'F21', 'F22', 'F23', 'F24', 'Exec', 'Help', 'Menu', 'Select',
	'Stop', 'Again', 'Undo', 'Cut', 'Copy', 'Paste', 'Find', 'Mute',
	'Vol+', 'Vol−', L(['⇬⃞', 'Locking Caps']), L(['⇭⃞', 'Locking Num']), L(['⇳⃞', 'Locking Scroll']), [',⌦', 'K,'], L(['=⃞', 'K= AS/400']), ['\\_', 'Ro', 'Intl1'],
	['カ/ひ', 'Kana', 'Intl2'], ['¥|', 'Yen', 'Intl3'], ['変', 'Henkan', 'Intl4'], ['無変', 'Muhenkan', 'Intl5'], ['ｶﾝﾏ', 'JPComma', 'Intl6'], L(['DBCS', 'SBCS', 'Intl7']), L('Intl8'), L('Intl9'),
	['한/영', 'Hangul', 'Lang1'], ['한자', 'Hanja', 'Lang2'], ['カタ', 'Katakana', 'Kata', 'Lang3'], ['ひら', 'Hiragana', 'Hira', 'Lang4'], ['半角', 'Hankaku/Zenkaku', 'Hankaku', 'Zenkaku', 'Lang5'], L('Lang6'), L('Lang7'), L('Lang8'),
	L('Lang9'), L(['⌧', 'Erase']), L('Attn'), L('Cancel'), 'Clear', L('Prior'), L(['Ret', 'Return']), L(['Sep', 'Separator']),
	L('Out'), L('Oper'), L(['ClrAg', 'Clear/Again']), L(['CrSel', 'CrSel/Props', 'Props']), L('ExSel'), L('A5h'), L('A6h'), L('A7h'),
	L('A8h'), L('A9h'), L('AAh'), L('ABh'), L('ACh'), ['⌘⎉', 'TECK Win+Pause', 'Win+Break'], ['⎊', 'TECK Ctrl+Break', 'Break'], L('AFh'),
	L('00'), L('000'), L([',\'', 'Thousands Separator']), L(['⎖', 'Decimal Separator']), L(['$', 'Currency Unit']), L(['¢', 'Currency Sub-unit']), ['(', 'K('], [')', 'K)'],
	L(['{', 'K{']), L(['}', 'K}']), L(['K↹', 'KTab']), L(['K⌫', 'KBackspace', 'KBksp']), L('KA'), L('KB'), L('KC'), L('KD'),
	L('KE'), L('KF'), L('Xor'), L(['^', 'K^']), L(['%', 'K%']), L(['<', 'K<']), L(['>', 'K>']), L(['&', 'K&']),
	L('&&'), L(['|', 'K|']), L('||'), L([':', 'K:']), L(['#', 'K#']), L(['K␣']), L(['@', 'K@']), L(['!', 'K!']),
	L(['MS', 'Memory Store']), L(['MR', 'Memory Recall']), L(['MC', 'Memory Clear']), L(['M+', 'Memory Add']), L(['M−', 'Memory Subtract', 'M-']), L(['M×', 'Memory Multiply', 'M*']), L(['M÷', 'Memory Divide', 'M/']), L(['+/−', '+/-']),
	'KClear', L(['CE', 'Clear Entry']), L('Bin'), L('Oct'), L('Dec'), L('Hex'), ['T⇭', 'TECK Num Lock', 'TNum'], ['Fn', 'TECK Fn'],
	['L⎈', 'LCtrl'], ['L⇧', 'LShift'], ['L⎇', 'LAlt', 'Alt', 'LOption', 'LOpt'], ['L⌘', 'LGUI', 'LWin', 'LSuper', 'LCommand', 'LCmd'], ['R⎈', 'RCtrl'], ['R⇧', 'RShift'], ['R⎇', 'RAlt', 'AltGr', 'ROption', 'ROpt'], ['R⌘', 'RGUI', 'RWin', 'RSuper', 'RCommand', 'RCmd'],
	'E8h', 'E9h', 'EAh', 'EBh', 'ECh', 'EDh', 'EEh', 'EFh',
	'F0h', 'F1h', 'F2h', 'F3h', 'F4h', 'F5h', 'F6h', 'F7h',
	'F8h', 'F9h', 'FAh', 'FBh', 'FCh', 'FDh', 'FEh', 'FFh'
];

var consumer_usages = {
	0x0C0030: ['Ⓘ', 'PM Power'],
	0x0C0031: W('PM Reset'),
	0x0C0032: ['☾', 'PM Sleep'],
	0x0C00B0: ['▶', 'MC Play'],
	0x0C00B1: ['||', 'MC Pause'],
	0x0C00B2: ['●', 'MC Record'],
	0x0C00B3: ['▶▶', 'MC Fast Forward'],
	0x0C00B4: ['◀◀', 'MC Rewind'],
	0x0C00B5: ['▶▶|', 'MC Scan Next Track'],
	0x0C00B6: ['|◀◀', 'MC Scan Previous Track'],
	0x0C00B7: ['■', 'MC Stop'],
	0x0C00B8: ['⏏', 'MC Eject'],
	0x0C00B9: W('MC Random Play'),
	0x0C00BB: L('MC Enter Disc'),
	0x0C00BC: W(['↻', 'MC Repeat']),
	0x0C00CC: L(['■/⏏', 'MC Stop/Eject']),
	0x0C00CD: ['▶/||', 'MC Play/Pause'],
	0x0C00E2: 'MC Mute',
	0x0C00E9: ['Vol−', 'MC Volume Increment'],
	0x0C00EA: ['Vol+', 'MC Volume Decrement'],
	0x0C0181: L('AL Launch Button Configuration Tool'),
	0x0C0182: 'AL Programmable Button Configuration',
	0x0C0183: 'AL Consumer Control Configuration',
	0x0C0184: W('AL Word Processor'),
	0x0C0185: W('AL Text Editor'),
	0x0C0186: W('AL Spreadsheet'),
	0x0C0187: W('AL Graphics Editor'),
	0x0C0188: W('AL Presentation App'),
	0x0C0189: W('AL Database App'),
	0x0C018A: 'AL Email Reader',
	0x0C018B: W('AL Newsreader'),
	0x0C018C: W('AL Voicemail'),
	0x0C018D: W('AL Contacts/Address Book'),
	0x0C018E: W('AL Calendar/Schedule'),
	0x0C018F: L('AL Task/Project Manager'),
	0x0C0190: L('AL Log/Journal/Timecard'),
	0x0C0191: 'AL Checkbook/Finance',
	0x0C0192: 'AL Calculator',
	0x0C0193: W('AL A/V Capture/Playback'),
	0x0C0194: 'AL Local Machine Browser',
	0x0C0195: L('AL LAN/WAN Browser'),
	0x0C0196: 'AL Internet Browser',
	0x0C0197: L('AL Remote Networking/ISP Connect'),
	0x0C0198: L('AL Network Conference'),
	0x0C0199: 'AL Network Chat',
	0x0C019A: L('AL Telephony/Dialer'),
	0x0C019B: L('AL Logon'),
	0x0C019C: W('AL Logoff'),
	0x0C019D: L('AL Logon/Logoff'),
	0x0C019E: 'AL Terminal Lock/Screensaver',
	0x0C019F: L('AL Control Panel'),
	0x0C01A0: L('AL Command Line Processor/Run'),
	0x0C01A1: L('AL Process/Task Manager'),
	0x0C01A2: L('AL Select Task/Application'),
	0x0C01A3: L('AL Next Task/Application'),
	0x0C01A4: L('AL Previous Task/Application'),
	0x0C01A5: L('AL Preemptive Halt Task/Application'),
	0x0C01A6: 'AL Integrated Help Center',
	0x0C01A7: 'AL Documents',
	0x0C01A8: L('AL Thesaurus'),
	0x0C01A9: L('AL Dictionary'),
	0x0C01AA: L('AL Desktop'),
	0x0C01AB: W('AL Spell Check'),
	0x0C01AC: L('AL Grammar Check'),
	0x0C01AD: L('AL Wireless Status'),
	0x0C01AE: W('AL Keyboard Layout'),
	0x0C01AF: L('AL Virus Protection'),
	0x0C01B0: L('AL Encryption'),
	0x0C01B1: L('AL Screen Saver'),
	0x0C01B2: L('AL Alarms'),
	0x0C01B3: L('AL Clock'),
	0x0C01B4: L('AL File Browser'),
	0x0C01B5: L('AL Power Status'),
	0x0C01B6: W('AL Image Browser'),
	0x0C01B7: W('AL Audio Browser'),
	0x0C01B8: W('AL Movie Browser'),
	0x0C01B9: L('AL Digital Rights Manager'),
	0x0C01BA: L('AL Digital Wallet'),
	0x0C01BC: W('AL Instant Messaging'),
	0x0C01BD: W('AL OEM Features/Tips/Tutorial Browser'),
	0x0C01BE: L('AL OEM Help'),
	0x0C01BF: L('AL Online Community'),
	0x0C01C0: L('AL Entertainment Content Browser'),
	0x0C01C1: L('AL Online Shopping Browser'),
	0x0C01C2: L('AL SmartCard Information/Help'),
	0x0C01C3: L('AL Market Monitor/Finance Browser'),
	0x0C01C4: L('AL Customized Corporate News Browser'),
	0x0C01C5: L('AL Online Activity Browser'),
	0x0C01C6: L('AL Audio Player'),
	0x0C0201: 'AC New',
	0x0C0202: 'AC Open',
	0x0C0203: 'AC Close',
	0x0C0204: 'AC Exit',
	0x0C0205: L('AC Maximize'),
	0x0C0206: L('AC Minimize'),
	0x0C0207: 'AC Save',
	0x0C0208: 'AC Print',
	0x0C0209: 'AC Properties',
	0x0C021A: 'AC Undo',
	0x0C021B: 'AC Copy',
	0x0C021C: 'AC Cut',
	0x0C021D: 'AC Paste',
	0x0C021E: L('AC Select All'),
	0x0C021F: 'AC Find',
	0x0C0220: L('AC Find and Replace'),
	0x0C0221: 'AC Search',
	0x0C0222: W('AC Go To'),
	0x0C0223: 'AC Home',
	0x0C0224: 'AC Back',
	0x0C0225: 'AC Forward',
	0x0C0226: 'AC Stop',
	0x0C0227: 'AC Refresh',
	0x0C0228: L('AC Previous Link'),
	0x0C0229: L('AC Next Link'),
	0x0C022A: 'AC Bookmarks',
	0x0C022B: L('AC History'),
	0x0C022C: L('AC Subscriptions'),
	0x0C022D: W('AC Zoom In'),
	0x0C022E: W('AC Zoom Out'),
	0x0C022F: W('AC Zoom (LC)'),
	0x0C0230: L('AC Full Screen View'),
	0x0C0231: L('AC Normal View'),
	0x0C0232: L('AC View Toggle'),
	0x0C0233: 'AC Scroll Up',
	0x0C0234: 'AC Scroll Down',
	0x0C0235: L('AC Scroll (LC)'),
	0x0C0236: L('AC Pan Left'),
	0x0C0237: L('AC Pan Right'),
	0x0C0238: 'AC Pan (LC)',
	0x0C0239: L('AC New Window'),
	0x0C023A: L('AC Tile Horizontally'),
	0x0C023B: L('AC Tile Vertically'),
	0x0C023C: L('AC Format'),
	0x0C023D: 'AC Edit',
	0x0C023E: L('AC Bold'),
	0x0C023F: L('AC Italics'),
	0x0C0240: L('AC Underline'),
	0x0C0241: L('AC Strikethrough'),
	0x0C0242: L('AC Subscript'),
	0x0C0243: L('AC Superscript'),
	0x0C0244: L('AC All Caps'),
	0x0C0245: L('AC Rotate'),
	0x0C0246: L('AC Resize'),
	0x0C0247: L('AC Flip Horizontal'),
	0x0C0248: L('AC Flip Vertical'),
	0x0C0249: L('AC Mirror Horizontal'),
	0x0C024A: L('AC Mirror Vertical'),
	0x0C024B: L('AC Font Select'),
	0x0C024C: L('AC Font Color'),
	0x0C024D: L('AC Font Size'),
	0x0C024E: L('AC Justify Left'),
	0x0C024F: L('AC Justify Center H'),
	0x0C0250: L('AC Justify Right'),
	0x0C0251: L('AC Justify Block H'),
	0x0C0252: L('AC Justify Top'),
	0x0C0253: L('AC Justify Center V'),
	0x0C0254: L('AC Justify Bottom'),
	0x0C0255: L('AC Justify Block V'),
	0x0C0256: L('AC Indent Decrease'),
	0x0C0257: L('AC Indent Increase'),
	0x0C0258: L('AC Numbered List'),
	0x0C0259: L('AC Restart Numbering'),
	0x0C025A: L('AC Bulleted List'),
	0x0C025B: L('AC Promote'),
	0x0C025C: L('AC Demote'),
	0x0C025D: L('AC Yes'),
	0x0C025E: L('AC No'),
	0x0C025F: 'AC Cancel',
	0x0C0260: L('AC Catalog'),
	0x0C0261: L('AC Buy/Checkout'),
	0x0C0262: L('AC Add to Cart'),
	0x0C0263: L('AC Expand'),
	0x0C0264: L('AC Expand All'),
	0x0C0265: L('AC Collapse'),
	0x0C0266: L('AC Collapse All'),
	0x0C0267: L('AC Print Preview'),
	0x0C0268: L('AC Paste Special'),
	0x0C0269: 'AC Insert Mode',
	0x0C026A: 'AC Delete',
	0x0C026B: L('AC Lock'),
	0x0C026C: L('AC Unlock'),
	0x0C026D: L('AC Protect'),
	0x0C026E: L('AC Unprotect'),
	0x0C026F: L('AC Attach Comment'),
	0x0C0270: L('AC Delete Comment'),
	0x0C0271: L('AC View Comment'),
	0x0C0272: L('AC Select Word'),
	0x0C0273: L('AC Select Sentence'),
	0x0C0274: L('AC Select Paragraph'),
	0x0C0275: L('AC Select Column'),
	0x0C0276: L('AC Select Row'),
	0x0C0277: L('AC Select Table'),
	0x0C0278: L('AC Select Object'),
	0x0C0279: 'AC Redo/Repeat',
	0x0C027A: L('AC Sort'),
	0x0C027B: L('AC Sort Ascending'),
	0x0C027C: L('AC Sort Descending'),
	0x0C027D: L('AC Filter'),
	0x0C027E: L('AC Set Clock'),
	0x0C027F: L('AC View Clock'),
	0x0C0280: L('AC Select Time Zone'),
	0x0C0281: L('AC Edit Time Zones'),
	0x0C0282: L('AC Set Alarm'),
	0x0C0283: L('AC Clear Alarm'),
	0x0C0284: L('AC Snooze Alarm'),
	0x0C0285: L('AC Reset Alarm'),
	0x0C0286: L('AC Synchronize'),
	0x0C0287: L('AC Send/Receive'),
	0x0C0288: L('AC Send To'),
	0x0C0289: 'AC Reply',
	0x0C028A: L('AC Reply All'),
	0x0C028B: 'AC Forward Msg',
	0x0C028C: 'AC Send',
	0x0C028D: L('AC Attach File'),
	0x0C028E: L('AC Upload'),
	0x0C028F: L('AC Download (Save Target As)'),
	0x0C0290: L('AC Set Borders'),
	0x0C0291: L('AC Insert Row'),
	0x0C0292: L('AC Insert Column'),
	0x0C0293: L('AC Insert File'),
	0x0C0294: L('AC Insert Picture'),
	0x0C0295: L('AC Insert Object'),
	0x0C0296: L('AC Insert Symbol'),
	0x0C0297: L('AC Save and Close'),
	0x0C0298: L('AC Rename'),
	0x0C0299: L('AC Merge'),
	0x0C029A: L('AC Split'),
	0x0C029B: L('AC Distribute Horizontally'),
	0x0C029C: L('AC Distribute Vertically'),
};

function inverse(map)
{
	var unmap = {};
	for (var i in map)
	{
		if (typeof(map[i]) === 'string')
		{
			unmap[map[i]] = i;
		}
		else for (var j = 0; j < map[i].length; ++j)
		{
			unmap[map[i][j]] = i;
		}
	}
	return unmap;
}

var names_to_usages = inverse(usages);
var names_to_consumer_usages = inverse(consumer_usages);

function usage_map(u)
{
	return u < 0x100 ? usages : consumer_usages;
}

function usage_display_name(u)
{
	var name = usage_map(u)[u];
	return typeof(name) === 'string' ? name : name[0];
}

function usage_description(u)
{
	var name = usage_map(u)[u];
	return typeof(name) === 'string' ? name : name[1] || name[0];
}

function usage_warning(u)
{
	var name = usage_map(u)[u];
	return name.warning || '';
}

function parse_name(name)
{
	if (name === _) return 0;
	var m = /^([0-9A-F]+)h$/i.exec(name);
	if (m)
	{
		return parseInt(m[1], 16);
	}
	if (name in names_to_usages)
	{
		return parseInt(names_to_usages[name], 10);
	}
	if (name in names_to_consumer_usages)
	{
		return parseInt(names_to_consumer_usages[name], 10);
	}
	return 0;
}

function dragstart(event)
{
	event.dataTransfer.setData('text/x-keycode', event.target.dataset.u);
}

function count_media_keys()
{
	var codes = {};
	var count = 0;
	for (var n = 0; n < 6; ++n)
	{
		for (var i = 0; i < 88; ++i)
		{
			var x = layers[n][i]
			if (x > 0x100 && !codes[x])
			{
				codes[x] = 1;
				++count;
			}
		}
	}
	return count;
}

function set_usage(target, u, nosave)
{
	target.dataset.u = u;
	target.value = usage_display_name(u);
	target.title = usage_description(u);
	if (current_layer == 0) target.classList[u == 0xDF ? 'add' : 'remove']('pc-fn');
	if (current_layer == 3) target.classList[u == 0xDF ? 'add' : 'remove']('mac-fn');
	if (!nosave)
	{
		save_layer(current_layer);
		var media_key_count = count_media_keys();
		document.getElementById('too-many-media-keys').classList[media_key_count > 23 ? 'remove' : 'add']('hidden');
		document.getElementById('media-key-count').textContent = media_key_count;
	}
	document.getElementById('download-link').className = 'hidden';
	document.getElementById('share-help').className = 'hidden';
}

function dragenter(event)
{
	var types = event.dataTransfer.types;
	if (types.contains && types.contains('text/x-keycode')
		|| types.indexOf && 0 <= types.indexOf('text/x-keycode'))
	{
		event.preventDefault();
	}
}

function dragover(event)
{
	var types = event.dataTransfer.types;
	if (types.contains && types.contains('text/x-keycode')
		|| types.indexOf && 0 <= types.indexOf('text/x-keycode'))
	{
		event.preventDefault();
	}
}

function drop(event)
{
	var u = event.dataTransfer.getData('text/x-keycode');
	set_usage(event.target, u);
	event.preventDefault();
}

function change(event)
{
	var u = parse_name(event.target.value);
	set_usage(event.target, u);
}

function layout(event)
{
	document.getElementById('sources').className = event.target.value;
}

function show_hide_warnings(event)
{
	document.getElementById('warning-wrapper').className = event.target.checked ? 'warn' : '';
}

var key_names = [
	'esc',	'f1', 'f2', 'f3', 'f4',	 'f5', 'f6', 'f7', 'f8',  'f9', 'f10', 'f11', 'f12',  'del',
									  'caps', 'fn', 'num',
	'euro2', 'grave', '1', '2', '3', '4', '5', 'gui', '6', '7', '8', '9', '0', 'minus', 'equal',
	'bksl', 'slash', 'q', 'w', 'e', 'r', 't', 'hen', 'y', 'u', 'i', 'o', 'p', 'bra', 'ket',
	'lsh', 'a', 's', 'd', 'f', 'g', 'tab', 'h', 'j', 'k', 'l', 'semi', 'rsh',
	'lctrl', 'z', 'x', 'c', 'v', 'b', 'bksp', 'n', 'm', 'comma', 'dot', 'quote', 'rctrl',
	'lblank', 'lalt', 'home', 'pgup', 'pgdn', 'end', 'apps', 'enter', 'space', 'left', 'up', 'down', 'right', 'ralt', 'rblank'];

var key_indices = inverse(key_names);

function default_main(lctrl, lblank, lalt, rctrl, ralt, rblank)
{ return [
	'Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Del',
								 'Caps', 'Fn', 'TNum',
	'€\\|', '`', '1', '2', '3', '4', '5', 'LGUI',	'6', '7', '8', '9', '0',  '-_', '=+',
	'\\|', '/?', 'Q', 'W', 'E', 'R', 'T', 'Henkan', 'Y', 'U', 'I', 'O', 'P',  '[{', ']}',
	'LShift',	'A', 'S', 'D', 'F', 'G', 'Tab',	   'H', 'J', 'K', 'L', ';',	 'RShift',
	lctrl,	  'Z', 'X', 'C', 'V', 'B', 'Bksp',	 'N', 'M', ',', '.', '\'', rctrl,
	lblank, lalt,  'Home', 'PgUp', 'PgDn', 'End',  'Apps', 'Enter', 'Space',  'Left', 'Up', 'Down', 'Right',  ralt, rblank];
}

var default_num = [
	_,	 _, _, _, _,   _, _, _, _,	 _, _, _, _,   _,
						_, _, _,
	_, _,  _, _, _, _, _,  _,  _, 'K=', 'K/', 'K*', 'K-',  _, _,
	_, _,  _, _, _, _, _,  _,  _, 'K7', 'K8', 'K9', 'K+',  _, _,
	_,	   _, _, _, _, _,  _,  _, 'K4', 'K5', 'K6', 'K0',  _,
	_,	   _, _, _, _, _,  _,  _, 'K1', 'K2', 'K3', 'K.',  _,
	_, _,  _, _, _, _, _,  'KEnter',  _, _, _, _, _,  _, _];
var default_fn = [
	'Hira',
	'AC Home', 'AL Email Reader', 'AC Search', 'AL Local Machine Browser',
	'AL Calculator', 'AL Consumer Control Configuration', 'MC Scan Previous Track', 'MC Play/Pause',
	'MC Scan Next Track', 'MC Mute', 'MC Volume Decrement', 'MC Volume Increment',
	'MC Eject',
						  'Ins', _, 'PrtScr',
	_, _,  _, _, _, _, 'ADh', 'Scroll', 'AEh', _, _, _, _,	_, _,
	_, _,  _, _, _, _, _,	 'Muhenkan',	_, _, _, _, _,	_, _,
	_,	   _, _, _, _, _,		 _,			_, _, _, _, _,	_,
	_,	   _, _, _, _, _,		 _,			_, _, _, _, _,	_,
	_, _,  _, _, _, _, _,		 _,			_, _, _, _, _,	_, _];

var default_layout = [
	default_main('LCtrl', 'Kana', 'LAlt', 'RCtrl', 'RAlt', 'Ro'),
	default_num, default_fn,
	default_main('LGUI', 'LCtrl', 'LAlt', 'RGUI', 'RAlt', 'RCtrl'),
	default_num, default_fn
];

var layers = load_shared(window.location.hash) || default_layout.map(function(layer) { return layer.map(parse_name); });
find_fns(0, 'pc');
find_fns(3, 'mac');

function key_by_index(k)
{
	return document.getElementById('t-' + key_names[k]);
}

function find_fns(n, name)
{
	for (var k = 0; k < 88; ++k)
	{
		key_by_index(k).classList[layers[n][k] == 0xDF ? 'add' : 'remove'](name + '-fn');
	}
}

function load_layer(n)
{
	for (var i = 0; i < key_names.length; ++i)
	{
		set_usage(key_by_index(i), layers[n][i] || 0, 1);
	}
}

function save_layer(n)
{
	for (var i = 0; i < key_names.length; ++i)
	{
		layers[n][i] = +(key_by_index(i).dataset.u || 0);
	}
}

var current_layer = 0;
load_layer(current_layer);

function set_layer(event)
{
	save_layer(current_layer);
	current_layer = event.target.value;
	load_layer(current_layer);
	document.getElementById('teck').className = 'layer-' + current_layer;
}

function hibyte(word)
{
	return word >> 8 & 0xFF;
}

function lobyte(word)
{
	return word & 0xFF;
}

function hidigit(b)
{
	return b >> 4 & 0xF;
}

function lodigit(b)
{
	return b & 0xF;
}

function hexdigit(n)
{
	return '0123456789ABCDEF'[n];
}

function hexbyte(b)
{
	return hexdigit(hidigit(b)) + hexdigit(lodigit(b));
}

function format_line(data)
{
	var checksum = 0;
	var s = ':';
	for (var i = 0; i < data.length; ++i)
	{
		checksum = checksum + data[i];
		s += hexbyte(data[i]);
	}
	checksum = (256 - checksum & 0xFF) & 0xFF;
	s += hexbyte(checksum);
	return s + '\r\n';
}

function format_bytes(bytes, base)
{
	var s = '';
	var n = bytes.length;
	for (var i = 0; i + 16 <= n; i += 16)
	{
		s += format_line([16, hibyte(base + i), lobyte(base + i), 0].concat(bytes.slice(i, i + 16)));
	}
	var r = n % 16;
	if (r == 0) return s;
	return s + format_line([r, hibyte(base + n - r),
							lobyte(base + n - r), 0]
						   .concat(bytes.slice(n - r, n)));
}

var matrix = [
	[ _,		_,	   'hen',	 _,		 _,		 'euro2', 'grave',	_,
	  _,		_,		_,		 _,		 _,		  _,	   _,		_],
	['a',	   '2',	   'tab',	'gui',	'1',	 'q',	  'z',		_,
	 'rblank',	_,	   'caps',	'space', _,		 'lctrl', 'rctrl',	_],
	[ _,	   'right', _,		'apps', 'up',	  _,	   _,		_,
	 'lalt',	_,		_,		'num',	 _,		  _,	   _,	   'ralt'],
	[ _,		_,		_,		 _,		 _,		 'lsh',	  'rsh',	_,
	  _,		_,		_,		 _,		'fn',	 'lblank', _,		_],
	[ _,		_,		_,		 _,		 _,		  _,	   _,		_,
	 'w',	   'f1',   'pgdn',	'f2',	'pgup',	 'esc',	  'x',	   's'],
	[ _,	   'f3',   'del',	'f4',	 _,		  _,	   _,		_,
	 'd',	   '3',	   'e',		'8',	'i',	 'k',	  'comma', 'c'],
	['g',	   '4',	   't',		'5',	'r',	 'f',	  'b',	   'v',
	 'j',	   '6',	   'u',		'7',	'y',	 'h',	  'm',	   'n'],
	['bksl',   'f5',   'enter', 'f6',	'equal', 'ket',	  'bksp',  'left',
	 'bra',	   'f7',   'minus', 'f8',	'9',	 'o',	  'dot',   'l'],
	['quote',  'f9',   'down',	'f10',	'0',	 'semi',  'p',	   'slash',
	  _,	   'f11',  'end',	'f12',	'home',	  _,	   _,		_]
];

function generate_layer(n, base, media_keys)
{
	var bytes = [];
	for (var i = 0; i < 9; ++i)
	{
		for (var j = 0; j < 16; ++j)
		{
			if (matrix[i][j] === _)
			{
				bytes.push(0);
				continue;
			}
			var code = layers[n][key_indices[matrix[i][j]]];
			bytes.push(code < 0x100 ? code
					   : media_keys[code] || 0);
		}
	}
	return format_bytes(bytes, base);
}

function generate_share(event)
{
	event.preventDefault();

	save_layer(current_layer);

	var s = '';
	for (var n = 0; n < 6; ++n)
	{
		for (var i = 0; i < 88; ++i)
		{
			var code = layers[n][i];
			if (code < 0x100 && code != 1)
			{
				s += String.fromCharCode(code);
			}
			else
			{
				s += (String.fromCharCode(1)
					  + String.fromCharCode(code >> 24)
					  + String.fromCharCode(code >> 16 & 0xFF)
					  + String.fromCharCode(code >> 8 & 0xFF)
					  + String.fromCharCode(code & 0xFF));
			}
		}
	}
	var hash = window.btoa(s);

	document.getElementById('share-link').href = '#' + hash;
	document.getElementById('share-help').className = '';
}

function load_shared(s)
{
	var decoded = window.atob(s.charAt(0) == '#' ? s.substring(1) : s);
	if (decoded === '') return _;
	var result = [[], [], [], [], [], []];
	for (var i = 0, n = 0, k = 0; i < decoded.length && n < 6;)
	{
		if (decoded.charCodeAt(i) != 1)
		{
			result[n][k] = decoded.charCodeAt(i);
			++i;
		}
		else
		{
			result[n][k] = (decoded.charCodeAt(i + 1) << 24 |
							decoded.charCodeAt(i + 2) << 16 |
							decoded.charCodeAt(i + 3) << 8 |
							decoded.charCodeAt(i + 4));
			i += 5;
		}
		++k;
		if (k == 88)
		{
			++n;
			k = 0;
		}
	}
	return result;
}

var firmware_code = '\
:10135B0012011101000000406A0E0C033001010262\r\n\
:10136B0000010403090426035400720075006C008D\r\n\
:10137B0079004500720067006F006E006F006D0012\r\n\
:10138B00690063002E0063006F006D00440354007E\r\n\
:10139B00720075006C007900200045007200670038\r\n\
:1013AB006F006E006F006D0069006300200043004A\r\n\
:1013BB006F006D00700075007400650072002000F6\r\n\
:1013CB004B006500790062006F00610072006400E1\r\n\
:0E13DB000E03360032003100300033003100C6\r\n\
:101AF00012006E12157B12007E1219CD121477801F\r\n\
:011B0000F2F2\r\n\
:101ADC00C28C7800EFF2758A18758CFCD28C780069\r\n\
:041AEC00E270FB2287\r\n\
:030065008FE72200\r\n\
:03007B00021A570F\r\n\
:101A5700C0E0C0F0C083C082C0D075D0187801E262\r\n\
:101A6700F5E1120960D0D0D082D083D0F0D0E03237\r\n\
:03006B0002164C2E\r\n\
:10164C00C0E0C083C082C0D075D0107801E2F5E153\r\n\
:10165C0075D5FF75D60075D700E5BF30E1FB781462\r\n\
:10166C00E2600790FFC9E04420F07F04121ADC907E\r\n\
:10167C00FFCCE04402F0E030E1F57814E260079032\r\n\
:0F168C00FFC9E04420F0D0D0D082D083D0E0322C\r\n\
:03000B00021A14C2\r\n\
:101A1400C0E0C0D075D0087801E2F5E1C28C18E2CC\r\n\
:101A2400600BE214F2758A18758CFCD28CD0D0D07D\r\n\
:021A3400E0329E\r\n\
:1015E400E4F5A875ADA075AE20F5D075B81275896F\r\n\
:1015F40021C28CD2A97801E5E1F2E24437F275C741\r\n\
:101604005843BF04E5BF30E1FBD2AF43BF087F01BD\r\n\
:10161400121ADC90FFCCE04401F0E030E0F57F04E6\r\n\
:10162400121ADC90FFCCE04402F0E030E1F543BF55\r\n\
:10163400207591FF7592FF7595FF7596FF75B1182A\r\n\
:0816440075B2187FFF021ADCE9\r\n\
:0C006E001215E4121AC612177E021805C3\r\n\
:10187C00FEFFFFFDFFFFFBFFFFF7FFFFEFFFFFDFAB\r\n\
:10188C00FFFFBFFFFF7FFFFFFFFEFFFFFDFFFFFB23\r\n\
:10189C00FFFFF7FFFFEFFFFFDFFFFFBFFFFF7FFF44\r\n\
:0918AC00FFFFF7FFFFEF0000E76A\r\n\
:10177E00E4F5207803F27807F27805F218F278385B\r\n\
:10178E00F67823F6783EF618F6FE7F12FDFB7A0009\r\n\
:10179E00792612105CE4784AF6FE7F08FDFB7A008B\r\n\
:1017AE00794B12105C7821765AE408F67845F67873\r\n\
:0517BE0047F618F622B9\r\n\
:091B3D00D2B5D2B6D2B7D2E8222B\r\n\
:101AB000A201B392B6A202B392B77821E6B45A0358\r\n\
:061AC000D2E822C2E82278\r\n\
:101A94007FFA121AA57FFA121AA57FFA121AA57FE5\r\n\
:011AA400FA47\r\n\
:0B1AA500EFD394004004001F80F622E5\r\n\
:10169B00EF75F003A4247CF582E43418F583E4930E\r\n\
:1016AB00F590EF75F003A4247DF582E43418F583EF\r\n\
:1016BB00E493F5A0EF75F003A4247EF582E43418CF\r\n\
:1016CB00F583E49352B07F0A121AA57825A680E61B\r\n\
:0E16DB00F4F67590FF75A0FF43B018E6FF22ED\r\n\
:10184100E47853F67856F67853E6FFC394085029A6\r\n\
:1018510074807E00C8EFC8088006CEA2E713CE13BD\r\n\
:10186100D8F8FF7824E6FDEF5D6009785606E6B406\r\n\
:0B1871000202D32278530680CEC3226F\r\n\
:1018EC007823E604FF7853F6BF1202E4F67853E649\r\n\
:1018FC00FF782366601A12169B7856EFF67824E66A\r\n\
:10190C006F7002D322785306E6B412E1E4F680DD60\r\n\
:02191C00C322E4\r\n\
:101B120012184150081218EC50037F00227F002255\r\n\
:070A6F0078467601E408F669\r\n\
:100A76007847E6C394E84008784876010804F622E9\r\n\
:080A86007848760108E4F6222D\r\n\
:100B1E007921B75A2A7903E36011EF30E905900184\r\n\
:100B2E008F80039000FF936002FF2220B511EF30FB\r\n\
:100B3E00E905900A8E80039008AE936002FF22EFC3\r\n\
:0E0B4E0030E9059007BB800390072B93FF2230\r\n\
:100C6100E47853F6785676017825E6792467F678A4\r\n\
:100C710053E6C394084003020D437925E77856569D\r\n\
:100C81007003020D377823E633333354F878532653\r\n\
:100C9100783BF6FF120B1E08EFF6B4DF0DE5245585\r\n\
:100CA10056780360027480F28068B4DE19E5245539\r\n\
:070CB100566002B2B5807F1E\r\n\
:0A0CC700783CE6FEC394E84045EED9\r\n\
:100CD100D394FE503F7847E67035187601783CE6AC\r\n\
:050CE1007847F68020B9\r\n\
:0B0D0600120A76780774CCF2802712E6\r\n\
:060D11000A6F8022801C25\r\n\
:0E0D3300783E76017853067856E625E0F60203\r\n\
:030D41000C702211\r\n\
:1013E900783CE6FF54F864E070127E01EF24206037\r\n\
:1013F90005CE23DEFDCE784BE64EF622EFC394E808\r\n\
:0C140900506BEF94DE606604606380446A\r\n\
:10145900784AE6FFB40605783D760122783CE6FE37\r\n\
:0E146900744D2FF8EEF6784A06E4783CF62231\r\n\
:101B01007805E2700B783EE6B40105780574EAF2D7\r\n\
:011B110022B1\r\n\
:10084B00E47853F6785676017853E6C39408400360\r\n\
:10085B000208987924E7785656700302088D78239E\r\n\
:10086B00E633333354F8785326783BF6FF120B1EDE\r\n\
:10087B0008EFF6C394594007940B5003121B011257\r\n\
:0E088B0013E97853067856E625E0F680BB2286\r\n\
:10157B007823E6B41202E4F67823E6FF12169B7882\r\n\
:10158B0024EFF618E62426F8E66F60167F64121A2D\r\n\
:10159B00A57823E6FF12169B7856EFF67824E66FB4\r\n\
:1015AB0070D6E4783DF67824E66007121B12783D7E\r\n\
:1015BB00EFF6783DE6701B7823E62426F8E67825CF\r\n\
:1015CB00F6120C617824E6FF18E62426F8EFF612E3\r\n\
:0915DB00084B121A9E7823062227\r\n\
:10191E00784BE6FFB40205784EE66005E47822F6D1\r\n\
:10192E0022EFB40217784DE6B44511782206E6B4DC\r\n\
:0D193E00020A18E6F4F6E408F6121AB022C8\r\n\
:080B6900E6244DF8E6783CF6A5\r\n\
:100B7100E47859F608F6783CE67003020C5F13132B\r\n\
:100B810013541F902800937856F6783CE654077961\r\n\
:100B910053F77853E6FF7856E6FEC8EFC80880029F\r\n\
:100BA100C313D8FC30E003020C5F902820E4937853\r\n\
:100BB10056F6087628087621E47854F67954E7C386\r\n\
:100BC1007856964003020C5F08E6FE08E6F5828E31\r\n\
:100BD10083E493783C667076784BE65407FF783F60\r\n\
:100BE100F6784BE6C454074F783FF6E47853F6782D\r\n\
:100BF10057E6FE08E6F5828E83E493783C6670380A\r\n\
:100C01000493783F6670337857E6FE08E6F5828EE6\r\n\
:100C11008374029308F67857E6FE08E6F5828E8320\r\n\
:100C2100740393785AF67857E6FE08E6F5828E83C8\r\n\
:100C31007404937840F6D322C3227858740526F6BB\r\n\
:100C410018E436F6785306E6640870A3C322785890\r\n\
:100C5100740526F618E436F6785406020BBDC32255\r\n\
:10043D007859E6FF08E678570205BB7859E6FE08BD\r\n\
:10044D00E6F5828E83E4937855F6785A06E61870B1\r\n\
:10045D000106E47856F67854F67954E7C378559644\r\n\
:10046D00400302057AC2AF90FFF17401F0E47853B6\r\n\
:10047D00F67853E6FFC394085017EF785A26FFE439\r\n\
:10048D0018368F82F583E49390FFF3F0785306804E\r\n\
:10049D00E07853E6785A26FFE418368F82F583E428\r\n\
:1004AD00937842F6785306E6785A26FFE418368F8D\r\n\
:1004BD0082F583E4937841F6E654F07944F7E654F7\r\n\
:1004CD000FF6783876017853E690FFF6F090FFF14D\r\n\
:1004DD00E4F0D2AF7838E6640160F9785A740A26F0\r\n\
:1004ED00F618E436F6784376157843E670FB7844D3\r\n\
:1004FD00E620E731C2AF90FFF17401F0E47853F6D6\r\n\
:10050D0090FFF3E4F0785306E6B408F478387601FA\r\n\
:10051D007853E690FFF6F090FFF1E4F0D2AF783823\r\n\
:10052D00E6640160F97842E61846603B784376321E\r\n\
:10053D007843E670FB7842E616187001167842E6AD\r\n\
:10054D0018466023784376327843E660107856E695\r\n\
:10055D0070F67F1212169B7856EFF680EB7842E616\r\n\
:10056D00161870D91680D67854060204667840E6BF\r\n\
:10057D007002D3227856E66002D322784376327821\r\n\
:10058D0043E6600D7F1212169B7856EFF660F0D39E\r\n\
:10059D0022784376327843E6600D7F1212169B78EF\r\n\
:1005AD0056EFF660F0D3227857E6FF08E608CFF64F\r\n\
:0605BD0008EFF6020448FD\r\n\
:10007E007815E2700302043C7823E66412600302F2\r\n\
:10008E0003E0783DE66052E4784BF608F608760118\r\n\
:10009E00087601087601087601087601087601C215\r\n\
:1000AE00AF90FFF104F0E408F67853E6244BF8E63F\r\n\
:1000BE0090FFF3F0785306E6B408EE7838760178C0\r\n\
:1000CE0053E690FFF6F090FFF1E4F0D2AF7838E609\r\n\
:1000DE00640160030203E080F4783EE670030203DD\r\n\
:1000EE00E012191E7821E6645A600302030C020224\r\n\
:0100FE007B86\r\n\
:03027B00784DE6D5\r\n\
:10027E00B4AD0474808005B4AE0A7410784B46F6A3\r\n\
:10028E00784D76481215027805E2B48807E418F224\r\n\
:10029E000874CCF2C2AF90FFF17401F0E47853F61B\r\n\
:1002AE007853E6244BF8E690FFF3F0785306E6B465\r\n\
:1002BE0008EE783876017853E690FFF6F090FFF16D\r\n\
:1002CE00E4F0D2AF7838E6640160F9784BE660036B\r\n\
:1002DE000203E0784DE660030203E008E6600302E5\r\n\
:1002EE0003E07804E260030203E008E264CC6003FA\r\n\
:1002FE000203E01874FFF2087488F20203E07844F7\r\n\
:10030E00E6B48010784BE6700B784DE670067844B4\r\n\
:10031E00F60203E0E4784AF6784AE6C39406400310\r\n\
:10032E000203E0120B69500C12043D784A06784421\r\n\
:10033E007680805DE47844F6C2AF90FFF104F078E9\r\n\
:10034E004BE690FFF3F008E6F0E47855F6784AE6CF\r\n\
:10035E00C394065014120B69400F783CE690FFF3DD\r\n\
:10036E00F0784A0678550680E47855E6C394065030\r\n\
:10037E000890FFF3E4F00680F07838760190FFF6EF\r\n\
:10038E007408F090FFF1E4F0D2AF7838E6640160C3\r\n\
:10039E00F9784AE6C394064003020326E6244DF894\r\n\
:0603AE00E6602F020326A9\r\n\
:0E03E0007846E6603BC2AF90FFF17402F0E495\r\n\
:1003EE007853F67853E62448F8E690FFF3F0785306\r\n\
:1003FE0006E6B402EE784576017853E690FFF6F005\r\n\
:10040E0090FFF1E4F0D2AF7845E6640160F9E4784C\r\n\
:10041E0046F67823E6B41216E4784AF6FE7F08FD17\r\n\
:0F042E00FB7A00794B12105CE4783EF618F62248\r\n\
:101502007805E264EA707100000020006BC2AF90BF\r\n\
:10151200FFF104F0784BE690FFF3F0E4F07453F03F\r\n\
:10152200E4F0F0F0F0F07838760190FFF67408F00D\r\n\
:1015320090FFF1E4F0D2AF7838E6640160F9121A54\r\n\
:1015420094C2AF90FFF17401F0784BE690FFF3F094\r\n\
:10155200E4F0F0F0F0F0F0F07838760190FFF674F5\r\n\
:1015620008F090FFF1E4F0D2AF7838E6640160F958\r\n\
:09157200121A9E780574CCF222D5\r\n\
:101477007805E264BB6003021501C2AF90FFF10477\r\n\
:10148700F0784BE690FFF3F0E4F0784DE6F008E6ED\r\n\
:10149700F008E6F008E6F008E6F07453F0783876DE\r\n\
:1014A7000190FFF67408F090FFF1E4F0D2AF7838BE\r\n\
:1014B700E6640160F9121A94C2AF90FFF17401F06B\r\n\
:1014C700784BE690FFF3F0E4F0784DE6F008E6F0AD\r\n\
:1014D70008E6F008E6F008E6F0E4F07838760190E0\r\n\
:1014E700FFF67408F090FFF1E4F0D2AF7838E664C5\r\n\
:0B14F7000160F9E47805F2121A9E2251\r\n\
:1019CD007804E2FF700908E2B4880474BBF222EFD8\r\n\
:1019DD00C39400400E7805E2B4880818E214F200B2\r\n\
:0419ED00121A99220F\r\n\
:101AC600E4780AF20812104300000000780F1210A2\r\n\
:061AD600430000000022A5\r\n\
:1019A300780DE2F5E308E2F5E4EFB40205CEEDCEFF\r\n\
:1019B3008EE2EF4480F5E775E64675E6B9E4F5E7B0\r\n\
:0A19C300EFB40103AFE2227F00221F\r\n\
:1019F100E47813F27812E2FF08E2C39F5014E4FD89\r\n\
:101A01007F031219A3780DE22402F27813E204F2A3\r\n\
:031A110080E2224E\r\n\
:1012B600780AE2249A601B2411600302135A7817F5\r\n\
:1012C6007455F20874AAF2E408F2087428F2E402EB\r\n\
:1012D6001357E47813F2E4FD7F011219A37813E2A1\r\n\
:1012E6002417F8EFF2780BE2FC08E2FD08E2FE08AC\r\n\
:1012F600E22401FFE43EFEE43DFDE43CFC780B12F3\r\n\
:1013060010377813E204F2E2C3944040C9780FE242\r\n\
:10131600FC08E2FD08E2FE08E2FFEFC0E008E2FB9F\r\n\
:10132600D0E0FFC3EF9BFFEE9400FEED9400FDECD2\r\n\
:101336009400FC780F121037E4FFFEFDFC780FE2F4\r\n\
:10134600FB08E2F908E2FA08E2CBF8C312102670AD\r\n\
:0513560003780AF222F9\r\n\
:100E20007865EFF2780AE270357817E2FF780AF217\r\n\
:100E30002489600924116003020EF38010780D7478\r\n\
:100E400028F208E4F278127408F21219F1780D749D\r\n\
:100E500028F208E4F278117410F208E4F2227865BE\r\n\
:100E6000E224FEF2E2FFE4FCFDFE780FE2FB08E282\r\n\
:100E7000F908E2FA08E2CBF8D3121026500A7812E9\r\n\
:100E8000E27865F2E4780AF2780FE2FC08E2FD0805\r\n\
:100E9000E2FE08E2FFEFC0E07865E2FBD0E0FFC3CE\r\n\
:100EA000EF9BFFEE9400FEED9400FDEC9400FC78C7\r\n\
:100EB0000F121037E47813F27865E2FF7813E2FE40\r\n\
:100EC000C39F502F74192EF8E2FD7F021219A378E8\r\n\
:100ED0000BE2FC08E2FD08E2FE08E22401FFE43E2A\r\n\
:100EE000FEE43DFDE43CFC780B1210377813E2047D\r\n\
:040EF000F280C522A5\r\n\
:100D440005010906A101050719E029E71500250198\r\n\
:100D54007501950881029501750881019503750156\r\n\
:100D6400050819012903910295057501910195065C\r\n\
:100D74007508150026FF00050719002AFF008100E9\r\n\
:100D8400090095407508B100C0050C0901A1018551\r\n\
:090D9400011501251775089501F0\r\n\
:020DE20081602E\r\n\
:100DE400C009023B00020100A03209040000010313\r\n\
:100DF40001010009211101000122490007058103B5\r\n\
:100E040008000A090401000103000000092111017E\r\n\
:0C0E140000012258000705820308000AB4\r\n\
:1018050090FFD9E4F090FFF1F090FFE17405F0E06E\r\n\
:1018150044C0F090FFF47480F090FFE4F090FFDA9C\r\n\
:101825007497F090FFD97406F0785B7440F2E47811\r\n\
:0C18350015F218F290FFC9E04480F02288\r\n\
:10194B007865EBF208EAF208E9F2E4FFEFC39D5089\r\n\
:10195B001B90FFE3E0FE7865E2FB08E2FA08E2F990\r\n\
:0D196B008F82758300EE1210040F80E022C1\r\n\
:101978007865EBF208EAF208E9F2E4FFEFC39D505C\r\n\
:10198800197865E2FB08E2FA08E2F98F82758300AC\r\n\
:0B199800120FD790FFF3F00F80E22247\r\n\
:1010880090FFF47480F090FFE2E0543060537816DB\r\n\
:1010980074F0F290FFE2E020E5F990FFE2E030E43E\r\n\
:1010A800F990FFE2E054EFF090FFDB7402F090FF5C\r\n\
:1010B800E6E07864F27BFE7A007917E2FD12194BBC\r\n\
:1010C80090FFE2E0543070CB90FFE1E0543FF0A392\r\n\
:1010D800E054BFF07864E2FF785CE4F208EFF28055\r\n\
:1010E8005C7816E26433704990FFE6E07864F2E2D7\r\n\
:1010F800FFC3785DE29FF218E29400F27BFE7A006B\r\n\
:1011080079177864E2FD12194B7864E2FFB4400560\r\n\
:10111800120E2080087817E2F520121AB0785DE2E6\r\n\
:10112800700218E2701790FFF6F0781674A5F28036\r\n\
:101138000C781674A5F290FFE1E044C0F090FFE44B\r\n\
:05114800E04410F0225C\r\n\
:10000E00785CE4F2087402F2E47818F218E2540311\r\n\
:10001E00146043146014240270357814E26006787C\r\n\
:10002E00177402F222E47817F222781BE2540F9032\r\n\
:10003E00FFF1F090FFE1E020E704E030E6077817EB\r\n\
:10004E007401F28004E47817F290FFF1E4F022904C\r\n\
:07005E00FFE1E044C0F022C5\r\n\
:101735007817E25403146040146011240270327863\r\n\
:1017450019E2B40105E47814F22280257819E270D3\r\n\
:101755001E781BE2540F90FFF1F090FFE1E0543F3B\r\n\
:10176500F0A37408F090FFF2F090FFF1E4F022800E\r\n\
:091775000090FFE1E044C0F02205\r\n\
:1017C3007817E254031460391460122402702B78E2\r\n\
:1017D30019E2B4010678147401F222801D7819E22B\r\n\
:1017E3007016781BE2540F90FFF1F090FFE1E04494\r\n\
:1017F300C0F090FFF1E4F022800090FFE1E044C0EC\r\n\
:02180300F022D1\r\n\
:1005C300E47864F2781EE2785FF2781DE27860F2F4\r\n\
:1005D300781AE224FE602A14604024E270030206C3\r\n\
:1005E300981470030206C9242160030206FA7BFFF4\r\n\
:1005F3007A13795B7857EBF208EAF208E9F202061C\r\n\
:10060300937BFF7A0D79E57857EBF208EAF208E974\r\n\
:10061300F2900002120FD70206C47819E21460198F\r\n\
:1006230014602C14604124037055785774FFF2084A\r\n\
:100633007413F208746DF2804D901369E493603F74\r\n\
:10064300785774FFF2087413F2087471F2803790CC\r\n\
:10065300136AE493600F785774FFF2087413F20877\r\n\
:100663007497F28021801890136BE493600F78578E\r\n\
:1006730074FFF2087413F20874DBF28009800090AF\r\n\
:10068300FFE1E044C0F07857E2FB08E2FA08E2F940\r\n\
:10069300120FBE802C781BE27857600D74FFF208AE\r\n\
:1006A300740EF2087410F2800B74FFF208740DF2EA\r\n\
:1006B3000874F7F27857E2FB08E2FA08E2F9120F3E\r\n\
:1006C300BE7865F28038781BE27857601074FFF2C9\r\n\
:1006D30008740DF208748DF2900E17800E74FFF2F9\r\n\
:1006E30008740DF2087444F2900DFEE4937865F2F9\r\n\
:1006F300A3E49318F2800790FFE1E044C0F078642C\r\n\
:10070300E2FE08E2FF785FE2FC08E2FDD39FEC9E85\r\n\
:10071300400E7864E2FF08E2785CCFF208EFF22241\r\n\
:08072300785CECF208EDF22213\r\n\
:1016E9007819E2785EF2602D7F0190FFF1EFF090BA\r\n\
:1016F900FFE17405F090FFE47480F090FFF4F0903E\r\n\
:10170900FFE27408F090FFF2F00FEFB406DC7815F1\r\n\
:101719007401F280117F0190FFF1EFF090FFE1E495\r\n\
:0C172900F00FEFB406F190FFF1E4F022A5\r\n\
:101A3600781BE21460030470107819E2D394004016\r\n\
:101A460002800690FFF6E4F02290FFE1E044C0F049\r\n\
:011A5600226D\r\n\
:101A7700785CE4F20804F2781BE214600304700552\r\n\
:0D1A8700E47817F22290FFE1E044C0F02265\r\n\
:100EF4007816E2645A7049785BE2FFFD08E2FA086A\r\n\
:100F0400E2FBD39DEA940078644004EFF28002EBA4\r\n\
:100F1400F27857E2FB08E2FA08E2F97864E2FD129B\r\n\
:100F240019787864E2FF90FFF6F07E00C3785DE202\r\n\
:100F34009FF218E29EF27859E22FF218E23EF22272\r\n\
:100F44007816E264227050785BE2FFFD08E2FA084A\r\n\
:100F5400E2FBD39DEA940078644004EFF28002EB54\r\n\
:100F6400F27864E2B440051212B6800A7864E26052\r\n\
:100F7400057817E520F27BFE7A0079177864E2FDA4\r\n\
:100F84001219787864E2FF90FFF6F0C3785DE29F6F\r\n\
:100F9400F218E29400F22290FFE1E044C0F07816E7\r\n\
:100FA400E2B45507785EE290FFD8F0780AE2B444E0\r\n\
:0A0FB4000830EB057F68120065228B\r\n\
:10114D007818E2B40D00400302120090115FF828E8\r\n\
:10115D00287302118602119002120002119A0212D6\r\n\
:10116D00000211A40211B10212000211BB0211CF33\r\n\
:10117D000211E50211DD0211F07816745AF2120017\r\n\
:10118D000E805D781674A5F2121735803D781674B1\r\n\
:10119D00A5F21217C3803378167455F27819E278D8\r\n\
:1011AD005EF280267816745AF21205C380327816D4\r\n\
:1011BD00745AF2785EE27817F2785CE4F20804F281\r\n\
:1011CD00801E781674A5F21216E990FFF6E4F0224F\r\n\
:1011DD00781674A5F2021A367816745AF2121A7726\r\n\
:1011ED00020EF4781674A5F290FFF6E4F0785CF236\r\n\
:0B11FD0008F22290FFE1E044C0F02265\r\n\
:101208007818E214603124FE601A24FA60701460C1\r\n\
:1012180050146059240960030212AE7816745AF209\r\n\
:10122800783980077816745AF2783AE67817F2789F\r\n\
:101238005CE4F20804802678167422F2781EE2FF35\r\n\
:10124800785CE4F208EFF2795DE3F8E4F3E819F387\r\n\
:10125800781DE2FF785DE22FF218E23400F2020E08\r\n\
:10126800F4781674A5F2781AE27839800A78167438\r\n\
:10127800A5F27819E2783AF690FFF6E4F0227816AB\r\n\
:101288007433F2781EE2FF785CE4F208EFF2795DDD\r\n\
:10129800E3F8E4F3E819F3781DE2FF785DE22FF252\r\n\
:0E12A80018E23400F22290FFE1E044C0F02290\r\n\
:1018B500785774FEF2087400F2087417F212108853\r\n\
:1018C5007816E2B4F020E4785CF208F27817E25476\r\n\
:1018D5006024E060072420700602114D0212089072\r\n\
:0718E500FFE1E044C0F02226\r\n\
:061B220090FFF1F07F10BE\r\n\
:091B280090FFF4E0540F4FF0228D\r\n\
:1009600090FFC9E07863F2E2FF540F70030209FBC5\r\n\
:10097000EF30E05EE254F0F24401F0E0F2E2540FB6\r\n\
:100980006003020A6E121B3D7814E2B40110E4F514\r\n\
:1009900090F5A053B0E775D5FFF5D675D7FF43871F\r\n\
:1009A000027F01121ADC7814E2B40119E5D770094C\r\n\
:1009B00090FFC9E04420F08003E4F5D77590FF75FF\r\n\
:1009C000A0FF43B0187815E264016003020A6E02CA\r\n\
:1009D0001AB07863E2FF30E20F54F0F2440490FF63\r\n\
:1009E000C9F012177E0218057863E220E103020ABB\r\n\
:1009F0006E54F0F2440290FFC9F02290FFDBE078E1\r\n\
:100A000063F2E2FD30E2127404F07401121B2278EA\r\n\
:100A100038E664017046F68043ED30E41590FFDB64\r\n\
:100A20007410F07402121B227845E66401702DF6F2\r\n\
:100A3000802A7863E230E11090FFDB7402F090FFCF\r\n\
:100A4000F1E4F01218B580147863E230E00E90FF04\r\n\
:100A5000DB7401F090FFF1E4F0120EF47863E23001\r\n\
:0F0A6000E70C90FFDB7480F07843E6600116220C\r\n\
:03000000021B31AF\r\n\
:0C1B3100787FE4F6D8FD75815A021AF0A6\r\n\
:100FBE00BB010689828A83E0225002E722BBFE0231\r\n\
:090FCE00E32289828A83E4932264\r\n\
:100FD700BB010CE58229F582E5833AF583E02250CF\r\n\
:100FE70006E92582F8E622BBFE06E92582F8E22219\r\n\
:0D0FF700E58229F582E5833AF583E4932233\r\n\
:10100400F8BB010DE58229F582E5833AF583E8F022\r\n\
:10101400225006E92582C8F622BBFE05E92582C8CE\r\n\
:02102400F222B6\r\n\
:10102600EB9FF5F0EA9E42F0E99D42F0E89C45F020\r\n\
:011036002297\r\n\
:0C103700ECF208EDF208EEF208EFF222F5\r\n\
:10104300D083D082E493F208740193F2087402937C\r\n\
:09105300F208740393F2740473B3\r\n\
:10105C00EF4E6012EF60010EEDBB010B89828A83AB\r\n\
:10106C00F0A3DFFCDEFA2289F05007F709DFFCA9B8\r\n\
:0C107C00F022BBFEFCF309DFFCA9F0220F\r\n\
:00000001FF\r\n\
';

function gather_media_keys()
{
	var result = {};
	var free = 0xE8;
	for (var n = 0; n < 6; ++n)
	{
		for (var k = 0; k < 88; ++k)
		{
			var x = layers[n][k];
			if (x >= 0x100 && !result[x] && free < 0xFF)
			{
				result[x] = free;
				++free;
			}
		}
	}
	return result;
}

function generate_media_keys(base, media_keys)
{
	var bytes = [];
	for (var i = 0; i < 23 * 3; i += 3)
	{
		bytes[i] = 0x0A;
		bytes[i + 1] = 0;
		bytes[i + 2] = 0;
	}
	for (i in media_keys)
	{
		var k = 3 * (media_keys[i] - 0xE8);
		bytes[k + 1] = i & 0xFF;
		bytes[k + 2] = i >> 8 & 0xFF;
	}
	return format_bytes(bytes, base);
}

function generate_download(event)
{
	event.preventDefault();
	save_layer(current_layer);
	var media_keys = gather_media_keys();
	var blob = new Blob([generate_layer(0, 0x072B, media_keys),
						 generate_layer(3, 0x07BB, media_keys),
						 generate_layer(1, 0x08AE, media_keys),
						 generate_layer(4, 0x0A8E, media_keys),
						 generate_layer(2, 0x00FF, media_keys),
						 generate_layer(5, 0x018F, media_keys),
						 generate_media_keys(0x0D9D, media_keys),
						 firmware_code],
						{type: 'application/octet-stream'});
	var a = document.getElementById("download-link");
	a.href = window.URL.createObjectURL(blob);
	a.download = 'TrulyErgonomic_v3yk.hex';
	a.textContent = 'Download';
	a.className = '';
	a.click();
};

function max(x, y) { return x < y ? y : x; }
function min(x, y) { return -max(-x, -y); }

function xpath_foreach(xpath, context, action, actionContext)
{
	var nodes = document.evaluate(xpath, context, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i != nodes.snapshotLength; ++i)
	{
		var node = nodes.snapshotItem(i);
		actionContext = action(node, actionContext);
	}
	return actionContext;
}

xpath_foreach('//kbd', document, function (key)
{
	key.draggable = true;
	key.ondragstart = dragstart;
	var u = parseInt(key.dataset.u, 16);
	key.dataset.u = u;
	key.textContent = usage_display_name(u);
	key.title = usage_description(u);
	if (usage_warning(u))
	{
		key.className = key.className + ' incompatible';
	}
});

xpath_foreach('//*[@id="targets"]//input[@data-u]', document, function (i)
{
	i.ondragover = dragover;
	i.ondragenter = dragenter;
	i.ondrop = drop;
	i.onchange = change;
});

function expand_collapse(event)
{
	event.preventDefault();
	event.target/*a*/.parentNode/*header*/.parentNode/*section*/.classList.toggle('collapsed');
}

xpath_foreach('//section', document, function(section)
{
	section.className = 'collapsed';
	xpath_foreach('.//header', section, function(header)
	{
		var a = document.createElement('a');
		a.href = '#';
		a.onclick = expand_collapse;
		a.appendChild(header.firstChild);
		header.appendChild(a);
	});
});

document.getElementById('layout').onchange = layout;
document.getElementById('warn').onclick = show_hide_warnings;

xpath_foreach('//input[@name="layer"]', document, function(rb)
{
	rb.onclick = set_layer;
})

window.URL = window.URL || window.webkitURL;

document.getElementById('download').onclick = generate_download;
document.getElementById('share').onclick = generate_share;

};
