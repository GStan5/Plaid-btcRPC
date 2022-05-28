/*
* 	checks health of the server
*/

import express from 'express';
const router = express.Router();

import { getBalance } from '../bitcoinRPC/rpcRequest.js'



router.post('/getBalanceBTC', async function (req, res){
    let data = req.body.data;

    let balance = await getBalance(data.user.email);
    
    let result = new Object();
    result.balance = balance.result;
    res.json(result);
});


export { router as getBalanceBTC }