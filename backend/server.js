require('dotenv').config();

const express = require('express');
const cors = require('cors');

const contactRoute = require('./routes/contact');
const supportRoute = require('./routes/support');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/contact', contactRoute);
app.use('/api/support', supportRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server started: http://localhost:${process.env.PORT}`);
});