import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Dashboard from './components/Dashboard';


const backendURI = 'http://localhost:3555';


function App() {

  const [user, setUser] = useState({id: "", name: "", email: "", wallet: ""});
  const [newUser, setNewUser] = useState(false);
  const [error, setError] = useState("");

  
  const createAccount = async (details) => {

    //checks for unmatching passwords
    let passwordsMatch = (details.password === details.matchPassword);
    if (!passwordsMatch) { 
      setError(`Passwords DO NOT match`);
      return;
    }

    //checks for blanks sign up form
    for (const key in details) {

      if (details[key] === ""){
        setError(`${key} must not be blank`);
        return;
      }
    }

    //creates account for new user if account does not exist yet
    const data = { 
      data: details
    };
    const response = await axios.post(`${backendURI}/createAccount`, data);
    
    setError(response.data);
    console.log(response.data);
    if (response.data === true){
      login(details)
    }
  }
  

  const login = async (details) => {

    //check DB matching email & password
    const data = { "data": {
        email: details.email,
        password: details.password
    }};
    const response = await axios.post(`${backendURI}/login`, data);

    if (!response.data.hasOwnProperty('name')) { setError(response.data); return;}
    
    setUser({
      id: response.data.id,
      name: response.data.name, 
      email: response.data.email,
      wallet: response.data.wallet
    });
  }


  const logout = () => {

    setUser({name: "", email: ""})
  }


  const changeToCreateAccount = () => {

    setError("");
    setNewUser(true);
  }


  const changeToLogin = () => {

    setError("");
    setNewUser(false);
  }


  return (

    <div className="App">
      <title>Plaid & BTC RPC</title>
      <h1 className = "title">Plaid & BTC RPC</h1>

      


      {(user.name !== "" ) && (
      <Dashboard user = {user} logout = {logout} error = {error}/>
      )}
     

      {(newUser===true && user.name === "") && (
      <SignUpForm create = {createAccount} changeForm = {changeToLogin} error = {error}/>
      )}


      {(newUser===false && user.name === "") && (
      <LoginForm login = {login} changeForm = {changeToCreateAccount}/>
      )}


    </div>

  );
}

export default App;
