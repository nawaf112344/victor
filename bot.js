const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = `$`;
client.on("message", message => {
if(message.content.startsWith(prefix + `contact`)){
if(message.author.bot || message.channel.type == 'dm') return;
let args = message.content.split(" ").slice(1);
let msg = args.join(' ');
let dev = client.users.get(""); //Your id
if(!args) return message.reply("يجب كتابة الرسالة");
dev.send(`• | User: **${message.author.tag}**\n\n• | Message: **${msg}**`).then(() =>{
message.channel.send(`Your message has been successfully delivered to the bot owner`)
}).catch(console.error);
}
});
//كود تغير اسم السيرفر + صورة السيرفر
client.on("message", msg =>{
var args = msg.content.split(" ").slice(1).join(" ")
if(!args) return;
if(msg.content.startsWith(prefix+"setIcon")) {
msg.guild.setIcon(args)
 .then(msg.reply("**Done ✅ **"))
 .catch(console.error);
}else if(msg.content.startsWith(prefix+"setName")) {
    msg.guild.setName(args)
 .then(g => msg.reply(`**Updated guild name to ${g} :white_check_mark:**`))
 .catch(console.error);
}
});
//كود هواية
client.on('message', message => {
  if(message.content === prefix + "id"){
    var embed = new Discord.RichEmbed()
    .setTitle(message.author.tag, message.author.avatarURL)
    .addField(`User`, message.author.username)
    .addField(`Discrim`,`#`+ message.author.discriminator)
    .addField(`Name Color Role`, message.member.colorRole)
    .addField(`Game`,message.author.presence.game ||"Idel.")
    .addField(`Status`,message.author.presence.status)
    message.channel.send(embed);
  }
});
//كود الريبو
client.on('ready', () => {// افنت التشغيل
  setInterval(function(){
      client.guilds.forEach(g => { // فور ايرج تدخل للسيرفرات كلها
                  var role = g.roles.find('name', 'Rainbow');//Rainbow  اسم الرتبة عشان يسوي ريمبو غيرها اذا تبي
                  if (role) {
                      role.edit({color : "RANDOM"});
                  };
      });
  }, 60000);// وقت الريمبو لا تغيرة لانه الوقت المسموح للتغيير
})
//كود الافتار
client.on('message', message => {
    const mm = message.mentions.members.first() || message.member;
    if(message.content.startsWith(prefix + "avatar")){
        const embed = new Discord.RichEmbed()
        .setAuthor(mm.user.tag, mm.user.avatarURL)
        .setTitle("Avatar Link")
        .setURL(mm.user.avatarURL)
        .setImage(mm.user.avatarURL)
        .setFooter(`Requested By : ${message.author.tag}`, message.author.avatarURL)
        message.channel.send(embed);
    }
});
//كود يطلع البوت من السيرفر
client.on("message", async message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if(message.author.id != "534314527643140101") return;
    if(message.author.bot) return;
    if (command == "leave") {
        if(!args[0] || args[1]) return message.reply(`**${prefix}leave <guild_id>**`);
        let GuildId = client.guilds.get(args[0])
        if(!GuildId) return message.reply(`** Guild ID is not Detected**`);
        GuildId.leave().then(m => message.channel.send("**I have Left "+GuildId.name+" ✅**"))
    }
})
//كود اعطاء رول
client.on('ready', () => {console.log('ready')});
client.on('message', message => {
    let args = message.content.split(' ').slice(1);
    if(message.content.startsWith(prefix + 'role')) {
        let member = message.mentions.users.first();
        let role = args.join(' ').replace(member, '').replace(args[0], '').replace(' ', '');
        console.log(role);
        if(member) {
              if(role.startsWith('-')) {
                let roleRe = args.join(' ').replace(member, '').replace(args[0], '').replace('-', '').replace(' ', '');
                console.log(roleRe);
                let role1 = message.guild.roles.find('name', roleRe);
                console.log(`hi`);
                if(!role1) return message.reply(`الرتبة غير موجودة بالسيرفر تأكد من الاسم`);
                message.guild.member(member).removeRole(role1.id);
            } else if(!role.startsWith('-')) {
                let roleRe = args.join(' ').replace(member, '').replace(args[0], '').replace('-', '').replace(' ', '');
                let role1 = message.guild.roles.find('name', roleRe);
                if(!role1) return message.reply(`الرتبة غير موجودة بالسيرفر تأكد من الاسم`);
                message.guild.member(member).addRole(role1);
            } else {
                message.reply(`يجب عليك كتابة اسم الرتبة`);
            }
        }
 else if(args[0] == 'all') {
    if(role) {
    let role1 = message.guild.roles.find('name', role);
    if(!role1) return message.reply(`الرتبة غير موجودة بالسيرفر تأكد من الاسم`);
    message.channel.send(`الرجاء الانتظار حتى يتم الانتهاء من الامر`).then(msg => {
        message.guild.members.forEach(m => {
            message.guild.member(m).addRole(role1);
        });
        msg.edit(`تم الانتهاء من الامر ${message.guild.members.size}`);
    });
}
} else if(args[0] == 'humans') {
    if(role) {
        let role1 = message.guild.roles.find('name', role);
        if(!role1) return message.reply(`الرتبة غير موجودة بالسيرفر تأكد من الاسم`);
        message.channel.send(`الرجاء الانتظار حتى يتم الانتهاء من الامر`).then(msg => {
            message.guild.members.filter(m =>m.user.bot == false).forEach(m => {
                message.guild.member(m).addRole(role1);
            });
            msg.edit(`تم الانتهاء من الامر ${message.guild.members.size}`);
        });
    }
} else if(args[0] == 'bots') {
    if(role) {
        let role1 = message.guild.roles.find('name', role);
        if(!role1) return message.reply(`الرتبة غير موجودة بالسيرفر تأكد من الاسم`);
        message.channel.send(`الرجاء الانتظار حتى يتم الانتهاء من الامر`).then(msg => {
            message.guild.members.filter(m =>m.user.bot == true).forEach(m => {
                message.guild.member(m).addRole(role1);
            });
msg.edit(`تم الانتهاء من الامر ${message.guild.members.size}`);
});
}
}
}
});
//كود اعطاء ميوت وفكه
client.on('message', async message =>{
const ms = require("ms");
if (message.author.omar) return;
if (!message.content.startsWith(prefix)) return;
if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply("**I Don't Have `MANAGE_ROLES` Permission**").then(msg => msg.delete(6000))
var command = message.content.split(" ")[0];
command = command.slice(prefix.length);
var args = message.content.split(" ").slice(1);
    if(command == "mute") {
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("**يجب عليك المنشن اولاّ**:x: ") .then(m => m.delete(5000));
	if(tomute.hasPermission("MANAGE_MESSAGES"))return      message.channel.send('**للأسف لا أمتلك صلاحية** `MANAGE_MASSAGEES`');
    let muterole = message.guild.roles.find(`name`, "Muted");
    //start of create role
    if(!muterole){
      try{
        muterole = await message.guild.createRole({
          name: "Muted",
          color: "#070000",
          permissions:[]
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            SPEAK : false
          });
        });
      }catch(e){
        console.log(e.stack);
      }
    }
    //end of create role
    let mutetime = args[1];
    if(!mutetime) return message.reply("**يرجى تحديد وقت الميوت**:x:");

    await(tomute.addRole(muterole.id));
message.reply(`<@${tomute.id}> **تم اعطائه ميوت ومدة الميوت** : ${ms(ms(mutetime))}`);
setTimeout(function(){
      tomute.removeRole(muterole.id);
      message.channel.send(`<@${tomute.id}> **انقضى الوقت وتم فك الميوت عن الشخص**:white_check_mark: `);
    }, ms(mutetime));



  }
