/*
* 	checks health of the server
*/

import express from 'express';
const router = express.Router();

import { buyFromExodus, getBalance } from '../bitcoinRPC/rpcRequest.js'



router.post('/purchaseBTC', async function (req, res){
    let data = req.body.data;

	let purchase = await buyFromExodus(data.amount, data.user.wallet);
    let balance = await getBalance(data.user.email);
    
    let order = new Object();
    order.txnHash = purchase.result;
    order.balance = balance.result;
    res.json(order);
});


export { router as purchaseBTC }