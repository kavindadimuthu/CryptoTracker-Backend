const Watchlist = require('../Models/watchlist.js');
// const mongoose = require('mongoose');

exports.getWatchlist = async(req, res) => {
    try {
        const watchlist = await Watchlist.findOne({ username: "john_doe" });
        if (!watchlist) return res.status(404).json({ message: 'Watchlist not found' });
        res.json(watchlist.watchlist);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};

exports.addCryptoToWatchlist = async(req, res) => {
    try {
        const { id, name, symbol } = req.body;
        let watchlist = await Watchlist.findOne({ username: req.params.username });
    
        if (!watchlist) {
          // Create a new watchlist if it doesn't exist for the user
          const newWatchlist = new Watchlist({
            username: req.params.username,
            watchlist: [{ id, name, symbol }],
          });
          await newWatchlist.save();
          return res.status(201).json(newWatchlist.watchlist);
        }
    
        // Check if the coin already exists in the watchlist
        if (watchlist.watchlist.some((coin) => coin.id === id)) {
          return res.status(400).json({ message: 'Coin already in watchlist' });
        }
    
        // Add the new coin to the watchlist
        watchlist.watchlist.push({ id, name, symbol });
        await watchlist.save();
        res.status(201).json(watchlist.watchlist);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};

exports.removeCryptoFromWatchlist = async(req, res) => {
    try {
        const watchlist = await Watchlist.findOne({ username: req.params.username });
        if (!watchlist) return res.status(404).json({ message: 'Watchlist not found' });
    
        // Filter out the coin to remove it from the watchlist
        watchlist.watchlist = watchlist.watchlist.filter(
          (coin) => coin.id !== parseInt(req.params.coinId)
        );
    
        await watchlist.save();
        res.json(watchlist.watchlist);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};