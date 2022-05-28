/*
*  exchanges link token for a publicToken
*/

import express from 'express';
const router = express.Router();

import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

//plaid configs
const configuration = new Configuration({
    basePath: PlaidEnvironments[process.env.PLAID_ENV],
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
            'PLAID-SECRET': process.env.PLAID_SECRET,
        },
    },
});
const client = new PlaidApi(configuration);



router.post('/item/public_token/exchange', async function (req, res){
    let token = req.body.data;

    try {
        const response = await client.itemPublicTokenExchange(token);
        res.json(response.data.access_token);
    } catch (error) {
        console.log(error);
    }

});


export { router as getPublicToken }