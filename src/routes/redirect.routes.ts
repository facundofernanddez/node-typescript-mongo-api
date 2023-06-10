import { Router } from 'express'
import { redirectLink } from '../controllers/redirect.controller'

const router = Router()

router.get('/:nanoLink', [redirectLink])

export default router
