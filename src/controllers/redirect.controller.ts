import { Request, Response } from 'express'
import { Link } from '../models/Link'

// redirect in back side
export const redirectLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const nanoLink = req.params.nanoLink
    const link = await Link.findOne({ nanoLink })

    if (link === null) {
      res.status(404).json({ error: 'link not found' })
      return
    }

    res.redirect(link.longLink as string)
  } catch (error: any) {
    if (error.kind === 'ObjectId') {
      res.status(403).json({ error: 'Formato id incorrecto' })
    }
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}
