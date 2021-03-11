const {User, sequelize} = require('../models')
const {Tech} = require('../models')

module.exports = {
    async create(req,res){
        const {name,email,birthday,password} = req.body
        const createdAt = new Date()
        const updatedAt = new Date()
        
        try{
            const user = await User.create({name,email,birthday,password,createdAt,updatedAt})
            return res.json(user)
        }catch(e){
            /*
            if(e.errors[0].message){
                const msg = e.errors[0].message
                return res.status(400).json({msg: msg})
            }
            else*/
            return res.status(500).send({msg:'Ocorreu um erro no banco de dados'})
        }
    },

    async index(req,res){
        await sequelize.query('SELECT * FROM "Users"').then(([results,metadata]) => {res.json(results)})
    },

    async addTech(req,res){
        const {user_id,tech_id} = req.body

        const user = await User.findByPk(user_id)
        const tech = await Tech.findByPk(tech_id)

        await user.addTech(tech)

        return res.json(user)
    }
}