import { Events } from 'discord.js'
import { dailiesJob } from '../dailies.js';

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`)

        // start the cron job to send dailies message
        dailiesJob(client).start()
    }
}
