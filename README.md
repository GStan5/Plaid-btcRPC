# Full-Stack Plaid & BTC RPC 

    Bitcoin Core Regtest
    Plaid Sandbox

## Frontend
    React
    HTML
    CSS
    Axios
    Plaid

## Backend
    Express
    MongoDB
    Mongoose
    RPC to Bitcoin Core
    Plaid

## Functionality

This Application features the ability to create, login, and connect your bank account using Plaid Services.

The Applicaiton then will commucate with the backend to to get you account data, and BTC data from BTC core.

Next a user will be able to purchase a desired amount of BTC if they have the required funds.

Updated balances will be automatilly updated on a successful purchase.


## Running the Envirment

    Frontend: 
            "npm start"

    Backend:
            create a .env file based off the .env.example
            Make sure to run on port 3555
            set up regtest server with desired settings in your .env file
            "npm run dev" or "npm start"



