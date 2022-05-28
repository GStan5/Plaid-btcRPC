/*
*   Account Schema for MongoDB
*   Wallet temporary not required
*/


import mongoose from 'mongoose';
const Schema = mongoose.Schema;



const accountSchema = new Schema({

    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true, unique: true},

    wallet: {type: String, require: true, unique: true},
    
});

const accountModel = mongoose.model("Account", accountSchema);

export default accountModel;
