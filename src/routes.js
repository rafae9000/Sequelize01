const routes = require('express').Router()
const UserController = require('./controllers/userController')
const TechController = require('./controllers/techController')
const multer = require('multer')
const multerConfig = require('./config/multer')
const aws = require('aws-sdk')
const {File} = require('./models')

const fs = require('fs')
const path = require('path')
const {promisify} = require('util')

const s3 = new aws.S3({})

routes.post('/users',UserController.create)
routes.get('/users',UserController.index)

routes.post('/techs',TechController.create)

routes.post('/users/tech',UserController.addTech)

routes.post('/files',multer(multerConfig).single('file'),async (req,res)=>{
    const disk = `${process.env.APP_URL}/files/${req.file.key}`
    const file = await File.create({
        name:req.file.originalname,
        size:req.file.size,
        key:req.file.key,
        url: req.file.location || disk
    })
    res.json(file)
})

routes.delete('/files/:id',async (req,res) => {
    const id = req.params.id
    const file = await File.findByPk(id)

    if(file){
        const params = { Bucket:'upload47',Key:file.key }
        if(process.env.STORAGE == 's3'){
            s3.deleteObject(params,(err,data) => {
                if(err) res.status(500).send({msg:'S3 falhou em excluir o arquivo'})
            })
            try {
                await file.destroy()
            } catch (error) {
                res.json(error)
            }

            res.json({msg:'Arquivo excluido com sucesso!'})
        }
        else{
            try {
                const caminho = path.resolve(__dirname,'..','tmp','uploads',`${file.key}`)
                console.log(caminho)
                await promisify(fs.unlink)(caminho)
                await file.destroy()
                res.json({msg:'Arquivo excluido com sucesso!'})

            } catch (error) {
                res.status(500).send({msg:'Disk falhou em excluir o arquivo'})
            }
            
        }
    }

})


module.exports = routes