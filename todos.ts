/**
 * Todos
 * 
 * Set a channel to be the "active todos" channel and a "completed todos" channel
 * When reacting to a message in the "active todos" channel, it is moved to the "completed todos" channel on a cron job (every 10 minutes)
 */

import cron = require('cron')
import { channelId } from './config.json';
import { Client, Collection, Message, Snowflake } from 'discord.js';

function hasReaction(msg: Message) {
    return msg.reactions.cache.filter(react => react.count > 0).size > 0;
}

async function readReacts(client) {
    console.log("tick")
    var currentTime = new Date()
    const channel = client.channels.cache.get(channelId)
    let messages: Collection<Snowflake, Message> = await channel.messages.fetch({ limit: 10 })
    messages.forEach(msg => {
        if (hasReaction(msg)) {
            console.log("This message has a reaction!")
        }
    });
}

const todoJob = (client: Client) => new cron.CronJob("*/2 * * * * *", () => readReacts(client))

export { todoJob }
