import { Response } from 'express'
import jwt from 'jsonwebtoken'

interface IToken {
  token: string
  expiresIn: number
}

export const generateToken = (uid: string): IToken | any => {
  const expiresIn = 60 * 15

  try {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET as jwt.Secret, { expiresIn })

    return { token, expiresIn }
  } catch (error) {
    console.log(error)
  }
}

export const generateRefreshToken = async (uid: string, res: Response): Promise<void> => {
  const expiresIn = 60 * 60 * 24 * 30
  try {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH_TOKEN as jwt.Secret, { expiresIn })

    res.cookie('resfreshtoken', refreshToken, {
      httpOnly: true,
      secure: false
    })
  } catch (error) {
    console.log(error)
  }
}
