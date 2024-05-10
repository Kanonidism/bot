const { connect } = require('mongoose');
connect('mongodb+srv://aligoretosgiorgos:Shadowshadow193@cluster0.5fdxd1h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
// Import the discord.js library
const { Client, Intents } = require('discord.js');

// Create a new client instance with necessary intents
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

// Your bot's token (replace 'YOUR_BOT_TOKEN' with your actual bot token)
const token = '';

// Event listener for when the bot is ready
client.once('ready', () => {
    console.log('Bot is online!');
    // Set the bot's status to "Watching Kyzer Project"
    client.user.setActivity('Kyzer Project', { type: 'WATCHING' });
});

// Log in the bot with the token

const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js') // If you dont have it
const vouchChannelId = '1238301807759986688'
const vouchChannelLogsId = '1238544821384122389'

client.on('messageCreate', async message => {
    try {
        if (message.channel.id === vouchChannelId) {
            const channel = await message.guild.channels.cache.get(vouchChannelLogsId);
    
            const msg = message.content;
            if (!msg) return;
    
            message.delete();
    
            const embed = new MessageEmbed()
                .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL()}` })
                .setDescription(`**Vouch Request from ${message.author}**`)
                .setColor('BLUE')
                .addFields({ name: 'Vouch', value: `${msg}` });
    
            const row = new MessageActionRow().addComponents(
                new MessageButton().setCustomId('acceptVouch').setEmoji('✅').setStyle('SECONDARY').setDisabled(false),
                new MessageButton().setCustomId('declineVouch').setEmoji('❌').setStyle('SECONDARY').setDisabled(false)
            );
    
            await channel.send({ embeds: [embed], components: [row], content: `${message.author}` });
        }
    } catch (error) {
        return;
    }
});

client.on('interactionCreate', async interaction => {
    try {
        if (!interaction.isButton()) return;

    if (interaction.customId === 'acceptVouch') {
        const channel = await interaction.guild.channels.cache.get(vouchChannelId);
        const row = new MessageActionRow().addComponents(
            new MessageButton().setCustomId('acceptVouch').setEmoji('✅').setStyle('SECONDARY').setDisabled(true),
            new MessageButton().setCustomId('declineVouch').setEmoji('❌').setStyle('SECONDARY').setDisabled(true)
        );

        const vouchUser = interaction.message.mentions.users.first();
        const embeds = interaction.message.embeds;
        const msg = embeds[0].fields[0].value;

        const embed = new MessageEmbed()
            .setAuthor({ name: `${vouchUser.username}`, iconURL: `${vouchUser.displayAvatarURL()}` })
            .setDescription(`\`\`\`${msg}\`\`\``)
            .setColor('BLUE')
            .setTimestamp();

        await interaction.update({ components: [row], content: `**${vouchUser} | ${interaction.user} accepted the vouch**` });
        await channel.send({ embeds: [embed] });
    } else if (interaction.customId === 'declineVouch') {
        const row = new MessageActionRow().addComponents(
            new MessageButton().setCustomId('acceptVouch').setEmoji('✅').setStyle('SECONDARY').setDisabled(true),
            new MessageButton().setCustomId('declineVouch').setEmoji('❌').setStyle('SECONDARY').setDisabled(true)
        );

        const vouchUser = interaction.message.mentions.users.first();

        await interaction.update({ components: [row], content: `**${vouchUser} | ${interaction.user} declined the vouch**` });
    }
    } catch (error) {
        return;   
    }
});

// Channel IDS
const joinLogsChannelId = '1238545474093322321';
const leaveLogsChannelId = '1238545532033695855';
const messageLogsChannelId = '1238545595757756497';
const voiceLogsChannelId = '1238545670277959783';
const roleLogsChannelId = '1238545707410001970';
const channelLogsChannelId = '1238545731170734140';
const banunbanLogsChannelId = '1238545764200747080';
const mutedefLogsChannelId = '1238545833520009357';
const nicknameLogsChannelId = '1238545885432909896';
const emojiLogsChannelId = '1238545907314724896';
const inviteLogsChannelId = '1238545935353516123';

// Emoji Logs
client.on('emojiCreate', async emoji => {
  try {
  const channel = await emoji.guild.channels.cache.get(emojiLogsChannelId);
  const log = await emoji.guild.fetchAuditLogs({ type: 'EMOJI_CREATE', limit: 1 });
  const entry = log.entries.first();
  if (!entry) return;

  const embed = new MessageEmbed()
  .setFooter(`Emoji Logs`)
  .setColor(`GREEN`)
  .setDescription(`**Action: ✅ Emoji Add\nAdded By: ${entry.executor}**`)
  .addField(`Emoji`, `${emoji}`, true)
  .addField(`Emoji Name`, `\`${emoji.name}\``, true)
  .setThumbnail(`${entry.executor.displayAvatarURL()}`)  

  await channel.send({ embeds: [embed] });
  } catch (error) {
      return;
  }
})

