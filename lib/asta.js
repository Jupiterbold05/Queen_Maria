const axios = require("axios");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs-extra");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const Jimp = require("jimp");
const fetch = require("node-fetch");
const {
  getBuffer,
  fetchJson,
  runtime,
  isUrl,
  GIFBufferToVideoBuffer
} = require("./serialized");
let sides = "*";
const {
  tlang,
  TelegraPh,
  dare,
  truth,
  random_question
} = require("./scraper");
const {
  bot_
} = require("./schemes");
const Config = require("../config.js");
let caption = Config.caption || "";
const {
  Innertube,
  UniversalCache,
  Utils
} = require("youtubei.js");
const {
  existsSync,
  mkdirSync,
  createWriteStream
} = require("fs");
let yt = {};
yt.getInfo = async (_0x3c2895, _0x49e43c = {}) => {
  try {
    if (!global.AstroOfficial) {
      return;
    }
    const _0x3f4543 = await Innertube.create({
      cache: new UniversalCache(false),
      generate_session_locally: true
    });
    let _0x538e69 = await _0x3f4543.getInfo(_0x3c2895, _0x49e43c);
    let _0x1cb8d4 = [];
    for (let _0x21836a = 0; _0x21836a < _0x538e69.streaming_data.formats.length; _0x21836a++) {
      await _0x1cb8d4.push(_0x538e69.streaming_data.formats[_0x21836a].quality_label);
    }
    let _0x3ea204 = _0x1cb8d4.includes("360p") ? "360p" : "best";
    let _0x3296e8 = {
      status: true,
      title: _0x538e69.basic_info.title,
      id: _0x538e69.basic_info.id,
      quality: _0x1cb8d4,
      pref_Quality: _0x3ea204,
      duration: _0x538e69.basic_info.duration,
      description: _0x538e69.basic_info.short_description,
      keywords: _0x538e69.basic_info.keywords,
      thumbnail: _0x538e69.basic_info.thumbnail[0].url,
      author: _0x538e69.basic_info.author,
      views: _0x538e69.basic_info.view_count,
      likes: _0x538e69.basic_info.like_count,
      category: _0x538e69.basic_info.category,
      channel: _0x538e69.basic_info.channel,
      basic_info: _0x538e69
    };
    return _0x3296e8;
  } catch (_0x39b819) {
    console.log("./lib/asta/yt.getInfo()\n", _0x39b819.message);
    return {
      status: false
    };
  }
};
yt.download = async (_0x1ea0cb, _0x5c75ae = {
  type: "video",
  quality: "best",
  format: "mp4"
}) => {
  try {
    if (!global.AstroOfficial) {
      return;
    }
    const _0x47c128 = await Innertube.create({
      cache: new UniversalCache(false),
      generate_session_locally: true
    });
    let _0x2d2cde = _0x5c75ae.type ? _0x5c75ae.type : "video";
    let _0x12faa2 = _0x2d2cde === "audio" ? "best" : _0x5c75ae.quality ? _0x5c75ae.quality : "best";
    let _0x52ce78 = _0x5c75ae.format ? _0x5c75ae.format : "mp4";
    const _0xdd017a = await _0x47c128.download(_0x1ea0cb, {
      type: _0x2d2cde,
      quality: _0x12faa2,
      format: _0x52ce78
    });
    const _0x150898 = "./temp";
    if (!existsSync(_0x150898)) {
      mkdirSync(_0x150898);
    }
    let _0x35b4d2 = _0x2d2cde === "video" ? "mp4" : "m4a";
    let _0x3991fc = _0x150898 + "/Asta-Md " + _0x1ea0cb + "." + _0x35b4d2;
    var _0x1dcf9 = createWriteStream(_0x3991fc);
    for await (const _0x32868e of Utils.streamToIterable(_0xdd017a)) {
      _0x1dcf9.write(_0x32868e);
    }
    return _0x3991fc;
  } catch (_0x26244e) {
    console.log("./lib/asta/yt.dowanload()\n", _0x26244e.message);
    return false;
  }
};
async function sendAnimeReaction(_0x5c448a, _0x46face = "punch", _0x50961f = "", _0x426154 = "") {
  try {
    var _0x1b5aac = await fetchJson("https://api.waifu.pics/sfw/" + _0x46face);
    const _0x55f096 = await axios.get(_0x1b5aac.url, {
      responseType: "arraybuffer"
    });
    const _0x43f098 = Buffer.from(_0x55f096.data, "utf-8");
    let _0x5b40dd = _0x5c448a.mentionedJid ? _0x5c448a.mentionedJid[0] : _0x5c448a.quoted ? _0x5c448a.quoted.sender : false;
    let _0x21964f = await GIFBufferToVideoBuffer(_0x43f098);
    let _0x51f2b9 = _0x5b40dd ? sides + "@" + _0x5c448a.sender.split("@")[0] + " " + _0x50961f + " @" + _0x5b40dd.split("@")[0] + sides : sides + "@" + _0x5c448a.sender.split("@")[0] + " " + _0x426154 + sides;
    if (_0x5b40dd) {
      return await _0x5c448a.bot.sendMessage(_0x5c448a.chat, {
        video: _0x21964f,
        gifPlayback: true,
        mentions: [_0x5b40dd, _0x5c448a.sender],
        caption: _0x51f2b9
      }, {
        quoted: _0x5c448a,
        messageId: _0x5c448a.bot.messageId()
      });
    } else {
      return await _0x5c448a.bot.sendMessage(_0x5c448a.chat, {
        video: _0x21964f,
        gifPlayback: true,
        mentions: [_0x5c448a.sender],
        caption: _0x51f2b9
      }, {
        quoted: _0x5c448a,
        messageId: _0x5c448a.bot.messageId()
      });
    }
  } catch (_0x1b7c90) {
    return await _0x5c448a.error(_0x1b7c90 + "\nERROR AT : /lib/asta.js/sendAnimeReaction()\n\ncommand: " + _0x46face);
  }
}
async function sendGImages(_0x4a189d, _0x4eee7c, _0x205b7c = caption, _0x1caf0d = "") {
  try {
    let _0x5a7b69 = require("async-g-i-s");
    let _0x13a23e = await _0x5a7b69(_0x4eee7c);
    let _0x56c98f = _0x13a23e[Math.floor(Math.random() * _0x13a23e.length)].url;
    let _0xd91af3 = {
      image: {
        url: _0x56c98f
      },
      caption: _0x205b7c,
      contextInfo: {
        externalAdReply: {
          title: tlang().title,
          body: _0x1caf0d,
          thumbnail: log0,
          mediaType: 1,
          mediaUrl: gurl,
          sourceUrl: gurl
        }
      }
    };
    return await _0x4a189d.bot.sendMessage(_0x4a189d.chat, _0xd91af3, {
      quoted: _0x4a189d,
      messageId: _0x4a189d.bot.messageId()
    });
  } catch (_0x36d8e7) {
    await _0x4a189d.error(_0x36d8e7);
    return console.log("./lib/asta.js/sendGImages()\n", _0x36d8e7);
  }
}
async function AudioToBlackVideo(_0x2bac4d, _0x568b06) {
  try {
    try {
      fs.unlinkSync(_0x568b06);
    } catch (_0x1ca356) {}
    const _0x4b7070 = "ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 " + _0x2bac4d;
    const {
      stdout: _0x356d80
    } = await exec(_0x4b7070);
    const _0x4ffac3 = parseFloat(_0x356d80);
    let _0x222ae6 = "./temp/blackScreen.mp4";
    try {
      fs.unlinkSync(_0x222ae6);
    } catch (_0x526371) {}
    const _0x32b4ee = "ffmpeg -f lavfi -i color=c=black:s=1280x720:d=" + _0x4ffac3 + " -vf \"format=yuv420p\" " + _0x222ae6;
    await exec(_0x32b4ee);
    const _0x332e3c = "ffmpeg -i " + _0x222ae6 + " -i " + _0x2bac4d + " -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 " + _0x568b06;
    await exec(_0x332e3c);
    console.log("Audio converted to black screen video successfully!");
    return {
      result: true
    };
  } catch (_0x4971e7) {
    console.error("./lib/Aviator.js/AudioToBlackVideo()\n", _0x4971e7);
    return {
      result: false
    };
  }
}
async function textToLogoGenerator(_0x371218, _0x4f590d = "", _0x13a1c2 = "", _0x11339e = "ser", _0x2091c1 = "textpro", _0x1bd248 = true) {
  let _0x19543f = {};
  let _0x1d4467 = {};
  let _0x44b219 = /1|ephoto|ephoto360/gi.test(_0x2091c1) ? "https://ephoto360.com/" + _0x4f590d + ".html" : /2|potoxy|photooxy/gi.test(_0x2091c1) ? "https://photooxy.com/" + _0x4f590d + ".html" : /3|enphoto|en360/gi.test(_0x2091c1) ? "https://en.ephoto360.com/" + _0x4f590d + ".html" : "https://textpro.me/" + _0x4f590d + ".html";
  try {
    const {
      textpro: _0x4cf419
    } = require("mumaker");
    if (_0x13a1c2) {
      _0x19543f = await _0x4cf419(_0x44b219, [_0x13a1c2, _0x11339e]);
    }
    let _0x339d4a = {} || {
      ...(await _0x371218.bot.contextInfo("ᴛᴇxᴛ ᴛᴏ ʟᴏɢᴏ", "Hello " + _0x371218.senderName))
    };
    return await _0x371218.bot.sendMessage(_0x371218.jid, {
      image: {
        url: _0x19543f.image
      },
      caption: caption,
      contextInfo: _0x339d4a
    }, {
      messageId: _0x371218.bot.messageId()
    });
  } catch (_0x4845d6) {
    try {
      let _0x4a65d4 = global.api_smd + ("/api/maker?text1=" + _0x13a1c2 + "&text2=" + _0x11339e + "&url=" + _0x44b219);
      _0x1d4467 = await fetchJson(_0x4a65d4);
      if ((!_0x1d4467 || !_0x1d4467.status || !_0x1d4467.img) && _0x1bd248) {
        return _0x371218.error(_0x4845d6 + "\nWebinfo:" + (_0x1d4467.img || _0x1d4467) + "\n\nfileName: textToLogoGenerator->s.js", _0x4845d6);
      }
      await _0x371218.bot.sendMessage(_0x371218.jid, {
        image: {
          url: _0x1d4467.img
        }
      }, {
        messageId: _0x371218.bot.messageId()
      });
    } catch (_0x549deb) {
      let _0xa9ebc6 = _0x19543f && _0x19543f.image ? _0x19543f.image : _0x1d4467 && _0x1d4467.img ? _0x1d4467.img : false;
      if (_0x1bd248) {
        _0x371218.error(_0x4845d6 + "\n\nAPI Error : " + _0x549deb + "\n\nfileName: textToLogoGenerator->s.js", _0x4845d6, (_0xa9ebc6 ? "Here we go\n\n" + _0xa9ebc6 : "Error, Request Denied!").trim());
      }
    }
  }
}
async function photoEditor(_0x17796b, _0x343213 = "ad", _0xf62b7f = "", _0xe1eb47 = true) {
  let _0xc6e0fc = ["imageMessage"];
  try {
    let _0x430f77 = _0xc6e0fc.includes(_0x17796b.mtype) ? _0x17796b : _0x17796b.reply_message;
    if (!_0x430f77 || !_0xc6e0fc.includes(_0x430f77?.mtype || "null")) {
      return await _0x17796b.send("*_Uhh Dear, Reply to an image_*");
    }
    let _0x2de3c4 = await _0x17796b.bot.downloadAndSaveMediaMessage(_0x430f77);
    let _0x9a4084 = await TelegraPh(_0x2de3c4);
    try {
      fs.unlinkSync(_0x2de3c4);
    } catch (_0x408f7d) {}
    return await _0x17796b.bot.sendMessage(_0x17796b.chat, {
      image: {
        url: "https://api.popcat.xyz/" + _0x343213 + "?image=" + _0x9a4084
      },
      caption: _0xf62b7f
    }, {
      quoted: _0x17796b,
      messageId: _0x17796b.bot.messageId()
    });
  } catch (_0x23ac28) {
    if (_0xe1eb47) {
      await _0x17796b.error(_0x23ac28 + "\n\ncommand: " + _0x343213 + "\nfileName: photoEditor->s.js", _0x23ac28);
    }
  }
}
async function plugins(_0x2e788f, _0x4280e5, _0x76cd91 = "", _0x1c4e25 = "") {
  let _0x3d202e = "";
  try {
    let _0x2d5c25 = (await bot_.findOne({
      id: "bot_" + _0x2e788f.user
    })) || (await bot_.new({
      id: "bot_" + _0x2e788f.user
    }));
    let _0x188cac = _0x2d5c25.plugins;
    if (_0x4280e5.toLowerCase() === "install") {
      let _0x541ac2 = "";
      for (let _0x347ccf of isUrl(_0x76cd91)) {
        var _0x5b08b6 = new URL(_0x347ccf.replace(/[_*]+$/, ""));
        _0x5b08b6 = _0x5b08b6.href.includes("raw") ? _0x5b08b6.href : _0x5b08b6.href + "/raw";
        const {
          data: _0x152c5d
        } = await axios.get(_0x5b08b6);
        let _0x79382e = /pattern: ["'](.*)["'],/g.exec(_0x152c5d) || /cmdname: ["'](.*)["'],/g.exec(_0x152c5d) || /name: ["'](.*)["'],/g.exec(_0x152c5d);
        if (!_0x79382e) {
          _0x3d202e += "*gist not found:* _" + _0x5b08b6 + "_ \n";
          continue;
        }
        let _0x4cfa49 = _0x79382e[1].split(" ")[0] || Math.random().toString(36).slice(-5);
        let _0x147cc6 = _0x4cfa49.replace(/[^A-Za-z]/g, "");
        if (_0x541ac2.includes(_0x147cc6)) {
          continue;
        } else {
          _0x541ac2 = _0x541ac2 + "[\"" + _0x147cc6 + "\"] ";
        }
        if (_0x188cac[_0x147cc6]) {
          _0x3d202e += "*Plugin _'" + _0x147cc6 + "'_ already installed!*\n";
          continue;
        }
        let _0x28bcbb = _0x1c4e25 + "/" + _0x147cc6 + ".smd";
        await fs.writeFileSync(_0x28bcbb, _0x152c5d, "utf8");
        try {
          require(_0x28bcbb);
        } catch (_0x7243e7) {
          fs.unlinkSync(_0x28bcbb);
          _0x3d202e += "*Invalid :* _" + _0x5b08b6 + "_\n ```" + _0x7243e7 + "```\n\n ";
          continue;
        }
        if (!_0x188cac[_0x147cc6]) {
          _0x188cac[_0x147cc6] = _0x5b08b6;
          await bot_.updateOne({
            id: "bot_" + _0x2e788f.user
          }, {
            plugins: _0x188cac
          });
          _0x3d202e += "*Plugin _'" + _0x147cc6 + "'_ Succesfully installed!*\n";
        }
      }
    } else if (_0x4280e5.toLowerCase() === "remove") {
      if (_0x76cd91 === "all") {
        let _0x15e8b6 = "";
        for (const _0x1b15fa in _0x188cac) {
          try {
            fs.unlinkSync(_0x1c4e25 + "/" + _0x1b15fa + ".smd");
            _0x15e8b6 = "" + _0x15e8b6 + _0x1b15fa + ",";
          } catch (_0x5b48c7) {
            console.log("❌ " + _0x1b15fa + " ❌ NOT BE REMOVED", _0x5b48c7);
          }
        }
        await bot_.updateOne({
          id: "bot_" + _0x2e788f.user
        }, {
          plugins: {}
        });
        _0x3d202e = "*External plugins " + (_0x15e8b6 ? _0x15e8b6 : "all") + " removed!!!*";
      } else {
        try {
          if (_0x188cac[_0x76cd91]) {
            try {
              fs.unlinkSync(_0x1c4e25 + "/" + _0x76cd91 + ".smd");
            } catch {}
            delete _0x188cac[_0x76cd91];
            await bot_.updateOne({
              id: "bot_" + _0x2e788f.user
            }, {
              plugins: _0x188cac
            });
            _0x3d202e += "*Plugin _'" + _0x76cd91 + "'_ Succesfully removed!*";
          } else {
            _0x3d202e += "*_plugin not exist in " + Config.botname + "_*";
          }
        } catch (_0x133006) {
          console.log("Error while removing plugins \n ", _0x133006);
        }
      }
    } else if (_0x4280e5.toLowerCase() === "plugins") {
      if (_0x76cd91) {
        _0x3d202e = _0x188cac[_0x76cd91] ? "*_" + _0x76cd91 + ":_* " + _0x188cac[_0x76cd91] : false;
      } else {
        for (const _0x261bce in _0x188cac) {
          _0x3d202e += "*" + (_0x261bce + 1) + ":* " + _0x261bce + " \n*Url:* " + _0x188cac[_0x261bce] + "\n\n";
        }
      }
    }
    return _0x3d202e;
  } catch (_0x4a88ef) {
    console.log("Plugins : ", _0x4a88ef);
    return (_0x3d202e + " \n\nError: " + _0x4a88ef).trim();
  }
}
async function updateProfilePicture(_0x222037, _0x288358, _0x356e2d, _0x42b490 = "pp") {
  try {
    if (_0x42b490 === "pp" || _0x42b490 === "gpp") {
      let _0x25ce47 = await _0x222037.bot.downloadAndSaveMediaMessage(_0x356e2d);
      await _0x222037.bot.updateProfilePicture(_0x288358, {
        url: _0x25ce47
      });
    } else {
      async function _0x2e4ae1(_0x2fed3e) {
        const _0x451493 = await Jimp.read(_0x2fed3e);
        const _0x160ea5 = _0x451493.getWidth();
        const _0x130adc = _0x451493.getHeight();
        const _0xa030b1 = _0x451493.crop(0, 0, _0x160ea5, _0x130adc);
        return {
          img: await _0xa030b1.scaleToFit(324, 720).getBufferAsync(Jimp.MIME_JPEG),
          preview: await _0xa030b1.normalize().getBufferAsync(Jimp.MIME_JPEG)
        };
      }
      try {
        const _0x44a93d = await _0x356e2d.download();
        const {
          query: _0xb7b2b0
        } = _0x222037.bot;
        const {
          preview: _0x27ac1a
        } = await _0x2e4ae1(_0x44a93d);
        await _0xb7b2b0({
          tag: "iq",
          attrs: {
            to: _0x288358,
            type: "set",
            xmlns: "w:profile:picture"
          },
          content: [{
            tag: "picture",
            attrs: {
              type: "image"
            },
            content: _0x27ac1a
          }]
        });
      } catch (_0x242917) {
        let _0x463b86 = await _0x222037.bot.downloadAndSaveMediaMessage(_0x356e2d);
        await _0x222037.bot.updateProfilePicture(_0x288358, {
          url: _0x463b86
        });
        return await _0x222037.error(_0x242917 + " \n\ncommand: update pp", _0x242917, false);
      }
    }
    return await _0x222037.reply("*_Profile icon updated Succesfully!!_*");
  } catch (_0x24cb69) {
    return await _0x222037.error(_0x24cb69 + " \n\ncommand: " + (_0x42b490 ? _0x42b490 : "pp"), _0x24cb69);
  }
}
async function forwardMessage(_0x56dbe1, _0x5eaf75, _0x561de2 = "") {
  let _0x48c6f4 = _0x5eaf75.quoted.mtype;
  let _0x3af25e;
  if (_0x48c6f4 === "videoMessage" && _0x561de2 === "ptv") {
    _0x3af25e = {
      ptvMessage: {
        ..._0x5eaf75.quoted
      }
    };
  } else if (_0x48c6f4 === "videoMessage") {
    _0x3af25e = {
      videoMessage: {
        ..._0x5eaf75.quoted
      }
    };
  } else if (_0x48c6f4 === "imageMessage") {
    _0x3af25e = {
      imageMessage: {
        ..._0x5eaf75.quoted
      }
    };
  } else if (_0x48c6f4 === "audioMessage") {
    _0x3af25e = {
      audioMessage: {
        ..._0x5eaf75.quoted
      }
    };
  } else if (_0x48c6f4 === "documentMessage") {
    _0x3af25e = {
      documentMessage: {
        ..._0x5eaf75.quoted
      }
    };
  } else if (_0x48c6f4 === "conversation" || _0x48c6f4 === "extendedTextMessage") {
    return await _0x5eaf75.send(_0x5eaf75.quoted.text, {}, "", _0x5eaf75, _0x56dbe1);
  }
  if (_0x3af25e) {
    try {
      await Suhail.bot.relayMessage(_0x56dbe1, _0x3af25e, {
        messageId: _0x5eaf75.key.id
      });
    } catch (_0x27920e) {
      console.log("Error in " + _0x561de2 + "-cmd in forwardMessage \n", _0x27920e);
      if (_0x561de2 === "ptv" || _0x561de2 === "save") {
        await _0x5eaf75.error(_0x27920e);
      }
    }
  }
}
async function generateSticker(_0x43a996, _0x5c979b, _0x116cae = {
  pack: Config.packname,
  author: Config.author
}, _0x5b1252 = true) {
  try {
    const {
      Sticker: _0x92981e,
      createSticker: _0x1a1a97,
      StickerTypes: _0x5f17c1
    } = require("wa-sticker-formatter");
    let _0x54c67c = new _0x92981e(_0x5c979b, {
      ..._0x116cae
    });
    return await _0x43a996.bot.sendMessage(_0x43a996.chat, {
      sticker: await _0x54c67c.toBuffer()
    }, {
      quoted: _0x43a996,
      messageId: _0x43a996.bot.messageId()
    });
  } catch (_0x32ee71) {
    if (_0x5b1252) {
      await _0x43a996.error(_0x32ee71 + "\n\nfileName: generateSticker->s.js\n");
    }
  }
}
async function getRandom(_0xf0461b = ".jpg", _0x48110d = 10000) {
  return "" + Math.floor(Math.random() * _0x48110d) + _0xf0461b;
}
async function randomeFunfacts(_0x1be35e) {
  try {
    if (_0x1be35e === "question") {
      return await random_question();
    } else if (_0x1be35e === "truth") {
      return await truth();
    } else if (_0x1be35e === "dare") {
      return await dare();
    } else if (_0x1be35e === "joke") {
      const _0x4fe671 = await (await fetch("https://official-joke-api.appspot.com/random_joke")).json();
      return "*Joke :* " + _0x4fe671.setup + "\n*Punchline:*  " + _0x4fe671.punchline;
    } else if (_0x1be35e === "joke2") {
      const _0x1cc76d = await (await fetch("https://v2.jokeapi.dev/joke/Any?type=single")).json();
      return "*joke :* " + _0x1cc76d.joke;
    } else if (_0x1be35e === "fact") {
      const {
        data: _0x202058
      } = await axios.get("https://nekos.life/api/v2/fact");
      return "*Fact:* " + _0x202058.fact;
    } else if (_0x1be35e === "quotes") {
      const {
        data: _0x6d4253
      } = await axios.get("https://favqs.com/api/qotd");
      return "╔════◇\n║ *🎗️Content:* " + _0x6d4253.quote.body + "\n║ *👤Author:* " + _0x6d4253.quote.author + "\n║\n╚════════════╝";
    }
  } catch (_0x1147af) {
    msg.error(_0x1147af);
    console.log("./lib/asta.js/randomeFunfacts()\n", _0x1147af);
  }
}
async function audioEditor(_0x1ef339, _0x567a0f = "bass", _0x730356 = "") {
  if (!_0x1ef339.quoted) {
    return await _0x1ef339.send("*_Uhh Dear, Reply to audio!!!_*");
  }
  let _0x1e4c20 = _0x1ef339.quoted.mtype || _0x1ef339.mtype;
  if (!/audio/.test(_0x1e4c20)) {
    return await _0x1ef339.send("*_Reply to the audio you want to change with_*", {}, "", _0x730356);
  }
  try {
    let _0x3497f6 = "-af equalizer=f=54:width_type=o:width=2:g=20";
    if (/bass/.test(_0x567a0f)) {
      _0x3497f6 = "-af equalizer=f=54:width_type=o:width=2:g=20";
    }
    if (/blown/.test(_0x567a0f)) {
      _0x3497f6 = "-af acrusher=.1:1:64:0:log";
    }
    if (/deep/.test(_0x567a0f)) {
      _0x3497f6 = "-af atempo=4/4,asetrate=44500*2/3";
    }
    if (/earrape/.test(_0x567a0f)) {
      _0x3497f6 = "-af volume=12";
    }
    if (/fast/.test(_0x567a0f)) {
      _0x3497f6 = "-filter:a \"atempo=1.63,asetrate=44100\"";
    }
    if (/fat/.test(_0x567a0f)) {
      _0x3497f6 = "-filter:a \"a
