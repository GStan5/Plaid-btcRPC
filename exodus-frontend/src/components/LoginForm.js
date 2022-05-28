/*
*   Login component for Created Accounts
*/

import React, { useState } from 'react'

function LoginForm({ login, changeForm , error }) {

    const[details, setDetails] = useState ({name: "", email: "", password: ""});

    const submitHandler = e => {
        
        e.preventDefault();
        login(details);
    }



    return (
        <div>
            <form onSubmit = {submitHandler}>
                <div className = "form-inner">
                    <h2>LOGIN</h2>
                    {(error !== "") ? (<div className="error">{error}</div>) : ""}

                    <div className = "form-group">
                        <label htmlFor = "email">Email:</label>
                        <input type = "text" name = "email" id = "email" onChange = {e => setDetails({...details, email: e.target.value})} value = {details.email}/>
                    </div>
                    <div className = "form-group">
                        <label htmlFor = "password">Password:</label>
                        <input type = "text" name = "password" id = "password" onChange = {e => setDetails({...details, password: e.target.value})} value = {details.password}/>
                    </div>
                    <input type = "submit" value = "LOGIN"/>
                </div>
            </form>
            <button className="changeForm" onClick={changeForm}>CREATE ACCOUNT</button>
        </div>
        
        
    )
}

export default LoginForm