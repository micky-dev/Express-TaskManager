require('dotenv').config()
require('./config/db_config')()
const express = require('express')
const app = express()
const expressEjsLayouts = require('express-ejs-layouts')

port = process.env.PORT




//* built-in middlewares
app.use(express.urlencoded({extended:false}))
app.use('/',express.static('public'))

//? Templating Engine setup
app.use(expressEjsLayouts)
app.set('view engine','ejs')
app.set('views',require('path').join(__dirname, 'views'))
app.set('layout','./layouts/main')

//*External Middlewares
app.use('/tasks',require('method-override')('_method'))

app.get('/',(req, res) => 
    {
        res.render('index',{title:'ejs'})
    })

app.use('/tasks', require('./routes/tasksRouter'))


app.listen(port,console.log(`Server running locally at - http://localhost:${port}`))