const express = require('express');
const router = express.Router();
const cryptoController = require('../Controllers/cryptoControllers');


router.get('/getCrypto', cryptoController.getCryptoCoins)



module.exports = router;
