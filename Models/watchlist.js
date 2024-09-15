const mongoose = require('mongoose');

// Define a Watchlist schema and model
const WatchlistSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Username reference
  watchlist: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      symbol: { type: String, required: true },
    },
  ],
});

// Export the model
const Watchlist = mongoose.model('Watchlist', WatchlistSchema);
module.exports = Watchlist;