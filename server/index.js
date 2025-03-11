const express = require("express");
const fs = require("fs");
const path = require("path");
const yfinance = require("yahoo-finance2").default;

const cors = require('cors');
const stockData = require("./stockData");

const app = express();
const port = 5000;

// Use CORS middleware before defining your routes
app.use(cors()); // This allows all origins by default

app.use(express.json()); // Middleware to parse JSON request bodies

// Serve static files (optional for serving frontend assets)
app.use(express.static("public"));

// -------------------------------------------------- MARKET OVERVIEW DATA -------------------------------------------------- //

// API endpoint to get market overview data
app.get("/api/marketData", (req, res) => {
  // Import market data from marketData.js
  const marketDataPath = path.join(__dirname, "marketData.js");
  let marketData = require(marketDataPath);

  // Send market data as JSON response
  res.json(marketData);
});

const fetchAndUpdateMarketData = async () => {
  try {
    // Import stock data from stockData.js
    const marketDataPath = path.join(__dirname, "marketData.js");
    const marketData = require(marketDataPath);
    // console.log(marketData); // To see the marketData in console

    // Fetch USD to INR exchange rate first -> because gold and silver price is given in USD , so to convert them we fetch first
    const usdInrData = await yfinance.quote("USDINR=X");
    const usdToInrRate = usdInrData?.regularMarketPrice || 1; // Fallback to 1 if no data
    // console.log(usdToInrRate); // To see the usd price in rupees

    // Fetch data for all the indexs / commodities / exchange rates
    for (let index of marketData) {
      try {
        const marketInfo = await yfinance.quote(index.symbol);
        // console.log(marketInfo); // To see the complete info from the yfinance API

        if (marketInfo) {
          let priceInRupees = marketInfo.regularMarketPrice;

          // Converting USD-based prices to INR
          if (["GC=F", "SI=F"].includes(index.symbol)) {
            priceInRupees = marketInfo.regularMarketPrice * usdToInrRate;
          }

          // Convert Gold and Silver prices to INR per gram as they were provided in USD from yfinance API
          if (index.symbol === "GC=F") {
            priceInRupees = (priceInRupees / 31.1035); // Gold in INR per gram
          } else if (index.symbol === "SI=F") {
            priceInRupees = (priceInRupees / 31.1035); // Silver in INR per gram
          }

          // Updating the values of data
          index.symbol = index.symbol;
          index.name = index.name;
          index.price = priceInRupees ? priceInRupees.toFixed(2) : "N/A";
          // By default if the change is positive it wont give the '+' symbol infront of it so we are adding it manually . but for negative it gives '-' symbol
          index.change = marketInfo.regularMarketChange >= 0 ? `+${marketInfo.regularMarketChange.toFixed(2)}` : `${marketInfo.regularMarketChange.toFixed(2)}`;
          index.changePercent = marketInfo.regularMarketChangePercent >= 0 ? `+${marketInfo.regularMarketChangePercent.toFixed(2)}` : `${marketInfo.regularMarketChangePercent.toFixed(2)}`;
        } else {
          console.warn(`No data found for index: ${index.symbol}`);
        }
      } catch (error) {
        console.error(`Error fetching data for index: ${index.symbol}`, error.message);
      }
    }
    // console.log(marketData); // To see the marketData in console

    // Save the updated data back to marketData.js
    const fileContent = `const marketData = ${JSON.stringify(marketData, null, 2)};\n\nmodule.exports = marketData;`;
    fs.writeFileSync(marketDataPath, fileContent, "utf8");
    console.log("Market data updated successfully");

  } catch (error) {
    console.error("Error updating Market data:", error.message);
  }
};

// Update stock data every 10 seconds
setInterval(fetchAndUpdateMarketData, 10000); // 1000 -> 1s

// -------------------------------------------------- USER WATCHLIST DATA -------------------------------------------------- //

