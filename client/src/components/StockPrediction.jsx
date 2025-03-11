import React, { useState, useEffect } from "react";
import { recommendationsNifty } from "./recommendationsNifty";
import background from "../assets/stockPricePredictionBackground.jpg";
import { Toaster, toast } from "sonner";
import { Atom } from "react-loading-indicators";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

import axios from "axios";

const StockPrediction = () => {
    // This is for input box
    const [newStock, setNewStock] = useState("");
    // Whether to show recommendations or not
    const [activeInput, setActiveInput] = useState(null);
    // To store the predicted info
    const [predictInfo, setPredictInfo] = useState(null);
    // For Stock name
    const [stockname, setstockname] = useState("");
    // Market List data
    const [marketlist, setMarketlist] = useState(() => {
        const savedMarketlist = localStorage.getItem("marketlist");
        return savedMarketlist ? JSON.parse(savedMarketlist) : [];
    });

    // Fetch market data periodically
    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/marketData");
                setMarketlist(response.data);
                localStorage.setItem("marketlist", JSON.stringify(response.data));
            } catch (error) {
                console.error("Error fetching market overview data:", error);
            }
        };

        const interval = setInterval(fetchMarketData, 10000); // fetching market data every 10 seconds
        return () => clearInterval(interval);
    }, []);

    // Store market data in local storage when updated
    useEffect(() => {
        localStorage.setItem("marketlist", JSON.stringify(marketlist));
    }, [marketlist]);

    // Function to send stock name to the backend and fetch predictions
    const PredictStock = async () => {
        if (newStock.trim() === "") {
            toast.warning("Enter Stock name to search", { position: "top-center", duration: 3000 });
            return;
        }

        const validStock = recommendationsNifty.find((rec) => rec.symbol.toUpperCase() === newStock.toUpperCase());
        if (!validStock) {
            toast.error(`${newStock.toUpperCase()} is not a valid stock symbol or not present in NIFTY 50 stocks.`, { position: "top-center", duration: 3000 });
            return;
        }

        try {
            setPredictInfo(null);
            await axios.post("http://localhost:5000/api/predict", { stock: newStock.toUpperCase() }, { headers: { "Content-Type": "application/json" } });
            console.log("Stock name successfully sent to backend for prediction");
            setstockname(newStock.toUpperCase());

            setNewStock(""); // Clear input box

            // Wait before fetching predictions (backend needs time to process)
            setTimeout(fetchPredictInfo, 3000);
        } catch (error) {
            console.error("Error sending stock name to backend for prediction:", error);
        }
    };

    // Fetch predicted stock data
    const fetchPredictInfo = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/stockPredict");
            console.log("Prediction data:", response.data);
            setPredictInfo(response.data);
        } catch (error) {
            console.error("Error fetching stock prediction data:", error);
        }
    };

    // Function to make text bouncing animation
    const BouncingText = ({ text }) => {
        return (
            <div className="flex space-x-1">
                {text.split("").map((char, index) => (
                    <span
                        key={index}
                        className={`text-[#9934e1] text-3xl font-bold inline-block animate-bounce`}
                        style={{ animationDelay: `${index * 50}ms` }} // Delays each letter
                    >
                        {char}
                    </span>
                ))}
            </div>
        );
    };

    // ------------------------------------------ RENDERING THE STOCK-PREDICTION COMPONENT ------------------------------------------ //
    return (
        <div
            style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(${background})` }}
            className="pt-[70px] bg-black h-[100vh] text-white px-[7%] bg-cover bg-center"
        >
            <Toaster richColors />

            {/* -------------------- MARKET OVERVIEW -------------------- */}
            <div className="bg-transparent">
                <ul className="max-h-[70vh] p-2 px-5 flex items-center justify-between">
                    {marketlist.map((item, index) => (
                        <div key={index} className="flex-col items-center justify-between bg-[#1a1a1a]/80 px-10 py-[10px] rounded-[15px] hover:shadow-[0_0_5px_white] hover:scale-[1.025] transition-all duration-300">
                            <div className="font-medium pb-1 text-center">{item.name}</div>
                            <hr className="opacity-15" />
                            <div className="flex flex-col items-center justify-center pt-1">
                                <div>{`₹${item.price} ${item.name === "GOLD" || item.name === "SILVER" ? " / 1 gm" : ""}`}</div>
                                <div className={`${item.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                                    <pre className="font-outfit">{item.change} ({item.changePercent}%)</pre>
                                </div>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>

            {/* ---------- HEADINGS SECTION ---------- */}
            <div className="text-center mt-[10px]">
                <p className="text-[30px] tracking-[2px] font-bold">AI-Powered Stock Price Predictions in Real-Time</p>
                <p className="text-[20px] tracking-[1px]">Leverage machine learning for smarter investment decisions.</p>
            </div>

            {/* ---------- INPUT SECTION ---------- */}
            <div className="flex items-center justify-around mt-[10px]">
                <div className="bg-white text-black text-[18px] rounded-[30px] border-0 outline-0 flex flex-row items-center justify-between relative w-[500px]">
                    <input
                        type="text"
                        placeholder="Search Stock (e.g., INFY)"
                        onFocus={() => setActiveInput("search")}
                        onBlur={() => setTimeout(() => setActiveInput(null), 300)}
                        className="bg-transparent text-[#686666] pl-10 py-3 focus:outline-none"
                        onChange={(e) => setNewStock(e.target.value)}
                        value={newStock}
                    />

                    <button className="text-white font-bold bg-[#4b0082] py-3 px-10 rounded-[30px] cursor-pointer mr-[-1px] hover:bg-[#4c0082ea] transition-all duration-300" onClick={PredictStock}>
                        <p className="tracking-[1px]">Predict</p>
                    </button>

                    {/* ---------- RECOMMENDATIONS DROPDOWN ---------- */}
                    {newStock && activeInput === "search" && (
                        <ul className="absolute top-[100%] left-0 bg-[#1a1a1a] text-white rounded-[15px] shadow-lg mt-2 w-full max-h-[150px] overflow-y-auto no-scrollbar">
                            {recommendationsNifty
                                .filter((rec) =>
                                    rec.name.toLowerCase().includes(newStock.toLowerCase()) ||
                                    rec.symbol.toLowerCase().includes(newStock.toLowerCase())
                                )
                                .map((rec, index) => (
                                    <li key={index} onClick={() => setNewStock(rec.symbol)} className="px-4 py-2 hover:bg-[#333] cursor-pointer">
                                        <strong>{rec.symbol}</strong> - {rec.name}
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* ---------- PREDICTION OUTPUT ---------- */}
            <div className="mt-5">

                {!stockname ? (
                    <div>
                        <div className="flex items-center justify-around">
                            <p className="text-[24px] text-[#dcdbdb] font-bold tracking-[1px] mt-2">We only predict for Nifty 50 stocks</p>
                        </div>
                        {/* Display disclaimer when no stock is searched */}
                        <div className="flex items-center justify-around">
                            <p className="text-[#f6f4c0] text-[18px] px-6 text-center w-[1100px] tracking-[0.7px] leading-[27px]">
                                <p className="text-[24px] text-[#efb20a] mt-8 mb-2"><strong>⚠️ Disclaimer ⚠️</strong> </p>
                                The stock price predictions displayed here are generated using AI-based models and historical data.<br />
                                These predictions are for informational purposes only and do not constitute financial, investment, or trading advice.<br />
                                The stock market is inherently volatile, and past performance is not indicative of future results.
                                Users should conduct their own due diligence and consult with a licensed financial advisor before making any investment decisions.<br />
                                We do not guarantee the accuracy, reliability, or completeness of any prediction, and any investment made based on these forecasts is done at your own risk.
                            </p>
                        </div>
                    </div>


                ) : !predictInfo ? (
                    // Show loading message while fetching prediction
                    <div className="flex items-center justify-around mt-12">
                        <div className="text-center">
                            <div>
                                <Atom color="#9934e1" size="medium" text="" textColor="" speedPlus="-2" />
                            </div>
                            <div className="mt-[10px]">
                                <BouncingText text="predicting..." />
                            </div>
                        </div>
                    </div>
                ) : (
                    // Display prediction data after fetching
                    <div>
                        <div className="flex items-center justify-around">
                            <div className="w-[300px] flex items-center justify-around">
                                <div className="flex-col items-center justify-between bg-[#4b0082]/20 p-4 rounded-[15px] shadow-[#ffd700] hover:shadow-[0_0_5px_white] hover:scale-[1.025] transition-all duration-300 text-[#e6e6fa]">
                                    <div className="font-bold text-center text-[26px] tracking-[1px]">{predictInfo.stock}</div>
                                    <hr className="opacity-15 my-1 w-full bg-[#3b2e44]/40" />
                                    <div className="flex flex-col items-center justify-center ">
                                        <p className="text-[18px] my-1">
                                            <pre>Day 1 : ₹{predictInfo.predictions[0].toFixed(2)}</pre>
                                        </p>
                                        <p className="text-[18px] mb-1">
                                            <pre>Day 7 : ₹{predictInfo.predictions[6].toFixed(2)}</pre>
                                        </p>
                                        <p className="text-[18px] mb-1">
                                            <pre>Day 30 : ₹{predictInfo.predictions[29].toFixed(2)}</pre>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* ---------- LINE CHART ---------- */}
                            <div className="w-[620px] h-[310px]">
                                <Line
                                    data={{
                                        labels: predictInfo.dates.map(date => date.split("-").reverse().join("-")), // X-Axis: Dates
                                        datasets: [
                                            {
                                                label: "Predicted Price",
                                                data: predictInfo.predictions, // Y-Axis: Predictions
                                                borderColor: "rgba(140,46,211,1)",
                                                borderWidth: 2,
                                                fill: false,
                                                pointRadius: 0.1,
                                            },
                                        ],
                                    }}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            title: {
                                                display: true,
                                                text: `Stock Prediction Chart (${predictInfo.stock})`,
                                                font: { size: 16, weight: "bold" },
                                                color: "white",
                                                padding: { top: 10, bottom: 30 },
                                            },
                                            legend: { display: false },
                                            tooltip: {
                                                mode: "index",
                                                intersect: false,
                                                bodyColor: "white",
                                                titleColor: "white",
                                                footerColor: "white",
                                                padding: 10,
                                                callbacks: {
                                                    title: function (tooltipItems) {
                                                        let index = tooltipItems[0].dataIndex;
                                                        let date = predictInfo.dates[index]; // Get date from labels
                                                        let formattedDate = date.split("-").reverse().join("-"); // Convert YYYY-MM-DD to DD-MM-YY
                                                        return `Date: ${formattedDate}`;
                                                    },
                                                    label: function (tooltipItem) {
                                                        let price = tooltipItem.raw.toFixed(2); // Get price and format
                                                        return `Price: ${price}`;
                                                    },
                                                },
                                            },
                                        },
                                        scales: {
                                            x: {
                                                ticks: { color: "white" },
                                            },
                                            y: {
                                                ticks: { color: "white" },
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>

                        <div>
                            <p className="text-yellow-200 text-[14px] mt-[15px] px-6 text-center tracking-[0.4px]">
                                ⚠️ Stock price forecasts are generated using historical trends and machine learning models.
                                They do not guarantee future price movements and should not be relied upon for trading or investment decisions.
                                Investing in stocks carries risks, including potential loss of capital.
                                We strongly recommend consulting a certified financial expert before making any financial commitments.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StockPrediction;