client.on('emojiDelete', async emoji => {
  try {
  const channel = await emoji.guild.channels.cache.get(emojiLogsChannelId);
  const log = await emoji.guild.fetchAuditLogs({ type: 'EMOJI_DELETE', limit: 1 });
  const entry = log.entries.first();
  if (!entry) return;

  const embed = new MessageEmbed()
  .setFooter(`Emoji Logs`)
  .setColor(`RED`)
  .setDescription(`**Action: ❌ Emoji Remove\nRemoved By: ${entry.executor}**`)
  .addField(`Emoji Name`, `\`${emoji.name}\``, true)
  .setThumbnail(`${entry.executor.displayAvatarURL()}`)  

  await channel.send({ embeds: [embed] });
  } catch (error) {
      return;
  }
})

// Join-Leave Logs
client.on('guildMemberAdd', async member => {
    try {
    const channel = await member.guild.channels.cache.get(joinLogsChannelId);
    const options = { timeZone: 'Europe/Athens', timeStyle: 'short', dateStyle: 'short' };
    const defaultDate = new Date().toLocaleString('el-GR', options);
    const userCreatedAt = member.user.createdAt ? member.user.createdAt.toLocaleString('el-GR', options) : defaultDate;
    const joinDate = member.joinedAt ? member.joinedAt.toLocaleString('el-GR', options) : defaultDate;

    const embed = new MessageEmbed()
    .setAuthor(`${member.user.username}`, `${member.user.displayAvatarURL()}`)
    .setFooter(`Join Logs`)
    .setDescription(`**Action: ✅ Joined\nMention: ${member}**`)
    .addFields({ name: `📅 Created:`, value: `\`\`${userCreatedAt}\`\``, inline: true })
    .addFields({ name: `🤝 Joined:`, value: `\`\`${joinDate}\`\``, inline: true })
    .setColor('GREEN')

    await channel.send({ embeds: [embed] });
    } catch (error) {
        return;
    }
})

client.on('guildMemberRemove', async member => {
    try {
    const channel = await member.guild.channels.cache.get(leaveLogsChannelId);
    const options = { timeZone: 'Europe/Athens', timeStyle: 'short', dateStyle: 'short' };
    const defaultDate = new Date().toLocaleString('el-GR', options);
    const userCreatedAt = member.user.createdAt ? member.user.createdAt.toLocaleString('el-GR', options) : defaultDate;

    const embed = new MessageEmbed()
    .setAuthor(`${member.user.username}`, `${member.user.displayAvatarURL()}`)
    .setFooter(`Leave Logs`)
    .setDescription(`**Action: ❌ Left\nMention: ${member}**`)
    .addFields({ name: `📅 Created At:`, value: `\`\`${userCreatedAt}\`\``, inline: true })
    .addFields({ name: `👋 Left At:`, value: `\`\`${defaultDate}\`\``, inline: true })    
    .setColor('RED') 

    await channel.send({ embeds: [embed] });
    } catch (error) {
        return;
    }
})

// Message Logs
client.on('messageDelete', async message => {
    try {
    const channel = await message.guild.channels.cache.get(messageLogsChannelId);

    const mes = message.content;
    if (!mes) return;

    const embed = new MessageEmbed()
    .setThumbnail(`${message.author.displayAvatarURL()}`)
    .setColor('RED')
    .setDescription(`**Action: 🗑️ Message Deleted\nAuthor: ${message.author}**`)
    .setFooter(`Message Logs`)
    .addField(`🎈 Message Content`, `\`${message.content}\``, true)
    .addField(`🔰 Channel`, `${message.channel}`, true)

    await channel.send({ embeds: [embed] });
    } catch (error) {
        return;
    }
})

client.on('messageUpdate', async (oldMessage, newMessage) => {
    try {
    const channel = await newMessage.guild.channels.cache.get(messageLogsChannelId);

    const embed = new MessageEmbed()
    .setThumbnail(`${newMessage.author.displayAvatarURL()}`)
    .setColor('RED')
    .setDescription(`**Action: ✏ Message Updated\nAuthor: ${newMessage.author}**`)
    .setFooter(`Message Logs`)
    .addField(`Old Message 💬`, `\`${oldMessage.content}\``, true)
    .addField(`New Message 📝`, `\`${newMessage.content}\``, true)
    .addField(`🔰 Channel`, `${newMessage.channel}`, true)

    await channel.send({ embeds: [embed] });
    } catch (error) {
        return;
    }
})

// Voice Logs
client.on('voiceStateUpdate', async (oldState, newState) => {
    try {
    const channel = await newState.guild.channels.cache.get(voiceLogsChannelId) 
    const newChannel = newState.channel;
    const oldChannel = oldState.channel;

    if (oldChannel !== newChannel && newChannel) {

        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`**Action: ✅ Joined Voice\nMention: <@${newState.member.id}>\nVoice Channel: ${newState.channel}**`)
        .setAuthor(`${newState.member.user.username}`, `${newState.member.displayAvatarURL()}`)
        .setFooter(`Voice Logs`)

        await channel.send({ embeds: [embed] });
    } else if (oldChannel !== newChannel && oldChannel) {

        const embed = new MessageEmbed()
        .setColor('RED')
        .setDescription(`**Action: ❌ Left Voice\nMention: <@${newState.member.id}>\nVoice Channel: ${oldState.channel}**`)
        .setAuthor(`${newState.member.user.username}`, `${newState.member.displayAvatarURL()}`)
        .setFooter(`Voice Logs`)

        await channel.send({ embeds: [embed] });
    }
    } catch (error) {
        return;
    }
})