// API endpoint to get stock data
app.get("/api/stockData", (req, res) => {
  // Import stock data from stockData.js
  const stockDataPath = path.join(__dirname, "stockData.js");
  let stockData = require(stockDataPath);

  // Send stock data as JSON response
  res.json(stockData);
});

// API to handle watchlist updates from frontend
app.post("/api/updateWatchlist", (req, res) => {
  const updatedWatchlist = req.body; // Get the watchlist from the request body
  // console.log(updatedWatchlist); //To see the data received from the frontend

  if (!Array.isArray(updatedWatchlist)) {
    return res.status(400).json({ message: "Invalid watchlist data" });
  }

  // File path of watchlistData.js
  const filePath = path.join(__dirname, "watchlistData.js");

  // Write the updated watchlist to watchlistData.js
  const fileContent = `const watchlistData = ${JSON.stringify(updatedWatchlist, null, 2)};\n\nmodule.exports = watchlistData;`;

  try {
    fs.writeFileSync(filePath, fileContent, "utf8");
    console.log("Watchlist data saved to watchlistData.js");
    res.status(200).json({ message: "Watchlist data saved successfully" });
  } catch (error) {
    console.error("Error saving watchlist data:", error);
    res.status(500).json({ message: "Error saving watchlist data" });
  }
});

// File path for watchlistData.js and stockData.js (to change the data in stockData.js from watchlisData.js)
const watchlistDataPath = path.join(__dirname, "watchlistData.js");
const stockDataPath = path.join(__dirname, "stockData.js");

// We stop fetching data while changing the stockData.js from watchlistData.js
let isFetchingData = true; // Flag to control stock data fetching

// Watch for changes in `watchlistData.js` and overwrite stockData.js
fs.watch(watchlistDataPath, (eventType) => {
  if (eventType === "change") {
    console.log("watchlistData.js file changed");

    try {

      // Clear the require cache to reload the file
      delete require.cache[require.resolve(watchlistDataPath)];

      // Use require to read watchlistData.js
      const watchlistData = require(watchlistDataPath);
      // console.log(watchlistData); // To see the watchlistData.js changed data

      // Pause fetching stock data while updating stockData.js
      isFetchingData = false;

      // Overwrite stockData.js with the contents of watchlistData.js
      const fileContent = `const stockData = ${JSON.stringify(watchlistData, null, 2)};\n\nmodule.exports = stockData;`;
      fs.writeFileSync(stockDataPath, fileContent, "utf8");
      console.log("stockData.js has been completely overwritten with watchlistData.js");
      // console.log("stockData.js"); // To inform that the below is the data in stockData.js
      delete require.cache[require.resolve(stockDataPath)];
      const stockData = require(stockDataPath);
      // console.log(stockData); // To see the updated data in stockData.js

      // Allow fetching stock data again after a short delay
      setTimeout(() => {
        isFetchingData = true;
        console.log("Stock data fetching resumed.");
      }, 1000); // Allow fetch again after a short delay (1 second)
    } catch (error) {
      console.error("Error reading watchlistData.js:", error);
    }
  }
});

// Function to fetch and update stock data 
const fetchAndUpdateStockData = async () => {
  // To check whether to fetch the data or not (we dont fetch while copying watchlistData.js to stockData.js)
  if (isFetchingData) {
    try {
      // Import stock data from stockData.js
      const stockData = require(stockDataPath);
      // console.log(stockData); // To see the previous stockData 

      // Fetch stock data for all the stocks
      for (let stock of stockData) { // We can also fetch multiple stocks at once
        try {
          const stockInfo = await yfinance.quote(stock.name + ".NS");
          if (stockInfo) {
            stock.price = stockInfo.regularMarketPrice || "N/A";
            // To give the '+' symbol if it is positive (we dont get '+' symbol by default but we get '-' symbol by default)
            stock.change = stockInfo.regularMarketChange >= 0 ? `+${stockInfo.regularMarketChange.toFixed(2)}` : `${stockInfo.regularMarketChange.toFixed(2)}`;
            stock.changePercent = stockInfo.regularMarketChangePercent >= 0 ? `+${stockInfo.regularMarketChangePercent.toFixed(2)}` : `${stockInfo.regularMarketChangePercent.toFixed(2)}`;
          } else {
            console.warn(`No data found for stock: ${stock.name}`);
          }
        } catch (error) {
          console.error(`Error fetching data for stock: ${stock.name}`, error.message);
        }
      }
      // console.log(stockData); // To see the data after updating

      // Save the updated stock data back to stockData.js
      const fileContent = `const stockData = ${JSON.stringify(stockData, null, 2)};\n\nmodule.exports = stockData;`;
      fs.writeFileSync(stockDataPath, fileContent, "utf8");
      console.log("Stock data updated successfully");

    } catch (error) {
      console.error("Error updating stock data:", error.message);
    }
  } else {
    console.log("Waiting for stock data fetch to resume after watchlist update...");
  }
};

