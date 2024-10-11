const events = require(lib_dir + "/plugins.js");
let {
  Config,
  TelegraPh,
  sleep,
  getBuffer,
  parsedJid,
  fancy,
  tiny,
  botpic,
  tlang
} = require(lib_dir);
if (!Array.isArray(global.renters)) {
  global.renters = [];
}
if (!Array.isArray(global.rentdisable)) {
  global.rentdisable = [];
}
let disabledperma = ["sharebot", "sharelist", "stoprent", "disableshare", "enableshare", "setsudo", "delsudo", "newvar", "delvar", "setvar", "update", "updatenow", "restart", "reboot"];
const {
  userdb,
  smd,
  fetchJson,
  sendWelcome,
  bot_,
  getTime
} = require(lib_dir);
const util = require("util");
const fs = require("fs-extra");
const axios = require("axios");
const fetch = require("node-fetch");
const exec = util.promisify(require("child_process").exec);
let db = {};
db.get = async () => {
  const _0x39ecdb = "./asta.json";
  try {
    return JSON.parse(fs.readFileSync(_0x39ecdb, "utf-8"));
  } catch (_0x12c187) {
    return {};
  }
};
db.update = async _0x19934a => {
  try {
    const _0x370f4c = "./asta.json";
    const _0x50546d = db.get();
    const _0x456e8c = {
      ..._0x50546d,
      ..._0x19934a
    };
    fs.writeFileSync(_0x370f4c, JSON.stringify(_0x456e8c, null, 2), "utf-8");
    return _0x456e8c;
  } catch (_0x4e2ecd) {
    console.error("Error updating data:", _0x4e2ecd);
  }
};
try {
  const {
    mention,
    filter
  } = require(lib_dir + "/asta.js");
  smd({
    cmdname: "mention",
    fromMe: true,
    category: "chats",
    desc: "set auto reply for mention",
    use: "[ url type/audio ]",
    usage: "read  'mention wiki' to get all inforamtion of mention!",
    filename: __filename
  }, async (_0x184ecd, _0x431080) => {
    mention.cmd(_0x184ecd, _0x431080);
  });
  smd({
    on: "main",
    fromMe: false
  }, async (_0x138199, _0x359c14 = "") => {
    mention.check(_0x138199, _0x359c14);
  });
  smd({
    pattern: "filter",
    category: "chats",
    desc: "set auto reply filter messages",
    use: "[ asta : how can i help you! ]",
    usage: "set filter message to specific text, so that bot replied user from chat by giving text!",
    fromMe: true,
    filename: __filename
  }, async (_0x126a17, _0x3ebefa) => {
    filter.set(_0x126a17, _0x3ebefa);
  });
  smd({
    pattern: "fstop",
    category: "chats",
    desc: "stop auto reply from a word",
    use: "[ asta : how can i help you! ]",
    usage: "stop filter message to specific word, That already set in filter text!",
    fromMe: true,
    filename: __filename
  }, async (_0x2fd083, _0xa71664) => {
    filter.stop(_0x2fd083, _0xa71664);
  });
  smd({
    pattern: "flist",
    category: "chats",
    desc: "get list of auto reply word",
    use: "[ asta : how can i help you! ]",
    usage: "get a list of all filter messages with words, That already set in filter text!",
    fromMe: true,
    filename: __filename
  }, async _0x55f8e8 => {
    filter.list(_0x55f8e8);
  });
  smd({
    on: "text"
  }, async (_0x593a64, _0x40e88c) => {
    try {
      filter.check(_0x593a64, _0x40e88c);
    } catch (_0x4839f8) {}
  });
} catch (_0x2568c0) {
  if (!global.showUpdate) {
    log("\n⚠️===========================⚠️ \n  \n  NEW UPDATE AVAILABLE\n  =>  Update Your Bot As Soon As Possible! 🚫\n \n Regards: Queen Maria \n⚠️============================⚠️");
    global.showUpdate = true;
  }
}
let afk = false;
smd({
  pattern: "afk",
  desc: "away from keyboard",
  category: "chats"
}, async (_0x5981d0, _0x5be11f) => {
  try {
    let _0x7c3280 = await db.get();
    afk = _0x7c3280.afk || {
      users: {}
    };
    if (!_0x5be11f) {
      return _0x5981d0.reply(("\n  *Example: My owner is AFK*\n  *Last seen before #lastseen*\n  *Also update status: " + prefix + "afk @time, @date, @line(pickupline), @quote(random quote), @user*\n  \n*To turn off use " + prefix + "unAfk.*\n  ").trim());
    }
    if (_0x5be11f === "get" && afk[_0x5981d0.sender]) {
      return _0x5981d0.reply(afk[_0x5981d0.sender].reason);
    }
    afk[_0x5981d0.sender] = {
      reason: _0x5be11f,
      lastseen: new Date()
    };
    _0x7c3280.afk = {
      ...afk
    };
    _0x7c3280 = await db.update(_0x7c3280);
    if (_0x7c3280) {
      let _0x3f1e86 = ("@" + _0x5981d0.sender.split("@")[0] + " currently AFK.\nReason: " + afk[_0x5981d0.sender].reason.replace("@lastseen", "\nlastseen : " + getTimeDifference(afk[_0x5981d0.sender].lastseen) + "\n")).trim();
      await sendWelcome(_0x5981d0, _0x3f1e86, _0x5981d0, _0x5981d0.sender);
    } else {
      _0x5981d0.reply("*Request Denied!*");
    }
  } catch (_0x14591d) {
    _0x5981d0.error(_0x14591d + "\n\nCommand: AFKs", _0x14591d);
  }
});
smd({
  pattern: "unafk",
  desc: "turn off away from keyboard",
  category: "chats"
}, async _0x19b40d => {
  try {
    let _0x5f4dc1 = await db.get();
    afk = _0x5f4dc1.afk || {};
    if (!afk[_0x19b40d.sender]) {
      return _0x19b40d.reply("*You are not AFK.*");
    }
    delete afk[_0x19b40d.sender];
    _0x5f4dc1.afk = {
      ...afk
    };
    _0x5f4dc1 = await db.update(_0x5f4dc1);
    if (_0x5f4dc1) {
      await _0x19b40d.reply("Finally, You are back!");
    } else {
      _0x19b40d.reply("*Request Denied!*");
    }
  } catch (_0x256eef) {
    _0x19b40d.error(_0x256eef + "\n\nCommand: UnAFK", _0x256eef, "ERROR");
  }
});
let txt = {
  "2": "*Hey i already inform you!*\n",
  "3": "*Stop spamming!*"
};
function getTimeDifference(_0x47a53) {
  const _0x2e748e = new Date(_0x47a53);
  const _0x54f11c = new Date();
  const _0x2c55d7 = _0x54f11c - _0x2e748e;
  const _0x353908 = Math.floor(_0x2c55d7 / 86400000);
  const _0x349796 = Math.floor(_0x2c55d7 % 86400000 / 3600000);
  const _0x9c628b = Math.floor(_0x2c55d7 % 3600000 / 60000);
  return (_0x353908 ? "Days " + _0x353908 + ", " : "") + "Hours " + (_0x349796 || 0) + ", Minutes " + (_0x9c628b || 0);
}
smd({
  on: "main"
}, async _0x2769f2 => {
  if (_0x2769f2.fromMe || _0x2769f2.isBot) {
    return;
  }
  try {
    if (!afk) {
      let _0xc43cb5 = await db.get();
      afk = _0xc43cb5.afk || {
        users: []
      };
    }
    let _0x1a0460 = _0x2769f2.reply_message && _0x2769f2.reply_message.fromMe ? true : false;
    let _0x3acd2a = _0x2769f2.mentionedJid[0] ? [..._0x2769f2.mentionedJid] : [];
    if (_0x2769f2.reply_message) {
      _0x3acd2a.push(_0x2769f2.reply_message.sender);
    }
    for (let _0x53ceee = 0; _0x53ceee < _0x3acd2a.length; _0x53ceee++) {
      if (afk[_0x3acd2a[_0x53ceee]] && _0x2769f2.sender !== _0x3acd2a[_0x53ceee]) {
        if (!afk[_0x3acd2a[_0x53ceee]].users[_0x2769f2.sender]) {
          afk[_0x3acd2a[_0x53ceee]].users[_0x2769f2.sender] = 0;
        }
        afk[_0x3acd2a[_0x53ceee]].users[_0x2769f2.sender]++;
        if (afk[_0x3acd2a[_0x53ceee]].users[_0x2769f2.sender] > 3) {
          continue;
        }
        let _0x208a1a = txt[afk[_0x3acd2a[_0x53ceee]].users[_0x2769f2.sender]];
        let _0x5ab59f = ((_0x208a1a ? _0x208a1a : "") + " *@" + _0x3acd2a[_0x53ceee].split("@")[0] + " currently AFK.*\n*Reason:* " + afk[_0x3acd2a[_0x53ceee]].reason.replace("@lastseen", "\n*Lastseen:* " + getTimeDifference(afk[_0x3acd2a[_0x53ceee]].lastseen) + "\n")).trim();
        await sendWelcome(_0x2769f2, _0x5ab59f, _0x2769f2, _0x3acd2a[_0x53ceee]);
      }
    }
  } catch (_0x4f282f) {
    console.log("ERROR IN AFK MAIN\n", _0x4f282f);
  }
});
smd(
  {
    pattern: "alive",
    desc: "Shows system status with different designs.",
    category: "general",
    filename: __filename,
    use: "alive",
  },
  async (message, input) => {
    try {
      const start = new Date().getTime();
      const designs = [
        async () => {
          const imageBuffer = await axios.get(
            "https://telegra.ph/file/b065f0f673cae5452c358.jpg",
            {
              responseType: "arraybuffer",
            }
          );

          const quoteResponse = await axios.get(
            "https://api.maher-zubair.tech/misc/quote"
          );
          const quote = quoteResponse.data;
          if (!quote || quote.status !== 200) {
            return await message.reply("*Failed to fetch a quote.*");
          }

          const quoteText = `\n\n*"${quote.result.body}"*\n_- ${quote.result.author}_`;
          const end = new Date().getTime();
          const pingSeconds = (end - start) / 1000;
          const captionText = `ϙᴜᴇᴇɴ_MARIA \n\n*ʀᴇsᴘᴏɴsᴇ ʀᴀᴛᴇ:* ${pingSeconds} seconds${quoteText}\n\nQUEEN_MARIA`;

          return { image: imageBuffer.data, caption: captionText };
        },
        async () => {
          const imageBuffer = await axios.get(
            "https://i.imgur.com/lIo3cM2.jpeg",
            {
              responseType: "arraybuffer",
            }
          );

          const factResponse = await axios.get(
            "https://api.maher-zubair.tech/misc/fact"
          );
          const fact = factResponse.data;
          if (!fact || fact.status !== 200) {
            return await message.reply("*Failed to fetch a fact.*");
          }

          const end = new Date().getTime();
          const pingSeconds = (end - start) / 1000;
          const captionText = `qᴜᴇᴇɴ_ᴍᴀʀɪᴀ\n\n*ʀᴇsᴘᴏɴsᴇ ʀᴀᴛᴇ:* ${pingSeconds} seconds\n\n*Fact:*\n${fact.result.fact}\n\nRIAS GREMORY BOT`;

          return { image: imageBuffer.data, caption: captionText };
        },
        async () => {
          const imageBuffer = await axios.get(
            "https://telegra.ph/file/b065f0f673cae5452c358.jpg",
            {
              responseType: "arraybuffer",
            }
          );

          const lineResponse = await axios.get(
            "https://api.maher-zubair.tech/misc/lines"
          );
          const line = lineResponse.data;
          if (!line || line.status !== 200) {
            return await message.reply("*Failed to fetch a line.*");
          }

          const end = new Date().getTime();
          const pingSeconds = (end - start) / 1000;
          const captionText = `qᴜᴇᴇɴ_ᴍᴀʀɪᴀ\n\n*ʀᴇsᴘᴏɴsᴇ ʀᴀᴛᴇ:* ${pingSeconds} seconds\n\n*Line:*\n${line.result}\n\nQUEEN_MARIA`;

          return { image: imageBuffer.data, caption: captionText };
        },
      ];

      const randomDesign = designs[Math.floor(Math.random() * designs.length)];
      const messageData = await randomDesign();

      const message_options = {
        quoted: message,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
        },
      };

      return await message.bot.sendMessage(
        message.chat,
        messageData,
        message_options
      );
    } catch (error) {
      await message.error(
        error + "\n\nCommand: alive",
        error,
        "*Failed to show status.*"
      );
    }
  }
);
async function convertAudioToBlackScreenVideo(_0x528238, _0x32b9b6) {
  try {
    try {
      fs.unlinkSync(_0x32b9b6);
    } catch (_0xdbc67d) {}
    const _0x77f5a8 = "ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 " + _0x528238;
    const {
      stdout: _0x35baeb
    } = await exec(_0x77f5a8);
    const _0xa4c00a = parseFloat(_0x35baeb);
    try {
      fs.unlinkSync("./blackScreen.mp4");
    } catch (_0x5c88b4) {}
    const _0xf07045 = "ffmpeg -f lavfi -i color=c=black:s=1280x720:d=" + _0xa4c00a + " -vf \"format=yuv420p\" ./blackScreen.mp4";
    await exec(_0xf07045);
    const _0x39ba37 = "ffmpeg -i ./blackScreen.mp4 -i " + _0x528238 + " -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 " + _0x32b9b6;
    await exec(_0x39ba37);
    console.log("Audio converted to black screen video successfully!");
    return {
      result: true
    };
  } catch (_0x2a64be) {
    console.log("An error occurred:", _0x2a64be);
    return {
      result: false
    };
  }
}
smd({
  pattern: "audiourl",
  alias: ["black"],
  desc: "get url for audio and converted into black video",
  category: "converter"
}, async (_0x72926a, _0x4e5da) => {
  try {
    if (!_0x72926a.quoted) {
      return await _0x72926a.reply("_Reply to Audio MEssage!_");
    }
    let _0x460b3f = "";
    if (_0x72926a.quoted.mtype == "audioMessage") {
      let _0x1f1386 = await _0x72926a.bot.downloadAndSaveMediaMessage(_0x72926a.quoted);
      let _0x555071 = await convertAudioToBlackScreenVideo(_0x1f1386, "./temp/convertedVideo.mp4");
      if (_0x555071.result) {
        _0x460b3f = "./temp/convertedVideo.mp4";
        let _0x5efc27 = await TelegraPh(_0x460b3f);
        await _0x72926a.send(_0x460b3f, {
          caption: util.format(_0x5efc27)
        }, "amdvid", _0x72926a);
        try {
          fs.unlinkSync(_0x460b3f);
        } catch (_0x147eea) {}
      } else {
        throw "Invalid Media Path";
      }
    }
  } catch (_0x10a3dc) {
    await _0x72926a.error(_0x10a3dc + "\n\nCommand: audiourl", _0x10a3dc, "_ERRORR!_");
  }
});
smd({
  pattern: "bgm",
  desc: "Toggle On/Off to enable/disable bgm",
  fromMe: true,
  category: "misc"
}, async (_0x4b6857, _0x5c5576) => {
  try {
    let _0xb58463 = (await bot_.findOne({
      id: "bot_" + _0x4b6857.user
    })) || (await bot_.new({
      id: "bot_" + _0x4b6857.user
    }));
    let _0x27977e = _0x5c5576.toLowerCase().split()[0];
    if (_0x27977e === "on" || _0x27977e === "enable" || _0x27977e === "act") {
      await bot_.updateOne({
        id: "bot_" + _0x4b6857.user
      }, {
        bgm: true
      });
      return await _0x4b6857.reply("*Bgm Succesfully enabled*");
    } else if (_0x27977e === "off" || _0x27977e === "disable" || _0x27977e === "deact") {
      await bot_.updateOne({
        id: "bot_" + _0x4b6857.user
      }, {
        bgm: false
      });
      return await _0x4b6857.reply("*Bgm Succesfully deactivated*");
    } else {
      return await _0x4b6857.send("*_Use on/off to enable/disable Bgm sounds_*");
    }
  } catch (_0x3e23ea) {
    await _0x4b6857.error(_0x3e23ea + "\n\nCommand: bgm ", _0x3e23ea);
  }
});
smd({
  pattern: "delbgm",
  fromMe: true,
  desc: "remove a song from bgm",
  category: "misc"
}, async (_0x17f7be, _0x490490) => {
  try {
    if (!_0x490490) {
      return await _0x17f7be.reply("*Give Me Song Name to Delete From BGM*");
    }
    let _0x2ecb40 = (await bot_.findOne({
      id: "bot_" + _0x17f7be.user
    })) || (await bot_.new({
      id: "bot_" + _0x17f7be.user
    }));
    let _0x342d7e = _0x2ecb40.bgmarray;
    if (_0x342d7e[_0x490490]) {
      delete _0x342d7e[_0x490490];
      await bot_.updateOne({
        id: "bot_" + _0x17f7be.user
      }, {
        bgmarray: _0x342d7e
      });
      return await _0x17f7be.reply("*Song _" + _0x490490 + "_ removed from BGM.*");
    } else {
      return await _0x17f7be.reply("*Name _'" + _0x490490 + "'_ does not exist in BGM.*");
    }
  } catch (_0x3a2540) {
    await _0x17f7be.error(_0x3a2540 + "\n\nCommand: delbgm ", _0x3a2540);
  }
});
smd({
  pattern: "allbgm",
  alias: ["getbgm", "listbgm"],
  fromMe: true,
  desc: "get list of bgm",
  category: "misc"
}, async _0x27d048 => {
  try {
    let _0x51712a = " *BGM SONG INFORMATION*\n";
    let _0x35348a = (await bot_.findOne({
      id: "bot_" + _0x27d048.user
    })) || (await bot_.new({
      id: "bot_" + _0x27d048.user
    }));
    let _0x100987 = _0x35348a.bgmarray;
    console.log("sounds: ", _0x100987);
    for (const _0x410a73 in _0x100987) {
      _0x51712a += "*" + _0x410a73 + ":* " + _0x100987[_0x410a73] + " \n";
    }
    return await _0x27d048.reply(_0x51712a === " *BGM SONG INFORMATION*\n" ? "*_You didn't set any song in bgm yet!!_*" : _0x51712a);
  } catch (_0x37e63f) {
    await _0x27d048.error(_0x37e63f + "\n\nCommand: allbgm", _0x37e63f);
  }
});
smd({
  pattern: "addbgm",
  alias: ["abgm", "newbgm"],
  fromMe: true,
  desc: "add song in bgm",
  category: "misc"
}, async (_0x65bfc2, _0x324d8f) => {
  try {
    if (!_0x65bfc2.quoted) {
      return await _0x65bfc2.reply("Uhh Please, Reply to Audio/Video To Add In Bgm");
    }
    if (!_0x324d8f) {
      return await _0x65bfc2.reply("Uhh Please give Bgm Song NAme");
    }
    let _0x5e225e = false;
    let _0x44e871 = "";
    if (_0x65bfc2.quoted.mtype == "videoMessage") {
      _0x44e871 = await _0x65bfc2.bot.downloadAndSaveMediaMessage(_0x65bfc2.quoted);
      _0x5e225e = true;
    } else if (_0x65bfc2.quoted.mtype == "audioMessage") {
      _0x5e225e = false;
      let _0x1deb5d = await _0x65bfc2.bot.downloadAndSaveMediaMessage(_0x65bfc2.quoted, "audio");
      let _0x297151 = await convertAudioToBlackScreenVideo(_0x1deb5d, "./convertedVideo.mp4");
      if (_0x297151.result) {
        _0x44e871 = "./convertedVideo.mp4";
      }
    } else {
      return await _0x65bfc2.reply("Uhh Please, Reply to Audio/Video To Add In Bgm");
    }
    if (!_0x44e871) {
      return await _0x65bfc2.reply("There's an Error While Adding Bgm Song");
    }
    let _0x4bf005 = await TelegraPh(_0x44e871);
    let _0x472e61 = (await bot_.findOne({
      id: "bot_" + _0x65bfc2.user
    })) || (await bot_.new({
      id: "bot_" + _0x65bfc2.user
    }));
    try {
      let _0x6e5552 = _0x472e61.bgmarray;
      _0x6e5552[_0x324d8f] = _0x4bf005;
      await bot_.updateOne({
        id: "bot_" + _0x65bfc2.user
      }, {
        bgmarray: _0x6e5552
      });
      return await _0x65bfc2.reply("*New Song Added in BGM with Name : " + _0x324d8f + "*");
    } catch (_0x3490af) {
      return await _0x65bfc2.error(_0x3490af);
    }
  } catch (_0xa9b37e) {
    await _0x65bfc2.error(_0xa9b37e + "\n\nCommand: addbgm", _0xa9b37e);
  }
});
smd({
  pattern: "pmpermit",
  alias: ["permit"],
  fromMe: true,
  desc: "enable/disable pm permit",
  category: "user"
}, async (_0x20ae95, _0x55bc30, {
  cmdName: _0x4ec31d
}) => {
  try {
    let _0x457e3e = (await bot_.findOne({
      id: "bot_" + _0x20ae95.user
    })) || (await bot_.new({
      id: "bot_" + _0x20ae95.user
    }));
    if (!_0x55bc30) {
      return await _0x20ae95.send("*PmPermit Currently *" + (_0x457e3e.permit ? "enabled" : "disabled") + "!!!*\n  *Set to:* ```" + _0x457e3e.values.toUpperCase() + "```\n  \n  *Available Cmds:*```\n  " + (prefix + _0x4ec31d) + " off \n  " + (prefix + _0x4ec31d) + " on | all\n  " + (prefix + _0x4ec31d) + " on | 212,91``` \n  \n\n" + Config.caption);
    }
    var _0x3cd525 = _0x55bc30.toLowerCase().trim();
    const _0x381f23 = _0x3cd525.split("|")[0] || "";
    const _0x11ee3e = _0x3cd525.split("|")[1] || "";
    const _0x3cbaec = _0x11ee3e.startsWith("all") ? "all" : _0x11ee3e.split(",").map(_0x129503 => parseInt(_0x129503)).filter(_0x2ffce5 => !isNaN(_0x2ffce5)).join(",");
    let _0x133f61 = _0x3cbaec ? _0x3cbaec : _0x457e3e.permit_values;
    if (_0x381f23.startsWith("on") || _0x381f23.startsWith("enable") || _0x381f23.startsWith("act")) {
      if (_0x457e3e.permit && _0x457e3e.permit_values === _0x133f61) {
        return await _0x20ae95.send("*_Uhh Dear, PmPermit Already enabled!_*");
      }
      let _0x110a99 = _0x457e3e.permit;
      await bot_.updateOne({
        id: "bot_" + _0x20ae95.user
      }, {
        permit: true,
        permit_values: _0x133f61
      });
      return await _0x20ae95.send("*_PmPermit " + (_0x110a99 ? "Updated" : "Activated") + " Succesfully!_*\n*_Now " + (_0x133f61 === "all" ? "everyone" : _0x133f61) + " need permission for pm_*");
    } else if (_0x381f23.startsWith("off") || _0x381f23.startsWith("disable") || _0x381f23.startsWith("deact")) {
      if (!_0x457e3e.permit) {
        return await _0x20ae95.send("*_Uhh Dear, PmPermit Already disabled!_*");
      }
      await bot_.updateOne({
        id: "bot_" + _0x20ae95.user
      }, {
        permit: false
      });
      return await _0x20ae95.send("*_PmPermit deactivated Succesfully!!!_*");
    } else {
      return await _0x20ae95.bot.sendMessage(_0x20ae95.chat, {
        text: "*PmPermit Currently *" + (_0x457e3e.permit ? "enabled" : "disabled") + "!!!*\n*Provide Valid instruction, such as on/off to enable/disable pmPermit.*"
      });
    }
  } catch (_0x4b83b9) {
    await _0x20ae95.error(_0x4b83b9 + "\n\nCommand: " + _0x4ec31d + " ", _0x4b83b9);
  }
});
smd({
  pattern: "approve",
  alias: ["a"],
  fromMe: true,
  desc: "Approves that person for pm",
  category: "user"
}, async 
