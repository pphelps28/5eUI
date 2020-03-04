const express = require('express')
const app = express()
app.use(express.static('./public'))
const PORT = process.env.PORT || 5000
app.listen(process.env.PORT || 5000, () => {
    console.log(`listening on port: ${PORT}`)
})