import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { authState } from "../../atoms/auth";

const Login = () => {
    const [submitting, setSubmitting] = useState(false);
    const setAuth = useSetRecoilState(authState);
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Please enter your email"),
        password: Yup.string().required("Please enter your password"),
    });

    const handleSubmit = async (values, { resetForm }) => {
        setSubmitting(true);
        try {
            axios.interceptors.request.use(
                (config) => {
                    config.withCredentials = true;
                    return config;
                },
                (error) => {
                    return Promise.reject(error);
                }
            );

            const response = await axios.post(process.env.REACT_APP_SERVER_URL + "/user/login", values);

            if (response.status === 200) {
                navigate("/");
            } else {
                console.error(response.data);
            }
        } catch (error) {
            console.error(error); //Todo: Handle console errors with snackbars
        }

        setSubmitting(false);
    };

    return (
        <div className="app-form">
            <div className="d-flex flex-column justify-content-center align-items-center">
                <img src="/logo.png" width="50" height="50" className="d-inline-block align-top" alt="Logo" />{" "}
                <div>Login</div>
            </div>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                <Form>
                    <div className="input-group">
                        <label className="input-label" htmlFor="email">
                            Email
                        </label>
                        <Field className="form-input" type="text" id="email" name="email" />
                        <ErrorMessage className="input-error" name="email" component="div" />
                    </div>

                    <div className="input-group">
                        <label className="input-label" htmlFor="password">
                            Password
                        </label>
                        <Field className="form-input" type="password" id="password" name="password" />
                        <ErrorMessage className="input-error" name="password" component="div" />
                    </div>

                    <div className="form-button">
                        <button className="btn btn-primary" type="submit" disabled={submitting}>
                            {submitting ? "Please wait" : "Login"}
                        </button>
                    </div>
                    <div className="form-login mt-2">
                        <p>
                            Don't have an account? <Link to="/register">Register</Link>
                        </p>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default Login;
