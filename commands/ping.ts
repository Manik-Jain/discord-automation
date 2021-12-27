import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'replies with pong',

    //make a slash command, otherwise works as !<command>
    slash: 'both',
    testOnly : true,

    callback: ({}) => {
        return 'pong'
    }
} as ICommand