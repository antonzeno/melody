import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { useRecoilValue } from "recoil";

import { userState } from "../../atoms/auth";
import { uploadToS3 } from "../../services/s3Service";

const EditSoundtrack = () => {
    const { id } = useParams();
    const user = useRecoilValue(userState);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({ title: "", url: "" });
    const [soundtrack, setSoundtrack] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    const response = await axios.get(
                        `${process.env.REACT_APP_SERVER_URL}/soundtrack/${id}`,
                    );

                    if (response.status === 200) {
                        setFormData({
                            title: response.data.title ?? "",
                            url: response.data.url ?? "",
                        });
                    }
                } catch (error) {
                    console.error(error);
                }
            })();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
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

            let soundtrackUrl = await uploadToS3(
                soundtrack,
                "melody-soundtracks",
                `soundtrack/${user.id}`,
            );
            const data: { title: string; url: string; userId: any; id?: any } =
                {
                    title: formData.title,
                    url: soundtrackUrl,
                    userId: user.id,
                };
            let response;

            if (id) {
                data.id = id;
                response = await axios.put(
                    `${process.env.REACT_APP_SERVER_URL}/soundtrack/upload/${id}`,
                    {
                        data,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                );
            } else {
                response = await axios.post(
                    `${process.env.REACT_APP_SERVER_URL}/soundtrack/upload`,
                    {
                        data,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                );
            }

            if (response.status === 200) {
                if (!id) {
                    navigate(`/soundtrack/edit/${response.data.id}`);
                }
            } else {
                console.error("Error uploading:", response.statusText);
            }
        } catch (error) {
            console.error("Error uploading:", error);
        }
    };

    const onDrop = useCallback(async (acceptedFiles) => {
        try {
            setSoundtrack(acceptedFiles[0]);
        } catch (error) {
            console.error("Error uploading to S3:", error);
        }
    }, []);

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: {
            "audio/mp3": [".mp3", ".MP3"],
        },
    });

    const acceptedFileItems = acceptedFiles.map((file) => (
        <li>
            {file.name} - {file.size} bytes
        </li>
    ));

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
                <div>{id ? "Edit soundtrack" : "Upload soundtrack"}</div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label className="input-label">Title:</label>
                    <input
                        className="form-input"
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="input-group">
                    <label className="input-label">Soundtrack file:</label>
                    <div
                        {...getRootProps()}
                        style={{
                            border: "2px dashed #cccccc",
                            borderRadius: "4px",
                            textAlign: "center",
                            cursor: "pointer",
                            padding: "20px",
                            marginTop: "20px",
                            maxWidth: "100%",
                        }}
                    >
                        <input {...getInputProps()} />
                        <p>Drag & drop a file here, or click to select one</p>
                        <ul>
                            {acceptedFileItems.length > 0
                                ? acceptedFileItems
                                : formData.url}
                        </ul>
                    </div>
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

export default EditSoundtrack;
