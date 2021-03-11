const {Tech} = require('../models')

module.exports = {
    async create(req,res){
        const {name} = req.body
        const createdAt = new Date()
        const updatedAt = new Date()

        try {
            const tech = await Tech.create({name,createdAt,updatedAt})
            return res.json(tech)
        } catch (e) {
            return res.status(500).send({msg:'Ocorreu um erro no banco de dados'})
        }
    }
}