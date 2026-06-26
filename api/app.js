const dns = require('node:dns')
dns.setServers(['1.1.1.1', '8.8.8.8']);
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes')
const UserRoutes = require('./routes/UserRoutes')
const cors = require('cors')
// const {authRoutes}

require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors())

async function DBConnection() {
    try {
        await mongoose.connect(process.env.MONGOOSE_URI)
            .then(() => console.log('Connected!'));


    } catch (error) {
        console.log(error)
    }
}
DBConnection()

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', UserRoutes)

app.get('/health', (req, res) => {
    res.send('Server is running on a perfect length')
})

app.use((err, req, res, next) => {
    if (err == 'usman') {
        res.status(500).json({
            status: false,
            error: err
        })
    }
    if (err == 'Database timeout')
        throw "new Database timeout"
})

app.use((err, req, res, next) => {
    res.status(400).json({
        status: false,
        error: err
    })
})
app.listen(process.env.PORT, (req, res) => {
    console.log(`Server is running on ${process.env.PORT}`)
})