if(command === `unmute`) {
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.sendMessage("**ليس لديك صلاحية لفك عن الشخص ميوت**:x: ").then(m => m.delete(5000));
if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply("**I Don't Have `MANAGE_ROLES` Permission**").then(msg => msg.delete(6000))

  let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!toMute) return message.channel.sendMessage("**عليك المنشن أولاّ**:x: ");

  let role = message.guild.roles.find (r => r.name === "Muted");

  if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("**لم يتم اعطاء هذه شخص ميوت من الأساس**:x:")

  await toMute.removeRole(role)
  message.channel.sendMessage("**لقد تم فك الميوت عن شخص بنجاح**:white_check_mark:");

  return;

  }

});
//كود الباند
client.on('message', message => {
  if (message.author.codes) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "ban") {
               if(!message.channel.guild) return message.reply('** This command only for servers**');

  if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.reply("**انت لا تملك الصلاحيات المطلوبه**");
  if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.reply("**I Don't Have ` BAN_MEMBERS ` Permission**");
  let user = message.mentions.users.first();

  if (message.mentions.users.size < 1) return message.reply("**منشن شخص**");
  if (!message.guild.member(user)
  .bannable) return message.reply("**يجب ان تكون رتبة البوت اعلي من رتبه الشخص المراد تبنيدة**");


  message.guild.member(user).ban(7, user);

message.channel.send(`**:white_check_mark: ${user.tag} banned from the server ! :airplane: **  `)

}
});
//كود الكيك
client.on('message',function(message) {
    let toKick = message.mentions.users.first();
    let toReason = message.content.split(" ").slice(2).join(" ");
    let toEmbed = new Discord.RichEmbed()
   if(message.content.startsWith(prefix + 'kick')) {
       if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply('**# - You dont have enough permissions!**');
       if(toKick.bannable) return message.reply("**# - I cannot kick someone with a higher role than me!**");
       if(!toReason) return message.reply("**# - Supply a reason!**")
       if(toKick.id === message.author.id) return message.reply("**# You cannot kick yourself!**")
       if(!message.guild.member(toKick).bannable) return message.reply("**# - I cannot ban this person!**")
       let toEmbed;
       toEmbed = new Discord.RichEmbed()
       .setTitle("You have been kicked from a server!")
       .setThumbnail(toKick.avatarURL)
       .addField("**# - Server:**",message.guild.name,true)
       .addField("**# - Reason:**",toReason,true)
       .addField("**# - Kicked By:**",message.author,true)
       if(message.member.hasPermission("KICK_MEMBERS")) return (
           toKick.sendMessage({embed: toEmbed}).then(() => message.guild.member(toKick).kick()).then(() => message.channel.send(`**# Done! I kicked: ${toKick}**`))
       )
       }
});
//كود الواتشنق
client.on('ready', () => {
   console.log(`----------------`);
      console.log(`BOT STARTED`);
        console.log(`---------------`);
      console.log(`ON ${client.guilds.size} Servers `);
    console.log(`---------------`);
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setGame(`$help|$invite`,"http://twitch.tv/vAmmvr_");
   client.user.setStatus("online");
});
// كود الاقتراح لي بس
client.on('message', msg => {

  if(msg.content.startsWith('#suggest')) {
    if(!msg.channel.guild) return msg.reply('** هاذا الامر فقط للسيرفرات**');
    if(!msg.guild.channels.find('name', 'suggestions')) return msg.reply('**الرجاء إضافة روم بإسم (suggestions)**');
    let args = msg.content.split(" ").slice(1);
    if(!args[1]) return msg.reply('الرجاء كتابة الاقتراح')
    //غيره على حسب اسم روم الاقتراحات او سوي مثل اسم الروم الموجود هنا
    if(msg.guild.channels.find('name', 'suggestions')) {
      //غيره هنا كمان اذا غيرت فوق
      msg.guild.channels.find('name', 'suggestions').send(`
      تم الاقتراح من قبل : ${msg.member}

      الاقتراح :
      ${args.join(" ").split(msg.mentions.members.first()).slice(' ')}
      `)
      .then(function (message) {
        message.react('✅')
        message.react('❌')
      })
      }
    }

});
//كود الترحيب ع الخاص
client.on("guildMemberAdd", member => {
  member.createDM().then(function (channel) {
  return channel.send(`🌹 welcome to server🌹
👑User neme :  ${member}👑
you User number : ${member.guild.memberCount} `)
}).catch(console.error)
});
//كود معلومات البوت + السيرفر
client.on('message', function(msg) {
    if(msg.content.startsWith (prefix  + 'server')) {
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(msg.guild.iconURL)
      .setTitle(`Showing Details Of  **${msg.guild.name}*`)
      .addField('🌐** نوع السيرفر**',`[** __${msg.guild.region}__ **]`,true)
      .addField('🏅** __الرتب__**',`[** __${msg.guild.roles.size}__ **]`,true)
      .addField('🔴**__ عدد الاعضاء__**',`[** __${msg.guild.memberCount}__ **]`,true)
      .addField('🔵**__ عدد الاعضاء الاونلاين__**',`[** __${msg.guild.members.filter(m=>m.presence.status == 'online').size}__ **]`,true)
      .addField('📝**__ الرومات الكتابية__**',`[** __${msg.guild.channels.filter(m => m.type === 'text').size}__** ]`,true)
      .addField('🎤**__ رومات الصوت__**',`[** __${msg.guild.channels.filter(m => m.type === 'voice').size}__ **]`,true)
      .addField('👑**__ الأونـر__**',`**${msg.guild.owner}**`,true)
      .addField('🆔**__ ايدي السيرفر__**',`**${msg.guild.id}**`,true)
      .addField('📅**__ تم عمل السيرفر في__**',msg.guild.createdAt.toLocaleString())
      msg.channel.send({embed:embed});
    }
  });




