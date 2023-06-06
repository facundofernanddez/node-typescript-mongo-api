import { RequestHandler, Router } from 'express'
import { createLink, getLinks } from '../controllers/links.controller'
import { requireToken } from '../middlewares/requireToken'

const router = Router()

// GET    /api/v1/links           all links
// GET    /api/v1/links/:id       single link
// POST   /api/v1/links           create a new link
// PACTH  /api/v1/links/:id       update link
// DELETE /api/v1/links/:id       delete link

router.get('/', [requireToken, getLinks] as unknown as RequestHandler)
router.post('/', [requireToken, createLink] as unknown as RequestHandler)

export default router
