window.onload=function(){

document.getElementById('cft-minus').dual = document.getElementById('cft-minus105');
document.getElementById('cft-minus105').dual = document.getElementById('cft-minus');

var _ = null;

xpath_foreach('//*[@id="cft-keys"]//kbd', document, function (key)
{
	xpath_foreach('./node()|text()', key, function (child) { key.removeChild(child); });
	var button = document.createElement('button');
	key.appendChild(button);
});

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
	'Enter', ['Esc', 'Escape'], ['Backspace', 'Bksp'], 'Tab', 'Space', ['-_', '-'], ['=+', '='], ['[{', '['],
	[']}', ']'], ['\\|', '\\'], ['€#~', 'Europe1'], [';:', ';'], ['\'"', '\''], ['`~', '`'], [',<', ','], ['.>', '.'],
	['/?', '/'], ['Caps Lock', 'Caps'], 'F1', 'F2', 'F3', 'F4', 'F5', 'F6',
	'F7', 'F8', 'F9', 'F10', 'F11', 'F12', ['Print Screen', 'PrtScr', 'PrtSc'], ['Scroll Lock', 'Scroll'],
	'Pause', ['Insert', 'Ins'], 'Home', ['Page Up', 'PgUp'], ['Delete', 'Del'], 'End', ['Page Down', 'PgDn'], ['→', 'Right'],
	['←', 'Left'], ['↓', 'Down'], ['↑', 'Up'], ['Num Lock', 'Num'], ['÷', 'K/'], ['×', 'K*'], ['−', 'K-'], ['+', 'K+'],
	'KEnter', 'K1', 'K2', 'K3', 'K4', 'K5', 'K6', 'K7',
	'K8', 'K9', 'K0', 'K.', ['€\\|', 'Europe2'], ['Apps', 'App'], 'Power', ['=', 'K='],
	'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20',
	'F21', 'F22', 'F23', 'F24', 'Exec', 'Help', 'Menu', 'Select',
	'Stop', 'Again', 'Undo', 'Cut', 'Copy', 'Paste', 'Find', 'Mute',
	'Vol+', 'Vol−', L('Locking Caps'), L('Locking Num'), L('Locking Scroll'), 'K,', L('K= AS/400'), ['\\_', 'Ro', 'Intl1'],
	['カ/ひ', 'Katakana/Hiragana', 'カタカナ/ひらがな', 'Kana', 'かな', 'Intl2'], ['Yen', '¥|', '¥', 'Intl3'], ['変換', 'Henkan', 'Intl4'], ['無変換', 'Muhenkan', 'Intl5'], ['ｶﾝﾏ', 'JPComma', 'Intl6'], L(['DBCS', 'SBCS', 'Intl7']), L('Intl8'), L('Intl9'),
	['한/영', 'Hangul', 'Lang1'], ['한자', 'Hanja', 'Lang2'], ['カタカナ', 'Katakana', 'Kata', 'Lang3'], ['ひらがな', 'Hiragana', 'Hira', 'Lang4'], ['半角/全角', 'Hankaku/​Zenkaku', 'Hankaku', 'Hankaku/Zenkaku', 'Zenkaku', 'Lang5'], L('Lang6'), L('Lang7'), L('Lang8'),
	L('Lang9'), L('Alt Erase'), L('Attn'), L('Cancel'), 'Clear', L('Prior'), L(['Ret', 'Return']), L(['Sep', 'Separator']),
	L('Out'), L('Oper'), L(['ClrAg', 'Clear/Again']), L(['CrSel', 'CrSel/Props', 'Props']), L('ExSel'), L('A5h'), L('A6h'), L('A7h'),
	L('A8h'), L('A9h'), L('AAh'), L('ABh'), L('ACh'), ['Win+\u200bPause', 'Win+Pause', 'Win+Break'], ['Ctrl+\u200bBreak', 'Ctrl+Break', 'Break'], L('AFh'),
	L('00'), L('000'), L([',\'', 'Thousands Separator']), L(['.,', 'Decimal Separator']), L(['$', 'Currency Unit']), L(['¢', 'Currency Sub-unit']), ['(', 'K('], [')', 'K)'],
	L(['{', 'K{']), L(['}', 'K}']), L('KTab'), L(['KBksp', 'KBackspace']), L('KA'), L('KB'), L('KC'), L('KD'),
	L('KE'), L('KF'), L('Xor'), L(['^', 'K^']), L(['%', 'K%']), L(['<', 'K<']), L(['>', 'K>']), L(['&', 'K&']),
	L('&&'), L(['|', 'K|']), L('||'), L([':', 'K:']), L(['#', 'K#']), L(['KSpace']), L(['@', 'K@']), L(['!', 'K!']),
	L(['MS', 'Memory Store']), L(['MR', 'Memory Recall']), L(['MC', 'Memory Clear']), L(['M+', 'Memory Add']), L(['M−', 'Memory Subtract', 'M-']), L(['M×', 'Memory Multiply', 'M*']), L(['M÷', 'Memory Divide', 'M/']), L(['+/−', '+/-']),
	'KClear', L(['CE', 'Clear Entry']), L('Bin'), L('Oct'), L('Dec'), L('Hex'), ['TNum Lock', 'TECK Num Lock', 'TNum'], ['Fn', 'TECK Fn'],
	'LCtrl', 'LShift', ['LAlt', 'Alt', 'LOption', 'LOpt'], ['LGUI', 'LWin', 'LSuper', 'LCommand', 'LCmd'], 'RCtrl', 'RShift', ['RAlt', 'AltGr', 'ROption', 'ROpt'], ['RGUI', 'RWin', 'RSuper', 'RCommand', 'RCmd'],
	'E8h', 'E9h', 'EAh', 'EBh', 'ECh', 'EDh', 'EEh', 'EFh',
	'F0h', 'F1h', 'F2h', 'F3h', 'F4h', 'F5h', 'F6h', 'F7h',
	'F8h', 'F9h', 'FAh', 'FBh', 'FCh', 'FDh', 'FEh', 'FFh'
];