client.on('message', message => {
    if(message.content === "$bot") {
        const embed = new Discord.RichEmbed()
        .setColor("#00FFFF")
  .addField('**الذاكرة المستخدمة 💾**', `${(process.memoryUsage().rss / 1000000).toFixed()}MB`, true)
         .addField('**سرعة الاتصال📡**' , `${Date.now() - message.createdTimestamp}` + ' ms')
        .addField('**استخدام المعالج💿**', `${(process.cpuUsage().rss / 10000).toFixed()}%`, true)
        .addField('**🌐 عدد السيرفرات**' , `${client.guilds.size}`, true)
        .addField('**عدد المستخدمين 👥 **' , `${client.users.size}`, true)
               message.channel.sendEmbed(embed);
           }
});
//كود اضافة البوت
client.on('message', message => {
  if (!message.content.startsWith(prefix)) return;
  const verifed = ["534314527643140101"];
if (message.content.startsWith(prefix + 'owner')) {
if( verifed.some(word => message.author.id.includes(word)) ) {    return message.channel.sendMessage(`** ولكم يا صاحب البوت منور السيرفر**` + `✅`)
} else {
   message.reply('**انت لست صاحب البوت**' + '❌');
}
}
});

client.on('message', msg => {
  if (msg.content === '$invite') {
    msg.reply('https://discordapp.com/api/oauth2/authorize?client_id=574273127815577610&permissions=8&scope=bot');
  }
});
//كود سبورت
client.on('message', msg => {
  if (msg.content === '$suppport') {
    msg.reply('https://discord.gg/3Nr7fPG');
  }
});
//كود شكر
client.on('guildCreate', guild => {
  var embed = new Discord.RichEmbed()
  .setColor(0x5500ff)
  .setDescription(`**شكراً لك لإضافه البوت الى سيرفرك**`)
      guild.owner.send(embed)
});
//كود البرودكسات
client.on('message', message => {
   if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'bc')) {
if(!message.channel.guild) return message.channel.send('**هذا الأمر فقط للسيرفرات**').then(m => m.delete(5000));
if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**للأسف لا تمتلك صلاحية** `ADMINISTRATOR`' );
let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
let BcList = new Discord.RichEmbed()
.setThumbnail(message.author.avatarURL)
.setAuthor(`محتوى الرساله ${args}`)
.setDescription(`برودكاست بـ امبد 📝\nبرودكاست بدون امبد✏ \nلديك دقيقه للأختيار قبل الغاء البرودكاست\nيمكنك اضافة اسم السيرفر في البرودكاست عن طريق كتابة <server>\nيمكنك اضافة اسم المرسل في البرودكاست عن طريق كتاية <by>\nيمكنك منشنة العضو في الرساله عن طريق كتابة <user>`)
if (!args) return message.reply('**يجب عليك كتابة كلمة او جملة لإرسال البرودكاست**');message.channel.send(BcList).then(msg => {
msg.react('📝')
.then(() => msg.react('✏'))
.then(() =>msg.react('📝'))

let EmbedBcFilter = (reaction, user) => reaction.emoji.name === '📝' && user.id === message.author.id;
let NormalBcFilter = (reaction, user) => reaction.emoji.name === '✏' && user.id === message.author.id;

let EmbedBc = msg.createReactionCollector(EmbedBcFilter, { time: 60000 });
let NormalBc = msg.createReactionCollector(NormalBcFilter, { time: 60000 });


EmbedBc.on("collect", r => {

message.channel.send(`:ballot_box_with_check: تم ارسال الرساله بنجاح`).then(m => m.delete(5000));
message.guild.members.forEach(m => {
let EmbedRep = args.replace('<server>' ,message.guild.name).replace('<user>', m).replace('<by>', `${message.author.username}#${message.author.discriminator}`)
var bc = new
Discord.RichEmbed()
.setColor('RANDOM')
.setDescription(EmbedRep)
.setThumbnail(message.author.avatarURL)
m.send({ embed: bc })
msg.delete();
})
})
NormalBc.on("collect", r => {
  message.channel.send(`:ballot_box_with_check: تم ارسال الرساله بنجاح`).then(m => m.delete(5000));
message.guild.members.forEach(m => {
let NormalRep = args.replace('<server>' ,message.guild.name).replace('<user>', m).replace('<by>', `${message.author.username}#${message.author.discriminator}`)
m.send(NormalRep);
msg.delete();
})
})
})
}
});
//كود اعطاء ميوت صوتي + وفكه
client.on('message', message => {
      if(message.content.startsWith(prefix + 'mutevoice')) {
        if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.sendMessage("**ليس لديك صلاحية لاعطاء ميوت صوتي**:x: ").then(m => m.delete(5000));
        if(!message.guild.member(client.user).hasPermission("MUTE_MEMBERS")) return message.reply("**I Don't Have `MUTE_MEMBERS` Permission**").then(msg => msg.delete(6000))

      if(message.mentions.users.size === 0) {
        return message.reply("منشن الشغص لتبي تعطيه ميوت.");
      }
      let muteMember = message.guild.member(message.mentions.users.first());
      if(!muteMember) {
        return message.reply("Try again.");
      }
      muteMember.setMute(true);
      if(muteMember) {
        message.channel.sendMessage("User muted successfully.");
      }
    }
  });

  client.on('message', message => {
    if(message.content.startsWith(prefix + 'unmutevoice')) {
      if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.sendMessage("**ليس لديك صلاحية لاعطاء ميوت صوتي**:x: ").then(m => m.delete(5000));
      if(!message.guild.member(client.user).hasPermission("MUTE_MEMBERS")) return message.reply("**I Don't Have `MUTE_MEMBERS` Permission**").then(msg => msg.delete(6000))

    if(message.mentions.users.size === 0) {
        return message.reply("منشن الشغص لتبي تفك عنه ميوت.");
    }
    let muteMember = message.guild.member(message.mentions.users.first());
    if(!muteMember) {
      return message.reply("Try again.");
    }
    muteMember.setMute(false);
    if(muteMember) {
      message.channel.sendMessage("User muted successfully.");
    }
  }
});
  client.on('message',function(message) {
  if (message.author.bot) return;


                  if(!message.channel.guild) return;

                    if (message.content === prefix + "members") {
 const embed = new Discord.RichEmbed()

    .setDescription(`**Members info ✨
💚 online:   ${message.guild.members.filter(m=>m.presence.status == 'online').size}
❤  dnd:       ${message.guild.members.filter(m=>m.presence.status == 'dnd').size}
💛  idle:     ${message.guild.members.filter(m=>m.presence.status == 'idle').size}
💠   membersCount:  ${message.guild.memberCount - message.guild.members.filter(m=>m.user.bot).size}
💡 bots: ${message.guild.members.filter(m=>m.user.bot).size} **`)
         message.channel.send({embed});

    }
      });

