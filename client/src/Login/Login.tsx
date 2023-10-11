import React, { useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

const Login = () => {
    const [submitting, setSubmitting] = useState(false);

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Please enter your email'),
        password: Yup.string().required('Please enter your password'),
    });

    const onSubmit = (values, { setSubmitting }) => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(true);
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
                /> <div>Login</div>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form>
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

                    <div className='form-button'>
                        <button className='btn btn-primary' type="submit" disabled={submitting}>{submitting ? 'Please wait' : 'Login'}</button>
                    </div>
                    <div className="form-login mt-2">
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                    </div>
                </Form>
            </Formik>
        </div>

    );
}

export default Login