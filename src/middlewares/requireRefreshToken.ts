import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { CustomRequest } from '../types/customRequest'

export const requireRefreshToken = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const refreshTokenFromCookie = await req.cookies.refresh_token

    if (refreshTokenFromCookie === null) throw new Error('no existe refresh token')

    const payload = jwt.verify(
      refreshTokenFromCookie,
      process.env.JWT_REFRESH_TOKEN as jwt.Secret
    )

    req.uid = (payload as { uid: string }).uid

    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ error })
  }
}
