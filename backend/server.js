import 'dotenv/config'
import express from 'express';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3000;


//start app
app.listen(PORT, err => {
    if (err) {
        return console.log("ERROR", err);
    }
    console.log(`Listenening on port ${PORT}`);
})


//middleware
app.use(express.json());
app.use(cors({origin: "*",}));


//connect to database
import { connectToDatabase } from './database/connectDB.js';
connectToDatabase();


//initialize Developer Wallet & Address
import { initDevWalletAndAddress } from './bitcoinRPC/rpcRequest.js'
await initDevWalletAndAddress();


//routes
import { health } from './routes/health.js'; app.use('/', health);
import { createAccount } from './routes/createAccount.js'; app.use('/', createAccount);
import { login } from './routes/login.js'; app.use('/', login);
import { plaidLogin } from './routes/plaidLogin.js'; app.use('/', plaidLogin);
import { plaidGetBalance } from './routes/plaidGetBalance.js'; app.use('/', plaidGetBalance);
import { getPublicToken } from './routes/getPublicToken.js'; app.use('/', getPublicToken);
import { purchaseBTC } from './routes/purchaseBTC.js'; app.use('/', purchaseBTC);
import { getBalanceBTC } from './routes/getBalanceBTC.js'; app.use('/', getBalanceBTC);