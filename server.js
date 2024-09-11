const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 5000;

app.use(cors()); // Enable CORS for all routes

app.get('/api/cryptos', async (req, res) => {
  try {
    // Extract page and limit from query parameters (default to page 1 and 10 items per page)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Calculate the 'start' value for CoinMarketCap API (API uses 1-based indexing)
    const start = (page - 1) * limit + 1;

    // Fetch the data from CoinMarketCap API
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      params: {
        start: start,  // Adjust the start based on the page number
        limit: limit,  // Number of items per page
        convert: 'USD',
      },
      headers: {
        'X-CMC_PRO_API_KEY': '5819af27-3048-4ac0-912b-249fc93f9987', // Add your CoinMarketCap API key here
      },
    });

    // CoinMarketCap API provides a total count in the response metadata
    const totalCount = response.data.status.total_count || 5000; // Safely fall back to 5000 if total_count isn't provided

    // Send the data back to the frontend along with total pages and total items
    res.json({
      items: response.data.data, // Paginated items
      totalItems: totalCount,    // Total number of items
      totalPages: Math.ceil(totalCount / limit), // Total number of pages based on the total count and limit
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});



app.listen(port, () => {
  console.log(`Server running on here port ${port}`);
});
