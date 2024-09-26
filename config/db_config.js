require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery',false)

module.exports = async () => 
    {
        try
        {
            console.log('Connecting')
            const conn = await mongoose.connect(process.env.MONGODB_URI)
            console.log(`Database Connected: ${conn.connection.host}`)
        }
        catch(error)
        {
            console.log(error)
        }
    }
console.log('Database')