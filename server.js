const { config } = require('dotenv')

const express = require('express')
const app = express()

config()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello world')
})

const PORT = parseInt(process.env.PORT) || 3000
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT)
})
