// Require necessary node modules
import { GatewayIntentBits } from 'discord.js';
import MyClient from './client'
import { token } from './config.json';

// Create a new client instance
const client = new MyClient({ intents: [GatewayIntentBits.Guilds] });

// Log in to Discord with your client's token
client.login(token)
