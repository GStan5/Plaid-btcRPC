/*
*   Connects to the desired DB URI set in the .env file
*/

import 'dotenv/config'
import mongoose from 'mongoose';
const mongoDBSRV = process.env.DBuri;


export function connectToDatabase(){

    mongoose.connect(mongoDBSRV, {
        useNewUrlParser:      true,
        useUnifiedTopology:   true
    }).then(() =>[
        console.log("[READY] Connected to the database!")
        ]).catch((err) =>{
        console.log(err);
    });
}