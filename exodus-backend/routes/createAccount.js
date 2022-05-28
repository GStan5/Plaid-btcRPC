/*
*   creates an account for desired user
*/

import express from 'express';
const router = express.Router();

import accountModel from '../models/accountSchema.js'
import { createWallet, getNewAddress } from '../bitcoinRPC/rpcRequest.js'



router.post('/createAccount', async function (req, res){
    let data = req.body.data;

    let userData = await accountModel.findOne({email: `${data.email}`}).collation( { locale: 'en', strength: 2 } );
    if(userData){ res.send("Account already exist with this email"); return; }

    let newWallet = await createWallet(data.email);
    let newAddress = await getNewAddress(data.email);

    try {
        userData = await accountModel.create({
            name: `${data.name}`,
            email: `${data.email}`,
            password: `${data.password}`,
        
            wallet: `${newAddress.result}`,
        });
    }catch(err){
        console.log(err)
    }

    res.send(true);
});


export { router as createAccount }