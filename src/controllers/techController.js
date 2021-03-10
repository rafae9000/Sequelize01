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
            if(e.errors[0].message){
                const msg = e.errors[0].message
                return res.status(400).json({msg: msg})
            }
            else
                return res.status(500).json(e)
        }
    }
}