const fs = require("fs");
const path = require("path");
const Config = require(__dirname + "/../config.js");
const blockJid = [
  "" + (process.env.BLOCKJIDS || "120363023983262391@g.us"),
  ...(typeof global.blockJids === "string" ? global.blockJids.split(",") : []),
];
const allowJid = [
  "null",
  ...(typeof global.allowJids === "string" ? global.allowJids.split(",") : []),
];
const Pino = require("pino");
const { Boom } = require("@hapi/boom");
const FileType = require("file-type");
const express = require("express");
const app = express();
const events = require("./plugins");
const {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid,
} = require("./exif");
var {
  default: AstaConnectSock,
  proto,
  prepareWAMessageMedia,
  downloadContentFromMessage,
  DisconnectReason,
  useMultiFileAuthState,
  generateForwardMessageContent,
  generateWAMessageFromContent,
  makeInMemoryStore,
  jidDecode,
} = require("@whiskeysockets/baileys");
var last_status = {};
global.setCmdAlias = {};
global.AstaOfficial = false;
global.sqldb = false;
global.pg_pools = false;
const {
  userdb,
  groupdb,
  sleep,
  getBuffer,
  parsedJid,
  tiny,
  botpic,
  tlang,
  runtime,
  getSizeMedia,
  bot_,
  smdBuffer,
} = require("../lib");
const fetch = require("node-fetch");
const axios = require("axios");
const { smsg, callsg, groupsg } = require("./serialized.js");
var prefa =
  !Config.HANDLERS ||
  ["false", "null", " ", "", "nothing", "not", "empty"].includes(
    !Config.HANDLERS
  )
    ? true
    : false;
global.prefix = prefa ? "" : Config.HANDLERS[0];
global.prefixRegex =
  prefa || ["all"].includes(Config.HANDLERS)
    ? new RegExp("^")
    : new RegExp("^[" + Config.HANDLERS + "]");
