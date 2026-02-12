const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = process.env.BOT_TOKEN;
const goldApiKey = process.env.GOLD_API_KEY;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    bot.sendMessage(msg.chat.id,
        "💎 Welcome to Raj Laxmi Jewellers 💎\n\nType:\n1️⃣ Gold Rate\n2️⃣ Silver Rate\n3️⃣ Talk to Owner");
});

bot.on('message', async (msg) => {
    if (!msg.text) return;

    const text = msg.text.toLowerCase();
    const chatId = msg.chat.id;

    if (text === "1" || text.includes("gold")) {
        try {
            const response = await axios.get('https://www.goldapi.io/api/XAU/INR', {
                headers: { 'x-access-token': goldApiKey }
            });
            bot.sendMessage(chatId, "📊 Live Gold Rate:\n₹" + response.data.price + " per ounce");
        } catch (error) {
            bot.sendMessage(chatId, "⚠ Unable to fetch gold rate right now.");
        }
    }

    else if (text === "2" || text.includes("silver")) {
        try {
            const response = await axios.get('https://www.goldapi.io/api/XAG/INR', {
                headers: { 'x-access-token': goldApiKey }
            });
            bot.sendMessage(chatId, "🥈 Live Silver Rate:\n₹" + response.data.price + " per ounce");
        } catch (error) {
            bot.sendMessage(chatId, "⚠ Unable to fetch silver rate right now.");
        }
    }

    else if (text === "3" || text.includes("owner")) {
        bot.sendMessage(chatId, "📞 Call: 8078619566\nOr send message here, we reply soon.");
    }
});
