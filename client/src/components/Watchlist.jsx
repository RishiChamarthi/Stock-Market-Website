import React, { useState, useEffect } from "react";

import background from "../assets/background.jpg";
import { recommendations } from "./recommendations";

// For notifications
import { Toaster, toast } from 'sonner';

import axios from "axios";

const Watchlist = () => {
  const [activeInput, setActiveInput] = useState(null);

  // ---------- MARKET OVERVIEW SECTION ---------- //

  // This is used to store the data of marketlist
  const [marketlist, setmarketlist] = useState(() => {
    const savedMarketlist = localStorage.getItem("marketlist"); // To get the data from local storage if present
    return savedMarketlist ? JSON.parse(savedMarketlist) : [];
  });

  // Function to fetch real stock data
  const fetchMarketData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/marketData");
      // console.log("market data"+JSON.stringify(response.data));// To see what data is fetched from the backend
      setmarketlist(response.data);
      localStorage.setItem("marketlist", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching market overview data:", error);
    }
  };

  // On starting it will run for one time 
  useEffect(() => {
    const interval = setInterval(fetchMarketData, 10000); // Fetch market data for every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // If the watchlist changes then we store the new watchlist in the local storage
  useEffect(() => {
    localStorage.setItem("marketlist", JSON.stringify(marketlist));
  }, [marketlist]);


  // ---------- YOUR WATCHLIST SECTION ---------- //

  // This is to store the values of the userwatchlist
  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem("watchlist");
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });

  // This is used for the input box 
  const [newStock, setNewStock] = useState("");

  // This is for adding the stock in iput box 
  const addStock = () => {
    if (newStock.trim() === "") {
      toast.warning(`Enter stock name to add`, {
        position: 'top-center',
        duration: 3000,
      });
      return;
    }
    if (newStock.trim()) {
      // Checking if input stock is in recommedations
      const validStock = recommendations.find(
        (rec) => rec.symbol.toUpperCase() === newStock.toUpperCase()
      );

      // If not in recommendations we will alert it
      if (!validStock) {
        toast.error(`${newStock.toUpperCase()} is not a valid stock.`, {
          position: 'top-center',
          duration: 3000,
        });
        return;
      }

      // Converting to uppercase
      const stockExists = watchlist.some(
        (stock) => stock.name.toUpperCase() === newStock.toUpperCase()
      );

      // Check if the stock already exists in the user watchlist
      if (stockExists) {
        toast.warning(`${newStock.toUpperCase()} is already in your watchlist.`, {
          position: 'top-center',
          duration: 3000,
        });
        return;
      }

      // Setting the new stock to the user watchlist
      setWatchlist([
        ...watchlist,
        { name: validStock.symbol.toUpperCase(), price: "loading..", change: 0, changePercent: 0 },
      ]);
      toast.success(`${newStock.toUpperCase()} added to your watchlist`, {
        position: 'top-center',
        duration: 3000,
      });

      // Setting the input box to empty
      setNewStock("");
    }
  };

  // To remove the stock from user watchlist
  const removeStock = (name) => {
    const updatedWatchlist = watchlist.filter((stock) => stock.name !== name);
    setWatchlist(updatedWatchlist);
    toast.success(`${name} is removed from your watchlist`, {
      position: 'top-center',
      duration: 3000,
    });
  };

  // Used to select one from the recommendations
  const selectRecommendation = (symbol) => {
    setNewStock(symbol);
  };

  // If the watchlist changes then we store the new watchlist in the local storage
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Function to fetch real stock data
  const fetchStockData = async () => {
    try {
      // Make the API request to fetch stock data (endpoint in the backend)
      const response = await axios.get("http://localhost:5000/api/stockData");

      // Update stock data in the watchlist for real time prices and change of the stock value
      setWatchlist((prevWatchlist) =>
        prevWatchlist.map((stock) => {
          // Find stock data by matching the name (case insensitive)
          const stockData = response.data.find(
            (data) => data.name.toUpperCase() === stock.name.toUpperCase()
          );

          if (stockData) {
            return {
              ...stock,
              price: `${stockData.price}`,
              change: stockData.change,
              changePercent: stockData.changePercent,
            };
          }
          return stock;
        })
      );
    } catch (error) {
      console.error("Error fetching stock data:", error); // Log any errors
    }
  };

  // On starting it will run for one time 
  useEffect(() => {
    const interval = setInterval(fetchStockData, 10000); // Fetch data every 10 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // For sending data to backend of watchlist when it changes
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    // Send watchlist to backend whenever watchlist length changes
    const updateBackend = async () => {
      try {
        await axios.post("http://localhost:5000/api/updateWatchlist", watchlist, {
          headers: { "Content-Type": "application/json" },
        });
        console.log("Watchlist successfully sent to backend");
      } catch (error) {
        console.error("Error sending watchlist to backend:", error);
      }
    };

    updateBackend();

  }, [(watchlist.length)]); // Trigger when 'watchlist.length' changes

  // --------------------------------------------- RENDERING THE WATCHLIST COMPONENT --------------------------------------------- //
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(${background})`,
      }}
      className="min-h-screen w-full bg-cover bg-center flex justify-between items-stretch space-x-8 p-8 pt-[102px] bg-gray-900 text-white h-[100vh] pl-[2%] pr-[4%]"
    >
      {/* For notifications */}
      <Toaster richColors />

      {/* ---------- LEFT SECTION ---------- */}
      <div className="w-2/5 bg-transparent p-6 rounded-[30px] shadow-[0_0_15px_white]">
      <div className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold p-2">Market Overview</h2>
        </div>

        {/* ---------- MARKET INFO ---------- */}
        <ul className="space-y-4 overflow-y-auto max-h-[70vh]] no-scrollbar p-2">
          {marketlist.map((item) => (
            <div className="flex items-center justify-between mb-4 bg-[#1a1a1a] px-4 py-2 rounded-[15px] hover:shadow-[0_0_5px_white] transition-all duration-200">
              <div className="font-medium">{item.name}</div>
              <div className="flex flex-col items-center justify-center">
                <div className="">{`₹${item.price} ${item.name === "GOLD" || item.name === "SILVER" ? " / 1 gm" : ""}`}</div>
                <div className={`${item.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  <pre className="font-outfit">{item.change}  ( {item.changePercent}% )</pre>
                </div>
              </div>
            </div>
          ))}
        </ul>

      </div>


      {/* ---------- RIGHT SECTION ---------- */}
      <div className="w-3/5 bg-transparent p-6 rounded-[30px] shadow-[0_0_15px_white]">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold mb-4">Your Watchlist</h2>
          <div className="flex flex-col w-3/5 relative">

            {/* ---------- INPUT SECTION ---------- */}
            <div className="flex bg-white rounded-[30px] ">
              <input
                type="text"
                placeholder="Add stock (e.g., INFY)"
                onFocus={() => setActiveInput("watchlist")}
                onBlur={() => setTimeout(() => setActiveInput(null), 300)} // Delay to allow click on dropdown (below 300 will not select the recommendation to the input)
                value={newStock}
                onChange={(e) => setNewStock(e.target.value)}
                className="bg-transparent text-[#686666] px-4 py-2 w-full focus:outline-none"
              />
              <button
                onClick={addStock}
                className="bg-green-500 text-white px-4 py-2 rounded-[30px] cursor-pointer"
              >
                Add
              </button>
            </div>

            {/* ---------- RECOMMENDATIONS DROPDOWN ---------- */}
            {newStock && activeInput === "watchlist" && (
              <ul className="absolute top-[100%] left-0 bg-[#1a1a1a] text-white rounded-[15px] shadow-lg mt-2 w-full max-h-[150px] overflow-y-auto no-scrollbar z-50">
                {recommendations
                  .filter((rec) =>
                    rec.name.toLowerCase().includes(newStock.toLowerCase()) ||
                    rec.symbol.toLowerCase().includes(newStock.toLowerCase())
                  )
                  .map((rec, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        selectRecommendation(rec.symbol);  // Select stock

                      }}
                      className="px-4 py-2 hover:bg-[#333] cursor-pointer"
                    >
                      <strong>{rec.symbol}</strong> - {rec.name}
                    </li>
                  ))}
              </ul>
            )}

          </div>
        </div>

        {/* ---------- WATCHLIST ITEMS ---------- */}
        <ul className="space-y-4 overflow-y-auto max-h-[70vh] no-scrollbar p-4">
          {watchlist.map((stock, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-3 bg-[#1a1a1a] px-4 py-2 rounded-[15px] hover:shadow-[0_0_5px_white] transition-all duration-200"
            >
              <div className="w-11/12 flex items-center justify-between">
                <div>
                  <p className="font-bold">{stock.name}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p>
                    ₹{stock.price}
                  </p>
                  <p
                    className={`text-sm ${stock.change >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    <pre className="font-outfit">{stock.change}  ( {stock.changePercent}% )</pre>
                  </p>
                </div>
              </div>
              <div className="w-1/12 flex items-center justify-end p-4">
                <button
                  onClick={() => removeStock(stock.name)}
                  className="text-[#f5c138] cursor-pointer "
                >
                  X
                </button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default Watchlist;
