import jwt from 'jsonwebtoken'

/* interface IToken {
  token: string
  expiresIn: number
} */

export const generateToken = (uid: string) => {
  const expiresIn = 60 * 15

  try {
    const token = jwt.sign({ uid }, process.env.JWT_SECRET as jwt.Secret, { expiresIn })

    return { token, expiresIn }
  } catch (error) {
    console.log(error)
  }
}
