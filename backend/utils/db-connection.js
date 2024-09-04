const mongoose = require('mongoose')
require('dotenv').config()
const DB_Connection =  async()=>{
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING)
        console.log(`Database is connected successfully`)

    } 
    catch (error) {
        console.error(`DB Connection failed due to : ${error}`)
    }
}

module.exports = DB_Connection