// Role Logs
client.on('roleCreate', async role => {
    try {
    const channel = await role.guild.channels.cache.get(roleLogsChannelId);
    const log = await role.guild.fetchAuditLogs({ type: 'ROLE_CREATE', limit: 1 });
    const entry = log.entries.first();
    if (!entry) return;
    
    const embed = new MessageEmbed()
    .setFooter(`Role Logs`)
    .setColor(`GREEN`)
    .setDescription(`**Action: ✅ Role Create\nRole: ${role}\nCreated By: ${entry.executor}**`)
    .setThumbnail(`${entry.executor.displayAvatarURL()}`)
    .addFields({ name: `📌 Role Name`, value: `\`\`${role.name}\`\``, inline: true })

    await channel.send({ embeds: [embed] });
    } catch (error) {
        return;  
    }
})

client.on('roleDelete', async role => {
    try {
    const channel = await role.guild.channels.cache.get(roleLogsChannelId);
    const log = await role.guild.fetchAuditLogs({ type: 'ROLE_DELETE', limit: 1 });
    const entry = log.entries.first();
    if (!entry) return;
    
    const embed = new MessageEmbed()
    .setFooter(`Role Logs`)
    .setColor(`RED`)
    .setDescription(`**Action: ❌ Role Delete\nDeleted By: ${entry.executor}**`)
    .setThumbnail(`${entry.executor.displayAvatarURL()}`)
    .addFields({ name: `📌 Role Name`, value: `\`\`${role.name}\`\``, inline: true })

    await channel.send({ embeds: [embed] });
    } catch (error) {
        return;
    }   
})

client.on('guildMemberUpdate', async (member, newMember) => {
    try {
        if (member.roles.cache.size !== newMember.roles.cache.size) {
            const channel = await newMember.guild.channels.cache.get(roleLogsChannelId);
            const log = await newMember .guild.fetchAuditLogs({ type: 'MEMBER_UPDATE', limit: 1 });
            const entry = log.entries.first();
            if (!entry) return;
            const { executor, target } = entry;
            if (target.id !== newMember.id) return;
    
            if (newMember.roles.cache.size < member.roles.cache.size) {
                const removedRoles = member.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
                const role = removedRoles.first();
    
                const embed = new MessageEmbed()
                .setDescription(`**Action: ❌ Removed Role\nMention: ${newMember}**`)
                .setColor('RED')
                .setAuthor(`${member.user.username}`, `${member.displayAvatarURL()}`)
                .setFooter(`Role Logs`)
                .addFields({ name: `Removed Role`, value: `${role}`, inline: true })
                .addFields({ name: `Removed By`, value: `${executor}`, inline: true })
    
                await channel.send({ embeds: [embed] });
    
            } else {
    
                const newRoles = newMember.roles.cache.filter(role => !member.roles.cache.has(role.id));
                const role = newRoles.first();
    
                const embed = new MessageEmbed()
                .setDescription(`**Action: ✅ Added Role\nMention: ${newMember}**`)
                .setColor('GREEN')
                .setAuthor(`${member.user.username}`, `${member.displayAvatarURL()}`)
                .setFooter(`Role Logs`)
                .addFields({ name: `Added Role`, value: `${role}`, inline: true })
                .addFields({ name: `Added By`, value: `${executor}`, inline: true })
    
                await channel.send({ embeds: [embed] });
            }
        }
    } catch (error) {
        return;
    }
})

// Channel Logs
client.on('channelCreate', async channel => {
    try {
    const Channel = await channel.guild.channels.cache.get(channelLogsChannelId)
    const log = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_CREATE', limit: 1});
    const entry = log.entries.first();
    if (!entry) return;
    const executor = entry.executor;

        let type = channel.type;
          
        if (type == 0) type = 'Text'
        if (type == 2) type = 'Voice'
        if (type == 13) type = 'Stage'
        if (type == 15) type = 'Form'
        if (type == 5) type = 'Announcement'
        if (type == 4) type = 'Category'

    const embed = new MessageEmbed()
    .setColor('GREEN')
    .setThumbnail(`${executor.displayAvatarURL()}`)
    .setFooter(`Channel Logs`)
    .addFields({ name: `📌 Channel Name`, value: `\`\`${channel.name}\`\``, inline: true })
    .addFields({ name: `🔍 Channel Type`, value: `\`\`${type}\`\``, inline: true })    
    .setDescription(`**Action: ✅ Channel Create\nChannel: ${channel}\nCreated By: ${executor}**`) 
    
    await Channel.send({ embeds: [embed] });
    } catch (error) {
        return;
    }
})

