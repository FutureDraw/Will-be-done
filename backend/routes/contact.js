const express = require('express');

const router = express.Router();

const transporter = require('../services/mailService');

router.post('/', async (req, res) => {

    try {

        const {
            fullname,
            email,
            company,
            message
        } = req.body;

        if (!fullname || !email || !message) {

            return res.status(400).json({
                error: 'Не заполнены обязательные поля'
            });

        }

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: process.env.EMAIL_USER,

            subject: 'Новая заявка с сайта',

            html: `
                <h2>Новая заявка</h2>

                <p><b>Имя:</b> ${fullname}</p>

                <p><b>Email:</b> ${email}</p>

                <p><b>Компания:</b> ${company}</p>

                <p><b>Сообщение:</b></p>

                <p>${message}</p>
            `

        });

        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: email,

            subject: 'Ваша заявка получена',

            html: `
                <h2>Здравствуйте, ${fullname}!</h2>

                <p>
                    Спасибо за обращение.

                    Мы рассмотрим заявку и свяжемся с вами
                    в течение 24 часов.
                </p>
            `

        });

        res.json({
            success: true
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: 'Ошибка сервера'
        });

    }

});

module.exports = router;