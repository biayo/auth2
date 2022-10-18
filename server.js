const express = require('express')
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello world')
})

// TODO: learn to get PORT value from .env file
app.listen(3000, () => {
    console.log('Server running on port 3000')
})
