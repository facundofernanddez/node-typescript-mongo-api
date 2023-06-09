import { Router } from 'express'
import { redirectLink } from '../controllers/redirectLink'

const router = Router()

router.get('/:nanoLink', [redirectLink])

export default router
