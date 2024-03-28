import express from 'express'
import multer from 'multer'
import SingleUpload from '../models/FileUpload.js'

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads')
    },
    filename:function(req, file, cb){
        const filename = `${Date.now()}_${Math.round(Math.random() * 1E9)}_${file.originalname}`
        cb(null, filename)
    }
})

const Upload = multer({storage: storage})

const router = express.Router()

router.post('/single-upload', Upload.single('file'), async (req, res) => {
    try{
        const imageData = {
            name: req.body.name || 'No Title',
            imageUrl: req.file?.path
        }
        const data = await SingleUpload.create(imageData)
        res.status(201).json(data)
    }catch(error){
        console.log(error)
    }
})


router.get('/single-images', Upload.single('file'), async (req, res) => {
    try{
        const images = await SingleUpload.find()
        res.status(200).json(images)
    }catch(error){
        console.log(error)
    }
})

router.delete('/delete-image/:id', Upload.single('file'), async (req, res) => {
    try{
        await SingleUpload.findByIdAndDelete(req.params.id)
        res.status(200).json({message: 'Image Deleted!'})
    }catch(error){
        console.log(error)
    }
})


export default router