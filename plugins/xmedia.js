const moment = require("moment-timezone");
const {
  fetchJson,
  smd,
  tlang,
  send,
  getBuffer,
  prefix,
  Config,
  sleep,
} = require("../lib");
const axios = require("axios");
const fetch = require("node-fetch");
const { shazam } = require("../lib");
let yts = require("secktor-pack");
const { MessageType, Mimetype } = require("@whiskeysockets/baileys");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const { execFile } = require("child_process");
const exec = require("child_process").exec;
smd(
  {
    pattern: "x4mp4",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x4b18a7) => {
    try {
      if (!_0x4b18a7.reply_message.video) {
        return await _0x4b18a7.send("*Need Video!*");
      }
      let _0x4ef7a7 = "./temp/x4mp4.mp4";
      var _0x15f54e = await _0x4b18a7.bot.downloadAndSaveMediaMessage(
        _0x4b18a7.quoted.msg
      );
      ffmpeg(_0x15f54e)
        .withSize("25%")
        .format("mp4")
        .save(_0x4ef7a7)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x15f54e);
          } catch (_0x5d7674) {}
          await _0x4b18a7.bot.sendMessage(_0x4b18a7.jid, {
            video: fs.readFileSync(_0x4ef7a7),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync("./temp/output.mp4");
          } catch (_0x41f0af) {}
        });
    } catch (_0x24d276) {
      return await _0x4b18a7.error(
        _0x24d276 + "\n\n command: coffe",
        _0x24d276,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "x2mp4",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x366978) => {
    try {
      if (!_0x366978.reply_message.video) {
        return await _0x366978.send("*Need Video!*");
      }
      let _0xd7e5e = "./temp/x2mp4.mp4";
      var _0x250def = await _0x366978.bot.downloadAndSaveMediaMessage(
        _0x366978.quoted.msg
      );
      ffmpeg(_0x250def)
        .withSize("50%")
        .format("mp4")
        .save(_0xd7e5e)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x250def);
          } catch (_0x51a807) {}
          await _0x366978.bot.sendMessage(_0x366978.jid, {
            video: fs.readFileSync(_0xd7e5e),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0xd7e5e);
          } catch (_0x123c69) {}
        });
    } catch (_0x48689b) {
      return await _0x366978.error(
        _0x48689b + "\n\n command: x2mp4",
        _0x48689b,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4image",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x46cbb2) => {
    try {
      if (!_0x46cbb2.reply_message.image) {
        return await _0x46cbb2.send("*Need image!*");
      }
      let _0x4fe7c4 = "./temp/x2mp4.mp4";
      var _0x2190cb = await _0x46cbb2.bot.downloadAndSaveMediaMessage(
        _0x46cbb2.quoted.msg
      );
      console.log("checking location : ", _0x2190cb);
      ffmpeg(_0x2190cb)
        .loop(6)
        .fps(19)
        .videoBitrate(400)
        .size("640x480")
        .format("mp4")
        .save(_0x4fe7c4)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x2190cb);
          } catch (_0x29694a) {}
          await _0x46cbb2.sendMessage(_0x46cbb2.jid, {
            video: fs.readFileSync(_0x4fe7c4),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x4fe7c4);
          } catch (_0x56669d) {}
        });
    } catch (_0x289740) {
      return await _0x46cbb2.error(
        _0x289740 + "\n\n command: x2mp4",
        _0x289740,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4vintage",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x3ea4a9) => {
    try {
      if (!_0x3ea4a9.reply_message.video) {
        return await _0x3ea4a9.send("*Need Video!*");
      }
      let _0x3ad4d2 = "./temp/mp4vintage.mp4";
      var _0xf321 = await _0x3ea4a9.bot.downloadAndSaveMediaMessage(
        _0x3ea4a9.quoted.msg
      );
      ffmpeg(_0xf321)
        .outputOptions(["-y", "-vf", "curves=vintage,format=yuv420p"])
        .fps(22)
        .save(_0x3ad4d2)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0xf321);
          } catch (_0x174c55) {}
          await _0x3ea4a9.bot.sendMessage(_0x3ea4a9.jid, {
            video: fs.readFileSync(_0x3ad4d2),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x3ad4d2);
          } catch (_0x3e0650) {}
        });
    } catch (_0x321ae3) {
      return await _0x3ea4a9.error(
        _0x321ae3 + "\n\n command: mp4vintage",
        _0x321ae3,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4reverse",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x4f5b42) => {
    try {
      if (!_0x4f5b42.reply_message.video) {
        return await _0x4f5b42.send("*Need Video!*");
      }
      let _0x129d1f = "./temp/mp4reverse.mp4";
      var _0x2fe7fb = await _0x4f5b42.bot.downloadAndSaveMediaMessage(
        _0x4f5b42.quoted.msg
      );
      ffmpeg(_0x2fe7fb)
        .outputOptions(["-y", "-vf", "reverse", "-af", "areverse"])
        .format("mp4")
        .fps(22)
        .save(_0x129d1f)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x2fe7fb);
          } catch (_0x1bd563) {}
          await _0x4f5b42.bot.sendMessage(_0x4f5b42.jid, {
            video: fs.readFileSync(_0x129d1f),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x129d1f);
          } catch (_0x455893) {}
        });
    } catch (_0x42284c) {
      return await _0x4f5b42.error(
        _0x42284c + "\n\n command: mp4reverse",
        _0x42284c,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4bw",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x7aa23c) => {
    try {
      if (!_0x7aa23c.reply_message.video) {
        return await _0x7aa23c.send("*Need Video!*");
      }
      let _0x3cc99e = "./temp/mp4bw.mp4";
      var _0x41b53a = await _0x7aa23c.bot.downloadAndSaveMediaMessage(
        _0x7aa23c.quoted.msg
      );
      ffmpeg(_0x41b53a)
        .outputOptions(["-y", "-vf", "hue=s=0"])
        .format("mp4")
        .save(_0x3cc99e)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x41b53a);
          } catch (_0x1d4df6) {}
          await _0x7aa23c.bot.sendMessage(_0x7aa23c.jid, {
            video: fs.readFileSync(_0x3cc99e),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x3cc99e);
          } catch (_0x5f4e04) {}
        });
    } catch (_0x5c34d8) {
      return await _0x7aa23c.error(
        _0x5c34d8 + "\n\n command: mp4bw",
        _0x5c34d8,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4enhance",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x9057cf) => {
    try {
      if (!_0x9057cf.reply_message.video) {
        return await _0x9057cf.send("*Need Video!*");
      }
      let _0x240121 = "./temp/mp4enhance.mp4";
      var _0x229d8f = await _0x9057cf.bot.downloadAndSaveMediaMessage(
        _0x9057cf.quoted.msg
      );
      ffmpeg(_0x229d8f)
        .outputOptions(["-y", "-vf", "unsharp=3:3:1.5"])
        .format("mp4")
        .save(_0x240121)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x229d8f);
          } catch (_0x1a85d6) {}
          await _0x9057cf.bot.sendMessage(_0x9057cf.jid, {
            video: fs.readFileSync(_0x240121),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x240121);
          } catch (_0x464135) {}
        });
    } catch (_0x384772) {
      return await _0x9057cf.error(
        _0x384772 + "\n\n command: mp4enhance",
        _0x384772,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4blur",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x1cd89e) => {
    try {
      if (!_0x1cd89e.reply_message.video) {
        return await _0x1cd89e.send("*Need Video!*");
      }
      let _0x266ccd = "./temp/mp4blur.mp4";
      var _0x3b01ff = await _0x1cd89e.bot.downloadAndSaveMediaMessage(
        _0x1cd89e.quoted.msg
      );
      ffmpeg(_0x3b01ff)
        .outputOptions([
          "-y",
          "-vf",
          "split[original][copy];[copy]scale=ih*16/9:-1,crop=h=iw*9/16,gblur=sigma=20[blurred];[blurred][original]overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2",
        ])
        .save(_0x266ccd)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x3b01ff);
          } catch (_0x860bdc) {}
          await _0x1cd89e.bot.sendMessage(_0x1cd89e.jid, {
            video: fs.readFileSync(_0x266ccd),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x266ccd);
          } catch (_0x3a1c61) {}
        });
    } catch (_0x3d1468) {
      return await _0x1cd89e.error(
        _0x3d1468 + "\n\n command: mp4blur",
        _0x3d1468,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4edge",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x268562) => {
    try {
      if (!_0x268562.reply_message.video) {
        return await _0x268562.send("*Need Video!*");
      }
      let _0x1880a8 = "./temp/mp4edge.mp4";
      var _0x239d82 = await _0x268562.bot.downloadAndSaveMediaMessage(
        _0x268562.quoted.msg
      );
      ffmpeg(_0x239d82)
        .outputOptions([
          "-y",
          "-codec:v",
          "mpeg4",
          "-filter:v",
          "edgedetect=low=0.9:high=0.3",
        ])
        .format("mp4")
        .save(_0x1880a8)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x239d82);
          } catch (_0x5234ee) {}
          await _0x268562.bot.sendMessage(_0x268562.jid, {
            video: fs.readFileSync(_0x1880a8),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x1880a8);
          } catch (_0x1ff4c1) {}
        });
    } catch (_0x43e29b) {
      return await _0x268562.error(
        _0x43e29b + "\n\n command: mp4edge",
        _0x43e29b,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "gif2",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x1b6921) => {
    try {
      if (!_0x1b6921.reply_message.video) {
        return await _0x1b6921.send("*Need Video!*");
      }
      let _0x6cbbe1 = "./temp/gif.mp4";
      var _0xdb859c = await _0x1b6921.bot.downloadAndSaveMediaMessage(
        _0x1b6921.quoted.msg
      );
      console.log("checking location : ", _0xdb859c);
      ffmpeg(_0xdb859c)
        .noAudio()
        .fps(13)
        .videoBitrate(500)
        .save(_0x6cbbe1)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0xdb859c);
          } catch (_0x5f55b3) {}
          await _0x1b6921.sendMessage(_0x1b6921.jid, {
            video: fs.readFileSync(_0x6cbbe1),
            caption: Config.caption,
            gifplayback: true,
          });
          try {
            fs.unlinkSync(_0x6cbbe1);
          } catch (_0x534c20) {}
        });
    } catch (_0x2a29f2) {
      return await _0x1b6921.error(
        _0x2a29f2 + "\n\n command: gif",
        _0x2a29f2,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "agif",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x502c2d) => {
    try {
      if (!_0x502c2d.reply_message.video) {
        return await _0x502c2d.send("*Need Video!*");
      }
      let _0x579ed0 = "./temp/agif.mp4";
      var _0x16f62a = await _0x502c2d.bot.downloadAndSaveMediaMessage(
        _0x502c2d.quoted.msg
      );
      console.log("checking location : ", _0x16f62a);
      ffmpeg(_0x16f62a)
        .fps(13)
        .videoBitrate(500)
        .save(_0x579ed0)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x16f62a);
          } catch (_0x21b110) {}
          await _0x502c2d.sendMessage(_0x502c2d.jid, {
            video: fs.readFileSync(_0x579ed0),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x579ed0);
          } catch (_0x3c5b81) {}
        });
    } catch (_0x280723) {
      return await _0x502c2d.error(
        _0x280723 + "\n\n command: agif",
        _0x280723,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4rainbow",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x362c61) => {
    try {
      if (!_0x362c61.reply_message.Video) {
        return await _0x362c61.send("*Need Video!*");
      }
      let _0x3415e4 = "./temp/mp4rainbow.mp4";
      var _0x4a260c = await _0x362c61.bot.downloadAndSaveMediaMessage(
        _0x362c61.quoted.msg
      );
      console.log("checking location : ", _0x4a260c);
      ffmpeg(_0x4a260c)
        .outputOptions([
          "-y",
          "-vf",
          "geq=r='X/W*r(X,Y)':g='(1-X/W)*g(X,Y)':b='(H-Y)/H*b(X,Y)",
          "-pix_fmt yuv420p",
        ])
        .videoFilters("eq=brightness=0.5")
        .save(_0x3415e4)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x4a260c);
          } catch (_0x4e9e6c) {}
          await _0x362c61.sendMessage(_0x362c61.jid, {
            video: fs.readFileSync(_0x3415e4),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x3415e4);
          } catch (_0x42e1c4) {}
        });
    } catch (_0x27e686) {
      return await _0x362c61.error(
        _0x27e686 + "\n\n command: mp4rainbow",
        _0x27e686,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4negative",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x452d19) => {
    try {
      if (!_0x452d19.reply_message.Video) {
        return await _0x452d19.send("*Need Video!*");
      }
      let _0x10134d = "./temp/mp4negative.mp4";
      var _0x39b1c5 = await _0x452d19.bot.downloadAndSaveMediaMessage(
        _0x452d19.quoted.msg
      );
      console.log("checking location : ", _0x39b1c5);
      ffmpeg(_0x39b1c5)
        .outputOptions(["-y", "-vf", "curves=color_negative,format=yuv420p"])
        .format("mp4")
        .save(_0x10134d)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x39b1c5);
          } catch (_0x5e79cb) {}
          await _0x452d19.sendMessage(_0x452d19.jid, {
            video: fs.readFileSync(_0x10134d),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x10134d);
          } catch (_0x3be412) {}
        });
    } catch (_0x2271c4) {
      return await _0x452d19.error(
        _0x2271c4 + "\n\n command: mp4negative",
        _0x2271c4,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4art",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x4ffe99) => {
    try {
      if (!_0x4ffe99.reply_message.Video) {
        return await _0x4ffe99.send("*Need Video!*");
      }
      let _0x50a27e = "./temp/mp4art.mp4";
      var _0x3ce211 = await _0x4ffe99.bot.downloadAndSaveMediaMessage(
        _0x4ffe99.quoted.msg
      );
      console.log("checking location : ", _0x3ce211);
      ffmpeg(_0x3ce211)
        .outputOptions([
          "-y",
          "-vf",
          "convolution=-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2:-2 -1 0 -1 1 1 0 1 2,format=yuv420p",
        ])
        .format("mp4")
        .save(_0x50a27e)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x3ce211);
          } catch (_0x16f246) {}
          await _0x4ffe99.sendMessage(_0x4ffe99.jid, {
            video: fs.readFileSync(_0x50a27e),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x50a27e);
          } catch (_0x1e8124) {}
        });
    } catch (_0x51b6ab) {
      return await _0x4ffe99.error(
        _0x51b6ab + "\n\n command: mp4art",
        _0x51b6ab,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4stab",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x5ca0cf) => {
    try {
      if (!_0x5ca0cf.reply_message.Video) {
        return await _0x5ca0cf.send("*Need Video!*");
      }
      let _0x64e5ee = "./temp/mp4stab.mp4";
      var _0x553646 = await _0x5ca0cf.bot.downloadAndSaveMediaMessage(
        _0x5ca0cf.quoted.msg
      );
      console.log("checking location : ", _0x553646);
      ffmpeg(_0x553646)
        .outputOptions(["-y", "-vf", "deshake,format=yuv420p"])
        .format("mp4")
        .save(_0x64e5ee)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x553646);
          } catch (_0x2efd94) {}
          await _0x5ca0cf.sendMessage(_0x5ca0cf.jid, {
            video: fs.readFileSync(_0x64e5ee),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x64e5ee);
          } catch (_0x162614) {}
        });
    } catch (_0x435edb) {
      return await _0x5ca0cf.error(
        _0x435edb + "\n\n command: mp4stab",
        _0x435edb,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4color",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x4c9b1f) => {
    try {
      if (!_0x4c9b1f.reply_message.Video) {
        return await _0x4c9b1f.send("*Need Video!*");
      }
      let _0x377eec = "./temp/mp4color.mp4";
      var _0x3c26fa = await _0x4c9b1f.bot.downloadAndSaveMediaMessage(
        _0x4c9b1f.quoted.msg
      );
      console.log("checking location : ", _0x3c26fa);
      ffmpeg(_0x3c26fa)
        .outputOptions([
          "-y",
          "-vf",
          "eq=contrast=1.3:saturation=1.5:brightness=-0.1,format=yuv420p",
        ])
        .format("mp4")
        .save(_0x377eec)
        .on("end", async () => {
          try {
            fs.unlinkSync(_0x3c26fa);
          } catch (_0x4a1d42) {}
          await _0x4c9b1f.sendMessage(_0x4c9b1f.jid, {
            video: fs.readFileSync(_0x377eec),
            caption: Config.caption,
          });
          try {
            fs.unlinkSync(_0x377eec);
          } catch (_0x4b56ec) {}
        });
    } catch (_0xb73bb6) {
      return await _0x4c9b1f.error(
        _0xb73bb6 + "\n\n command: mp4color",
        _0xb73bb6,
        "*_Didn't get any results, Sorry!_*"
      );
    }
  }
);
smd(
  {
    pattern: "mp4slowmo",
    alias: ["tea", "kofi"],
    category: "media",
    desc: "Finds info about song",
    filename: __filename,
  },
  async (_0x3fdc39) => {
    try {
   