client.on('channelDelete', async channel => {
    try {
    const Channel = await channel.guild.channels.cache.get(channelLogsChannelId)
    const log = await channel.guild.fetchAuditLogs({ type: 'CHANNEL_DELETE', limit: 1});
    const entry = log.entries.first();
    if (!entry) return;
    const executor = entry.executor;

        let type = channel.type;
          
        if (type == 0) type = 'Text'
        if (type == 2) type = 'Voice'
        if (type == 13) type = 'Stage'
        if (type == 15) type = 'Form'
        if (type == 5) type = 'Announcement'
        if (type == 4) type = 'Category'

    const embed = new MessageEmbed()
    .setColor('RED')
    .setThumbnail(`${executor.displayAvatarURL()}`)
    .setFooter(`Channel Logs`)
    .addFields({ name: `📌 Channel Name`, value: `\`\`${channel.name}\`\``, inline: true })
    .addFields({ name: `🔍 Channel Type`, value: `\`\`${type}\`\``, inline: true })    
    .setDescription(`**Action: ❌ Channel Delete\nDeleted By: ${executor}**`) 
    
    await Channel.send({ embeds: [embed] });
    } catch (error) {
        return; 
    }
})

// Ban-Unban 
client.on('guildBanAdd', async member => {
    try {
    const channel = await member.guild.channels.cache.get(banunbanLogsChannelId);
    const log = await member.guild.fetchAuditLogs({ type: 'BAN_ADD', limit: 1 });
    const entry = log.entries.first()
    if (!entry) return;

    let reason = entry.reason || 'No Reason'

    const embed = new MessageEmbed()
    .setColor('RED')
    .setFooter(`Ban Logs`)
    .setDescription(`**Action: ❌ Banned\nMention: ${member.user.username}**`)
    .addField(`Banned By`, `${entry.executor}`, true)
    .addField(`Reason`, `\`${reason}\``, true)
    .setThumbnail(`${member.user.displayAvatarURL()}`)

    await channel.send({ embeds: [embed] });
    } catch (error) {
        return; 
    }
})

client.on('guildBanRemove', async member => {
    try {
    const channel = await member.guild.channels.cache.get(banunbanLogsChannelId);
    const log = await member.guild.fetchAuditLogs({ type: 'BAN_REMOVE', limit: 1 });
    const entry = log.entries.first()
    if (!entry) return;

    let reason = entry.reason || 'No Reason'

    const embed = new MessageEmbed()
    .setColor('GREEN')
    .setFooter(`UnBan Logs`)
    .setDescription(`**Action: ✅ UnBanned\nMention: ${member.user.username}**`)
    .addField(`UnBanned By`, `${entry.executor}`, true)
    .addField(`Reason`, `\`${reason}\``, true)
    .setThumbnail(`${member.user.displayAvatarURL()}`)

    await channel.send({ embeds: [embed] });
    } catch (error) {
        return;
    }
})

// Mute-Def Logs
client.on('voiceStateUpdate', async (oldState, newState) => {
   try {
    const member = newState.member;

    if (oldState.serverMute !== newState.serverMute) {
        const guild = newState.guild;
        const channel = await guild.channels.cache.get(mutedefLogsChannelId)
        const log = await guild.fetchAuditLogs({ type: `VOICESTATE_UPDATE`, limit: 1 });
        const entry = log.entries.first();
        if (!entry) return;
        if (newState.serverMute) {
            const e = new MessageEmbed()
            .setColor('RED')
            .setFooter(`Mute Logs`)
            .setDescription(`**Action: ❌ Muted\nMention: ${member}**`)
            .addField(`Muted By`, `${entry.executor}`, true)
            .addField(`Channel`, `${newState.member.voice.channel}`, true)
            .setThumbnail(`${newState.member.user.displayAvatarURL()}`)

           await channel.send({ embeds: [e] });
        } else {
            const e = new MessageEmbed()
            .setColor('GREEN')
            .setFooter(`UnMute Logs`)
            .setDescription(`**Action: ✅ UnMuted\nMention: ${member}**`)
            .addField(`UnMuted By`, `${entry.executor}`, true)
            .addField(`Channel`, `${newState.member.voice.channel}`, true)
            .setThumbnail(`${newState.member.user.displayAvatarURL()}`)

           await channel.send({ embeds: [e] });
        }
    }

    if (oldState.serverDeaf !== newState.serverDeaf) {
        const guild = newState.guild;
        const channel = await guild.channels.cache.get(mutedefLogsChannelId)
        const log = await guild.fetchAuditLogs({ type: `VOICESTATE_UPDATE`, limit: 1 });
        const entry = log.entries.first();
        if (!entry) return;
        if (newState.serverDeaf) {

            const e = new MessageEmbed()
            .setColor('RED')
            .setFooter(`Deaf Logs`)
            .setDescription(`**Action: ❌ Deafed\nMention: ${member}**`)
            .addField(`UnMuted By`, `${entry.executor}`, true)
            .addField(`Channel`, `${newState.member.voice.channel}`, true)
            .setThumbnail(`${newState.member.user.displayAvatarURL()}`)

           await channel.send({ embeds: [e] });
        } else {
            const e = new MessageEmbed()
            .setColor('GREEN')
            .setFooter(`UnDeaf Logs`)
            .setDescription(`**Action: ✅ UnDeafed\nMention: ${member}**`)
            .addField(`UnDeafed By`, `${entry.executor}`, true)
            .addField(`Channel`, `${newState.member.voice.channel}`, true)
            .setThumbnail(`${newState.member.user.displayAvatarURL()}`)

           await channel.send({ embeds: [e] });
        }
    }
   } catch (error) {
        return;
   }
});

