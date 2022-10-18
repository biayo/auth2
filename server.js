const { config } = require('dotenv')

const express = require('express')
const app = express()

const bcrypt = require('bcrypt')

config()

const users = []

// @REMEMBER: allows app to receive json in the request
app.use(express.json())

// TODO: remove this route
app.get('/', (req, res) => {
    res.send('Hello world')
})

// TODO: authorize this route
app.get('/users', (req, res) => {
    res.json(users)
})

// TODO: authorize this route
app.post('/users', async (req, res) => {
    try {
        // create salt & password
        const salt = await bcrypt.genSalt()
        const password = await bcrypt.hash(req.body.password, salt)

        // create user
        const user = {
            name: req.body.name,
            username: req.body.username,
            password: password
        }

        // hash password
        // persist user
        users.push(user)

        res.status(201).send()
    } catch (error) {
        res.status(500).send()
    }
})

app.post('/login', async (req, res) => {
    const found = users.find(user => user.username === req.body.username)
    if (found == null) {
        return res.status(404).send()
    }

    try {
        if (await bcrypt.compare(req.body.password, found.password)) {
            return res.status(200).send()
        } else {
            res.status(401).send()
        }
    } catch (error) {
        res.status(500).send()
    }
})

const PORT = parseInt(process.env.PORT) || 3000
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT)
})
