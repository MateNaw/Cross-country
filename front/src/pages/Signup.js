import React from 'react';

// Components
import Form from '../components/SignUpForm';

// Functions
import {submitForm} from "../components/Fetch";

// Variables
const url = 'http://127.0.0.1:3102/api/register';

const validateForm = (e, changeState) => {
    let errors = [];
    const form = document.forms['signUpForm'];
    if(form['login'].value.length < 8)
        errors.push({
            message: 'Login field cannot has less than 8 characters!',
            success: false
        });
    if(!form['firstName'].value.length)
        errors.push({
            message: 'First name field cannot be empty!',
            success: false
        });
    if(!form['lastName'].value.length)
        errors.push({
            message: 'Last name field cannot be empty!',
            success: false
        });
    if(!form['password1'].value.length)
        errors.push({
            message: 'Password field cannot has less than 8 characters!',
            success: false
        });
    if(form['password1'].value !== form['password2'].value)
        errors.push({
            message: 'Passwords doesn\'t match!',
            success: false
        });
    if(errors.length)
        changeState(errors);
    else {
        const data = {}
        data.login = form['login'].value;
        data.first_name = form['firstName'].value;
        data.last_name = form['lastName'].value;
        data.birth_date = '1998-11-18';
        data.pass = form['password1'].value;
        submitForm(url, data, changeState);
        form['login'].value = '';
        form['firstName'].value = '';
        form['lastName'].value = '';
        form['password1'].value = '';
        form['password2'].value = '';
    }
};

const SignUp = () => {
    return (
        <section className={"sign"}>
            <Form submitForm={validateForm}/>
        </section>
    );
}

export default SignUp;