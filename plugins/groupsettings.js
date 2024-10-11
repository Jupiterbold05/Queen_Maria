global.warncount = process.env.WARN_COUNT || global.warncount || "3";
global.MsgsInLog = process.env.MSGS_IN_LOG || global.MsgsInLog || "false";
const {
  groupdb,
  userdb,
  bot_,
  smd,
  sendWelcome,
  Config,
  tlang,
  sleep,
  prefix,
} = require("../lib");
const axios = require("axios");
const astro_patch = require("../lib/plugins");
smd(
  {
    pattern: "lydea",
    alias: ["chatbot"],
    desc: "activates and deactivates chatbot.\nuse buttons to toggle.",
    fromMe: true,
    category: "ai",
    filename: __filename,
  },
  async (_0x1a5020, _0x1f22c3, { cmdName: _0x431455 }) => {
    try {
      let _0x974aae = _0x1f22c3.split(" ")[0].toLowerCase().trim();
      let _0x44755b =
        (await groupdb.findOne({
          id: _0x1a5020.chat,
        })) ||
        (await groupdb.new({
          id: _0x1a5020.chat,
        }));
      let _0x4924e5 = (await bot_.findOne({
        id: "bot_" + _0x1a5020.user,
      })) ||
        (await groupdb.new({
          id: "bot_" + _0x1a5020.user,
        })) || {
          chatbot: "false",
        };
      if (_0x974aae == "all" || _0x974aae === "global") {
        if (_0x4924e5.chatbot == "true") {
          return await _0x1a5020.send(
            "*" + _0x431455 + " was already enabled to all chat!.*"
          );
        }
        await bot_.updateOne(
          {
            id: "bot_" + _0x1a5020.user,
          },
          {
            chatbot: "true",
          }
        );
        return await _0x1a5020.send(
          "*" + _0x431455 + " successfully enabled to all chats!.*"
        );
      } else if (
        _0x974aae.startsWith("on") ||
        _0x974aae.startsWith("act") ||
        _0x974aae.startsWith("enable")
      ) {
        if (_0x44755b.chatbot == "true" || _0x4924e5.chatbot == "true") {
          return await _0x1a5020.send(
            "*" + _0x431455 + " was already enabled.*"
          );
        }
        await groupdb.updateOne(
          {
            id: _0x1a5020.chat,
          },
          {
            chatbot: "true",
          }
        );
        return await _0x1a5020.send(
          "*" + _0x431455 + " activated successfully.*"
        );
      } else if (
        _0x974aae.startsWith("off") ||
        _0x974aae.startsWith("deact") ||
        _0x974aae.startsWith("disable")
      ) {
        if (_0x44755b.chatbot == "false" && _0x4924e5.chatbot == "false") {
          return await _0x1a5020.send(
            "*" + _0x431455 + " was already disabled.*"
          );
        }
        await bot_.updateOne(
          {
            id: "bot_" + _0x1a5020.user,
          },
          {
            chatbot: "false",
          }
        );
        await groupdb.updateOne(
          {
            id: _0x1a5020.chat,
          },
          {
            chatbot: "false",
          }
        );
        return await _0x1a5020.send(
          "*" + _0x431455 + " deactivated successfully.*"
        );
      } else {
        return await _0x1a5020.reply(
          "*_" +
            _0x431455 +
            " Currently *" +
            (_0x4924e5.chatbot == "true"
              ? "Enabled in 'all' Chats"
              : _0x44755b.chatbot == "true"
              ? "Enabled in Chat"
              : "Disabled in Chat") +
            "!_*\n*_Use On/Off/all to enable/disable " +
            _0x431455 +
            "_*"
        );
      }
    } catch (_0x1a9758) {
      _0x1a5020.error(_0x1a9758 + "\n\ncommand: lydea(chatbot)", _0x1a9758);
    }
  }
);
let warn = {};
warn.addwarn = async (_0x535f84, _0x1e53d3, _0x445500 = {}) => {
  try {
    let _0x285cd0 =
      (await userdb.findOne({
        id: _0x535f84,
      })) ||
      (await userdb.new({
        id: _0x535f84,
      }));
    let _0x84b1f8 = _0x285cd0.warn || {};
    if (!_0x84b1f8[_0x1e53d3]) {
      _0x84b1f8[_0x1e53d3] = [];
    }
    var _0x1a434e = {
      chat: "PRIVATE",
      reason: "Inapropriate Behaviour",
      date: new Date(),
      warnedby: tlang().title,
      ..._0x445500,
    };
    _0x84b1f8[_0x1e53d3].push(_0x1a434e);
    _0x285cd0 = await userdb.updateOne(
      {
        id: _0x535f84,
      },
      {
        warn: _0x84b1f8,
      }
    );
    return {
      status: true,
      warning: _0x84b1f8[_0x1e53d3].length,
      user: _0x285cd0,
    };
  } catch (_0x5aeabd) {
    return {
      status: false,
      warning: 0,
      user: {},
      error: _0x5aeabd,
    };
  }
};
smd(
  {
    pattern: "checkwarn",
    alias: ["listwarn", "chatwarn", "allwarn"],
    desc: "create paste of text.",
    category: "user",
    filename: __filename,
  },
  async (_0x598674, _0x1c4990) => {
    try {
      let _0x4604cb = "";
      let _0x581b05 = _0x598674.sender;
      if (_0x598674.isCreator) {
        _0x581b05 = _0x598674.reply_message
          ? _0x598674.reply_message.sender
          : _0x598674.mentionedJid[0]
          ? _0x598674.mentionedJid[0]
          : _0x581b05;
      }
      let _0x31a5b0 =
        (await userdb.findOne({
          id: _0x581b05,
        })) ||
        (await userdb.new({
          id: _0x581b05,
        }));
      let _0x40e695 = _0x31a5b0.warn || false;
      let _0x49f508 = {};
      if (_0x40e695 && _0x1c4990 === "all") {
        _0x40e695 = _0x31a5b0.warn;
      } else if (_0x40e695 && _0x40e695[_0x598674.chat]) {
        _0x49f508[_0x598674.chat] = [..._0x40e695[_0x598674.chat]];
        _0x40e695 = _0x49f508;
      } else {
        _0x40e695 = false;
      }
      let _0xfcc9b7 = _0x1c4990 === "all" ? true : !_0x40e695[_0x598674.chat];
      if (!_0x31a5b0 || !_0x40e695 || !_0xfcc9b7) {
        return await _0x598674.send("*_User didn't have any warning yet!!_*");
      }
      console.log("allwarn : ", _0x40e695);
      for (const _0x15bd99 in _0x40e695) {
        let _0x52d2b3 = _0x40e695[_0x15bd99];
        _0x4604cb +=
          "\n╭─────────────◆\n│ *[ID] : " +
          (_0x15bd99.includes("@")
            ? (await _0x598674.bot.getName(_0x15bd99)) || _0x15bd99
            : _0x15bd99) +
          "*\n│ *[ᴛᴏᴛᴀʟ ᴡᴀʀɴɪɴɢ] : " +
          _0x40e695[_0x15bd99].length +
          "*\n┝─────────────◆\n";
        for (let _0x36bd30 = 0; _0x36bd30 < _0x52d2b3.length; _0x36bd30++) {
          _0x4604cb +=
            "┝── *ᴡᴀʀɴɪɴɢ " +
            (_0x36bd30 + 1) +
            "* ──\n│  *ᴅᴀᴛᴇ:* " +
            _0x52d2b3[_0x36bd30].date +
            " " +
            (_0x52d2b3[_0x36bd30].reason
              ? "  \n│  *ʀᴇᴀꜱᴏɴ:* " + _0x52d2b3[_0x36bd30].reason
              : "") +
            "\n│  *ᴡᴀʀɴᴇᴅ ʙʏ:* " +
            _0x52d2b3[_0x36bd30].warnedby +
            "\n│  *ᴄʜᴀᴛ:* " +
            _0x52d2b3[_0x36bd30].chat +
            "\n";
        }
        _0x4604cb += "╰─────────────◆\n";
      }
      return await _0x598674.reply(
        _0x4604cb ? _0x4604cb : "*_User didn't have any warning yet!!_*"
      );
    } catch (_0x44b38e) {
      await _0x598674.error(_0x44b38e + "\n\nCommand: chatwarn", _0x44b38e);
    }
  }
);
smd(
  {
    pattern: "warn",
    fromMe: true,
    desc: "warn a user!",
    category: "user",
    filename: __filename,
    use: " < USER >",
  },
  async (_0xb9222e, _0x4cb71f) => {
    try {
      let _0x5746a6 = _0xb9222e.reply_message
        ? _0xb9222e.reply_message.sender
        : _0xb9222e.mentionedJid[0]
        ? _0xb9222e.mentionedJid[0]
        : false;
      if (!_0x5746a6) {
        return await _0xb9222e.send("*_Uhh please, reply to a user!!_*");
      }
      let _0x314399 =
        (await userdb.findOne({
          id: _0x5746a6,
        })) ||
        (await userdb.new({
          id: _0x5746a6,
        }));
      let _0x5980c1 = _0x314399.warn || {};
      if (!_0x5980c1[_0xb9222e.chat]) {
        _0x5980c1[_0xb9222e.chat] = [];
      }
      var _0x389244 = {
        chat: _0xb9222e.isGroup
          ? _0xb9222e.metadata?.subject || "GROUP"
          : "PRIVATE CHAT",
        reason: _0x4cb71f,
        date: _0xb9222e.date,
        warnedby: _0xb9222e.senderName,
      };
      _0x5980c1[_0xb9222e.chat].push(_0x389244);
      await userdb.updateOne(
        {
          id: _0x5746a6,
        },
        {
          warn: _0x5980c1,
        }
      );
      let _0x46237b = parseInt(global.warncount) || 3;
      if (
        _0x5980c1[_0xb9222e.chat].length > _0x46237b &&
        !_0xb9222e.checkBot(_0x5746a6)
      ) {
        if (_0xb9222e.isGroup) {
          if (_0xb9222e.isBotAdmin) {
            await _0xb9222e.send(
              "*_Hey @" +
                _0x5746a6.split("@")[0] +
                ", Kicking you from group!_*\n*_Because Your warn limit exceed!_*",
              {
                mentions: [_0x5746a6],
              }
            );
            await _0xb9222e.bot.groupParticipantsUpdate(
              _0xb9222e.chat,
              [_0x5746a6],
              "remove"
            );
          } else {
            return await _0xb9222e.send(
              "*_Hey @" +
                _0x5746a6.split("@")[0] +
                " Dont Spam, Your warn limit exceed!_*"
            );
          }
        } else {
          await _0xb9222e.send(
            "*_Hey @" +
              _0x5746a6.split("@")[0] +
              ", Blocking you!_*\n*_Because Your warn limit exceed!_*",
            {
              mentions: [_0x5746a6],
            }
          );
          await _0xb9222e.bot.updateBlockStatus(_0x5746a6, "block");
        }
      } else {
        return await _0xb9222e.send(
          "*_Hey @" + _0x5746a6.split("@")[0] + " warning added, Don't spam!_*",
          {
            mentions: [_0x5746a6],
          }
        );
      }
    } catch (_0x229851) {
      await _0xb9222e.error(_0x229851 + "\n\nCommand: warn ", _0x229851, false);
    }
  }
);
smd(
  {
    pattern: "resetwarn",
    desc: "create paste of text.",
    category: "user",
    filename: __filename,
    use: " user ",
  },
  async (_0x204e61, _0xad20a9) => {
    try {
      if (!_0x204e61.isCreator && !_0x204e61.isAdmin) {
        return await _0x204e61.reply(tlang().admin);
      }
      let _0x16177d = _0x204e61.reply_message
        ? _0x204e61.reply_message.sender
        : _0x204e61.mentionedJid[0]
        ? _0x204e61.mentionedJid[0]
        : false;
      if (!_0x16177d) {
        return await _0x204e61.send("*_Uhh please, reply to a user!!_*");
      }
      let _0x3397c7 =
        (await userdb.findOne({
          id: _0x16177d,
        })) ||
        (await userdb.new({
          id: _0x16177d,
        })) ||
        {};
      let _0x1aa30d = _0x3397c7.warn || {};
      if (
        _0x204e61.isCreator &&
        _0xad20a9.toLowerCase() === "all" &&
        _0x1aa30d
      ) {
        _0x1aa30d = {};
      } else {
        if (!_0x3397c7 || !_0x1aa30d || !_0x1aa30d[_0x204e61.chat]) {
          return await _0x204e61.send("*_User didn't have any warning yet!!_*");
        }
        delete _0x1aa30d[_0x204e61.chat];
      }
      await userdb.updateOne(
        {
          id: _0x16177d,
        },
        {
          warn: _0x1aa30d,
        }
      );
      await _0x204e61.reply(
        "*User is free as a bird now!*\n*All warns has been deleted!*"
      );
    } catch (_0x2b8f6c) {
      await _0x204e61.error(_0x2b8f6c + "\n\nCommand: resetwarn", _0x2b8f6c);
    }
  }
);
smd(
  {
    pattern: "act",
    alias: ["activate", "active"],
    desc: "Switches for varios works.",
    category: "moderation",
    filename: __filename,
  },
  async (_0x1c1427, _0x2c32fb) => {
    try {
      if (!_0x1c1427.isGroup) {
        return _0x1c1427.reply(tlang().group);
      }
      const _0x2e197f = _0x1c1427.botNumber;
      const _0x571a11 = _0x1c1427.isAdmin;
      let _0x14856e = _0x2c32fb?.split(" ")[0].toLowerCase()?.trim() || false;
      if (!_0x571a11 && !_0x1c1427.isCreator) {
        return _0x1c1427.reply(tlang().admin);
      }
      let _0x599658 =
        (await groupdb.findOne({
          id: _0x1c1427.chat,
        })) ||
        (await groupdb.new({
          id: _0x1c1427.chat,
        })) ||
        false;
      if (!_0x599658) {
        return await _0x1c1427.reply(
          "*_Uhh dear, Group not found in Databse!_*"
        );
      }
      switch (_0x14856e) {
        case "antilink":
          {
            if (_0x599658.antilink !== "false") {
              return await _0x1c1427.reply(
                "*_Antilink was alredy enabled here!_*"
              );
            }
            await groupdb.updateOne(
              {
                id: _0x1c1427.chat,
              },
              {
                antilink: "warn",
              }
            );
            await _0x1c1427.reply("*_Enabled antilink in current chat.!_*");
          }
          break;
        case "economy":
          {
            if (_0x599658.economy == "true") {
              return await _0x1c1427.reply("*_Economy was alredy enabled.!_*");
            }
            await groupdb.updateOne(
              {
                id: _0x1c1427.chat,
              },
              {
                economy: "true",
              }
            );
            await _0x1c1427.reply("*_Economy enabled in current chat.!_*");
          }
          break;
        case "events":
        case "event":
          {
            await groupdb.updateOne(
              {
                id: _0x1c1427.chat,
              },
              {
                welcome: "true",
                goodbye: "true",
              }
            );
            return await _0x1c1427.reply("*Successfully Enabled Events!*");
          }
          break;
        case "nsfw":
          {
            if (_0x599658.nsfw == "true") {
              return await _0x1c1427.reply("*_NSFW is already enabled!_*");
            }
            await groupdb.updateOne(
              {
                id: _0x1c1427.chat,
              },
              {
                nsfw: "true",
              }
            );
            await _0x1c1427.reply("*_Successfully Enabled NSFW_*");
          }
          break;
        case "bot":
          {
            if (_0x599658.botenable == "true") {
              return await _0x1c1427.reply("*_bot is already enabled!_*");
            }
            await groupdb.updateOne(
              {
                id: _0x1c1427.chat,
              },
              {
                botenable: "true",
              }
            );
            await _0x1c1427.reply("*_Successfully Enabled bot_*");
          }
          break;
        default: {
          _0x1c1427.reply(
            "Please provide me term like.\n1-events\n2-antilink\n3-economy\n4-bot"
          );
        }
      }
    } catch (_0x54acfc) {
      await _0x1c1427.error(_0x54acfc + "\n\ncommand: act", _0x54acfc);
    }
  }
);
smd(
  {
    pattern: "deact",
    alias: ["deactive", "deactivate"],
    desc: "Switches for varios works.",
    category: "moderation",
    filename: __filename,
  },
  async (_0x3dfe85, _0x4d9655) => {
    try {
      if (!_0x3dfe85.isGroup) {
        return _0x3dfe85.reply(tlang().group);
      }
      const _0x6df183 = _0x3dfe85.botNumber;
      const _0x66f7b9 = _0x3dfe85.isAdmin;
      let _0x22f3c7 = _0x4d9655?.split(" ")[0].toLowerCase()?.trim() || false;
      if (!_0x22f3c7) {
        return _0x3dfe85.reply(
          "❌ Please provide me term like like\n1-events\n2-antilink\n3-nsfw\n4-bot\n5-economy"
        );
      }
      if (!_0x66f7b9 && !_0x3dfe85.isCreator) {
        return _0x3dfe85.reply(tlang().admin);
      }
      let _0x39a7fb =
        (await groupdb.findOne({
          id: _0x3dfe85.chat,
        })) ||
        (await groupdb.new({
          id: _0x3dfe85.chat,
        })) ||
        false;
      if (!_0x39a7fb) {
        return await _0x3dfe85.reply(
          "*_Uhh dear, request not be proceed due to error!_*"
        );
      }
      switch (_0x22f3c7) {
        case "antilink":
          {
            if (_0x39a7fb.antilink == "false") {
              return _0x3dfe85.reply("*_Antilink was alredy disabled_*");
            }
            await groupdb.updateOne(
              {
                id: _0x3dfe85.chat,
              },
              {
                antilink: "false",
              }
            );
            _0x3dfe85.reply("*_disabled antilink in current chat!_*");
          }
          break;
        case "economy":
          {
            if (_0x39a7fb.economy == "false") {
              return _0x3dfe85.reply("*_Economy was alredy disabled!_*");
            }
            await groupdb.updateOne(
              {
                id: _0x3dfe85.chat,
              },
              {
                economy: "false",
              }
            );
            _0x3dfe85.reply("*disabled Economy in current chat.*");
          }
          break;
        case "events":
        case "event":
          {
            if (_0x39a7fb.events == "false") {
              return _0x3dfe85.reply("*_Events are already disabled!_*");
            }
            await groupdb.updateOne(
              {
                id: _0x3dfe85.chat,
              },
              {
                welcome: "false",
                goodbye: "false",
              }
            );
            return _0x3dfe85.reply("*Successfully disabled Events!*");
          }
          break;
        case "nsfw":
          {
            if (_0x39a7fb.nsfw == "false") {
              return _0x3dfe85.reply("*_NSFW is already disabled!_*");
            }
            await groupdb.updateOne(
              {
                id: _0x3dfe85.chat,
              },
              {
                nsfw: "false",
              }
            );
            _0x3dfe85.reply("*Successfully disabled NSFW*");
          }
          break;
        case "bot":
          {
            if (_0x39a7fb.botenable == "false") {
              return await _0x3dfe85.reply("*_bot is already disabled!_*");
            }
            await groupdb.updateOne(
              {
                id: _0x3dfe85.chat,
              },
              {
                botenable: "true",
              }
            );
            await _0x3dfe85.reply("*_Successfully disabled bot_*");
          }
          break;
        default: {
          _0x3dfe85.reply(
            "Please provide me term like.\n1-events\n2-antilink\n3-bot\n4-economy"
          );
        }
      }
    } catch (_0x27fa6e) {
      await _0x3dfe85.error(_0x27fa6e + "\n\ncommand: deact", _0x27fa6e);
    }
  }
);
smd(
  {
    pattern: "bot",
    desc: "activates and deactivates bot.\nuse buttons to toggle.",
    fromMe: true,
    category: "misc",
    filename: __filename,
  },
  async (_0x129972, _0x3811e7) => {
    try {
      let _0x1b1ab2 = _0x3811e7 ? _0x3811e7.toLowerCase().trim() : false;
      let _0x15047e = _0x1b1ab2 ? _0x1b1ab2.split(" ")[0] : false;
      let _0x13ab5f =
        (await groupdb.findOne({
          id: _0x129972.chat,
        })) ||
        (await groupdb.new({
          id: _0x129972.chat,
        }));
      if (!_0x15047e) {
        await _0x129972.send(
          "*_Bot *" +
            (_0x13ab5f.botenable === "false" ? "Disabled" : "Enabled") +
            " in this Chat!_*"
        );
      } else if (
        _0x15047e.startsWith("off") ||
        _0x15047e.startsWith("deact") ||
        _0x15047e.startsWith("disable")
      ) {
        if (_0x13ab5f.botenable === "false") {
          await _0x129972.send("*_Bot already disabled in current Chat!!_*");
        } else {
          await groupdb.updateOne(
            {
              id: _0x129972.chat,
            },
            {
              botenable: "false",
            }
          );
          await _0x129972.send("*_Bot Disabled Succesfully!_*");
        }
      } else if (
        _0x15047e.startsWith("on") ||
        _0x15047e.startsWith("act") ||
        _0x15047e.startsWith("enable")
      ) {
        if (_0x13ab5f.botenable === "true") {
          await _0x129972.send("*_Bot already enabled in current Chat!!_*");
        } else {
          await groupdb.updateOne(
            {
              id: _0x129972.chat,
            },
  