// Nickname Logs
client.on('guildMemberUpdate', async (oldMember, newMember) => {
    try {
        if (oldMember.nickname !== newMember.nickname) {
            const log = await newMember.guild.fetchAuditLogs({ type: `MEMBER_UPDATE`, limit: 1 });
            const entry = log.entries.first();
            if (!entry) return;
            const channel = await newMember.guild.channels.cache.get(nicknameLogsChannelId)
            const user = newMember.user;
            const oldNickname = oldMember.nickname ? oldMember.nickname : oldMember.user.username;
            const newNickname = newMember.nickname ? newMember.nickname : newMember.user.username;
    
    
            const embed = new MessageEmbed()
            .setFooter(`Nickname Logs`)
            .setColor('BLUE')
            .setDescription(`**Action: 🔀 Nickname Change\nMention: ${user}\nChanged By: ${entry.executor}**`)
            .addField(`🔗 Old Nickname`, `\`${oldNickname}\``, true)
            .addField(`🔄 New Nickname`, `\`${newNickname}\``, true)
            .setAuthor(`${newMember.user.username}`, `${newMember.user.displayAvatarURL()}`)
            
            await channel.send({ embeds: [embed] });
        
        }
    } catch (error) {
        return;
    }
});

// Invite Create Logs
client.on('inviteCreate', async invite => {
  try {
  const channel = await invite.guild.channels.cache.get(inviteLogsChannelId);

  const embed = new MessageEmbed()
  .setColor('BLUE')
  .setDescription(`**Action: ✉️ Invite Create\nMention: ${invite.inviter}**`)
  .addFields({ name: `🔗 Channel`, value: `||${invite.channel}||`, inline: true })
  .addFields({ name: `🆔 Invite Code`, value: `\`\`discord.gg/${invite.code}\`\``, inline: true })    
  .setFooter(`Invite Logs`)

  await channel.send({ embeds: [embed] });
  } catch (error) {
      return;
  }
})

const Spotify = require('spotifydl-core').default
const ytdl = require('ytdl-core');

const Spotifycredentials = {
  clientId: '', // Your Spotify Client ID
  clientSecret: '' // Your Spotify Client Secret
}

const spotify = new Spotify(Spotifycredentials)
const name = '';
const logo = '';
const color = 'BLUE';
const mp3Schema = require('./mp3Schema');

const youtubeReviewC = ''; // Youtube Reviews Logs
const spotifyReviewC = ''; // Spotify Reviews Logs
const logs = ''; // Logs when someone downloads a song

