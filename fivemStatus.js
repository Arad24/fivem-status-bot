const axios = require('axios');
const Discord = require('discord.js');
const client = new Discord.Client();

module.exports = {
	async execute() {
        setTimeout(function(){
            // Get info
            axios.get(`http://${process.env.IP}/players.json`)
                .then(function (response) {
                    /* 
                        Message
                    */
                    let players = response.data;
                    const embed = new Discord.MessageEmbed()
                    embed.setAuthor('ExtraVision Server Status')
                    
                    let cPlayers = 0;
                    let pIDs = '';
                    let pNames = '';
                    let pDiscords = '';

                    for (let i = 0; i < response.data.length; i++)
                    {
                        cPlayers++;
                        let pInfo = players[i].identifiers;
                        pIDs += `${players[i].id}\n`;
                        pNames += `${players[i].name}\n`;
                        for (j in pInfo)
                        {
                            if (pInfo[j].substring(0, 7) == 'discord') pDiscords += `<@${pInfo[j].substring(8)}>\n`;
                                
                        }
                    }
                    embed.addFields(
                        { name: 'ID', value: `${pIDs}`, inline: true },
                        { name: 'Name', value: `${pNames}`, inline: true },
                        { name: 'Discord', value: `${pDiscords}`, inline: true },
                    )
                    embed.setTitle(`Players: ${cPlayers}/32                  Space: ${parseInt((cPlayers * 100) / 32)}%`);
                    embed.setColor('#FF0000');
                    embed.setFooter(`IP: ${process.env.IP}`)
                    embed.setTimestamp(new Date())
                    client.channels.cache.get("863476510245650452"/*channelid*/).messages.fetch('863476586995908618')
                    .then(msg => {
                      msg.edit(embed);
                    })
                    /* 
                        Bot Status
                    */
                    client.user.setActivity(`🐌(${cPlayers}/32)`, { type: 'PLAYING' })
                })
                .catch(function (error) {
                    const embed = new Discord.MessageEmbed()
                    embed.setAuthor('ExtraVision Server Status')
                    embed.setColor('#FF0000');
                    embed.setFooter(`IP: ${process.env.IP}`)
                    embed.setTimestamp(new Date())
                    embed.setTitle('Status: Offline')
                    client.channels.cache.get("863476510245650452"/*channelid*/).messages.fetch('863476586995908618')
                    .then(msg => {
                      msg.edit(embed);
                    })
                });
            }, 60000);
        
	},
};