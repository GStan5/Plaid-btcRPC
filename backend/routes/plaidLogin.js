/*
*  creates a link token for desired account
*/

import express from 'express';
const router = express.Router();

import accountModel from '../models/accountSchema.js'
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



router.post('/api/create_link_token', async function (req, res){
    let data = req.body.data;

    let userData = await accountModel.findOne({email: `${data.email}`}).collation( { locale: 'en', strength: 2 } );
    if(!userData){ res.send("No account found with that email"); return; }

    let id = userData._id.toString();
    id = id.split(':').pop().split(';')[0];

    const request = {
        user: {
          client_user_id: id,
        },
        client_name: 'Plaid Test App',
        products: ['auth'],
        language: 'en',
        country_codes: ['US'],
    };

    let publicToken;
    try {
        const createTokenResponse = await client.linkTokenCreate(request);
        //console.log(createTokenResponse);
        publicToken = createTokenResponse.data.link_token;
        res.json(createTokenResponse.data);
    } catch (error) {
        console.log(error);
    }

});


export { router as plaidLogin }