client.on('messageCreate', async message => {
    try {
    if (!message.content.startsWith('!')) return;
    const args = message.content.slice('!'.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (command === 'spotify-mp3') {
      if (!message.member.permissions.has('ADMINISTRATOR')) return await message.reply({ content: `Missing Permissions` });
      const channel = message.mentions.channels.first();
      if (!channel) return await message.reply({ content: `Put the channel you want to setup the converter`});
      if (!message.member.permissions.has('ADMINISTRATOR')) return await message.reply({ content: `Missing Permissions`});

      let data = await mp3Schema.findOne({ GuildId: message.guild.id });
      if (data) return await message.reply({ content: `You already have setup this system. Please do !spotify-delete`})

      const embed = new MessageEmbed()
      .setColor(color)
      .setAuthor(name, logo)
      .setDescription(`**> Convert youtube/spotify songs by pressing the button that suits you**`)
      .setTitle('Youtube/Spotify Converter')
      .setThumbnail(logo)
      .setFooter(`Created By Kappa`, `https://cdn.discordapp.com/attachments/1238281885554184242/1238560421686935682/kyzerr.png?ex=663fbac7&is=663e6947&hm=302e2de3372de1fbb6176f213b69cea7d54fe65166ba5728edd9aa3daf03a236&`)

      const row = new MessageActionRow().addComponents(
        new MessageButton().setCustomId('youtubeToMP3Proallaegy').setEmoji('<:Youtube:1234793253799333942>').setStyle('DANGER').setLabel('Youtube to MP3'),
        new MessageButton().setCustomId('spotifyToMP3Proallaegy').setEmoji('<:Spotify:1234793315300278372>').setStyle('SUCCESS').setLabel('Spotify to MP3'),
      )

      await channel.send({ embeds: [embed], components: [row] });
      data = new mp3Schema({
        GuildId: message.guild.id,
        YtSongs: 0,
        SpotifySongs: 0
      })
      await data.save();
    }
    if (command === 'spotify-delete') {
      if (!message.member.permissions.has('ADMINISTRATOR')) return await message.reply({ content: `Missing Permissions` });
      let data = await mp3Schema.findOne({ GuildId: message.guild.id });
      if (!data) return await message.reply({ content: `You have to setup this system first` });

      await mp3Schema.deleteOne({ GuildId: message.guild.id });
      message.reply({ content: `Success`})
    }
    } catch (error) {
      return console.log(error);
    }
})

client.on('interactionCreate', async interaction => {
  try {
    if (interaction.customId === 'youtubeToMP3Proallaegy') {
      let data = await mp3Schema.findOne({ GuildId: interaction.guild.id });
      if (!data) return await interaction.reply({ content: `System has been disabled by owner`, ephemeral: true });
  
      const embed = new MessageEmbed()
      .setColor('RED')
      .setAuthor(name, logo)
      .setDescription(`> Convert | From Youtube to MP3\n\n> Info | How many songs have been downloaded\n\n> Review | Leave us a review`)
      .setTitle(`Youtube to MP3`)
  
      const row = new MessageActionRow().addComponents(
        new MessageButton().setCustomId('convertYtProallaegy').setLabel('Convert').setEmoji('<:Youtube:1234793253799333942>').setStyle('SECONDARY'),
        new MessageButton().setCustomId('infoYtProallaegy').setLabel('Info').setEmoji('<:info:1234802284416864276>').setStyle('SECONDARY'),
        new MessageButton().setCustomId('reviewYtProallaegy').setLabel('Review').setEmoji('🌟').setStyle('SECONDARY')
      )
  
      await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
  
    } else if (interaction.customId === 'spotifyToMP3Proallaegy') {
      let data = await mp3Schema.findOne({ GuildId: interaction.guild.id });
      if (!data) return await interaction.reply({ content: `System has been disabled by owner`, ephemeral: true });
  
      const embed = new MessageEmbed()
      .setColor('GREEN')
      .setAuthor(name, logo)
      .setDescription(`> Convert | From Spotify to MP3\n\n> Info | How many songs have been downloaded\n\n> Review | Leave us a review`)
      .setTitle(`Spotify to MP3`)
  
      const row = new MessageActionRow().addComponents(
        new MessageButton().setCustomId('convertSpProallaegy').setLabel('Convert').setEmoji('<:Spotify:1234793315300278372>').setStyle('SECONDARY'),
        new MessageButton().setCustomId('infoSpProallaegy').setLabel('Info').setEmoji('<:info:1234802284416864276>').setStyle('SECONDARY'),
        new MessageButton().setCustomId('reviewSpProallaegy').setLabel('Review').setEmoji('🌟').setStyle('SECONDARY')
      )
  
      await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    }
  } catch (error) {
    return console.log(error);
  }
})

client.on('interactionCreate', async i => {
  try {
    if (i.customId === 'convertYtProallaegy') {
      const modal = new Modal()
      .setCustomId('YTModalProallaegy')
      .setTitle('Youtube to MP3')
  
      const url = new TextInputComponent()
      .setCustomId('YTLinkProallaegy')
      .setLabel('Youtube Link')
      .setRequired(true)
      .setStyle('SHORT')
  
      const url_row = new MessageActionRow().addComponents(url);
      await modal.addComponents(url_row);
      i.showModal(modal);
    } else if (i.customId === 'infoYtProallaegy') {
      let data = await mp3Schema.findOne({ GuildId: i.guild.id });
        const embed = new MessageEmbed()
        .setColor('RED')
        .setDescription(`**${data.YtSongs || 0}** youtube songs have been downloaded`)
        .setAuthor(i.user.username, i.user.displayAvatarURL())
  
        await i.reply({ embeds: [embed], ephemeral: true });
    } else if (i.customId === 'reviewYtProallaegy') {
      const modal = new Modal()
      .setCustomId('YTModalRProallaegy')
      .setTitle('Youtube to MP3 | Review')
  
      const r = new TextInputComponent()
      .setCustomId('YTReviewProallaegy')
      .setLabel('Your Review')
      .setRequired(true)
      .setStyle('PARAGRAPH')
  
      const s = new TextInputComponent()
      .setCustomId('YTReviewProallaegySTARS')
      .setLabel('Stars')
      .setRequired(true)
      .setStyle('SHORT')
      .setRequired(true)
  
      const r_r = new MessageActionRow().addComponents(r);
      const s_s = new MessageActionRow().addComponents(s)
      await modal.addComponents(s_s, r_r);
      i.showModal(modal);
    }
    //
    if (i.customId === 'convertSpProallaegy') {
      const modal = new Modal()
      .setCustomId('SpModalProallaegy')
      .setTitle('Spotify to MP3')
  
      const url = new TextInputComponent()
      .setCustomId('SpLinkProallaegy')
      .setLabel('Spotify Link')
      .setRequired(true)
      .setStyle('SHORT')
      
      const url_row = new MessageActionRow().addComponents(url);
      await modal.addComponents(url_row);
      i.showModal(modal);
    } else if (i.customId === 'infoSpProallaegy') {
      let data = await mp3Schema.findOne({ GuildId: i.guild.id });
        const embed = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`**${data.SpotifySongs || 0}** spotify songs have been downloaded`)
        .setAuthor(i.user.username, i.user.displayAvatarURL())
  
        await i.reply({ embeds: [embed], ephemeral: true });
    } else if (i.customId === 'reviewSpProallaegy') {
      const modal = new Modal()
      .setCustomId('SpModalRProallaegy')
      .setTitle('Spotify to MP3 | Review')
  
      const s = new TextInputComponent()
      .setCustomId('SpReviewProallaegySTARS')
      .setLabel('Stars')
      .setRequired(true)
      .setStyle('SHORT')
  
      const r = new TextInputComponent()
      .setCustomId('SpReviewProallaegy')
      .setLabel('Your Review')
      .setRequired(true)
      .setStyle('PARAGRAPH')
      .setRequired(true)
  
      const r_r = new MessageActionRow().addComponents(r);
      const s_s = new MessageActionRow().addComponents(s)
      await modal.addComponents(s_s, r_r);
      i.showModal(modal);
    }
  } catch (error) {
    return console.log(error);
  }
})

