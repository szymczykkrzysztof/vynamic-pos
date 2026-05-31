const express = require('express')
const cors = require('cors')
const products = require('./products')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.get('/api/products', (req, res) => {
    res.json(products)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})