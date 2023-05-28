import 'dotenv/config'
import express from 'express'
import './database/connectdb'

const PORT = process.env.PORT || 5000

const app = express()

app.listen(PORT, () => { console.log(`server listening on port ${PORT}`) })
