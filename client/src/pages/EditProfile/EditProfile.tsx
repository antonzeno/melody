import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageUploading from "react-images-uploading";
import { uploadToS3 } from "../../services/s3Service";
import { encryptCookie } from "../../utils/utils";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/auth";

const EditProfile = () => {
    const [submitting, setSubmitting] = useState(false);
    const [user, setUser] = useRecoilState(userState);
    const [images, setImages] = useState([]);
    const maxNumber = 1;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    const handleImageChange = (imageList) => {
        setImages(imageList);
    };

    useEffect(() => {
        (async () => {
            try {
                axios.interceptors.request.use(
                    (config) => {
                        config.withCredentials = true;
                        return config;
                    },
                    (error) => {
                        return Promise.reject(error);
                    },
                );

                const response = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/user/checkAuth`,
                );

                if (response.status === 200) {
                    const userData = response.data.user;
                    console.log(userData);
                    setFormData({
                        name: userData.name ?? "",
                        email: userData.email ?? "",
                    });
                    setUser(userData);
                    encryptCookie("sessionId", userData);
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const removeImage = () => {
        setUser({ ...user, photo: "" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            axios.interceptors.request.use(
                (config) => {
                    config.withCredentials = true;
                    return config;
                },
                (error) => {
                    return Promise.reject(error);
                },
            );

            let imageUrl =
                images.length > 0
                    ? await uploadToS3(
                          images[0].file,
                          "melody-profilephotos",
                          `photos/${user.id}`,
                      )
                    : user.photo;

            const apiResponse = await axios.put(
                `${process.env.REACT_APP_SERVER_URL}/user/update`,
                {
                    userData: {
                        id: user.id,
                        name: formData.name,
                        email: formData.email,
                        photo: imageUrl,
                    },
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );

            if (apiResponse.status === 200) {
                setUser(apiResponse.data);
                encryptCookie("sessionId", apiResponse.data);
            } else {
                console.error("Error updating user:", apiResponse.statusText);
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    return (
        <div className="app-form">
            <div className="d-flex flex-column justify-content-center align-items-center">
                <img
                    src="/logo.png"
                    width="50"
                    height="50"
                    className="d-inline-block align-top"
                    alt="Logo"
                />{" "}
                <div>Edit profile</div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label className="input-label">Name:</label>
                    <input
                        className="form-input"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label className="input-label">Email:</label>
                    <input
                        className="form-input"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label className="input-label">Profile photo:</label>
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
                                    className="btn btn-dark mb-2"
                                    style={
                                        isDragging
                                            ? { color: "red" }
                                            : undefined
                                    }
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >
                                    Click or Drop here
                                </button>
                                &nbsp;
                                {imageList.length === 0 &&
                                    user.photo !== "" && (
                                        <div className="image-item">
                                            <img
                                                src={user.photo}
                                                alt=""
                                                width="100"
                                            />
                                            <div className="image-item__btn-wrapper mt-2">
                                                <button
                                                    className="btn btn-warning ms-2"
                                                    onClick={() =>
                                                        removeImage()
                                                    }
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                {imageList.map((image, index) => (
                                    <div key={index} className="image-item">
                                        <img
                                            src={image["data_url"]}
                                            alt=""
                                            width="100"
                                        />
                                        <div className="image-item__btn-wrapper mt-2">
                                            <button
                                                className="btn btn-dark"
                                                onClick={() =>
                                                    onImageUpdate(index)
                                                }
                                            >
                                                Update
                                            </button>
                                            <button
                                                className="btn btn-warning ms-2"
                                                onClick={() =>
                                                    onImageRemove(index)
                                                }
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ImageUploading>
                </div>
                <div className="form-button">
                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={submitting}
                    >
                        {submitting ? "Please wait" : "Save changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
