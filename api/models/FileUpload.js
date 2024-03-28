import mongoose from "mongoose";


const SingUpload = mongoose.Schema({
    name:{
        type: String,
        default: 'No Title',
        require: true
    },
    imageUrl:{
        type: String,
        require: true
    }
})

export default mongoose.model('SingUpload', SingUpload)