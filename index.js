import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import tourRoute from './routes/tours.js'
import userRoute from './routes/users.js'
import authRoute from './routes/auth.js'
import reviewRoute from './routes/reviews.js'
import booking from './routes/bookings.js'
import bodyParser from 'body-parser'

dotenv.config()
const app = express()
const port = process.env.PORT || 8000

// database connection
mongoose.set('strictQuery', false)

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB database connected')
  } catch (err) {
    console.log(err)
  }
}

//middleware
app.use(
  cors({
    origin: ['https://nour-al-dunya-api.onrender.com', 'http://localhost:3000'],
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
  })
)
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/tours', tourRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/review', reviewRoute)
app.use('/api/v1/booking', booking)

app.listen(port, () => {
  connect()
  console.log('server listening on port', port)
})
