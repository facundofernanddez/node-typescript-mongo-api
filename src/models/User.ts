import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

const { Schema, model } = mongoose

const userSchema = new Schema(
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

export const User = model('User', userSchema)
