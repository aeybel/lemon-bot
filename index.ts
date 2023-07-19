// Require necessary node modules
import { Events, GatewayIntentBits } from 'discord.js';
import MyClient from './client'
import { token, channelId } from './config.json';

// require my modules
import { dailiesJob } from './dailies.js';

// Create a new client instance
const client = new MyClient({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
    
    // start the cron job to send dailies message
    dailiesJob(client, channelId).start()
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    
    // map the command we recieved to the command object
    const command = client.commands.get(interaction.commandName)

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`)
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true })
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
        }
    }
})

// Log in to Discord with your client's token
client.login(token)
