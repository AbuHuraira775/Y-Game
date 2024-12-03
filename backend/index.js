const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 3000
var cors = require("cors");
const DB_CONNECTION = require('./utils/db-connection');
const userRouter = require('./routers/user');
const adminRouter = require('./routers/admin');

// middleware allow to use json 
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use('/api/user',userRouter)
app.use('/api/admin',adminRouter)

// app.get('/my-url', (req, res) => {
//     res.send('my-url ')
// })

DB_CONNECTION().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running on PORT : ${PORT}`)
    })
})
