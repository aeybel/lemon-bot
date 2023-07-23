import { Events } from 'discord.js'
import { dailiesJob } from '../dailies.js';
import { channelId } from '../config.json';

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`)

        // start the cron job to send dailies message
        dailiesJob(client, channelId).start()
    }
}
