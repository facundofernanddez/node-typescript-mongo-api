import mongoose from 'mongoose'

(async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(process.env.URI_DATABASE)
    console.log('database connection in host: ' + connection.connection.host)
  } catch (error) {
    console.log('error connecting to database', error)
  }
})()
