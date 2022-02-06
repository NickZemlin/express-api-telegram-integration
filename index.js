require('dotenv').config()
const express = require('express');
const app = express();
const PORT = 5000;
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN;

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id, "nickzemlin.com/");
});


let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}




app.use(express.json()).use(function (req, res, next) {
    
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.listen(
    port,
    () => console.log(`http://localhost:${port}/kek`)
)

app.get('/kek', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send({
        kek: 'kek',
        kekers: 'kek'
    })
})

app.post('/contact', (req, res) =>{
    res.header("Access-Control-Allow-Origin", "*");
    const {msg} = req.body
    if (!msg){
        res.status(400).send({message: 'no mesage to send'})
    }
    res.send(
        "went well"
    )
    bot.sendMessage(645908441, msg, {parse_mode: 'markdown'})
})
