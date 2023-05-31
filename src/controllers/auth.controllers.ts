import { Request, Response } from 'express'
import { User } from '../models/User'

export const login = async (_req: Request, res: Response): Promise<void> => {
  res.json({ message: 'login' })
}

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body
  try {
    // let user = await User.findOne({ email })
    // if (user !== null) throw { code: 11000 }

    const user = new User({ email, password })

    // consultar si existe el email

    await user.save()

    // jwt token

    res.json({ message: 'success' })
    return
  } catch (error: any) {
    console.log(error.code)
    if (error.code === 11000) {
      res.status(400).json({ error: 'user already exist' })
    }
  }
}
