import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'

const basic = new ButtonBuilder()
    .setCustomId('basic')
    .setLabel('Click me!')
    .setStyle(ButtonStyle.Primary)

const row = new ActionRowBuilder()
    .addComponents(basic);

export { row as BasicButton }
