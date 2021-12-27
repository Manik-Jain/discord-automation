import { GuildChannelCreateOptions } from "discord.js";
import { ICommand} from "wokcommands";

export default {

    category : 'Testing',
    description: 'creates new channel',

    //make a slash command, otherwise works as !<command>
    //slash: 'both',
    testOnly : true,

    callback: ({message}) => {
      const channelName = message.content.replace('!createChannel ', '')  
      message.guild?.channels.create(channelName)
    }

 } as ICommand