global.prefixboth = ["all"].includes(Config.HANDLERS);
let baileys = "/Session/";
const connnectpg = async () => {
  try {
    const { Pool } = require("pg");
    const pool = new Pool({
      connectionString: global.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    const client = await pool.connect();
    client.release();
    console.log("🌍 Connected to the PostgreSQL.");
    return true;
  } catch (error) {
    console.log("Could not connect with PostgreSQL.\n");
    return false;
  }
};

const connnectMongo = async () => {
  const mongoose = require("mongoose");
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(MONGODB);
    console.log("🌍 Connected to the MongoDB.");
    return true;
  } catch {
    console.log("Could not connect with MongoDB.");
    return false;
  }
};
let Asta = {};
const store = makeInMemoryStore({
  logger: Pino({
    level: "silent",
  }).child({
    level: "silent",
  }),
});
const storeFilePath = path.join(__dirname, "/store.json");
try {
  if (fs.existsSync(storeFilePath)) {
    store.readFromFile(storeFilePath);
  }
} catch (error) {
  console.log("CLIENT STORE ERROR:\n", error);
}
require("events").EventEmitter.defaultMaxListeners = 2000;
//
/** BOT FUNCTIONALITY */
//
async function syncdb() {
  let thumbnailImagePath = __dirname + "/assets/asta.jpeg";

  try {
    global.log0 =
      typeof THUMB_IMAGE === "string"
        ? await getBuffer(THUMB_IMAGE.split(",")[0])
        : fs.readFileSync(thumbnailImagePath);
  } catch (error) {
    thumbnailImagePath = __dirname + "/assets/asta.jpeg";
  }
  global.log0 =
    global.log0 || fs.readFileSync(thumbnailImagePath);
  const { state: state, saveCreds: creds } = await useMultiFileAuthState(
    __dirname + baileys
  );
  let AstaConn = AstaConnectSock({
    logger: Pino({ level: "silent" || "debug" || "fatal" }),
    printQRInTerminal: false,
    browser: ["Windows", "chrome", "QUEEN_ALYA"],
    fireInitQueries: true,
    shouldSyncHistoryMessage: true,
    downloadHistory: true,
    syncFullHistory: true,
    generateHighQualityLinkPreview: true,
    markOnlineOnConnect: true,
    auth: state,
    getMessage: async (message) => {
      let defaultMessage = { conversation: "Hello World!" };
      if (store) {
        const storedMessage = await store.loadMessage(
          message.remoteJid,
          message.id
        );
        return storedMessage.message || defaultMessage;
      }
      return defaultMessage;
    },
  });
  store.bind(AstaConn.ev);
  setInterval(() => {
    try {
      const filePath = __dirname + "/store.json";
      store.writeToFile(filePath);
    } catch (error) {
      console.log("CLIENT STORE ERROR:\n", error);
    }
  }, 10000);
  AstaConn.ev.on("call", async (callData) => {
    let callResponse = await callsg(
      AstaConn,
      JSON.parse(JSON.stringify(callData[0]))
    );
    events.commands.map(async (command) => {
      if (command.call === "offer" && callResponse.status === "offer") {
        try {
          command.function(callResponse, { store: store, Void: AstaConn });
        } catch (error) {
          console.error("[CALL ERROR] ", error);
        }
      }
      if (command.call === "accept" && callResponse.status === "accept") {
        try {
          command.function(callResponse, { store: store, Void: AstaConn });
        } catch (error) {
          console.error("[CALL ACCEPT ERROR] ", error);
        }
      }
      if (
        command.call === "call" ||
        command.call === "on" ||
        command.call === "all"
      ) {
        try {
          command.function(callResponse, { store: store, Void: AstaConn });
        } catch (error) {
          console.error("[CALL ERROR] ", error);
        }
      }
    });
  });
  var botNumber = false;
  let dbgroup = {};
  let dbuser = {};
  AstaConn.ev.on("messages.upsert", async (callData) => {
    try {
      if (!callData.messages || !Array.isArray(callData.messages)) {
        return;
      }
      botNumber = botNumber || AstaConn.decodeJid(AstaConn.user.id);
      for (mek of callData.messages) {
        mek.message =
          Object.keys(mek.message || {})[0] === "ephemeralMessage"
            ? mek.message.ephemeralMessage.message
            : mek.message;
        if (
          !mek.message ||
          !mek.key ||
          !/broadcast/gi.test(mek.key.remoteJid)
        ) {
          continue;
        }
        let messageData = await smsg(
          AstaConn,
          JSON.parse(JSON.stringify(mek)),
          store,
          true
        );
        if (!messageData.message) {
          continue;
        }
        let messageBody = messageData.body;
        let eventData = {
          body: messageBody,
          mek: mek,
          text: messageBody,
          args: messageBody.split(" ") || [],
          botNumber: botNumber,
          isCreator: messageData.isCreator,
          store: store,
          budy: messageBody,
          Asta: {
            bot: AstaConn,
          },
          Void: AstaConn,
          proto: proto,
        };
        events.commands.map(async (command) => {
          if (typeof command.on === "string") {
            let commandName = command.on.trim();
            let shouldExecute =
              !command.fromMe || (command.fromMe && messageData.fromMe);
            if (
              /status|story/gi.test(commandName) &&
              (messageData.jid === "status@broadcast" ||
                mek.key.remoteJid === "status@broadcast") &&
              shouldExecute
            ) {
              command.function(messageData, messageBody, eventData);
            } else if (
              ["broadcast"].includes(commandName) &&
              (/broadcast/gi.test(mek.key.remoteJid) ||
                messageData.broadcast ||
                /broadcast/gi.test(messageData.from)) &&
              shouldExecute
            ) {
              command.function(messageData, messageBody, eventData);
            }
          }
        });
      }
    } catch (error) {
      console.log("ERROR broadCast --------- messages.upsert \n", error);
    }
  });

  AstaConn.ev.on("messages.upsert", async (callData) => {
    try {
      botNumber = botNumber || AstaConn.decodeJid(AstaConn.user.id);
      if (!global.isStart) {
        return;
      }
      for (mek of callData.messages) {
        if (!mek.message) {
          continue;
        }
        mek.message =
          Object.keys(mek.message || {})[0] === "ephemeralMessage"
            ? mek.message.ephemeralMessage.message
            : mek.message;
        if (!mek.message || !mek.key || /broadcast/gi.test(mek.key.remoteJid)) {
          continue;
        }
        let messageData = await smsg(
          AstaConn,
          JSON.parse(JSON.stringify(mek)),
          store,
          true
        );
        let message = messageData;
        if (!messageData.message || messageData.chat.endsWith("broadcast")) {
          continue;
        }
        var { body: messageBody } = messageData;
        var isCreator = messageData.isCreator;
        var rawText =
          typeof messageData.text == "string" ? messageData.text.trim() : false;
        if (rawText && messageBody[1] && messageBody[1] == " ") {
          messageBody = messageBody[0] + messageBody.slice(2);
        }
        let isCommand = false;
        let commandName = false;
        let commandPrefix = false;
        if (rawText && Config.HANDLERS.toLowerCase().includes("null")) {
          isCommand = true;
          commandName = messageBody.split(" ")[0].toLowerCase() || false;
        } else if (rawText && !Config.HANDLERS.toLowerCase().includes("null")) {
          isCommand =
            prefixboth ||
            (messageBody && prefixRegex.test(messageBody[0])) ||
            (messageData.isAsta &&
              /923184474176|923004591719|17863688449/g.test(botNumber) &&
              messageBody[0] == ",");
          commandName = isCommand
            ? prefa
              ? messageBody.trim().split(" ")[0].toLowerCase()
              : messageBody.slice(1).trim().split(" ")[0].toLowerCase()
            : false;
          commandPrefix = prefixboth
            ? messageBody.trim().split(" ")[0].toLowerCase()
            : "";
        } else {
          isCommand = false;
        }
        let command = commandName ? commandName.trim() : "";
        if (command && global.setCmdAlias[command] !== undefined) {
          commandName = global.setCmdAlias[command];
          isCommand = true;
        } else if (messageData.mtype == "stickerMessage") {
          command = "sticker-" + messageData.msg.fileSha256;
          if (global.setCmdAlias[command]) {
            commandName = global.setCmdAlias[command];
            isCommand = true;
          }
        }
        if (blockJid.includes(messageData.chat) && !messageData.isAsta) {
          return;
        }
        if (
          isCommand &&
          (messageData.isBaileys ||
            (!isCreator &&
              Config.WORKTYPE === "private" &&
              !allowJid.includes(messageData.chat)))
        ) {
          isCommand = false;
        }
        const args = messageData.body
          ? messageBody.trim().split(/ +/).slice(1)
          : [];
        if (
          !isCreator &&
          global.disablepm === "true" &&
          isCommand &&
          !messageData.isGroup
        ) {
          isCommand = false;
        }
        if (
          !isCreator &&
          global.disablegroup === "true" &&
          isCommand &&
          messageData.isGroup &&
          !allowJid.includes(messageData.chat)
        ) {
          isCommand = false;
        }
        Asta.bot = AstaConn;
        if (isCommand) {
          let command =
            events.commands.find(
              (command) => command.pattern === commandName
            ) ||
            events.commands.find(
              (command) => command.alias && command.alias.includes(commandName)
            );
          if (!command && prefixboth && commandPrefix) {
            command =
              events.commands.find(
                (command) => command.pattern === commandPrefix
              ) ||
              events.commands.find(
                (command) =>
                  command.alias && command.alias.includes(commandPrefix)
              );
          }
          if (command && command.fromMe && !messageData.fromMe && !isCreator) {
            command = false;
            return messageData.reply(tlang().owner);
          }
          if (messageData.isGroup && command && commandName !== "bot") {
            let groupData = dbgroup[messageData.chat] ||
              (await groupdb.findOne({
                id: messageData.chat,
              })) || {
                botenable: toBool(
                  messageData.isAsta || !blockJid.includes(messageData.chat)
                ),
              };
            if (groupData && groupData.botenable === "false") {
              command = false;
            }
            if (command && groupData) {
              let pattern = command.pattern.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
              );
              let regex = new RegExp("\\b" + pattern + "\b");
              if (
                groupData.disablecmds !== "false" &&
                regex.test(groupData.disablecmds)
              ) {
                command = false;
              }
            }
          }
          if (!isCreator && command) {
            try {
              let userData = dbuser[messageData.sender] ||
                (await userdb.findOne({
                  id: messageData.sender,
                })) || {
                  ban: "false",
                };
              if (userData.ban === "true") {
                command = false;
                messageData.reply(
                  "Hey " +
                    messageData.senderName.split("\n").join("  ") +
                    ",\n_You are banned from using commands._"
                );
              }
            } catch (error) {
              console.log("checkban.ban", error);
            }
          }
          if (command) {
            if (command.react) {
              messageData.react(command.react);
            }
            let text = messageData.body
              ? messageBody.trim().split(/ +/).slice(1).join(" ")
              : "";
            let pattern = command.pattern;
            messageData.cmd = pattern;
            try {
              command.function(messageData, text, {
                cmd: pattern,
                text: text,
                body: messageBody,
                args: args,
                cmdName: commandName,
                isCreator: isCreator,
                smd: pattern,
                botNumber: botNumber,
                budy: rawText,
                store: store,
                Asta: Asta,
                Void: AstaConn,
              });
            } catch (error) {
              console.log("[ERROR] ", error);
            }
          } else {
            isCommand = false;
            const category =
              events.commands.find(
                (command) => command.category === commandName
              ) || false;
            if (category) {
              const commands = {};
              let commandList = "";
              events.commands.map(async (command, index) => {
                if (
                  command.dontAddCommandList === false &&
                  command.pattern !== undefined
                ) {
                  if (!commands[command.category]) {
                    commands[command.category] = [];
                  }
                  commands[command.category].push(command.pattern);
                }
              });
              for (const category in commands) {
                if (commandName == category.toLowerCase()) {
                  commandList =
                    "┌───〈 " +
                    category.toLowerCase() +
                    " menu  〉───◆\n│╭─────────────···▸\n┴│▸\n";
                  for (const command of commands[category]) {
                    commandList += "⬡│▸ " + command + "\n";
                  }
                  commandList +=
                    "┬│▸\n│╰────────────···▸▸\n└───────────────···▸";
                  break;
                }
              }
              AstaConn.sendUi(messageData.jid, {
                caption: tiny(commandList),
              });
            }
          }
        }
        try {
          dbgroup[messageData.chat] =
            (await groupdb.findOne({
              id: messageData.chat,
            })) ||
            (await groupdb.new({
              id: messageData.chat,
              botenable:
                messageData.chat === "120363023983262391@g.us"
                  ? "false"
                  : "true",
              goodbye: toBool(global.gdbye),
              welcome: toBool(global.wlcm),
            }));
          dbuser[messageData.sender] =
            (await userdb.findOne({
              id: messageData.sender,
            })) ||
            (await userdb.new({
              id: messageData.sender,
              name: messageData.pushName || "Unknown",
            }));
        } catch (error) {
          main();
        }
        text = messageData.body;
        let eventData = {
          dbuser: dbuser[messageData.sender],
          dbgroup: dbgroup[messageData.chat],
          body: messageBody,
          mek: mek,
          text: text,
          args: args,
          botNumber: botNumber,
          isCreator: isCreator,
          icmd: isCommand,
          store: store,
          budy: rawText,
          Asta: Asta,
          Void: AstaConn,
          proto: proto,
        };
        let dataTypes = {
          mp4: "video",
          mp3: "audio",
          webp: "sticker",
          photo: "image",
          picture: "image",
          vv: "viewonce",
        };
        events.commands.map(async (command) => {
          if (typeof command.on === "string") {
            let commandName = command.on.trim();
            let shouldExecute =
              !command.fromMe || (command.fromMe && messageData.fromMe);
            if (commandName === "main" && shouldExecute) {
              command.function(messageData, messageBody, eventData);
            } else if (
              messageData.text &&
              commandName === "text" &&
              /text|txt|true|smd|asta/gi.test(command.quoted) &&
              messageData.quoted &&
              messageData.quoted.text &&
              shouldExecute
            ) {
              command.function(messageData, messageBody, eventData);
            } else if (
              messageData.text &&
              ["body", "text"].includes(commandName) &&
              shouldExecute
            ) {
              command.function(messageData, messageBody, eventData);
            } else if (
              typeof messageData[dataTypes[commandName] || commandName] ===
                "boolean" &&
              messageData.quoted &&
              messageData.quoted[command.quoted] &&
              shouldExecute
            ) {
              command.function(messageData, messageBody, eventData);
            } else if (
              commandName === "viewonce" &&
              (messageData.viewOnce || mek.message.viewOnceMessageV2)
            ) {
              try {
                command.function(messageData, messageBody, eventData);
              } catch (error) {
                console.log("[ERROR] ", error);
              }
            } else if (
              typeof messageData[dataTypes[commandName] || commandName] ===
                "boolean" &&
              shouldExecute
            ) {
              command.function(messageData, messageBody, eventData);
            }
            if (
              commandName === "delete" &&
              messageData.mtype == "protocolMessage" &&
              messageData.msg.type === "REVOKE" &&
              shouldExecute
            ) {
              command.function(messageData, messageBody, eventData);
            } else if (
              commandName === "poll" &&
              /poll/gi.test(messageData.mtype) &&
              shouldExecute
   
