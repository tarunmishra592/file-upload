import cookieParser from 'cookie-parser';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'

dotenv.config()

// Routes
import FileUpload from './routes/fileupload.js'
import mongoose from 'mongoose';

const PORT = 9900;
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({extended: false}))
app.use('/api', FileUpload)

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Database Connected')
    }catch(error){
        console.log(error)
    }
}


app.listen(PORT, () => {
    connectDb()
    console.log('Server Running On', PORT)
})