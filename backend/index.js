const express = require('express')
const bodyParser = require('body-parser')
const UserRouter = require('./router/user.router')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const PORT = 4000
app.use(bodyParser.json())

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))
app.use(cookieParser())

app.use('/user', UserRouter)

app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`);
})

