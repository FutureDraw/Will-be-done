const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const transporter = require('../services/mailService');

// Гарантируем существование папки data
const DATA_DIR = path.join(__dirname, '../data');
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}
const DB_PATH = path.join(DATA_DIR, 'tickets.json');

function load() {
    try {
        if (!fs.existsSync(DB_PATH)) return [];
        return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
    } catch {
        return [];
    }
}

function save(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

router.post('/', async (req, res) => {
    try {
        const { fullname, email, subject, message } = req.body;

        console.log("🔥 SUPPORT HIT:", req.body);

        if (!fullname || !email || !subject || !message) {
            return res.status(400).json({ error: "empty fields" });
        }

        const tickets = load();

        const ticket = {
            id: Date.now(),
            fullname,
            email,
            subject,
            message,
            status: "open"
        };

        tickets.push(ticket);
        save(tickets);

        // EMAIL пользователю
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Заявка #${ticket.id} принята`,
            html: `
                <h2>Заявка принята</h2>
                <p>Здравствуйте, ${fullname}</p>
                <p>Ваша заявка №${ticket.id} принята.</p>
            `
        });

        // TELEGRAM админу
        await axios.post(
            `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                chat_id: process.env.TELEGRAM_CHAT_ID,
                text:
`🚨 НОВАЯ ЗАЯВКА #${ticket.id}

👤 Имя: ${fullname}
📧 Email: ${email}
📝 Тема: ${subject}

💬 ${message}`
            }
        );

        res.json({ success: true, ticket });

    } catch (err) {
        console.error("SUPPORT ERROR:", err);
        res.status(500).json({ error: "server error" });
    }
});

module.exports = router;