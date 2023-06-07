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

export const createLink = async (req: Request, res: Response): Promise<void> => {
  try {
    // const links = await Link.find({ uid: (req as CustomRequest).uid })

    const { longLink } = req.body

    const link = new Link({ longLink, nanoLink: nanoid(6), uid: (req as CustomRequest).uid })

    const newLink = await link.save()

    res.status(201).json({ newLink })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}
