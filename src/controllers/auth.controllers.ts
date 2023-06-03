import { Request, Response } from 'express'
import { User } from '../models/User'
import { generateToken } from '../utils/tokenManager'
import { CustomRequest } from '../middlewares/requireToken'

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user === null) {
      res.status(400).json({ message: 'User not found' })
      return
    }

    const responsePassword = await user.comparePassword(password.toString())

    if (!responsePassword) {
      res.status(400).json({ message: 'Incorrect password' })
      return
    }

    // Generar token con JWT

    const token = generateToken(user.id)

    res.json({ token: token.token, expire: token.expiresIn })
    return
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'internal error' })
  }
  // res.json({ message: 'login' })
}

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body
  try {
    // consultar si existe el email
    // let user = await User.findOne({ email })
    // if (user !== null) throw { code: 11000 }

    const user = new User({ email, password })

    await user.save()

    // jwt token

    res.status(201).json({ message: 'success' })
    return
  } catch (error: any) {
    console.log(error.code)
    if (error.code === 11000) {
      res.status(400).json({ error: 'user already exist' })
    }
    res.status(500).json({ error: 'internal server error' })
  }
}

export const infoUser = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    const uid = (req.uid)
    if (uid !== null) await res.json(uid)
    // const user = await User.findById(req.payload.)
    // res.json({ user })
  } catch (error) {
    console.log(error)
  }
}
