const express = require('express');

const { sotreController, destroyController, updateController, selectAllController } = require('../controllers/studentController');

const routes = express.Router();

routes.post('/student', sotreController);

routes.delete('/student/:id',destroyController);

routes.put('/student/:id',updateController);

routes.get('/student',selectAllController);

module.exports = routes;
