import express from 'express'
import { Client, GatewayIntentBits } from 'discord.js'
import cors from 'cors'


//Variaveis de configuração -
const PORT = 5174
const TOKEN = ""
let guildsData = {}
// bot discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates
    ]
})

client.once("clientReady", async () =>{
    console.log(`Bot Coletando informações logado em ${client.user.tag}`)
    
    client.guilds.cache.forEach(async guild => {
        const member = await guild.members.fetch()
        const channels = guild.channels.cache.map(c => ({
            id: c.id,
            name: c.name,
            type: c.type,
            parentId: c.parentId || null
        }))
        const Sanchannels = channels.filter(c => c.type != 4)
        guildsData[guild.id] = {
            id: guild.id,
            name: guild.name,
            memberCount: guild.memberCount,
            guildImage: guild.iconURL(),
            members: member.map(m => ({
                id: m.id,
                username: m.user.username,
                memberImage: m.displayAvatarURL(),
                tag: m.user.tag,
                roles: m.roles.cache.map(r => r.name),
                bot: m.user.bot
            })),
            channels: Sanchannels,
        }


    })


})


client.once("guildCreate", async ()=>{
    const member = await guild.members.fetch()
        const channels = guild.channels.cache.map(c => ({
            id: c.id,
            name: c.name,
            type: c.type,
            parentId: c.parentId || null
        }))

        guildsData[guild.id] = {
            id: guild.id,
            name: guild.name,
            memberCount: guild.memberCount,
            guildImage: guild.iconURL,
            members: member.map(m => ({
                id: m.id,
                username: m.user.username,
                tag: m.user.tag,
                roles: m.roles.cache.map(r => r.name),
                bot: m.user.bot
            })),
            channels: channels,
        }
})

client.login(TOKEN)


//Express

const app = express()
app.use(cors({
    origin: "http://localhost:5173"
}))


app.get("/", (req,res) =>{
    res.json(guildsData)
})


app.listen(PORT, () => console.log("node Rodando!"))