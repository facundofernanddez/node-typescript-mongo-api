import { Schema, model, Document } from 'mongoose'
import bcryptjs from 'bcryptjs'

const userSchema: Schema<IUser> = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()

  try {
    const salt = await bcryptjs.genSalt(10)
    const hash = await bcryptjs.hash(this.password, salt)
    this.password = hash.toString()
    next()
  } catch (error) {
    console.log(error)
    throw new Error('fallo el hash de contraseña')
  }
})

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcryptjs.compare(candidatePassword, this.password)
}

export interface IUser extends Document {
  email: string
  password: string
  comparePassword: (candidatePassword: string) => Promise<boolean>
}

export const User = model('User', userSchema)
