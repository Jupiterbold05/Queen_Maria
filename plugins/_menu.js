function hi() {
  console.log("Hello World!");
}
hi();
const os = require('os');
const Config = require('../config');
let {
  fancytext,
  tiny,
  runtime,
  formatp,
  prefix
} = require("../lib");
const long = String.fromCharCode(0x200e);
const readmore = long.repeat(0xfa1);
const astro_patch = require("../lib/plugins");
const trend_usage = (() => {
  const _0x54290b = ((_0x9a7b0b, _0x10a9a3) => {
    const _0x9a9fa = Math.random() * (_0x10a9a3 - (_0x9a7b0b + 0x1));
    const _0x1f8b97 = Math.floor(_0x9a9fa) + _0x9a7b0b;
    return _0x1f8b97;
  })(0x1, 0x63);
  return _0x54290b;
})();
const database_info = (() => {
  const _0x30de08 = ((_0x4f7dda, _0x38a504) => {
    const _0x1e00ac = Math.random() * (_0x38a504 - (_0x4f7dda + 0x1));
    const _0x3ce5ab = Math.floor(_0x1e00ac) + _0x4f7dda;
    return _0x3ce5ab;
  })(0x1, 0x1f3);
  return _0x30de08;
})();
astro_patch.smd({
  'cmdname': "menu",
  'desc': "Help list",
  'react': '🍁',
  'desc': "To show all available commands.",
  'type': 'user',
  'filename': __filename
}, async (context, message) => {
  try { 
    const { commands } = require("../lib");
    const os = require('os');
    const { formatp, runtime, fancytext, tiny, readmore } = require('../lib');
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const currentDate = currentTime.toLocaleDateString();
    let greeting = "";

    if (hours >= 5 && hours < 12) {
      greeting = "Good day!";
    } else if (hours >= 12 && hours < 18) {
      greeting = "Good day!";
    } else if (hours >= 18 && hours < 22) {
      greeting = "Good Evening!";
    } else {
      greeting = "Good evening!";
    }

    const commandCategories = {};
    commands.forEach(cmd => {
      if (!cmd.dontAddCommandList && cmd.pattern) {
        if (!commandCategories[cmd.category]) {
          commandCategories[cmd.category] = [];
        }
        commandCategories[cmd.category].push(cmd.pattern);
      }
    });

    // Set the desired menu design
    const header = "┏━━👑 *" + Config.botname + "* 👑━━✿︎\n";
    const lineSeparator = "┃ ";
    const commandPrefix = "┏━━👑";
    const commandSuffix = "👑━━✿︎";
    const footer = "┗━━━━━━━━━━━━━━✿︎";

    let menuContent = header;
    menuContent += lineSeparator + "👑 > *ᴏᴡɴᴇʀ ɴᴀᴍᴇ:* " + Config.ownername + "\n";
    menuContent += lineSeparator + "👑*ᴜᴘᴛɪᴍᴇ:* " + runtime(process.uptime()) + "\n";
    menuContent += lineSeparator + "👑 *ʀᴀᴍ ᴜꜱᴇ:* " + formatp(os.totalmem() - os.freemem()) + "\n";
    menuContent += lineSeparator + "👑 *ᴅᴀᴛᴇ:* " + currentDate + "\n";
    menuContent += lineSeparator + "👑 *ʙᴏᴛ ᴄᴏᴍᴍᴀɴᴅꜱ:* " + commands.length + "\n";
    menuContent += lineSeparator + greeting + "\n";

    // List commands by category
    for (const category in commandCategories) {
      menuContent += commandPrefix + " *" + tiny(category) + "* " + commandSuffix + "\n";
      commandCategories[category].forEach(cmd => {
        menuContent += "┃   ☘️ " + fancytext(cmd, 1) + "\n";
      });
    }
    
    menuContent += footer + "\n\nᴍᴀᴅᴇ ᴡɪᴛʜ ʟᴏᴠᴇ *" + Config.botname + "*!\n©ᴀʙʙʏ\n" + readmore;

    const response = {
      'caption': menuContent,
      'ephemeralExpiration': 3000
    };

    return await context.sendUi(context.chat, response, context);
  } catch (error) {
    await context.error(error + "\nCommand: menu", error);
  }
});
      
