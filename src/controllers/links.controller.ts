import { Request, Response } from 'express'
import { Link } from '../models/Link'
import { CustomRequest } from '../types/customRequest'
import { nanoid } from 'nanoid'

export const getLinks = async (req: Request, res: Response): Promise<void> => {
  try {
    const links = await Link.find({ uid: (req as CustomRequest).uid })

    res.json({ links })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

export const getOneLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const nanoLink = req.params.nanoLink
    const link = await Link.findOne({ nanoLink })

    if (link === null) {
      res.status(404).json({ error: 'link not found' })
      return
    }

    res.json({ longLink: link.longLink })
  } catch (error: any) {
    if (error.kind === 'ObjectId') {
      res.status(403).json({ error: 'incorrect id format' })
    }
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

export const createLink = async (req: Request, res: Response): Promise<void> => {
  try {
    // const links = await Link.find({ uid: (req as CustomRequest).uid })

    let { longLink } = req.body
    if (!longLink.startsWith('https://')) {
      longLink = 'https://' + longLink
    }

    const link = new Link({ longLink, nanoLink: nanoid(6), uid: (req as CustomRequest).uid })

    const newLink = await link.save()

    res.status(201).json({ newLink })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

export const removeLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id
    const link = await Link.findById(id)

    if (link === null) {
      res.status(404).json({ error: 'link does not exist' })
      return
    }

    if (link?.uid?.equals((req as CustomRequest).uid) === false) {
      res.status(401).json({ error: 'No le pertenece ese link 🤡' })
      return
    }

    await link.deleteOne()

    res.json({ link })
  } catch (error: any) {
    console.log(error)
    if (error.kind === 'ObjectId') {
      res.status(403).json({ error: 'Formato id incorrecto' })
    }
    res.status(500).json({ error: error.message })
  }
}

export const updateLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id
    let { longLink } = req.body
    console.log(longLink)
    if (!longLink?.startsWith('https://')) {
      longLink = 'https://' + longLink
    }
    const link = await Link.findById(id)

    if (link === null) {
      res.status(404).json({ error: 'link does not exist' })
      return
    }

    if (link?.uid?.equals((req as CustomRequest).uid) === false) {
      res.status(401).json({ error: 'No le pertenece ese link 🤡' })
      return
    }

    // update
    link.longLink = longLink
    await link.save()

    res.json({ link })
  } catch (error: any) {
    console.log(error)
    if (error.kind === 'ObjectId') {
      res.status(403).json({ error: 'Formato id incorrecto' })
    }
    res.status(500).json({ error: error.message })
  }
}
