import mongoose from 'mongoose'

void (async () => {
  try {
    const db = await mongoose.connect(process.env.URI_DATABASE as string)

    console.log('database connection in host: ' + db.connection.host + ' name: ' + db.connection.name)
  } catch (error) {
    console.log('error connecting to database', error)
  }
})()
