import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userState } from '../../atoms/auth';
import ImageUploading from 'react-images-uploading';

const EditProfile = () => {
    const [submitting, setSubmitting] = useState(false);
    const [user, setUser] = useRecoilState(userState);
    const [images, setImages] = React.useState([]);
    const maxNumber = 1;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        photo: '',
    });

    const handleImageChange = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };


    useEffect(() => {
        setFormData({
            name: user.name,
            email: user.email,
            photo: user.photo,
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

    };

    return (
        <div className="auth-form">
            <div className='d-flex flex-column justify-content-center align-items-center'>
                <img
                    src="/logo.png"
                    width="50"
                    height="50"
                    className="d-inline-block align-top"
                    alt="Logo"
                /> <div>Edit profile</div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='input-group'>
                    <label className='input-label'>Name:</label>
                    <input
                        className="form-input"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className='input-group'>
                    <label className='input-label'>Email:</label>
                    <input
                        className="form-input"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className='input-group'>
                    <label className='input-label'>Profile photo:</label>
                    <ImageUploading
                        value={images}
                        onChange={handleImageChange}
                        maxNumber={maxNumber}
                        dataURLKey="data_url"
                    >
                        {({
                            imageList,
                            onImageUpload,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps,
                        }) => (
                            <div className="upload__image-wrapper">
                                <button
                                    className='btn btn-dark mb-2'
                                    style={isDragging ? { color: 'red' } : undefined}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    Click or Drop here
                                </button>
                                &nbsp;
                                {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img src={image['data_url']} alt="" width="100" />
                                        <div className="image-item__btn-wrapper mt-2">
                                            <button className='btn btn-dark' onClick={() => onImageUpdate(index)}>Update</button>
                                            <button className='btn btn-warning ms-2' onClick={() => onImageRemove(index)}>Remove</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ImageUploading>
                </div>
                <div className='form-button'>
                    <button className='btn btn-primary' type="submit" disabled={submitting}>{submitting ? 'Please wait' : 'Save changes'}</button>
                </div>
            </form>
        </div>

    );
}

export default EditProfile;