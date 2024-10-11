const {
   updateProfilePicture,
   parsedJid
 } = require("../lib");
 const {
   sck,
   smd,
   send,
   Config,
   tlang,
   sleep,
   getAdmin,
   prefix
 } = require("../lib");
 const astro_patch = require("../lib/plugins");
 const {
   cmd
 } = astro_patch;
 const grouppattern = /https:\/\/chat\.whatsapp\.com\/[A-Za-z0-9]{22}/g;
 smd({
   cmdname: "join",
   info: "joins group by link",
   react: "✔️",
   type: "whatsapp",
   fromMe: true,
   filename: __filename,
   use: "<group link.>"
 }, async (_0x466dd8, _0x5b1338) => {
   try {
     if (_0x466dd8.reply_message && _0x466dd8.reply_message.groupInvite) {
       var _0x29e5fc = await _0x466dd8.bot.groupAcceptInviteV4(_0x466dd8.chat, _0x466dd8.reply_message.msg);
       if (_0x29e5fc && _0x29e5fc.includes("joined to:")) {
         return await send(_0x466dd8, "*_Joined_*", {}, "", _0x466dd8);
       }
     }
     let _0x208739 = _0x5b1338 ? _0x5b1338 : _0x466dd8.reply_text;
     const _0x47ed60 = _0x208739.match(grouppattern);
     if (!_0x47ed60) {
       return await _0x466dd8.reply("*_gimme link_*");
     }
     let _0x4263be = _0x47ed60[0].split("https://chat.whatsapp.com/")[1].trim();
     await _0x466dd8.bot.groupAcceptInvite(_0x4263be).then(_0x7f3222 => send(_0x466dd8, "*_Joined_*", {}, "", _0x466dd8)).catch(_0x1d6aea => _0x466dd8.send("*_Can't Join, Group Id not found!!_*"));
   } catch (_0x5d3484) {
     await _0x466dd8.error(_0x5d3484 + "\n\ncommand: join", _0x5d3484, "*_Can't Join, Group Id not found, Sorry!!_*");
   }
 });
 smd({
   cmdname: "newgc",
   info: "Create New Group",
   type: "whatsapp",
   react: "✔️",
   filename: __filename,
   use: "<group link.>"
 }, async (_0x1d2f1f, _0x3c558e, {
   smd: _0x2e7a79,
   cmdName: _0x49994a
 }) => {
   try {
     if (!_0x1d2f1f.isCreator) {
       return _0x1d2f1f.reply(tlang().owner);
     }
     if (!_0x3c558e) {
       return await _0x1d2f1f.reply("*_provide Name to Create new Group!!!_*\n*_Ex: " + (prefix + _0x2e7a79) + " My Name Group @user1,2,3.._*");
     }
     let _0x379d99 = _0x3c558e;
     if (_0x379d99.toLowerCase() === "info") {
       return await _0x1d2f1f.send(("\n  *Its a command to create new Gc*\n  \t```Ex: " + (prefix + cmd) + " My new Group```\n  \n*You also add peoples in newGc*\n  \t```just reply or mention Users```\n  ").trim());
     }
     let _0x5a5c26 = [_0x1d2f1f.sender];
     if (_0x1d2f1f.quoted) {
       _0x5a5c26.push(_0x1d2f1f.quoted.sender);
     }
     if (_0x1d2f1f.mentionedJid && _0x1d2f1f.mentionedJid[0]) {
       _0x5a5c26.push(..._0x1d2f1f.mentionedJid);
       try {
         mentionJids.forEach(_0x3e3852 => {
           var _0x30af68 = _0x3e3852.split("@")[0].trim();
           _0x379d99 = _0x379d99.replace(new RegExp("@" + _0x30af68, "g"), "");
         });
       } catch {}
     }
     const _0x37b490 = _0x379d99.substring(0, 60);
     const _0x417018 = await Suhail.bot.groupCreate(_0x37b490, [..._0x5a5c26]);
     if (_0x417018) {
       let _0x2c6495 = await _0x1d2f1f.bot.sendMessage(_0x417018.id, {
         text: "*_Hey Master, Welcome to new Group_*\n" + Config.caption
       });
       try {
         var _0x3a49e9 = await Suhail.bot.groupInviteCode(_0x417018.id);
       } catch {
         var _0x3a49e9 = false;
       }
       var _0x2608ab = "https://chat.whatsapp.com/";
       var _0x2fe2c7 = "" + _0x2608ab + _0x3a49e9;
       var _0x539d8f = {
         externalAdReply: {
           title: "QUEEN_MARIA",
           body: "" + _0x37b490,
           renderLargerThumbnail: true,
           thumbnail: log0,
           mediaType: 1,
           mediaUrl: _0x2fe2c7,
           sourceUrl: _0x2fe2c7
         }
       };
       return await send(_0x1d2f1f, ("*_Hurray, New group created!!!_*\n" + (_0x3a49e9 ? "*_" + _0x2fe2c7 + "_*" : "")).trim(), {
         contextInfo: _0x539d8f
       }, "", _0x2c6495);
     } else {
       await _0x1d2f1f.send("*_Can't create new group, Sorry!!_*");
     }
   } catch (_0x33d6f3) {
     await _0x1d2f1f.error(_0x33d6f3 + "\n\ncommand: " + _0x49994a, _0x33d6f3, "*_Can't create new group, Sorry!!_*");
   }
 });
 smd({
   pattern: "ginfo",
   desc: "get group info by link",
   react: "🍁"
   type: "group",
   filename: __filename,
   use: "<group link.>"
 }, async (_0x4f7c88, _0x1490e0) => {
   try {
     let _0x3eb855 = _0x1490e0 ? _0x1490e0 : _0x4f7c88.reply_text;
     const _0x3e5033 = _0x3eb855.match(grouppattern) || false;
     if (!_0x3e5033) {
       return await _0x4f7c88.reply("*_Uhh Please, gimme group link_*");
     }
     let _0x5ced5d = _0x3e5033[0].split("https://chat.whatsapp.com/")[1].trim();
     const _0x5f4890 = await _0x4f7c88.bot.groupGetInviteInfo(_0x5ced5d);
     if (_0x5f4890) {
       const _0x40ced5 = new Date(_0x5f4890.creation * 1000);
       var _0x10288a = _0x40ced5.getFullYear();
       var _0x436585 = _0x40ced5.getMonth() + 1;
       var _0x511884 = _0x40ced5.getDate();
       var _0x236a49 = _0x10288a + "-" + _0x436585.toString().padStart(2, "0") + "-" + _0x511884.toString().padStart(2, "0");
       var _0x56eaaf = {
         externalAdReply: {
           title: "Queen,_Maria",
           body: _0x5f4890.subject,
           renderLargerThumbnail: true,
           thumbnail: log0,
           mediaType: 1,
           mediaUrl: _0x3e5033[0],
           sourceUrl: _0x3e5033[0]
         }
       };
       return await send(_0x4f7c88, (_0x5f4890.subject + "\n  \n  Creator: wa.me/" + _0x5f4890.owner.split("@")[0] + " \n  GJid; ```" + _0x5f4890.id + "  ```\n  *Muted:* " + (_0x5f4890.announce ? " yes" : " no") + "\n  *Locked:* " + (_0x5f4890.restrict ? " yes" : " no") + "\n  *createdAt:* " + _0x236a49 + "\n  *participents:* " + (_0x5f4890.size > 3 ? _0x5f4890.size + "th" : _0x5f4890.size) + "\n  " + (_0x5f4890.desc ? "*description:* " + _0x5f4890.desc + "\n" : "") + "\n  " + Config.caption + "\n  ").trim(), {
         mentions: [_0x5f4890.owner],
         contextInfo: _0x56eaaf
       }, "", _0x4f7c88);
     } else {
       await _0x4f7c88.send("*_Group Id not found, Sorry!!_*");
     }
   } catch (_0x36c345) {
     await _0x4f7c88.error(_0x36c345 + "\n\ncommand: ginfo", _0x36c345, "*_Group Id not found, Sorry!!_*");
   }
 });
 smd({
   cmdname: "rejectall",
   alias: ["rejectjoin"],
   info: "reject all request to join!",
   type: "group",
   filename: __filename
 }, async (_0xb81e45, _0x3dda5f) => {
   try {
     if (!_0xb81e45.isGroup) {
       return _0xb81e45.reply(tlang().group);
     }
     if (!_0xb81e45.isBotAdmin || !_0xb81e45.isAdmin) {
       return await _0xb81e45.reply(!_0xb81e45.isBotAdmin ? "*_I'm Not Admin In This Group" + (!_0xb81e45.isCreator ? ", idiot" : "") + "_*" : tlang().admin);
     }
     const _0x4ea369 = await _0xb81e45.bot.groupRequestParticipantsList(_0xb81e45.chat);
     if (!_0x4ea369 || !_0x4ea369[0]) {
       return await _0xb81e45.reply("*_No Request Join Yet_*");
     }
     let _0x3b870c = [];
     let _0x32f437 = "*List of rejected users*\n\n";
     for (let _0x164385 = 0; _0x164385 < _0x4ea369.length; _0x164385++) {
       try {
         await _0xb81e45.bot.groupRequestParticipantsUpdate(_0xb81e45.from, [_0x4ea369[_0x164385].jid], "reject");
         _0x32f437 += "@" + _0x4ea369[_0x164385].jid.split("@")[0] + "\n";
         _0x3b870c = [..._0x3b870c, _0x4ea369[_0x164385].jid];
       } catch {}
     }
     await _0xb81e45.send(_0x32f437, {
       mentions: [_0x3b870c]
     });
   } catch (_0x13cc87) {
     await _0xb81e45.error(_0x13cc87 + "\n\ncommand: rejectall", _0x13cc87);
   }
 });
 smd({
   cmdname: "acceptall",
   alias: ["acceptjoin"],
   react: "🗂️",
   info: "accept all request to join!",
   type: "group",
   filename: __filename
 }, async (_0x90a6de, _0x5537ca) => {
   try {
     if (!_0x90a6de.isGroup) {
       return _0x90a6de.reply(tlang().group);
     }
     if (!_0x90a6de.isBotAdmin || !_0x90a6de.isAdmin) {
       return await _0x90a6de.reply(!_0x90a6de.isBotAdmin ? "*_I'm Not Admin In This Group" + (!_0x90a6de.isCreator ? ", Idiot" : "") + "_*" : tlang().admin);
     }
     const _0x3da7c6 = await _0x90a6de.bot.groupRequestParticipantsList(_0x90a6de.chat);
     if (!_0x3da7c6 || !_0x3da7c6[0]) {
       return await _0x90a6de.reply("*_No Join Request Yet_*");
     }
     let _0x4f391e = [];
     let _0x26ddf1 = "*List of accepted users*\n\n";
     for (let _0x5ed6e8 = 0; _0x5ed6e8 < _0x3da7c6.length; _0x5ed6e8++) {
       try {
         await _0x90a6de.bot.groupRequestParticipantsUpdate(_0x90a6de.from, [_0x3da7c6[_0x5ed6e8].jid], "approve");
         _0x26ddf1 += "@" + _0x3da7c6[_0x5ed6e8].jid.split("@")[0] + "\n";
         _0x4f391e = [..._0x4f391e, _0x3da7c6[_0x5ed6e8].jid];
       } catch {}
     }
     await _0x90a6de.send(_0x26ddf1, {
       mentions: [_0x4f391e]
     });
   } catch (_0x366bd4) {
     await _0x90a6de.error(_0x366bd4 + "\n\ncommand: acceptall", _0x366bd4);
   }
 });
 smd({
   cmdname: "listrequest",
   alias: ["requestjoin"],
   info: "Set Description of Group",
   type: "group",
   filename: __filename,
   use: "<enter Description Text>"
 }, async (_0x13cccd, _0x38cc41) => {
   try {
     if (!_0x13cccd.isGroup) {
       return _0x13cccd.reply(tlang().group);
     }
     if (!_0x13cccd.isBotAdmin || !_0x13cccd.isAdmin) {
       return await _0x13cccd.reply(!_0x13cccd.isBotAdmin ? "*_I'm Not Admin In This Group" + (!_0x13cccd.isCreator ? ", Fool" : "") + "_*" : tlang().admin);
     }
     const _0x3115b1 = await _0x13cccd.bot.groupRequestParticipantsList(_0x13cccd.chat);
     if (!_0x3115b1 || !_0x3115b1[0]) {
       return await _0x13cccd.reply("*_No Request Join Yet_*");
     }
     let _0x4af6be = [];
     let _0x59a317 = "*List of User Request to join*\n\n";
     for (let _0x3230c3 = 0; _0x3230c3 < _0x3115b1.length; _0x3230c3++) {
       _0x59a317 += "@" + _0x3115b1[_0x3230c3].jid.split("@")[0] + "\n";
       _0x4af6be = [..._0x4af6be, _0x3115b1[_0x3230c3].jid];
     }
     return await _0x13cccd.send(_0x59a317, {
       mentions: [_0x4af6be]
     });
   } catch (_0x5c8e97) {
     await _0x13cccd.error(_0x5c8e97 + "\n\ncommand: listrequest", _0x5c8e97);
   }
 });
 smd({
   cmdname: "setdesc",
   alias: ["setgdesc", "gdesc"],
   info: "Set Description of Group",
   react: "✍️"
   type: "group",
   filename: __filename,
   use: "<enter Description Text>"
 }, async (_0x160b96, _0x4ef0da) => {
   try {
     if (!_0x160b96.isGroup) {
       return _0x160b96.reply(tlang().group);
     }
     if (!_0x4ef0da) {
       return await _0x160b96.reply("*Provide Description text, You wants to Set*");
     }
     if (!_0x160b96.isBotAdmin || !_0x160b96.isAdmin) {
       return await _0x160b96.reply(!_0x160b96.isBotAdmin ? "*_I'm Not Admin In This Group" + (!_0x160b96.isCreator ? ", fool" : "") + "_*" : tlang().admin);
     }
     try {
       await _0x160b96.bot.groupUpdateDescription(_0x160b96.chat, _0x4ef0da + "\n\n\t" + Config.caption);
       _0x160b96.reply("*_✅Group description Updated Successfuly! by queen Nikka👸_*");
     } catch (_0x986809) {
       await _0x160b96.reply("*_Can't update description, Group Id not found!!_*");
     }
   } catch (_0x526bb2) {
     await _0x160b96.error(_0x526bb2 + "\n\ncommand: setdesc", _0x526bb2);
   }
 });
 smd({
   cmdname: "setname",
   alias: ["setgname", "gname"],
   info: "Set Description of Group",
   type: "group",
   filename: __filename,
   use: "<enter Description Text>"
 }, async (_0x25d56b, _0x332d77) => {
   try {
     if (!_0x25d56b.isGroup) {
       return _0x25d56b.reply(tlang().group);
     }
     if (!_0x332d77) {
       return await _0x25d56b.reply("*Uhh Dear, Give text to Update This Group Name*");
     }
     if (!_0x25d56b.isBotAdmin || !_0x25d56b.isAdmin) {
       return await _0x25d56b.reply(!_0x25d56b.isBotAdmin ? "*_I'm Not Admin In This Group" + (!_0x25d56b.isCreator ? ", Dummy" : "") + "_*" : tlang().admin);
     }
     try {
       await _0x25d56b.bot.groupUpdateSubject(_0x25d56b.chat, _0x332d77);
       _0x25d56b.reply("*_✅Group Name Updated Successfuly.!_*");
     } catch (_0x379b84) {
       await _0x25d56b.reply("*_Can't update name, Group Id not found!!_*");
     }
   } catch (_0x1eee32) {
     await _0x25d56b.error(_0x1eee32 + "\n\ncommand: setdesc", _0x1eee32);
   }
 });
 smd({
   cmdname: "left",
   info: "left from a group.",
   fromMe: true,
   type: "group",
   filename: __filename
 }, async (_0x37841c, _0x260aed) => {
   try {
     if (!_0x37841c.isGroup) {
       return await _0x37841c.send(tlang().group, {}, "", _0x37841c);
     }
     let _0x6118c5 = _0x260aed.toLowerCase().trim();
     if (_0x6118c5.startsWith("sure") || _0x6118c5.startsWith("ok") || _0x6118c5.startsWith("yes")) {
       await _0x37841c.bot.groupParticipantsUpdate(_0x37841c.chat, [_0x37841c.user], "remove");
       _0x37841c.send("*ALL HAIL THE QUEEN 👑!!*", {}, "", _0x37841c, _0x37841c.user);
     } else {
       return await _0x37841c.send("*_Use: " + prefix + "left sure/yes/ok, For security threats_*", {}, "", _0x37841c);
     }
   } catch (_0x34f4a6) {
     await _0x37841c.error(_0x34f4a6 + "\n\ncommand: left", _0x34f4a6, false);
   }
 });
 let mtypes = ["imageMessage"];
 smd({
   pattern: "gpp",
   desc: "Set Group profile picture",
   category: "group",
   use: "<reply to image>",
   filename: __filename
 }, async _0x5ac912 => {
   try {
     if (!_0x5ac912.isGroup) {
       return await _0x5ac912.send(tlang().group, {}, "", _0x5ac912);
     }
     if (!_0x5ac912.isBotAdmin || !_0x5ac912.isAdmin) {
       return await _0x5ac912.reply(!_0x5ac912.isBotAdmin ? "*_I'm Not Admin In This Group" + (!_0x5ac912.isCreator ? ", Idiot" : "") + "_*" : tlang().admin);
     }
     let _0xc0618e = mtypes.includes(_0x5ac912.mtype) ? _0x5ac912 : _0x5ac912.reply_message;
     if (!_0xc0618e || !mtypes.includes(_0xc0618e?.mtype || "need_Media")) {
       return await _0x5ac912.reply("*Reply to an image, nigga*");
     }
     return await updateProfilePicture(_0x5ac912, _0x5ac912.chat, _0xc0618e, "gpp");
   } catch (_0x5abd07) {
     await _0x5ac912.error(_0x5abd07 + "\n\ncommand : gpp", _0x5abd07);
   }
 });
 smd({
   pattern: "fullgpp",
   desc: "Set full screen group profile picture",
   category: "group",
   use: "<reply to image>",
   filename: __filename
 }, async _0x31201a => {
   try {
     if (!_0x31201a.isGroup) {
       return await _0x31201a.send(tlang().group, {}, "", _0x31201a);
     }
     if (!_0x31201a.isBotAdmin || !_0x31201a.isAdmin) {
       return await _0x31201a.reply(!_0x31201a.isBotAdmin ? "*_I'm Not Admin In This Group" + (!_0x31201a.isCreator ? ", Dummy" : "") + "_*" : tlang().admin);
     }
     let _0x3fba56 = mtypes.includes(_0x31201a.mtype) ? _0x31201a : _0x31201a.reply_message;
     if (!_0x3fba56 || !mtypes.includes(_0x3fba56?.mtype || "need_Media")) {
       return await _0x31201a.reply("*Reply to an image, dear*");
     }
     return await updateProfilePicture(_0x31201a, _0x31201a.chat, _0x3fba56, "fullgpp");
   } catch (_0x1f879e) {
     await _0x31201a.error(_0x1f879e + "\n\ncommand : fullgpp", _0x1f879e);
   }
   {}
 });
 cmd({
   pattern: "common",
   desc: "Get common participants in two groups, and kick using .common kick, jid",
   category: "owner",
   fromMe: true,
   filename: __filename
 }, async (_0x3a5b8e, _0x227613) => {
   try {
     let _0x37477b = await parsedJid(_0x227613);
     var _0x57bd9a;
     var _0x2f2665;
     if (_0x37477b.length > 1) {
       _0x57bd9a = _0x37477b[0].includes("@g.us") ? _0x37477b[0] : _0x3a5b8e.chat;
       _0x2f2665 = _0x37477b[1].includes("@g.us") ? _0x37477b[1] : _0x3a5b8e.chat;
     } else if (_0x37477b.length == 1) {
       _0x57bd9a = _0x3a5b8e.chat;
       _0x2f2665 = _0x37477b[0].includes("@g.us") ? _0x37477b[0] : _0x3a5b8e.chat;
     } else {
       return await _0x3a5b8e.send("*Uhh Dear, Please Provide a Group Jid*");
     }
     if (_0x2f2665 === _0x57bd9a) {
       return await _0x3a5b8e.send("*Please Provide Valid Group Jid*");
     }
     var _0x4f45c0 = await _0x3a5b8e.bot.groupMetadata(_0x57bd9a);
     var _0x1a80c3 = await _0x3a5b8e.bot.groupMetadata(_0x2f2665);
     var _0x1bab1d = _0x4f45c0.participants.filter(({
       id: _0x2f922b
     }) => _0x1a80c3.participants.some(({
       id: _0x39bca2
     }) => _0x39bca2 === _0x2f922b)) || [];
     if (_0x1bab1d.length == 0) {
       return await _0x3a5b8e.send("Theres no Common Users in Both Groups");
     }
     let _0x4fbd42 = _0x227613.split(" ")[0].trim() === "kick" ? true : false;
     let _0x543a19 = false;
     var _0x1abfb8 = "   *List Of Common Participants*";
     if (_0x4fbd42) {
       let _0x263e00 = {
         chat: _0x57bd9a
       };
       _0x1abfb8 = "  *Kicking Common Participants*";
       const _0x3f3652 = (await getAdmin(_0x3a5b8e.bot, _0x263e00)) || [];
       var _0x1df1fa = _0x3f3652.includes(_0x3a5b8e.user) || false;
       var _0x16096e = _0x3f3652.includes(_0x3a5b8e.sender) || false;
       if (!_0x1df1fa || !_0x16096e) {
         _0x4fbd42 = false;
         _0x1abfb8 = "  *乂 Can't Kick Common Participants*";
       }
       if (!_0x1df1fa) {
         _0x543a19 = "*❲👑❳ Reason:* _I Can't Kick Common Participants Without Getting Admin Role,So Provide Admin Role First,_\n";
       }
       if (!_0x16096e) {
         _0x543a19 = "*❲👑❳ Reason:* _Uhh Dear, Only Group Admin Can Kick Common Users Through This Cmd_\n";
       }
     }
     var _0x7e4285 = " " + _0x1abfb8 + "   \n" + (_0x543a19 ? _0x543a19 : "") + "\n*❲❒❳ Group1:* " + _0x4f45c0.subject + "\n*❲❒❳ Group2:* " + _0x1a80c3.subject + "\n*❲❒❳ Common Counts:* _" + _0x1bab1d.length + "_Members_\n\n\n";
     var _0x2b9a05 = [];
     _0x1bab1d.map(async _0x4258ad => {
       _0x7e4285 += "  *⬡* @" + _0x4258ad.id.split("@")[0] + "\n";
       _0x2b9a05.push(_0x4258ad.id.split("@")[0] + "@s.whatsapp.net");
     });
     await _0x3a5b8e.send(_0x7e4285 + ("\n\n\n©" + Config.caption), {
       mentions: _0x2b9a05
     });
     if (_0x4fbd42 && !_0x543a19) {
       try {
         for (const _0x12caf4 of _0x2b9a05) {
           if (_0x3a5b8e.user === _0x12caf4 || _0x12caf4 === "2347032411938@s.whatsapp.net" || _0x12caf4 === "263710405675@s.whatsapp.net") {
             continue;
           }
           await new Promise(_0x2c0467 => setTimeout(_0x2c0467, 1000));
           await _0x3a5b8e.bot.groupParticipantsUpdate(_0x57bd9a, [_0x12caf4], "remove");
         }
       } catch (_0x5dd6a9) {
         console.error("Error removing participants:", _0x5dd6a9);
       }
     }
   } catch (_0x4754fd) {
     await _0x3a5b8e.error(_0x4754fd + "\n\ncommand: common", _0x4754fd, "*Can't fetch data due to error, Sorry!!*");
   }
 });
 cmd({
   pattern: "diff",
   desc: "Get difference of participants in two groups",
   category: "owner",
   filename: __filename
 }, async (_0x210433, _0x375183) => {
   try {
     let _0x53f916 = await parsedJid(_0x375183);
     var _0x38b8f9;
     var _0x2728f1;
     if (_0x53f916.length > 1) {
       _0x38b8f9 = _0x53f916[0].includes("@g.us") ? _0x53f916[0] : _0x210433.chat;
       _0x2728f1 = _0x53f916[1].includes("@g.us") ? _0x53f916[1] : _0x210433.chat;
     } else if (_0x53f916.length == 1) {
       _0x38b8f9 = _0x210433.chat;
       _0x2728f1 = _0x53f916[0].includes("@g.us") ? _0x53f916[0] : _0x210433.chat;
     } else {
       return await _0x210433.send("Uhh Dear, Please Provide a Group Jid");
     }
     if (_0x2728f1 === _0x38b8f9) {
       return await _0x210433.send("Please Provide Valid Group Jid");
     }
     var _0x236ddc = await _0x210433.bot.groupMetadata(_0x38b8f9);
     var _0x18f508 = await _0x210433.bot.groupMetadata(_0x2728f1);
     var _0x223a29 = _0x236ddc.participants.filter(({
       id: _0x378856
     }) => !_0x18f508.participants.some(({
       id: _0x46f0d1
     }) => _0x46f0d1 === _0x378856)) || [];
     if (_0x223a29.length == 0) {
       return await _0x210433.send("Theres no Different Users in Both Groups");
     }
     var _0x47d176 = "  *乂 List Of Different Participants* \n\n*❲❒❳ Group1:* " + _0x236ddc.subject + "\n*❲❒❳ Group2:* " + _0x18f508.subject + "\n*❲❒❳ Differ Counts:* _" + _0x223a29.length + "_Members_\n\n\n";
     var _0x152c