client.on('message', message => {
   if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'clear')) {
if(!message.channel.guild) return message.channel.send('**This Command is Just For Servers**').then(m => m.delete(5000));
if(!message.member.hasPermission('ADMINISTRATOR')) return      message.channel.send('**You Do not have permission** `ADMINISTRATOR`' );
let args = message.content.split(" ").join(" ").slice(2 + prefix.length);
let request = `Requested By ${message.author.username}`;
message.channel.send(`**Are You sure you want to clear the chat?**`).then(msg => {
msg.react('✅')
.then(() => msg.react('❌'))
.then(() =>msg.react('✅'))

let reaction1Filter = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
let reaction2Filter = (reaction, user) => reaction.emoji.name === '❌' && user.id === message.author.id;

let reaction1 = msg.createReactionCollector(reaction1Filter, { time: 12000 });
let reaction2 = msg.createReactionCollector(reaction2Filter, { time: 12000 });
reaction1.on("collect", r => {
message.channel.send(`Chat will delete`).then(m => m.delete(5000));
var msg;
        msg = parseInt();

      message.channel.fetchMessages({limit: msg}).then(messages => message.channel.bulkDelete(messages)).catch(console.error);
      message.channel.sendMessage("", {embed: {
        title: "`` Chat Deleted ``",
        color: 0x06DF00,
        footer: {

        }
      }}).then(msg => {msg.delete(3000)});

})
reaction2.on("collect", r => {
message.channel.send(`**Chat deletion cancelled**`).then(m => m.delete(5000));
msg.delete();
})
})
}
});
//كود الهلب
client.on('message', message => {
    if (message.author.bot) return;
     if (message.content === prefix + "help") {
         message.channel.send("تم ارسآل اوامر البوت في الخاص شيك عليه:walking: .")





 message.author.sendMessage(`
 **
==================================
- سرعه اتصال ممتازه :comet:
-سهل الاستخدام:full_moon_with_face:
- صيانه كل يوم:hammer:
-مجاني بل كامل:money_with_wings:
-البوت عربي:grin:
==================================
- البوت فيه خصائص جديدة :video_game:
-كل يوم خاصية جديدة :new:
==================================
اذا حاب تخلي رتبه معينه يتغير لونها كل شوي سوي رول اسمها 
__"Rainbow"__
__الاوامر العامة__
${prefix}members ⇏ يعطيك معلومات عن العضاء
${prefix}server ⇏ يعطيك معلومات عن السيرفر
${prefix}bot ⇏ يعطيك معلومات عن البوت
${prefix}id ⇏ لاضهار معلوماتك الشخصيه
${prefix}avatar ⇏ لـ اضهار صورتك الشخصية
${prefix}support⇏ سيرفر الدعم الفني
${prefix}invite⇏ لـ اضافت البوت
=========================
__الاوامر الادارية__
${prefix}createcolors ⇏ لـ لانشاء 135 لون
${prefix}deletecolors ⇏ لو صار خطء في انشاء الاوان هذا الامر يمسح الاوان
${prefix}role all {neme roles} ⇏ لـ اعطاء جميع الاعضاء الرتبة الذي حددتها
${prefix}role {neme roles} ⇏ لـ عطا العضو رتبة معينه
${prefix}mute ⇏لـ إعطا شخص ميوت
${prefix}unmute ⇏ لـ فك الميوت عن الشخص
${prefix}mutevoice ⇏ لـ اعطاء ميوت صوتي
${prefix}unmutevoice⇏ لـ فك ميوت صوتي
${prefix}clear ⇏ لـ مسح الشات مع العدد
${prefix}ban⇏ لـ عطاء الشخص باند
${prefix}kick⇏ لـ اطاء الشخص كيك
=========================
الاوامر الميزك
__قريبا.. | Soon..__
مصصم البوت:hammer_pick: :<@534314527643140101>
**`);

    }
});

