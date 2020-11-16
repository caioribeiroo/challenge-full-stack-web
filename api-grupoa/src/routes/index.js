const express = require('express');

const { sotreController, destroyController } = require('../controllers/studentController');

const routes = express.Router();

routes.post('/student', sotreController);

routes.delete('/student/:id',destroyController);
module.exports = routes;
