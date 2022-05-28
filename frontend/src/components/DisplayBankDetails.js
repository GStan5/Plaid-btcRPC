/*
*   Displays bank details to the dashboard screen after a sucessful pull of bank details
*/

import React, { useState } from 'react'

function DisplayBankDetails({ user, bankDetails, accounts, logout, ownedBTC, buyBTC, ownedBTCValue, priceBTC }) {

    const[cost, setCost] = useState (0.00);
    const[costDisplay, setCostDisplay] = useState (0.00);

    let bankName = bankDetails.institution.name;
    ownedBTCValue = Math.round(ownedBTCValue * 100) / 100
    ownedBTCValue = ownedBTCValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    

    let accountDetailsDropdown= [];
    let accountDetailsDisplay = [];
    accounts.accounts.forEach(account => {

        accountDetailsDisplay.push(<p>{account.name}:  ${account.balances.available}</p>);
        accountDetailsDropdown.push(<option value={account.balances.available}>{account.name}:  ${account.balances.available}</option>);
    });
    

    const submitHandler = e => {

        e.preventDefault();
        let input = document.getElementById("quantity").value
        let bankAccountFunds = document.getElementById("bankAccounts");
        bankAccountFunds = bankAccountFunds.options[bankAccountFunds.selectedIndex].value;
        buyBTC(input, cost, bankAccountFunds);
    }

    const onChange = e => {

        e.preventDefault();
        let input = document.getElementById("quantity").value
        let cost = priceBTC*input;
        cost = Math.round(cost * 100) / 100
        setCostDisplay(cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','))
        setCost(cost)
    }


    return (
        <div>
            <button className = "logoutBD" onClick={logout}>Logout</button>
            <form className = "purchaseForm" onSubmit = {submitHandler}>
                <input className = "purchaseAmount" type="number" id="quantity" name="quantity" placeholder=".01" step="any" min="0.0001" onChange = {onChange}/> 
                <button className = "buyBTCButton">BUY BITCOIN: ${costDisplay}</button>
            </form>
                <div className = "DisplayBankDetails">
                    <h2>{bankName}:</h2> 

                    {accountDetailsDisplay}
                    <p>BTC:  {ownedBTC}     (${ownedBTCValue})</p>

                    <div className = "bankAccountSelector">
                        <label for="bankAccounts">BANK ACCOUNT:</label>
                        <select name="bankAccounts" id="bankAccounts">
                        <optgroup label="Bank Accounts">
                            {accountDetailsDropdown}
                        </optgroup>
                        </select>
                    </div>
  
                </div>

        </div>
        
        
    )
}

export default DisplayBankDetails