var request = require("request")
var rl = require("readline-sync")
var DiscordH = require('discord.js')
var Discord = require("discord.js-selfbot")
var client = new Discord.Client()

var wid
var wtoken
var data
var hook

process.title = "message logger v0.1"
console.clear()

var token = rl.question("discord token: ")
var webhookUrl = rl.question("webhook url: ")

request({url: webhookUrl, json: true}, function (error, response, body) 
{
    wid = body.id
    wtoken = body.token
    data = { id: wid, token: wtoken }
    hook = new DiscordH.WebhookClient(data)
})

client.on("ready", () =>
{
    console.log(`\nlogged in as ${client.user.tag}\n`)
})

client.on("message", msg => 
{
    if(msg.author.id == client.user.id)
    {
        if(msg.content)
        {
            hook.send(msg.author.tag + ": " + msg.content)
        }
        if(msg.attachments) 
        {
            msg.attachments.forEach(attachment => 
            {
                var imageLink = attachment.proxyURL
                hook.send(msg.author.tag + ": " + `\`${imageLink}\``)
            })
        }
    }
})

client.login(token)