const express = require('express');
const connectDB = require('./Config/db.js');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes');
const cryptoRoutes = require('./Routes/cryptoRoutes');
const watchlistRoutes = require('./Routes/watchlistRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());

app.use(cors());

app.use('/api/user', userRoutes);
app.use ('/api/crypto', cryptoRoutes);
app.use ('/api/watchlist', watchlistRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
