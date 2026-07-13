require('dotenv').config();

const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const transporter = require('./services/mailService');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Используем TELEGRAM_CHAT_ID
const ADMIN_ID = process.env.TELEGRAM_CHAT_ID;

// Гарантируем существование папки data
const DATA_DIR = path.join(__dirname, './data');
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}
const DB = path.join(DATA_DIR, 'tickets.json');

function load() {
    try {
        if (!fs.existsSync(DB)) return [];
        return JSON.parse(fs.readFileSync(DB, 'utf8'));
    } catch {
        return [];
    }
}

function save(data) {
    fs.writeFileSync(DB, JSON.stringify(data, null, 2));
}

// LIST
bot.onText(/\/list/, (msg) => {
    if (msg.chat.id.toString() !== ADMIN_ID) return;

    const tickets = load();
    const open = tickets.filter(t => t.status === 'open');

    if (!open.length) {
        return bot.sendMessage(msg.chat.id, 'Нет открытых заявок');
    }

    bot.sendMessage(
        msg.chat.id,
        open.map(t => `#${t.id} | ${t.subject}`).join('\n')
    );
});

bot.onText(/\/done (.+)/, async (msg, match) => {
    if (msg.chat.id.toString() !== ADMIN_ID) return;

    const id = match[1];
    let tickets = load();

    let found = false;

    for (let t of tickets) {
        if (String(t.id) === String(id)) {
            found = true;
            t.status = 'done';

            try {
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: t.email,
                    subject: `Заявка #${t.id} закрыта`,
                    html: `
                        <h2>Заявка закрыта</h2>
                        <p>Здравствуйте, ${t.fullname}</p>
                        <p>Ваша заявка №${t.id} решена.</p>
                    `
                });
            } catch (e) {
                console.error("EMAIL ERROR:", e);
            }

            bot.sendMessage(msg.chat.id, `✔ Закрыто: ${id}`);
        }
    }

    if (!found) {
        return bot.sendMessage(msg.chat.id, 'Заявка с таким ID не найдена');
    }

    save(tickets);
});

console.log("Бот запущен");