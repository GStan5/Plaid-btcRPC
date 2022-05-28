/*
*   logs in desired account
*/

import express from 'express';
const router = express.Router();

import accountModel from '../models/accountSchema.js'



router.post('/login', async function (req, res){
    let data = req.body.data;

    let userData = await accountModel.findOne({email: `${data.email}`}).collation( { locale: 'en', strength: 2 } );
    if(!userData){ res.send("No account found with that email"); return; }
    
    let id = userData._id.toString();
    id = id.split(':').pop().split(';')[0];

    let passwordCheck = userData.password == data.password
    if (!passwordCheck){ res.send("Wrong password"); return; }
    
    let result = new Object();
    result.id = id;
    result.name = userData.name;
    result.email = userData.email;
    result.wallet = userData.wallet;

    res.send(result);
});


export { router as login }