/*
*   makes a RPC requies to the desired endpoint
*
*   Multi purpose functions are at the bottom of this file
*/

import 'dotenv/config'
import request from 'request-promise';

const BTC_CORE_PORT = process.env.BTC_CORE_PORT;
const RPC_USER = process.env.RPC_USER;
const RPC_PASSWORD = process.env.RPC_PASSWORD;
const BTC_CORE_URI = process.env.BTC_CORE_URI;
const BTC_URL = BTC_CORE_URI+BTC_CORE_PORT

const DEV_WALLET = process.env.DEV_WALLET;
let devAddress;

async function rpcRequestBTC({ method, walletName, params = [] } = {}) {
    const options = {
        url: walletName ? BTC_URL + `/wallet/${walletName}` : BTC_URL,
        method: "POST",
        body: JSON.stringify({'jsonrpc': '1.0', 'id': 'curltest', 'method': method, 'params': params}),
        headers: { 'content-type': 'text-plain' },
        auth: {
            user: RPC_USER,
            pass: RPC_PASSWORD
        },
    };

    //console.log(options.url);
    let result;
    await request(options, (error, body) => {
        if (error) {
            result = false;
        } else {
            result = JSON.parse(body.body);
        }
    });

    //console.log(result);
    return result;
}


export async function listWallets() {
    return await rpcRequestBTC({method: "listwallets"});
}
  

export async function createWallet(walletName) {
    return await rpcRequestBTC({ method: 'createwallet', params: [walletName] });
}


export async function getNewAddress(walletName) {
    return await rpcRequestBTC({ method: 'getnewaddress', walletName });
}

export async function getBalance(walletName) {
    return await rpcRequestBTC({ method: 'getbalance', walletName });
}

async function generateToAddress(address, nBlocks, walletName) {
    return await rpcRequestBTC({ method: 'generatetoaddress', params: [nBlocks, address], walletName });
}

export async function sendToAddress(walletName, amount, toAddress, comment = '', commentTo = '', subtractFeeFromAmount = true) {
    return await rpcRequestBTC({
      method: 'sendtoaddress',
      params: [toAddress, amount, comment, commentTo, subtractFeeFromAmount],
      walletName
    });
}





export async function initDevWalletAndAddress() {

    try {
        await createWallet(DEV_WALLET);
    }
    catch { }

    let newAddress = await getNewAddress(DEV_WALLET);
    devAddress = newAddress.result;
}

async function generateToDevAddress(){
    if (!devAddress) { return; }
    await generateToAddress(devAddress, 10, DEV_WALLET)
}

export async function buyFromExodus(amount, toAddress){

    /*
    * Should take funds away from the users bank account before
    */
   
    let purchase = await sendToAddress(DEV_WALLET, amount, toAddress);
    await generateToDevAddress();
    return purchase;
}