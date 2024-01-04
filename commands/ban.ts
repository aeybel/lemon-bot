import { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('fake_ban')
        .setDescription('Select a member and ban them.')
        .addUserOption(option => 
            option
                .setName('target')
                .setDescription('The member to ban')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('The reason for banning'))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .setDMPermission(false),
    async execute(interaction) {
        const target = interaction.options.getUser('target')
        const reason = interaction.options.getString('reason') ?? 'No reason provided'

        const confirm = new ButtonBuilder()
            .setCustomId('confirm ban')
            .setLabel('Confirm Ban')
            .setStyle(ButtonStyle.Danger);
        
        const cancel = new ButtonBuilder()
            .setCustomId('cancel ban')
            .setLabel('Cancel')
            .setStyle(ButtonStyle.Secondary);
        
        const row = new ActionRowBuilder()
            .addComponents(cancel, confirm);

        const response = await interaction.reply({
            content: `Are you sure you want to ban ${target} for ${reason}?`,
            components: [row],
        })

        const collectorFilter = i => i.user.id === interaction.user.id
        
        try {
            const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60000 })
        
            if (confirmation.customId === 'confirm') {
                await confirmation.update({ content: `${target.username} banned for reason ${reason}`, components: [] })
            } else if (confirmation.customId === 'cancel') {
                await confirmation.update({ content: 'Action cancelled', components: [] })
            }
        } catch (error) {
            await interaction.editReply({ content: 'Confirmation not recieved, cancelling', components: [] })
        }
    }
}