client.on('interactionCreate', async p => {
  try {
    if (p.customId === 'YTModalProallaegy') {
      await p.reply({ content: `Checking your song...`, ephemeral: true})
      const link = p.fields.getTextInputValue('YTLinkProallaegy');
      if (!link.includes(`youtube`)) return await p.editReply({ content: `Invalid Link`, ephemeral: true }); 
      
      const info = await ytdl.getInfo(link);
  
      if (info.videoDetails.isLiveContent) {
        return await p.editReply({ content: `You cannot donwload live content`, ephemeral: true });
      }
  
      const duration = parseInt(info.videoDetails.lengthSeconds);
      if (duration > 600) return await p.reply({ content: `You cannot download songs more than 10 minutes`, ephemeral: true });
  
      const stream = await ytdl(link, {
        filter: 'audioonly',
        quality: 'highestaudio',
        highWaterMark: 1 << 20
      });
      const writeStream = fs.createWriteStream(`./${info.videoDetails.title}_${p.user.username}.mp3`);
      
      writeStream.on('error', (error) => {
        p.editReply({content: `Error downloading your song`, ephemeral: true})
        console.log(error);
        return;
      });
  
      await p.editReply({
        content: 'We are getting your song. Please wait...',
        ephemeral: true,
      });
  
      writeStream.on('finish', async () => {
        let data = await mp3Schema.findOne({ GuildId: p.guild.id });
        const mp3 = new MessageAttachment(
          `./${info.videoDetails.title}_${p.user.username}.mp3`,
          `${info.videoDetails.title}_${p.user.username}.mp3`
        );
        await p.user.send({
          content: `**Here is the song you requested:**`,
          files: [mp3],
        }).then( async ()=> {
          data.YtSongs += 1;
          await data.save();
			    fs.unlink(`./${info.videoDetails.title}_${p.user.username}.mp3`, (err) => {
            if (err) {
              console.error('Error deleting file:', err);
            }
          });
        });
      });
      stream.on('data', (chunk) => {
        writeStream.write(chunk);
      });
  
      stream.on('end', () => {
        writeStream.end();
      });

      const options = { timeStyle: 'short', dateStyle: 'short' };
      const date = new Date().toLocaleString('en-US', options);
  
      const embed = new MessageEmbed()
      .setColor(color)
      .setTitle(`🔴 Youtube Song Downloaded`)
      .setDescription(`**User: ${p.user}\nSong Name: \`${info.videoDetails.title}\`\nDate: \`${date}\`**`)
      .setAuthor(p.user.username, p.user.displayAvatarURL())
  
      await p.guild.channels.cache.get(logs).send({ embeds: [embed] });
    } else if (p.customId === 'YTModalRProallaegy') {
      const text = p.fields.getTextInputValue('YTReviewProallaegy');
      const stars = p.fields.getTextInputValue('YTReviewProallaegySTARS');
  
      if (isNaN(stars)) return await p.reply({ content: `Put only numbers in stars in the stars field`, ephemeral: true})
      if (stars > 5 || stars < 0) return await p.reply({ content: `Put numbers from 1 to 5 in the stars field`, ephemeral: true})
      if (stars == 0) return await p.reply({ content: `Put numbers from 1 to 5 in the stars field`, ephemeral: true})
      if (!isNaN(text)) return await p.reply({ content: `**Invalid text in review**`, ephemeral: true})
  
      await p.reply({ content: `You left your review successfully`, ephemeral: true });
  
      const starIcons = '⭐'.repeat(stars);
  
      const embed = new MessageEmbed()
      .setColor(color)
      .setDescription(`${starIcons}\n\n**Review By ${p.user}\n\n> ${text}**`)
      .setAuthor(p.user.username, p.user.displayAvatarURL())
      .setThumbnail(logo)
      .setTitle('Youtube Review')
  
      await p.guild.channels.cache.get(youtubeReviewC).send({ embeds: [embed] });
    } else if (p.customId === 'SpModalRProallaegy') {
      const text = p.fields.getTextInputValue('SpReviewProallaegy');
      const stars = p.fields.getTextInputValue('SpReviewProallaegySTARS');
  
      if (isNaN(stars)) return await p.reply({ content: `Put only numbers in stars in the stars field`, ephemeral: true})
      if (stars > 5 || stars < 0) return await p.reply({ content: `Put numbers from 1 to 5 in the stars field`, ephemeral: true})
      if (stars == 0) return await p.reply({ content: `Put numbers from 1 to 5 in the stars field`, ephemeral: true})
      if (!isNaN(text)) return await p.reply({ content: `**Invalid text in review**`, ephemeral: true})
  
      await p.reply({ content: `You left your review successfully`, ephemeral: true });
  
      const starIcons = '⭐'.repeat(stars);
  
      const embed = new MessageEmbed()
      .setColor(color)
      .setDescription(`${starIcons}\n\n**Review By ${p.user}\n\n> ${text}**`)
      .setAuthor(p.user.username, p.user.displayAvatarURL())
      .setThumbnail(logo)
      .setTitle('Spotify Review')
  
      await p.guild.channels.cache.get(spotifyReviewC).send({ embeds: [embed] });
    } else if (p.customId === 'SpModalProallaegy') {
      await p.reply({ content: `Checking your song...`, ephemeral: true})
      const link = p.fields.getTextInputValue('SpLinkProallaegy');
      if (!link.includes(`spotify`)) return await p.editReply({ content: `Invalid Link`, ephemeral: true }); 
  
        await p.editReply({
          content: 'We are getting your song. Please wait...',
          ephemeral: true,
        });
  
       const track = await spotify.getTrack(link);
       await spotify.downloadTrack(link, `./${track.name}_${p.user.username}.mp3`)
  
       const mp3 = new MessageAttachment(`./${track.name}_${p.user.username}.mp3`, `${track.name}_${p.user.username}.mp3`);
       let data = await mp3Schema.findOne({ GuildId: p.guild.id });
  
       await p.user.send({ content: `**Here is the song you requested:**`, files: [mp3] }).then( async () => {
        data.SpotifySongs += 1;
        await data.save();
		    fs.unlink(`./${track.name}_${p.user.username}.mp3`, (err) => {
          if (err) {
            console.error('Error deleting file:', err);
          };
        });
      });

      const options = { timeStyle: 'short', dateStyle: 'short' };
      const date = new Date().toLocaleString('en-US', options);
  
      const embed = new MessageEmbed()
      .setColor(color)
      .setTitle(`🟢 Spotify Song Downloaded`)
      .setDescription(`**User: ${p.user}\nSong Name: \`${track.name}\`\nDate: \`${date}\`**`)
      .setAuthor(p.user.username, p.user.displayAvatarURL())
  
      await p.guild.channels.cache.get(logs).send({ embeds: [embed] });
       
    }
  } catch (error) {
    return console.log(error);
  }
})

