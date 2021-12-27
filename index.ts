import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
import WOKCommands from 'wokcommands';
import path from 'path';
dotenv.config()

const client = new DiscordJS.Client({
    intents : [ 
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
})

client.on('ready', () => { 
    console.log('client ready')

    new WOKCommands(client, {
        commandsDir : path.join(__dirname, 'commands'),
        typeScript : true,
        testServers : [process.env.GUILD_ID || '']
    })
})

client.login(process.env.TOKEN)