client.on('message', message => {
    if(message.content === prefix + 'createcolors') {
                         if(!message.channel.guild) return message.channel.send('**This Commnad only For Servers !**');
         if(!message.member.hasPermission('ADMINISTRATOR')) return    message.channel.send('**You Dont Have** `ADMINISTRATOR` **premission**').then(msg => msg.delete(6000))
      message.guild.createRole({
                  name: "1",
                    color: "#FFB6C1",
                    permissions: []
     })
           message.guild.createRole({
                  name: "2",
                    color: "#FFC0CB",
                    permissions: []
     })
                message.guild.createRole({
                  name: "3",
                    color: "#FF69B4",
                    permissions: []
     })
                     message.guild.createRole({
                  name: "4",
                    color: "#FF1493",
                    permissions: []
     })
                     message.guild.createRole({
                  name: "5",
                    color: "#DB7093",
                    permissions: []
     })
                     message.guild.createRole({
                  name: "6",
                    color: "#C71585",
                    permissions: []
     })
                     message.guild.createRole({
                  name: "7",
                    color: "#E6E6FA",
                    permissions: []
     })
                     message.guild.createRole({
                  name: "8",
                    color: "#D8BFD8",
                    permissions: []
     })
                     message.guild.createRole({
                  name: "8",
                    color: "#DDA0DD",
                    permissions: []
     })
                     message.guild.createRole({
                  name: "9",
                    color: "#DA70D6",
                    permissions: []
     })
                     message.guild.createRole({
                  name: "10",
                    color: "#EE82EE",
                    permissions: []
     })
                     message.guild.createRole({
                  name: "11",
                    color: "#FF00FF",
                    permissions: []
     })
                     message.guild.createRole({
                  name: "12",
                    color: "#BA55D3",
                    permissions: []
     })
                     message.guild.createRole({
                  name: "13",
                    color: "#9932CC",
                    permissions: []
     })
                          message.guild.createRole({
                  name: "14",
                    color: "#9400D3",
                    permissions: []
     })
                          message.guild.createRole({
                  name: "15",
                    color: "#8A2BE2",
                    permissions: []
     })
                               message.guild.createRole({
                  name: "16",
                    color: "#8B008B",
                    permissions: []
     })
                                    message.guild.createRole({
                  name: "17",
                    color: "#800080",
                    permissions: []
     })
                                    message.guild.createRole({
                  name: "18",
                    color: "#9370DB",
                    permissions: []
     })
                                    message.guild.createRole({
                  name: "19",
                    color: "#7B68EE",
                    permissions: []
     })
                                    message.guild.createRole({
                  name: "20",
                    color: "#6A5ACD",
                    permissions: []
     })
                                    message.guild.createRole({
                  name: "21",
                    color: "#483D8B",
                    permissions: []
     })
                                    message.guild.createRole({
                  name: "22",
                    color: "#663399",
                    permissions: []
     })
                                    message.guild.createRole({
                  name: "23",
                    color: "#4B0082",
                    permissions: []
     })
                                    message.guild.createRole({
                  name: "24",
                    color: "#FFA07A",
                    permissions: []
     })
                                    message.guild.createRole({
                  name: "25",
                    color: "#FA8072",
                    permissions: []
     })
                                    message.guild.createRole({
                  name: "26",
                    color: "#E9967A",
                    permissions: []
     })
                                    message.guild.createRole({
                  name: "27",
                    color: "#F08080",
                    permissions: []
     })
                                    message.guild.createRole({
                  name: "28",
                    color: "#CD5C5C",
                    permissions: []
     })
                                    message.guild.createRole({
                  name: "29",
                    color: "#DC143C",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "30",
                    color: "	#FF0000",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "31",
                    color: "#B22222",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "32",
                    color: "#8B0000",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "33",
                    color: "#FFA500",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "34",
                    color: "#FF8C00",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "35",
                    color: "#FF7F50",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "36",
                    color: "#FF6347",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "37",
                    color: "#FF4500",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "38",
                    color: "#FFD700",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "39",
                    color: "#FFFFE0",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "40",
                    color: "#FFFACD",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "41",
                    color: "#FAFAD2",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "42",
                    color: "	#FFEFD5",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "43",
                    color: "#FFE4B5",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "44",
                    color: "#FFDAB9",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "45",
                    color: "#EEE8AA",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "46",
                    color: "#F0E68C",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "47",
                    color: "#BDB76B",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "48",
                    color: "#ADFF2F",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "49",
                    color: "#7FFF00",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "50",
                    color: "#7CFC00",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "51",
                    color: "#00FF00",
                    permissions: []
     })

                                         message.guild.createRole({
                  name: "52",
                    color: "#32CD32",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "53",
                    color: "#98FB98",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "54",
                    color: "#90EE90",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "55",
                    color: "#00FA9A",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "56",
                    color: "#00FF7F",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "57",
                    color: "#3CB371",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "58",
                    color: "#2E8B57",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "59",
                    color: "#2E8B57",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "60",
                    color: "#008000",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "61",
                    color: "#006400",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "62",
                    color: "#9ACD32",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "63",
                    color: "#6B8E23",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "64",
                    color: "#556B2F",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "65",
                    color: "#66CDAA",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "66",
                    color: "#8FBC8F",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "67",
                    color: "#20B2AA",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "68",
                    color: "#008B8B",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "69",
                    color: "#008080",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "70",
                    color: "#00FFFF",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "71",
                    color: "#E0FFFF",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "72",
                    color: "#AFEEEE",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "73",
                    color: "#7FFFD4",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "74",
                    color: "#40E0D0",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "75",
                    color: "#48D1CC",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "76",
                    color: "#00CED1",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "77",
                    color: "#5F9EA0",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "78",
                    color: "#4682B4",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "79",
                    color: "#B0C4DE",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "80",
                    color: "#ADD8E6",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "81",
                    color: "#B0E0E6",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "82",
                    color: "#87CEFA",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "83",
                    color: "#87CEEB",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "84",
                    color: "#6495ED",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "85",
                    color: "#00BFFF",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "86",
                    color: "#1E90FF",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "87",
                    color: "#4169E1",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "88",
                    color: "#0000FF",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "89",
                    color: "#0000CD",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "90",
                    color: "#00008B",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "91",
                    color: "#000080",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "92",
                    color: "#191970",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "93",
                    color: "#FFF8DC",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "94",
                    color: "#FFEBCD",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "95",
                    color: "#FFE4C4",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "96",
                    color: "#FFDEAD",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "97",
                    color: "#F5DEB3",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "98",
                    color: "#DEB887",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "99",
                    color: "#D2B48C",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "100",
                    color: "#BC8F8F",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "101",
                    color: "#F4A460",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "102",
                    color: "#DAA520",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "103",
                    color: "#B8860B",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "104",
                    color: "#CD853F",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "105",
                    color: "#D2691E",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "106",
                    color: "#808000",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "107",
                    color: "#8B4513",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "108",
                    color: "#A0522D",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "109",
                    color: "#A52A2A",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "110",
                    color: "#800000",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "111",
                    color: "#FFFFFF",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "112",
                    color: "#FFFAFA",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "113",
                    color: "#F0FFF0",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "114",
                    color: "#F5FFFA",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "115",
                    color: "#F0FFFF",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "116",
                    color: "#F0F8FF",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "117",
                    color: "#F8F8FF",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "118",
                    color: "#F5F5F5",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "119",
                    color: "#FFF5EE",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "120",
                    color: "#F5F5DC",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "121",
                    color: "#FDF5E6",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "122",
                    color: "#FFFAF0",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "123",
                    color: "#FFFFF0",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "124",
                    color: "#FAEBD7",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "125",
                    color: "#FAF0E6",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "126",
                    color: "#FFF0F5",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "127",
                    color: "#FFE4E1",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "128",
                    color: "#DCDCDC",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "129",
                    color: "#D3D3D3",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "130",
                    color: "#C0C0C0",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "131",
                    color: "#A9A9A9",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "132",
                    color: "#696969",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "133",
                    color: "#808080",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "134",
                    color: "#778899",
                    permissions: []
     })
                                         message.guild.createRole({
                  name: "135",
                    color: "#708090",
                    permissions: []
     })



          message.channel.sendMessage({embed: new Discord.RichEmbed()
     .setColor('#502faf').setAuthor(`${message.author.username}'`, message.author.avatarURL).setDescription('``Colors Has Been Created``')});
    }
	});



	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '1');

		role.delete()
		}

	});
	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '2');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '3');

		role.delete()
		}

	});
	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '4');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '5');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '6');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '7');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '8');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '9');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '10');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '11');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '12');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '13');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '14');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '15');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '16');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '17');

		role.delete()
		}

	});



	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '18');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '19');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '20');

		role.delete()
		}

	});
	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '21');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '22');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '23');

		role.delete()
		}

	});



	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '24');

		role.delete()
		}

	});



	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '25');

		role.delete()
		}

	});



	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '26');

		role.delete()
		}

	});


	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '27');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '28');

		role.delete()
		}

	});


	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '29');

		role.delete()
		}

	});


	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '30');

		role.delete()
		}

	});


	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '31');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '32');

		role.delete()
		}

	});


	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '33');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '34');

		role.delete()
		}

	});


	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '35');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '36');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '37');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '38');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '39');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '40');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '41');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '42');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '43');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '44');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '45');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '46');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '47');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '48');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '49');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '50');

		role.delete()
		}

	});
	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '51');

		role.delete()
		}

	});
	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '52');

		role.delete()
		}

	});
	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '53');

		role.delete()
		}

	});
	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '54');

		role.delete()
		}

	});
	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '55');

		role.delete()
		}

	});
	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '56');

		role.delete()
		}

	});
	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '57');

		role.delete()
		}

	});
	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '58');

		role.delete()
		}

	});
	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '59');

		role.delete()
		}

	});
	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '60');

		role.delete()
		}

	});
	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '-61');

		role.delete()
		}

	});
	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '62');

		role.delete()
		}

	});
	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '63');

		role.delete()
		}

	});
	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '64');

		role.delete()
		}

	});
	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '65');

		role.delete()
		}

	});
	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '66');

		role.delete()
		}

	});
	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '67');

		role.delete()
		}

	});
	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '68');

		role.delete()
		}

	});
	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '69');

		role.delete()
		}

	});
	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '70');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '71');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '72');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '73');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '74');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '75');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '76');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '77');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '78');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '79');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '80');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '81');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '82');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '83');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '84');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '85');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '86');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '87');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '88');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '89');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '90');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '91');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '92');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '93');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '94');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '95');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '96');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '97');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '98');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '99');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '100');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '101');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '102');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '103');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '104');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '105');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '106');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '107');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '108');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '109');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '110');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '111');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '112');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '113');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '114');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '115');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '116');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '117');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '118');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '119');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '121');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '122');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '123');

		role.delete()
		}

	});
	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '124');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '125');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '126');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '127');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '128');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '129');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '130');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '131');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '132');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '133');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '134');

		role.delete()
		}

	});

	client.on('message', async message => {

			let args = message.content.split(' ').slice(1);
	if (message.content.startsWith("!deletecolors")) {
		if(!message.member.hasPermission('ADMINISTRATOR')) return
		let role = message.guild.roles.find('name', '135');

		role.delete()
		}

	});


client.login(process.env.BOT_TOKEN);
