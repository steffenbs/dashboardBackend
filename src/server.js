const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT


// middleware
app.use(express.json())
app.use(cors())

// routes
app.use('/auth', require('../routes/jwtAuth'))
app.use('/dashboard', require('../routes/dashboard'))
app.use('/notes', require('../routes/notesDashboard') )

app.listen(port, () => {
    console.log(' Server is up on port: ' + port)
})