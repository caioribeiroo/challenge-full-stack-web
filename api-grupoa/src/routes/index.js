const express = require('express');

const { sotreController, destroyController, updateController } = require('../controllers/studentController');

const routes = express.Router();

routes.post('/student', sotreController);

routes.delete('/student/:id',destroyController);

routes.put('/student/:id',updateController);
module.exports = routes;