var consumer_usages = {
	0x0C0030: 'PM Power',
	0x0C0031: W('PM Reset'),
	0x0C0032: 'PM Sleep',
	0x0C00B0: 'MC Play',
	0x0C00B1: 'MC Pause',
	0x0C00B2: 'MC Record',
	0x0C00B3: 'MC Fast Forward',
	0x0C00B4: 'MC Rewind',
	0x0C00B5: 'MC Scan Next Track',
	0x0C00B6: 'MC Scan Previous Track',
	0x0C00B7: 'MC Stop',
	0x0C00B8: 'MC Eject',
	0x0C00B9: W('MC Random Play'),
	0x0C00BB: L('MC Enter Disc'),
	0x0C00BC: W('MC Repeat'),
	0x0C00CC: L('MC Stop/Eject'),
	0x0C00CD: 'MC Play/Pause',
	0x0C00E2: 'MC Mute',
	0x0C00E9: ['MC Vol−', 'MC Volume Increment'],
	0x0C00EA: ['MC Vol+', 'MC Volume Decrement'],
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
	var key = document.evaluate('./ancestor-or-self::kbd', event.target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	event.dataTransfer.setData('text/x-keycode', key.dataset.u);
	event.dataTransfer.setData('text/plain', key.dataset.u);
	event.dataTransfer.effectAllowed = 'copy';
	event.stopPropagation();
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
	target.firstChild.textContent = usage_display_name(u);
	target.title = usage_description(u);
	if (target.dual)
	{
		target.dual.dataset.u = u;
		target.dual.firstChild.textContent = usage_display_name(u);
		target.dual.title = usage_description(u);
	}
	if (current_layer == 0) target.classList[u == 0xDF ? 'add' : 'remove']('cf-primary-fn');
	if (current_layer == 3) target.classList[u == 0xDF ? 'add' : 'remove']('cf-secondary-fn');
	if (!nosave)
	{
		save_layer(current_layer);
		var media_key_count = count_media_keys();
		document.getElementById('cf-too-many-media-keys').classList[media_key_count > 23 ? 'remove' : 'add']('cf-hidden');
		document.getElementById('cf-media-key-count').textContent = media_key_count;
	}
	document.getElementById('cf-download-link').className = 'cf-hidden';
	document.getElementById('cf-share-help').className = 'cf-hidden';
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
	var target = document.evaluate('ancestor-or-self::kbd', event.target, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	set_usage(target, u);
	event.preventDefault();
}

function target_click(event)
{
	var key = event.target.parentNode;
	var input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.value = event.target.textContent;
	input.onchange = change;
	input.onblur = change;
	input.owner = event.target;
	input.id = event.target.id;

	key.replaceChild(input, event.target);
	input.focus();
	input.select();
}

function change(event)
{
	var key = event.target/*input*/.parentNode/*kbd*/;
	key.replaceChild(event.target.owner, event.target);
	var u = parse_name(event.target.value);
	set_usage(key, u);
}

function layout_change(event)
{
	document.getElementById('cf-sources').className = 'cf-' + event.target.value;
}

function show_hide_warnings(event)
{
	document.getElementById('cf-warning-wrapper').classList[event.target.checked ? 'add':'remove']('cf-warn');
}

function model_change(event)
{
	document.getElementById('cf-targets').className = event.target.value;
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
find_fns(0, 'primary');
find_fns(3, 'secondary');

function key_by_index(k)
{
	return document.getElementById('cft-' + key_names[k]);
}

function find_fns(n, name)
{
	for (var k = 0; k < 88; ++k)
	{
		key_by_index(k).classList[layers[n][k] == 0xDF ? 'add' : 'remove']('cf-' + name + '-fn');
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
	document.getElementById('cf-teck').className = 'cf-layer-' + current_layer;
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

	document.getElementById('cf-share-link').href = '#' + hash;
	document.getElementById('cf-share-help').className = '';
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

function generate_poll_interval(high, low)
{
	var poll_interval = parseInt(document.getElementById('cf-poll').value, 10);
	return (format_bytes([poll_interval / 250 | 0], high) +
			format_bytes([poll_interval % 250], low));
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
						 generate_poll_interval(0x089B, 0x08A7),
						 firmware_code],
						{type: 'application/octet-stream'});
	var a = document.getElementById("cf-download-link");
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

xpath_foreach('//*[@id="cf-sources"]//kbd', document, function (key)
{
	key.draggable = true;
	key.ondragstart = dragstart;
	var u = parseInt(key.dataset.u, 16);
	key.dataset.u = u;
	key.title = usage_description(u);
	if (usage_warning(u))
	{
		key.className = key.className + ' incompatible';
	}
	xpath_foreach('./node()|text()', key, function (child) { key.removeChild(child); });
	var label = document.createElement('span'); // Really wanted to use <label> but then drag-n-drop is flaky in Firefox
	label.className = 'cf-label';
	label.textContent = usage_display_name(u);
	// label.draggable = true;
	// label.ondragstart = dragstart;
	key.appendChild(label);
});

xpath_foreach('//*[@id="cf-targets"]//button', document, function (i)
{
	i.ondragover = dragover;
	i.ondragenter = dragenter;
	i.ondrop = drop;
	i.onclick = target_click;
});

function expand_collapse(event)
{
	event.preventDefault();
	event.target/*a*/.parentNode/*header*/.parentNode/*section*/.classList.toggle('collapsed');
}

xpath_foreach('//*[@id="cf-sources"]//section', document, function(section)
{
	section.classList.add('collapsible');
});

xpath_foreach('//section[contains(concat(" ", @class, " "), " collapsible ")]', document, function(section)
{
	section.classList.add('collapsed');
	xpath_foreach('.//header', section, function(header)
	{
		var a = document.createElement('a');
		a.href = '#';
		a.onclick = expand_collapse;
		a.appendChild(header.firstChild);
		header.appendChild(a);
	});
});

function body_resize(event)
{
	var sources_size = document.getElementById('cf-sources').offsetWidth;
	var targets_size = document.getElementById('cf-targets').offsetWidth;
	var size = min(window.innerHeight / 18, min(sources_size / 24.0, targets_size / 16.5));
	document.getElementById('cf-teck').style.fontSize = size + 'px';
	document.getElementById('cf-sized').style.fontSize = size + 'px';
}
document.body.onresize = body_resize;
body_resize(null);

document.getElementById('cf-layout').onchange = layout_change;
document.getElementById('cf-warn').onclick = show_hide_warnings;

xpath_foreach('//input[@name="cf-layer"]', document, function(rb)
{
	rb.onclick = set_layer;
})
document.getElementById('cf-model').onchange = model_change;

window.URL = window.URL || window.webkitURL;

document.getElementById('cf-download').onclick = generate_download;
document.getElementById('cf-share').onclick = generate_share;

};
