import { Client, Events } from 'discord.js'
import { dailiesJob } from '../dailies.js';
import { todoJob } from '../todos.js';

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client: Client) {
        console.log(`Ready! Logged in as ${client.user.tag}`)

        // start the cron job to send dailies message
        // dailiesJob(client).start()

        // start the cron job to read the reacts
        todoJob(client).start()
    }
}
