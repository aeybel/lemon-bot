/**
 * Dailies
 * 
 * Dailies is a goal tracker. A message will be sent every day with buttons for each goal the user sets.
 * The user can click to indicate they have completed the action or not, causing the button to change colour.
 * This allows the user to quickly view goal adherance.
 */

import cron = require('cron')
import { BasicButton } from './messages/daily'
import { channelId } from './config.json';

function sendDailies(client) {
    const channel = client.channels.cache.get(channelId)
    var currentTime = new Date()
    console.log("sending dailies at", currentTime.toString())
    channel.send({
        content: "we did something at " + currentTime.toString(),
        components: [BasicButton]
    })
}

const dailiesJob = (client) => new cron.CronJob("*/5 * * * * *", () => sendDailies(client))

export { dailiesJob }
