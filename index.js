import 'dotenv/config'; 
import { config } from 'dotenv';
import TelegramApi from 'node-telegram-bot-api';


config({ path: '.env.local' });

const token = process.env.BOT_API_TOKEN;
if (!token) {
    throw new Error('BOT_API_TOKEN not provided!');
}

const bot = new TelegramApi(token, { polling: true });

const start = () => {
    bot.setMyCommands([
        {command: "/start", description: "Начать"},
        {command: "/info", description: "Информация"},
        {command: "/schedule", description: "Расписание"},
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if(text === "/start") {
            return bot.sendMessage(chatId, `Ты написал иди нахуй`)
        }
        if(text === "/info") {
            return bot.sendMessage(chatId, `Ты написал ${msg.from.first_name}`)
        }
        return bot.sendMessage(chatId, "Я ничё не понял")
    });
}

start()



