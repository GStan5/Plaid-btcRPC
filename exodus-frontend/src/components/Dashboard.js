/*
*   Dashboard which displays allows the user to connect their bank account
*/

import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { usePlaidLink } from 'react-plaid-link';
import DisplayBankDetails from './DisplayBankDetails';


const backendURI = 'http://localhost:3555';



function Dashboard({ user, logout }) {

  const [token, setLinkToken] = useState(null);
  const [bankDetails, setBankDetails] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [accountDetails, setAccountDetails] = useState(null);
  const [ownedBTC, setOwnedBTC] = useState("0.0");
  const [ownedBTCValue, setOwnedBTCValue] = useState(0.0);
  const [priceBTC, setPriceBTC] = useState(0.00);
  const [error, setError] = useState("");



  // get link_token from your server when component mounts
  React.useEffect(() => {

    const createLinkToken = async () => {

      const data = { 
          data: user
      };
      const response = await axios.post(`${backendURI}/api/create_link_token`, data);

      setLinkToken(response.data.link_token);
    };
    createLinkToken();
  }, []);


  // on sucessful login takes public token and exchanges it for a access token
  const onSuccess = useCallback(async (publicToken, metadata) => {

    setBankDetails(metadata);

    //token exchange Request
    let data = {
      data: {
        public_token: publicToken,
      }
    };
    let response = await axios.post(`${backendURI}/item/public_token/exchange`, data)
    let token = response.data;
    setAccessToken(token);

    //account details Request
    data = {
      data: {
        access_token: token,
      }
    };
    response = await axios.post(`${backendURI}/api/accounts`, data);
    setAccountDetails(response.data);


    //BTC Balance Request
    data = {
      data: {
        user: user
      }
    };
    response = await axios.post(`${backendURI}/getBalanceBTC`, data);
    setOwnedBTC(parseFloat(response.data.balance));
    let currentOwnedBTC = response.data.balance

    //get current BTC Price
    response = await axios.get(`https://api.coinbase.com/v2/prices/spot?currency=USD`);
    let price = parseFloat(response.data.data.amount);
    setPriceBTC(price);
    let currentOwnedBTCValue = price*currentOwnedBTC
    setOwnedBTCValue(currentOwnedBTCValue);


  }, []);

  const { open, ready } = usePlaidLink({

    token,
    onSuccess,
  });


  const buyBTC = async (amountToBuy, cost, bankAccountFunds) => {

    cost = parseFloat(cost);
    bankAccountFunds = parseFloat(bankAccountFunds);

    if(cost>bankAccountFunds){
      setError("NOT ENOUGH FUNDS");
      return;
    }

    setError("")


    let data = {
      data: {
        user: user,
        amount: amountToBuy
      }
    };
    let response = await axios.post(`${backendURI}/purchaseBTC`, data);
    setOwnedBTC(response.data.balance);


    //get current BTC Price
    response = await axios.get(`https://api.coinbase.com/v2/prices/spot?currency=USD`);
    let price = parseFloat(response.data.data.amount);
    let currentOwnedBTCValue = price*ownedBTC
    setOwnedBTCValue(currentOwnedBTCValue);
  
  }



  return (
    <div>
        <div className = "Dashboard">

            {(error !== "") ? (<div className="DashboardError">{error}</div>) : ""}
            <h2>{user.name}</h2>


            {(accountDetails !== null ) ? (
              <DisplayBankDetails user = {user} bankDetails = {bankDetails} accounts = {accountDetails} 
              logout = {logout} ownedBTC = {ownedBTC} buyBTC = {buyBTC} ownedBTCValue = {ownedBTCValue}
              priceBTC = {priceBTC}/>
            ) : (
              <div className = "defaultDashboard">
                <button className = "connectBank" onClick={() => open()} disabled={!ready}>Connect Bank</button>
                <button className = "logout" onClick={logout}>Logout</button>
              </div> 
            )}


        </div>
    </div>
  )
}

export default Dashboard
