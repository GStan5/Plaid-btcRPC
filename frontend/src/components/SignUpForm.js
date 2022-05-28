/*
*   Sign up form for new users
*/

import React, { useState } from 'react'

function SignUpForm({ create, changeForm, error }) {

    const[details, setDetails] = useState ({name: "", email: "", password: "", matchPassword: ""});

    const submitHandler = e => {
        
        e.preventDefault();
        create(details);
    }

    return (
        <div>
            <form onSubmit = {submitHandler}>
                <div className = "form-inner">
                    <h2>Create Account</h2>
                    {(error !== "") ? (<div className="error">{error}</div>) : ""}

                    <div className = "form-group"> 
                        <label htmlFor = "name">Name:</label>
                        <input type = "text" name = "name" id = "name" onChange = {e => setDetails({...details, name: e.target.value})} value = {details.name}/>
                    </div>
                    <div className = "form-group">
                        <label htmlFor = "email">Email:</label>
                        <input type = "text" name = "email" id = "email" onChange = {e => setDetails({...details, email: e.target.value})} value = {details.email}/>
                    </div>
                    <div className = "form-group">
                        <label htmlFor = "password">Password:</label>
                        <input type = "text" name = "password" id = "password" onChange = {e => setDetails({...details, password: e.target.value})} value = {details.password}/>
                    </div>
                    <div className = "form-group">
                        <label htmlFor = "password">Renter Password:</label>
                        <input type = "text" name = "matchPassword" id = "matchPassword" onChange = {e => setDetails({...details, matchPassword: e.target.value})} value = {details.matchPassword}/>
                    </div>
                    <input type = "submit" value = "Create Account"/>

                </div>
            </form>
            <button className="changeForm" onClick={changeForm}>LOGIN</button>
        </div>
    )
}

export default SignUpForm