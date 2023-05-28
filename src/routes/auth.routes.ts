import express from 'express'
const router = express.Router()

router.post('/login', (_req, res) => {
  res.json({ message: 'ok' })
})

router.post('/register', (_req, res) => {
  res.json({ message: 'ok' })
})

export default router
