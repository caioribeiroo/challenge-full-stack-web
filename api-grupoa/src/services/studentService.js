const { update } = require('../models/Student');
const Student = require('../models/Student');

module.exports = {
    async storeService(body) {
        try {
            const student = await Student.findOne({ where: { ar: body.ar } });

            if (student) {
                return 'Registro Acadêmico já cadastrado.'
            }

            await Student.create(body);

            return 'Aluno cadastrado com sucesso.';
        } catch (err) {
            throw new Error(err.message);
        }
    },

    async destroyService(idStudent) {
        try {
            const student = await Student.findOne({ where: { id: idStudent } });

            if (!student) {
                return 'Registro inexistente.';
            }

            await Student.destroy({ where: { id: idStudent } });

            return 'Aluno excluido com sucesso.';
        } catch (err) {
            throw new Error(err.message);
        }
    },

    async updateService(idStudent, body){
        try {
            const student = await Student.findOne({ where:{ id: idStudent } });

            if (!student) {
                return 'Registro inexistente.';
            }
            await Student.update(body, {where:{id: idStudent}});
            return 'Aluno atualizado com sucesso.';
        } catch (err) {
            throw new Error(err.message);
        }
    },

    async selectAllService(){
        try{
            const students = await Student.findAll();

            return students;
        }catch (err) {
            throw new Error(err.message);
        }

    },
}
