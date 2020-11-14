const Studet = require('../models/Student');

module.exports = {
    async storeSerice(body) {
        try {
            await Studet.create(body);

            return 'Aluno cadastrado com sucesso.';
        } catch (err) {
            throw new Error(err.message);
        }
    }
}
