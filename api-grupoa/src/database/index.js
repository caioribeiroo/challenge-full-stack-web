const Sequelize = require('sequelize');
const config = require('../configuration/database');

const Student = require('../models/Student');

const connection = new Sequelize(config);

Student.init(connection);

module.exports = connection;
