//npx sequelize-cli model:generate --name Product --attributes title:string,description:string,price:integer

require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/files',express.static(path.resolve(__dirname,"..","tmp","uploads")))
app.use(morgan('dev'))

app.listen(process.env.PORT || 3333, ()=>{console.log('Servidor iniciado!')})