const { TextInputComponent, Modal } = require('discord.js');

client.on('messageCreate', async message => {
  if (!message.content.startsWith('!')) return;
  const args = message.content.slice('!'.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === 'clear') {
    const amount = parseInt(args[0]);

    if (isNaN(amount)) {
      return await message.reply({ content: `**Βάλε μόνο αριθμόυς!**` });
    } else if (amount < 1 || amount > 100) {
      return await message.reply({ content: `**Βάλε μόνο έναν αριθμό απο το 1-100!**` });
    }

    try {
      const messages = await message.channel.messages.fetch({ limit: amount });

      const res = new MessageEmbed()
        .setColor('BLUE')
        .setDescription(`**Έγιναν delete ${messages.size} μυνήματα**`);

      await message.channel.bulkDelete(amount, true);
      const msg = await message.channel.send({ embeds: [res] });

      setTimeout(() => {
        msg.delete();
      }, 2000);
    } catch (error) {
      return console.log(error);
    }
  }
});

client.on('messageCreate', async message => {
  if (!message.content.startsWith('!')) return;
  const args = message.content.slice('!'.length).split(/ +/);
  const command = args.shift().toLowerCase();
  try {
    if (command === 'userinfo') {
      const targetUser = message.mentions.users.first() || message.author;
      const userInfoEmbed = new MessageEmbed()
        .setColor('BLUE')
        .setDescription(`**User Information:**\n\n` +
          `**Tag:** ${targetUser.tag}\n` +
          `**Username:** ${targetUser.username}\n` +
          `**User ID:** \`\`${targetUser.id}\`\`\n` +
          `**Created At:** ${targetUser.createdAt.toDateString()}\n` +
          `**Joined At:** ${message.guild.members.cache.get(targetUser.id).joinedAt.toDateString()}`);
      message.channel.send({ embeds: [userInfoEmbed] });
    }
  } catch (error) {
    console.error(error);
  }
});

client.on('messageCreate', async message => {
  if (!message.content.startsWith('!')) return;
  const args = message.content.slice('!'.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === 'avatar') {
      if (!message.member.permissions.has('ADMINISTRATOR')) return await message.reply({ content: `Missing Permissions`});
      const avatar_url = args[0];
      if (!avatar_url) return await message.reply({ content: `Please put a url (animated or static)`});
      if (!avatar_url.startsWith('https') && !avatar_url.startsWith('http')) return await message.reply({ content: `Not a link` });
      await client.user.setAvatar(avatar_url).then(() => {
          message.channel.send({ content: `Set`});
      }).catch(err => {
          return message.channel.send({ content: `Error setting the avatar`})
      })
  }
})


client.login(token);