import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import '../App.css'
import 'react-toastify/dist/ReactToastify.css';

import DeleteImg from '../assets/delete.png'

function SingleFileUpload(){

    const [filename, setFilename] = useState('');
    const [file, setFile] = useState('');
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        getAllImages()
    },[])

    const fileUploadHandler = async (event) => {
        event.preventDefault()
        if(!file){
            setError('Please upload your file.')
        }
        console.log(file[0])
        const formData = new FormData()
        formData.append('name', filename)
        formData.append('file', file[0])
        axios({
            method: "post",
            url: "http://localhost:9900/api/single-upload",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          }).then(_response =>{
            toast("Image Uploaded", {
                toastId: "containerA"
            });
            document.getElementById("image-upload-form").reset();
            getAllImages()
        })
    }

    const getAllImages = () => {
        axios.get('http://localhost:9900/api/single-images').then(response => {
            setImages(response.data || [])
        })
    }

    const deleteImage = (image) => {
        axios.delete(`http://localhost:9900/api/delete-image/${image._id}`).then(response => {
            toast("Image has been deleted", {
                toastId: "containerB"
            });
            getAllImages()
        })
    }

    return(
        <div className='container'>
            <ToastContainer containerId="containerA" />
            <ToastContainer containerId="containerB" />
            <div className='row file-container'>
                <div className='col-md-4'>
                    <div className='file-upload'>
                        <h4>Upload Your File</h4>
                        <p className='error'>{error}</p>
                        <form id='image-upload-form' onSubmit={fileUploadHandler} action='' method="post" enctype="multipart/form-data">
                            <div className="mb-3">
                                <label for="filename" className="form-label">File Name</label>
                                <input type="text" className="form-control" onChange={(e) => setFilename(e.target.value)} name='setFilename' id="filename" placeholder="Enter your file name"/>
                            </div>
                            <div className="mb-3">
                                <label for="formFile" className="form-label">Upload File</label>
                                <input className="form-control" name='setFile' onChange={(e) => setFile(e.target.files)} type="file" id="formFile"/>
                            </div>
                            <div className='mb-3'>
                                <input className='btn btn-danger' type='submit' value="Upload" />
                            </div>
                        </form>
                    </div>
                </div>
                <div className='col-md-8'>
                    <div className='file-view row'>
                        {images.length > 0 ? (images?.map(image => 
                            <div className="card col-md-4 card-item">
                                <div className='card-inner'>
                                    <div className='image-card'>
                                        <div onClick={() => deleteImage(image)} className='delete-img'>
                                            <img src={DeleteImg} alt='Delete' />
                                        </div>
                                        <img className='' src={`http://localhost:9900/${image.imageUrl}`} alt='test' />
                                    </div>
                                    <div className="card-body card-body-box">
                                        <h5 className="card-title">{image.name}</h5>
                                    </div>
                                </div> 
                            </div>
                        )): <div className='no-content'>Upload your file.</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleFileUpload;