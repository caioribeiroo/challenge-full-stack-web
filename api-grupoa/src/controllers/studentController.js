const { storeSerice } = require('../services/studentService');

module.exports = {
    async sotreController(req, res) {
        try {
            const { ar, name, email, cpf } = req.body;

            const result = await storeSerice({ ar, name, email, cpf });

            return res.status(201).json({ data: result });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}
