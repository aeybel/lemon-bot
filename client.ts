// utils/Client.ts
import fs = require('node:fs');
import path = require('node:path');
import { Client, Collection } from "discord.js"

export default class MyClient extends Client {
  commands: Collection<any, any> // use correct type :)
  constructor(options) {
   super(options)
   this.commands = new Collection();
   this.loadCommands()
  }
  loadCommands() {
        // get every command from our folder and add it to the collection
        const commandsPath = path.join(__dirname, 'commands')
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file)
            const command = require(filePath)
            // Set a new item in the Collection with the key as the command name and the value as the exported module
            if ('data' in command && 'execute' in command) {
                this.commands.set(command.data.name, command)
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`)
            }
        }
  }
}
