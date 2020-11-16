const { storeService, destroyService } = require('../services/studentService');

module.exports = {
    async sotreController(req, res) {
        try {
            const { ar, name, email, cpf } = req.body;

            const result = await storeService({ ar, name, email, cpf });

            return res.status(201).json({ data: result });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    async destroyController(req, res) {
        try {
            const { id } = req.params;

            const result = await destroyService( id );

            return res.status(200).json({ data: result});
        } catch (err) {
            return res.status(500).json({ message: err.message});
        }
    }
}
