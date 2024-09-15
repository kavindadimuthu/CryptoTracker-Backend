const express = require('express');
const router = express.Router();
const watchlistController = require('../Controllers/watchlistController');

router.get('/get', watchlistController.getWatchlist);
router.post('/add/:username', watchlistController.addCryptoToWatchlist);
router.delete('/remove/:username/:coinId', watchlistController.removeCryptoFromWatchlist);


module.exports = router;