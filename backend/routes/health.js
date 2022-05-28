/*
* 	checks health of the server
*/

import express from 'express';
const router = express.Router();



router.get('/health', function (req, res){
	
	res.sendStatus(200);
});


export { router as health }