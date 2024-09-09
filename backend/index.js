const express = require('express')
const app = express()
require('dotenv').config()
var cors = require("cors");
const DB_CONNECTION = require('./utils/db-connection');
const userRouter = require('./routers/user');
const adminRouter = require('./routers/admin');
const generate_OPT = require('./utils/generate-otp');
generate_OPT()

// middleware allow to use json 
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/api/user',userRouter)
app.use('/api/admin',adminRouter)

DB_CONNECTION().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server is running on PORT : ${process.env.PORT}`)
    })
})
