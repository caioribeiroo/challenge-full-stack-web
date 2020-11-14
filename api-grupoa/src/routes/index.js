const express = require('express');

const { sotreController } = require('../controllers/studentController');

const routes = express.Router();

routes.post('/student', sotreController);

module.exports = routes;
