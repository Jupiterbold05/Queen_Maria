const { groupdb,smd, getBuffer, tlang, prefix } = require('../lib')
const Config = require('../config')
const eco = require('discord-mongoose-economy')
let ty = false ; 


  try {
    if(isMongodb){ ty =  eco.connect(mongodb);console.log("Connected with discord economy!!") }
   } catch(e) { ty = false  }
const sck = groupdb ;

if(ty){
      
smd({
        pattern: "daily",
        desc: "daily gold.",
        category: "economy",
        filename: __filename,
        //react: "💷"
    },
    async({reply, chat ,isGroup, sender,error}) => {
      try{
        let zerogroup = await sck.findOne({  id: chat,   }) || {}
        if (zerogroup?.economy == "false") return reply("*🚦Economy* is not active in current group.");
        if (!isGroup) return reply(tlang().group);
        const daily  = await eco.daily(sender, "Qᴜᴇᴇɴ_Mᴀʀɪᴀ", 500); //give 500 for daily, can be changed
        if (daily.cd) {
          return await reply(`🧧 You already claimed daily for today, come back in ${daily.cdL}🫡`);
        } else { reply(`you claimed daily ${daily.amount} 🪙 for today🎉.`);  }
      }catch(e){ error(`${e}\n\ncommand: daily`,e)}
}
)

smd({
        pattern: "resetwallet",
        desc: "reset wallet of quoted user.",
        category: "economy",
        filename: __filename,
        react: "💷"
    },
    async(message) => {
      try{
       let zerogroup = (await sck.findOne({ id: message.chat,})) || await sck.new({id: message.chat,})
       let mongoschemas = zerogroup.economy || "false";
       if (mongoschemas == "false") return message.reply("*🚦Economy* is not active in current group.");
       if(!isCreator) return message.reply(tlang().owner)
       let users = message.mentionedJid ? message.mentionedJid[0] : message.msg.contextInfo.participant || false;
       if(!users) return message.reply('Please give me user.')
       const balance  = await eco.balance(users, "Qᴜᴇᴇɴ_Mᴀʀɪᴀ")
       await eco.deduct(users, "Qᴜᴇᴇɴ_Mᴀʀɪᴀ", balance.wallet);
       return await message.reply(`⛩️ User: @${users.split('@')[0]} \n *🧧 @${users.split('@')[0]} lost all 🪙 in wallet.*\n_Now live with that poverty.🫡_`,{mentions:[users]})
      }catch(e){message.error(`${e}\n\ncommand: resetwallet`,e)}
}
)
   //---------------------------------------------------------------------------
smd({
   pattern: "capacity",
   desc: "update capacity.",
   category: "economy",
   filename: __filename,
   react: "💷"
},
async(message,match) => {
  try{
   let zerogroup = (await sck.findOne({ id: message.chat, })) || await sck.new({  id: message.chat,  })
   let mongoschemas = zerogroup.economy || "false";
   if (mongoschemas == "false") return message.reply("*🚦Economy* is not active in current group.");
   if (!message.isGroup) return message.reply(tlang().group);
   if (!match) return message.reply(`💴 *Bank-capacity* 💳\n\n1 | *1000 sp* = 🪙100\n\n2 | *100000 sp* = 🪙1000\n\n3 | *10000000 sp* = 🪙10000000\n\nExample- ${prefix}capacity 1 OR ${prefix}bankupgrade 1000`)
   let user = message.mentionedJid ? message.mentionedJid[0] : message.msg.contextInfo.participant || false;

   let value = match.trim();
   let k = parseInt(value)
   const balance  = await eco.balance(user, "QUEEN_MARIA")
   switch (value) {
       case '1000':
       case '1':
       if (k > balance.wallet ) return message.reply(`*_You need to pay 🪙100 to increase bank capacity ~ 1000 sp_*`);
         const deduct1 = await eco.deduct(user, "QUEEN_MARIA", 100);
         const add1 = eco.giveCapacity(user,"QUEEN_MARIA", 1000);
         return await message.reply(`*1000 🪙diamond storage has been added in ${message.senderName} bank*`)


             break
       case '100000':
       case '2':
       if (k < balance.wallet) return message.reply(`*You need to pay 🪙1000 to increase bank capacity ~ 100000 sp*`);
         const deduct2 = await eco.deduct(user,"QUEEN_MARIA", 1000);
         const add2 = eco.giveCapacity(user, "QUEEN_MARIA", 100000);
         return await message.reply(`*100000 🪙diamond storage has been added in ${message.pushName} bank*`)



             break
       case '10000000':
       case '3':
       if (k < balance.wallet) return message.reply(`You need to pay 🪙10000 to increase bank capacity ~ 1000 sp`);
          const deduct3 = await eco.deduct(user, "QUEEN_MARIA", 10000);
          const add3 = eco.giveCapacity(user, "QUEEN_MARIA", 10000000);
          return await message.reply(`*10000000 🪙diamond storage has been added in ${message.pushName}\'s bank*`)



            break
default:
await message.reply('*What are you trying to do📉*.')

}

    }catch(e){message.error(`${e}\n\ncommand: capacity`,e)}
}
)

    //---------------------------------------------------------------------------
    smd({
       pattern: "deposit",
       desc: "deposit gold.",
       category: "economy",
       filename: __filename,
       react: "💷"
   },
   async(message,match) => {
     try{
       let zerogroup = (await sck.findOne({ id: message.chat,  })) || {};
       let mongoschemas = zerogroup.economy || "false";
       if (mongoschemas == "false") return message.reply("*🚦Economy* is not active in current group.");
     //  let users = message.mentionedJid ? message.mentionedJid[0] : message.msg.contextInfo.participant || false;
       if (!match) return message.reply("Baka!! Provide the 💰amount you want to deposit!");
       let d = parseInt(match)
       const deposit = await eco.deposit(message.sender, "Asta", d);
       const balance = await eco.balance(message.sender, "Asta")
       if(deposit.noten) return message.reply('You can\'t deposit what you don\'t have💰.'); //if user states more than whats in his wallet
       return await message.reply(`⛩️ Sender: ${message.pushName}\n🍀Successfully 💰Deposited 🪙${deposit.amount} to your bank.Upgrade your bank capacity to add more money📈.`)
   //return await Aviator.bot.sendButtonText(message.chat,  `⛩️ Sender: ${message.pushName}\n🍀Successfully 💰Deposited 🪙${deposit.amount} to your bank.Upgrade your bank capacity to add more money📈.`, `${Config.ownername.split(' ')[0]}-Economy Version: 0.0.6`, message);
       }catch(e){message.error(`${e}\n\ncommand: deposit`,e)}
   }
)
    smd({
       pattern: "lb",
       desc: "check leaderboard.",
       category: "economy",
       filename: __filename,
       react: "💷"
   },
   async(message) => {
     try{
   let h = await eco.lb("Asta",10);
   let str = `*Top ${h.length} users with more money in wallet.*\n`
   const { sck1 } = require('../lib');
   let arr = []
    for(let i=0;i<h.length;i++){
           var tname = message.bot.getName(h[i].userID)  
str+= `*${i+1}*\n╭─────────────◆\n│ *Name:-* _${tname}_\n│ *User:-* _@${h[i].userID.split('@')[0]}_\n│ *Wallet:-* _${h[i].wallet}_\n│ *Bank Amount:-* _${h[i].bank}_\n│ *Bank Capacity:-* _${h[i].bankCapacity}_\n╰─────────────◆\n\n`  	 
    arr.push(h[i].userID)
    }
       await message.reply(str,{mentions:arr})

       }catch(e){message.error(`${e}\n\ncommand: lb`,e)}
    })

smd({
   pattern: "transfer",
   desc: "transfer gold.",
   category: "economy",
   filename: __filename,
   react: "💷"
},
async(message,match) => {
  try{
   let zerogroup =await sck.findOne({  id: message.chat, }) || {} ;
   let mongoschemas = zerogroup.economy || "false";
   if (mongoschemas == "false") return message.reply("*🚦Economy* is not active in current group.");
   let value = match.trim().split(" ");
   if (value[0] === "") return message.reply(`Use ${prefix}transfer 100 @user`);
   let user = message.mentionedJid ? message.mentionedJid[0] : message.msg.contextInfo.participant || false;
   if(!user) return message.reply('Please give me any user🤦‍♂️.');
       const user1 = message.sender
       const user2 = user
       const word = value[0];
       const code = value[1];
       let d = parseInt(word)
       if (!d) return message.reply("check your text plz u r using the command in a wrong way👀");
       const balance = await eco.balance(user1, "Asta");
       let a = (balance.wallet) < parseInt(word)
       //Returns wallet, bank, and bankCapacity. Also creates a USer if it doesn't exist.
       if(a == true) return message.reply("you dont have sufficient money to transfer👎");

       const deduct = await eco.deduct(user1, "Asta", value[0]);
       const give = await eco.give(user2, "Asta", value[0]);
       return await message.reply(`*📠 Transaction successful of ${value[0]} 💰*`)
  // return await Aviator.bot.sendButtonText(message.chat, `*📠 Transaction successful of ${value[0]} 💰*`, `${Config.ownername.split(' ')[0]}-Economy Version: 0.0.6`, message);

    }catch(e){message.error(`${e}\n\ncommand: transfer`,e)}
}
)

    //---------------------------------------------------------------------------
    smd({
       pattern: "wallet",
       desc: "shows wallet.",
       category: "economy",
       filename: __filename,
       react: "💷"
   },
   async(message) => {
     try{
       let zerogroup = (await sck.findOne({ id: message.chat,})) || await sck.new({id: message.chat,})
       let mongoschemas = zerogroup.economy || "false";
       if (mongoschemas == "false") return message.reply("*🚦Economy* is not active in current group.");
        const balance = await eco.balance(message.sender,"Asta"); //Returns wallet, bank, and bankCapacity. Also creates a USer if it doesn't exist.
        return await message.reply(`*👛 ${message.pushName}'s Purse:*\n\n_🪙${balance.wallet}_`)
   //return await Aviator.bot.sendButtonText(message.chat, `*👛 ${message.pushName}'s Purse:*\n\n_🪙${balance.wallet}_`, `${Config.ownername.split(' ')[0]}-Economy Version: 0.0.6`, message);
       }catch(e){message.error(`${e}\n\ncommand: wallet`,e)}
   }
)

    //---------------------------------------------------------------------------
    smd({
       pattern: "give",
       desc: "Add money in wallet.",
       category: "economy",
       filename: __filename,
       react: "💷"
   },
   async(message,match) => {
     try{
       if(!message.isCreator) return message.reply(`*_Hey Master, only my owner can give money!_*`)
        let users = message.mentionedJid ? message.mentionedJid[0] : message.msg?.contextInfo?.participant || false;
        if(!users) return message.reply('Please give me user to add money.')
        await eco.give(users, "Asta", parseInt(match.split(' ')[0]));
       return await message.bot.sendMessage(message.chat,{text: `Added 📈 ${parseInt(match.split(' ')[0])} to @${users.split('@')[0]} wallet🛸.`,mentions:[users]},{quoted:message})
       }catch(e){message.error(`${e}\n\ncommand: give`,e)}
   }
)

    //---------------------------------------------------------------------------
    smd({
       pattern: "bank",
       desc: "shows bank amount.",
       category: "economy",
       filename: __filename,
       react: "💷"
   },
   async(message) => {
     try{
       let zerogroup = (await sck.findOne({  id: message.chat,  })) || (await sck.new({   id: message.chat,   }) );
       let mongoschemas = zerogroup.economy || "false";
       if (mongoschemas == "false") return message.reply("*🚦Economy* is not active in current group.");
       const balance = await eco.balance(message.sender, "Asta"); //Returns wallet, bank, and bankCapacity. Also creates a USer if it doesn't exist.
       return await message.reply(`🍀User: ${message.pushName}\n\n_🪙${balance.bank}/${balance.bankCapacity}_`)
   //return await Aviator.bot.sendButtonText(message.chat, `🍀User: ${message.pushName}\n\n_🪙${balance.bank}/${balance.bankCapacity}_`, `${Config.ownername.split(' ')[0]}-Economy \n Version: 0.0.6`, message);
       }catch(e){message.error(`${e}\n\ncommand: bank`,e)}
   }
)

    //---------------------------------------------------------------------------
    smd({
       pattern: "rob",
       desc: "rob bank amount.",
       category: "economy",
       filename: __filename,
   },
   async(message) => {
     try{
       let zerogroup = (await sck.findOne({   id: message.chat,  })) || (await sck.new({  id: message.chat,   }));
       let mongoschemas = zerogroup.economy || "false";
       if (mongoschemas == "false") return message.reply("*🚦Economy* is not active in current group.");
       let users = message.mentionedJid ? message.mentionedJid[0] : message.msg.contextInfo.participant || false;
   if(!users) return message.reply('Please give me user to rob.')
       const user1 = message.sender
       const user2 = users
       const k = 1000
       const balance1  = await eco.balance(user1, "Asta")
   const balance2  = await eco.balance(user2, "Asta")
   const typ = ['ran','rob','caught'];
   const random = typ[Math.floor(Math.random() * typ.length)];
   if (k > balance1.wallet) return message.reply(`*☹️ You don't have enough money to pay incase you get caught*`);
   if (k > balance2.wallet) return message.reply(`*Sorry, your victim is too poor 🤷🏽‍♂️ let go🫤.*`);
   let tpy = random    
   switch (random) {
      
       case 'ran':
             await message.reply(`*Your victim escaped, be more scary next time🫰.*`)
             ////message.react('🥹')

             break
       case 'rob':
     const deduff = Math.floor(Math.random() * 1000)	    
         await eco.deduct(user2, "Asta", deduff);
         await eco.give(message.sender, "Asta", deduff);
         await message.reply(`*🤑 Robbery operation done successfully.🗡️*\nYou ran with ${deduff} amount in your wallet.`)
         ////message.react('💀')
             break
       case 'caught':
          const rmoney = Math.floor(Math.random() * 1000)
          await eco.deduct(user1, "Asta", rmoney);
          await message.reply(`*Sorry FBI👮 caught up with you, you paid ${rmoney} 🪙 from wallet🥹.*`)
          ////message.react('😦')
            break
default:
await message.reply('*What are you trying to do👀*.')
//message.react('🤔')

}
       }catch(e){message.error(`${e}\n\ncommand: rob`,e)}
   }
)

    //---------------------------------------------------------------------------
    smd({
       pattern: "withdraw",
       desc: "withdraw money from bank account.",
       category: "economy",
       filename: __filename,
       react: "💷"
   },
   async(message,match) => {
     try{
       let zerogroup = (await sck.findOne({   id: message.chat,  })) || {} ;
       let mongoschemas = zerogroup.economy || "false";
       if (mongoschemas == "false") return message.reply("*🚦Economy* is not active in current group.");
       const user = message.sender
       if (!match) return message.reply("*Provide the amount💰 you want to withdraw💳!*");
       const query = match.trim();
       const withdraw = await eco.withdraw(user, "Asta", query);
       if(withdraw.noten) return message.reply('*🏧 Insufficient fund in bank🫤*'); //if user states more than whats in his wallet
       const add = eco.give(user,"Asta", query);
       message.reply(`*🏧 ALERT* \n _🪙${withdraw.amount} has been withdrawn from your wallet💰._`)
       }catch(e){message.error(`${e}\n\ncommand: withdraw`,e)}
   }
)

    //---------------------------------------------------------------------------
    smd({
       pattern: "gamble",
       desc: "gamble money.",
       category: "economy",
       filename: __filename,
       react: "💷"
   }, 
   async(message,match) => {
     try{
       let zerogroup = (await sck.findOne({ id: message.chat,})) || {};
       let mongoschemas = zerogroup.economy || "false";
       if (mongoschemas == "false") return message.reply("*🚦Economy* is not active in current group.");
       const user = message.sender
   //	if(message.chat!=="120363043857093839@g.us") return message.reply('This is not a economy group.')
       var texts = match.split(" ");
    var opp = texts[1];// your value
    var value = texts[0].toLowerCase();
    var gg = parseInt(value)
///.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    const balance = await eco.balance(user, "Asta");
    const g = (balance.wallet) > parseInt(value)
    const k = 50
    const a = (k) > parseInt(value)
    const twice = gg*2
         var hjkl;
        if(opp==='left') {   hjkl = 'https://github.com/SecktorBot/Brandimages/blob/main/Nezuko/leftr.webp?raw=true'   } 
   else if(opp==='right') {  hjkl = 'https://github.com/SecktorBot/Brandimages/blob/main/Nezuko/rightr.webp?raw=true'  } 
   else if(opp==='up') {     hjkl = 'https://github.com/SecktorBot/Brandimages/blob/main/Nezuko/upr.webp?raw=true'     }
   else if (opp==='down'){  hjkl = 'https://github.com/SecktorBot/Brandimages/blob/main/Nezuko/downr.webp?raw=true'    }
   else{   message.reply(`Please provide direction(left,right,up,down).\nEg:- ${prefix}gamble 200 left`)  }
  let media = await getBuffer(hjkl)
  message.reply(media,{packname:"Asta",author:'Economy'},"sticker")
    const f = ["up", "right", "left", "down", "up", "left", "down", "right", "up", "down", "right", "left"]
    const r = f[Math.floor(Math.random () * f.length)]
    if (!match) return message.reply(`Example:  ${prefix}gamble 100 direction(left,right,up,down)`);

           if (!value) return message.reply("*Please, specify the amount you are gambling with!*");
           if (!opp) return message.reply("*Specify the direction you are betting on!*");
           if (!gg) return message.reply("*Check your text please, You are using the command in a wrong way*")
           if (g == false) return message.reply(`*You don't have sufficient 🪙 Diamond to gamble with*`);
           if (a == true) return message.reply(`*Sorry ${message.pushName}, you can only gamble with more than 🪙50.*`);
          if ( r == opp){
          let give = await eco.give(user , "Asta", twice);    //message.react('⭐️')
          return await message.reply(`*📈 You won 🪙${twice}*`)
   //return await Aviator.bot.sendButtonText(message.chat, `*📈 You won 🪙${twice}*`, `${Config.ownername.split(' ')[0]}-Economy \n Version: 0.0.6`, message);

       }
       else{
                 let deduct = await eco.deduct(user, "Asta", texts[0]);

   //message.react('🤮')
   return await message.reply(`*📉 You lost 🪙${texts[0]}*`)
   //return await Aviator.bot.sendButtonText(message.chat,`*📉 You lost 🪙${texts[0]}*`, `${Config.ownername.split(' ')[0]}-Economy \n Version: 0.0.6`, message);

        }
       }catch(e){message.error(`${e}\n\ncommand: gamble`,e)}
   }
)




    //---------------------------------------------------------------------------
    smd({
       pattern: "slot2",
       desc: "withdraw money from bank account.",
       category: "economy",
       filename: __filename,
       react: "💷"
   },
   async(message,match) => {
     try{
       let zerogroup = (await sck.findOne({  id: message.chat,    })) || {};
       let mongoschemas = zerogroup.economy || "false";
       if (mongoschemas == "false") return message.reply("*🚦Economy* is not active in current group.");
       var today = new Date();
       if (today.getDay() == 6 || today.getDay() == 5 || today.getDay() == 0){
           if (match == 'help') return message.reply(`*1:* Use ${prefix}slot to play\n\n*2:* You must have 🪙100 in your wallet\n\n*3:* If you don't have money in wallet then 👛withdraw from your bank🏦\n\n*4:* If you don't have 🤑 money in your 🏦bank too then use economy features to 📈gain money`)
           if (match == 'money') return message.reply(`*1:* Small Win --> +🪙20\n\n*2:* Small Lose --> -🪙20\n\n*3:* Big Win --> +🪙100\n\n*4:* Big Lose --> -🪙50\n\n*5:* 🎉 JackPot --> +🪙1000`)
           const fruit1= ["🥥", "🍎", "🍇"]
           const fruit2 = ["🍎", "🍇", "🥥"]
           const fruit3 = ["🍇", "🥥", "🍎"]
           const fruit4 = "🍇"
           const lose = ['*You suck at playing this game*\n\n_--> 🍍-🥥-🍎_', '*Totally out of line*\n\n_--> 🥥-🍎-🍍_', '*Are you a newbie?*\n\n_--> 🍎-🍍-🥥_']
           const smallLose = ['*You cannot harvest coconut 🥥 in a pineapple 🍍 farm*\n\n_--> 🍍>🥥<🍍_', '*Apples and Coconut are not best Combo*\n\n_--> 🍎>🥥<🍎_', '*Coconuts and Apple are not great deal*\n\n_--> 🥥>🍎<🥥_']
           const wo
