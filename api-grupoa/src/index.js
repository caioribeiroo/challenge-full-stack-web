const express = require('express');
const { json, urlencoded } = require('body-parser');
require('dotenv/config');

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

app.listen(process.env.PORT, () => {
    console.log('API RUNNING!');
});
