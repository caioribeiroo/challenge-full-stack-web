const { storeService, destroyService, updateService, selectAllService } = require('../services/studentService');

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
    },

    async updateController(req, res){
        try {
            const { id } = req.params

            const {name, email} = req.body

            const result = await updateService(id,{ name, email });

            return res.status(200).json({ data: result});
        } catch (err) {
            return res.status(500).json({ message: err.message});
        }
    },

    async selectAllController(req,res){
        try{
            const result = await selectAllService();

            return res.status(200).json({ data: result});
        } catch (err) {
            return res.status(500).json({ message: err.message});
        }
    }
}
