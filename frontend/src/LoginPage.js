import React from 'react';
import { Formik, Field, Form } from "formik";
import * as Yup from 'yup';
import './LoginPage.css';

const SignupSchema = Yup.object().shape({
    username: Yup.string().min(6, 'Needs at least 6 characters').max(30, 'Can only be a maximum of 30 characters').matches(
        /^[A-Za-z][A-Za-z0-9_]/,
        'Can only contain alphanumeric characters and underscore'
    ).required('Required'),
    password: Yup.string().min(8, 'Needs at least 8 characters').max(32, 'Can only be a maximum of 32 characters').required('Required'),
});

function LoginPage() {
    const handleLogin = ({ username, password }) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'username': username, 'password': password })
        };

        fetch('http://localhost:8080/api/v1/accounts/login', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    };

    return (
        <div className="loginPage">
            <h2 className="loginPage--title">Passy</h2>
            <Formik
                initialValues={{ username: "", password: "" }}
                validationSchema={SignupSchema}
                onSubmit={values => { handleLogin(values) }}
            >
                {({ errors, touched }) => (
                    <Form className="loginPage--form">
                        <Field name="username" type="string" />
                        {errors.username && touched.username ? (
                            <div>{errors.username}</div>
                        ) : null}
                        <br />
                        <Field name="password" type="password" />
                        {errors.password && touched.password ? (
                            <div>{errors.password}</div>
                        ) : null}
                        <br />
                        <button disabled={(errors.username || errors.password) || (!touched.username || !touched.password)} type="submit">Log in</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
};

export default LoginPage;
