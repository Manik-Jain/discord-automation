import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents : [ 
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => { 
    console.log('client ready')

    const guildId = process.env.GUILD_ID || ''
    const guild = client.guilds.cache.get(guildId)

    let commands;

    if(guild) {
        commands = guild.commands
    } else {
        commands = client.application?.commands
    }

    commands?.create({
        name: 'ping',
        description : 'Ping the server'
    })

    commands?.create({
        name : 'add',
        description : 'Add two numbers',
        options : [{
            name : 'num1',
            description : 'first number',
            type : DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        }, {
            name : 'num2',
            description : 'second number',
            type : DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER
        }],
    })
})

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isCommand()) {
        return
    }

    const { commandName, options } = interaction

    if(commandName === 'ping') {
        interaction.reply({
            content : 'pong',
            ephemeral : true
        })
    } else if(commandName === 'add') {
        const num1 = options.getNumber('num1')!
        const num2 = options.getNumber('num2')!

        //add delay
        await interaction.deferReply({ 
            ephemeral : true
        })

        await interaction.editReply({
            content : `${num1 + num2}`,
        })
    }
})

// client.on('messageCreate', (message) => {
//     if(message.content === 'ping') {
//         message.reply({
//             content: 'pong'
//         })
//     }
//     console.log(message.content)
// })

client.login(process.env.TOKEN)