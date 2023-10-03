import React from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Register = () => {
    const initialValues = {
        username: '',
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        username: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
    });

    const onSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
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
                onSubmit={onSubmit}
            >
                <Form>
                    <div className='input-group'>
                        <label htmlFor="username">Username</label>
                        <Field type="text" id="username" name="username" />
                        <ErrorMessage name="username" component="div" />
                    </div>

                    <div className='input-group'>
                        <label htmlFor="email">Email</label>
                        <Field type="text" id="email" name="email" />
                        <ErrorMessage name="email" component="div" />
                    </div>

                    <div className='input-group'>
                        <label htmlFor="password">Password</label>
                        <Field type="password" id="password" name="password" />
                        <ErrorMessage name="password" component="div" />
                    </div>

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>

    );
}

export default Register