// Update stock data every 10 seconds
setInterval(fetchAndUpdateStockData, 10000);

// -------------------------------------------------- SEARCH STOCK -------------------------------------------------- //

// To run the python script
const { exec } = require('child_process');

let currentStock = ''; // Store the stock name received from the frontend

// Endpoint to receive the stock name from the frontend
app.post('/api/sendStock', (req, res) => {
  currentStock = req.body.stock;
  console.log("stock name : " + currentStock);
  res.send('Stock received');
});

// Endpoint to fetch stock info
app.get('/api/stockInfo', (req, res) => {
  if (!currentStock) {
    return res.status(400).send('No stock selected');
  }

  // Execute the Python script to fetch stock data
  exec(`python stock_info.py ${currentStock}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error}`);
      // return res.json([{"message" : 'data not found' }]);
      return res.status(500).send('Error fetching stock data');
    }

    if (stderr) {
      console.error(`Python script stderr: ${stderr}`);
      // return res.json([{"message" : 'data not found' }]);
      return res.status(500).send('Error fetching stock data');
    }

    try {
      // Try parsing the output as JSON
      const stockData = JSON.parse(stdout);

      // Check if the stock data has an error
      if (stockData.error) {
        return res.status(400).send(stockData.error);
      }

      console.log(`Stock Data for ${currentStock} is fetched successfully`);
      res.json(stockData);
    } catch (jsonError) {
      console.error('Error parsing JSON:', jsonError);
      return res.status(500).send('Failed to parse stock data');
    }
  });

});

// -------------------------------------------------- PREDICT STOCK -------------------------------------------------- //

let currentStockPredict = ''; // Store the stock name to predict received from the frontend

// Endpoint to receive the stock name to predict from the frontend
app.post('/api/predict', (req, res) => {
  currentStockPredict = req.body.stock;
  console.log("stock name to predict : " + currentStockPredict);
  res.send('Stock received');
});

// Endpoint to fetch predicted stock info
app.get('/api/stockPredict', (req, res) => {
  if (!currentStockPredict) {
    return res.status(400).send('No stock selected');
  }

  // Execute the Python script to fetch predictions
  exec(`python predict.py ${currentStockPredict}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing Python script: ${error.message}`);
      return res.status(500).json({ error: 'Internal server error while fetching prediction' });
    }

    if (stderr) {
      console.log(`Python script error: ${stderr}`);
      return res.status(500).json({ error: `Prediction script encountered an error ${stderr}` });
    }

    try {
      const predictionData = JSON.parse(stdout);

      if (predictionData.error) {
        console.warn(`Stock data error: ${predictionData.error}`);
        return res.status(400).json({ error: predictionData.error });
      }

      console.log(`Prediction for the stock ${currentStockPredict} is completed `)
      res.json(predictionData); // Send prediction response
    } catch (jsonError) {
      console.error('Error parsing Python script output:', jsonError);
      return res.status(500).json({ error: 'Failed to parse prediction data' });
    }
  });

});

// -------------------------------------------------- STARTING THE SERVER -------------------------------------------------- //

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});