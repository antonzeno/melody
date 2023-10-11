import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Register.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [submitting, setSubmitting] = useState(false);

    const initialValues = {
        name: '',
        email: '',
        password: '',
        password2: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name cannot be empty.'),
        email: Yup.string().email('Invalid email address').required('Email cannot be empty.'),
        password: Yup.string().required('Password cannot be empty').min(8, 'Password must be at least 8 characters'),
        password2: Yup.string()
            .when('password', (password, schema) => {
                if (password) return schema.required('Confirm Password is required');
            })
            .oneOf([Yup.ref('password')], 'Passwords must match')
    });

    const handleSubmit = async (values, { resetForm }) => {
        setSubmitting(true)
        try {
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + '/user/register', values)

            if (response.status == 200) {
                resetForm()
            } else {
                console.error(response.data)
            }

        } catch (error) {
            console.error(error) //Todo: Handle console errors with snackbars
        }

        setSubmitting(false)
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
                /> <div>Register</div>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className='input-group'>
                        <label className='input-label' htmlFor="name">Name</label>
                        <Field className="form-input" type="text" id="name" name="name" />
                        <ErrorMessage className='input-error' name="name" component="div" />
                    </div>

                    <div className='input-group'>
                        <label className='input-label' htmlFor="email">Email</label>
                        <Field className="form-input" type="text" id="email" name="email" />
                        <ErrorMessage className='input-error' name="email" component="div" />
                    </div>

                    <div className='input-group'>
                        <label className='input-label' htmlFor="password">Password</label>
                        <Field className="form-input" type="password" id="password" name="password" />
                        <ErrorMessage className='input-error' name="password" component="div" />
                    </div>

                    <div className='input-group'>
                        <label className='input-label' htmlFor="password2">Repeat password</label>
                        <Field className="form-input" type="password" id="password2" name="password2" />
                        <ErrorMessage className='input-error' name="password2" component="div" />
                    </div>

                    <div className='form-button'>
                        <button className='btn btn-primary' type="submit" disabled={submitting}>{submitting ? 'Please wait' : 'Register'}</button>
                    </div>
                    <div className="form-login mt-2">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </Form>
            </Formik>
        </div>

    );
}

export default Register