/**
 * Todos
 * 
 * Set a channel to be the "active todos" channel and a "completed todos" channel
 * When reacting to a message in the "active todos" channel, it is moved to the "completed todos" channel on a cron job (every 10 minutes)
 */

import cron = require('cron')
import { channelId, archiveChannelId } from './config.json';
import { Client, Collection, Message, Snowflake } from 'discord.js';

function hasReaction(msg: Message) {
    return msg.reactions.cache.filter(react => react.count > 0).size > 0;
}

async function sendMessage(client, msg: Message) {
    const channel = client.channels.cache.get(archiveChannelId)
    await channel.send({
        content: `${msg.content}\nArchived ${new Date()}`
    })
}

async function readReacts(client) {
    console.log("tick")
    var currentTime = new Date()
    const channel = client.channels.cache.get(channelId)
    let messages: Collection<Snowflake, Message> = await channel.messages.fetch({ limit: 50 })
    messages.forEach(msg => {
        if (hasReaction(msg)) {
            console.log("This message has a reaction!")
            // send a message containing this text to another channel
            try {
                sendMessage(client, msg).then(_ => msg.delete())
            } catch (err) {
                console.log("There was an error: " + err)
            }
        }
    });
}

const todoJob = (client: Client) => new cron.CronJob("*/30 * * * * *", () => readReacts(client))

export { todoJob }
