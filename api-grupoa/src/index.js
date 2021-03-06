const express = require('express');
const { json, urlencoded } = require('body-parser');
const cors = require('cors');
require('dotenv/config');

require('./database');
const routes = require('./routes');

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

app.use(routes);

app.listen(process.env.PORT, () => {
    console.log('API RUNNING!');
});
