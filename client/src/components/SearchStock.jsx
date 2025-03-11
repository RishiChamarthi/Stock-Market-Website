import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import logo from "../assets/logo.png"

import { Chart as ChartJS, plugins, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js/auto';
import { Bar, Pie, Line } from "react-chartjs-2";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, plugins);

const SearchStock = () => {

    const { stockname } = useParams(); // Get stock name from URL
    // This is used to store the data of marketlist
    const [stockInfo, setstockInfo] = useState([]);

    // Function to fetch real stock information
    const fetchStockInfo = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/stockinfo");
            console.log("stock data" + JSON.stringify(response.data));// To see what data is fetched from the backend
            setstockInfo(response.data);
            console.log(stockInfo);
        } catch (error) {
            console.error("Error fetching stock information data:", error);
        }
    };

    // On starting it will run for one time 
    useEffect(() => {
        setstockInfo([]);
        fetchStockInfo();
    }, [stockname]);

    // As it takes time to fetch the data . we show a loading page until it fetches
    if (stockInfo.length === 0) {
        return (
            <div className="min-h-[calc(100vh-71px)] bg-black loading-container mt-[71px] ">
                <div className="fixed bottom-[45vh] left-[45vw] flex justify-center items-center">
                    <div className=" absolute animate-spin rounded-full h-48 w-48 border-t-4 border-b-4 border-purple-600"></div>
                    <img src={logo} className="rounded-full  w-40" width={100} height={50} alt="logo" />
                </div>
            </div>
        );
    }

    // ---------------------------------------- RENDERING THE SEARCH-STOCK COMPONENT ---------------------------------------- //
    return (
        <div className='mt-[70px] px-[7%] font-outfit text-white bg-black no-scrollbar pt-[20px]'>

            {stockInfo.map((item) => (
                <div>

                    {/* Company */}
                    <div className="flex items-stretch justify-start ">
                        <p><img src={stockInfo[0].logolink} alt="Logo" width={75} className="rounded-full" /></p>
                        <h1 className='text-[30px] font-bold pt-[20px] ml-[25px]'>{item.Name}</h1>
                    </div>

                    {/* Overview section */}
                    <div className={`bg-[#181413] p-4 my-5 rounded-xl transition-all duration-500 ${Number(item.Change.replace('%', '')) >= 0 ? "hover:shadow-[0_0_7px_rgba(36,240,90,0.75)]" : "hover:shadow-[0_0_7px_rgba(250,32,32,0.75)]"} hover:scale-[1.025] `}>
                        <p className='text-[20px] font-semibold'><pre>₹ {item.Price}</pre></p>
                        <p className={`${Number(item.Change.replace('%', '')) >= 0 ? "text-green-500" : "text-red-500"}`}><pre>{item.priceChange} ({item.Change.slice(1)})</pre></p>
                        <p className='text-[16px]'><pre>NSE : {item.NSE}  |  BSE : {item.BSE}</pre></p>
                        <p className='text-[16px]'><pre>Sector : {item.Sector}  |  Industry : {item.Industry}</pre></p>
                        <p className="text-[16px"><pre>Website : <a href={item.website}>{item.website}</a></pre></p>
                    </div>

                    {/* About */}
                    <div className='bg-[#181413] p-4 my-5 rounded-xl transition-all duration-500 hover:scale-[1.025]'>
                        <h2 className='text-[18px] font-bold pt-[10px]'>About : </h2>
                        <p className="pb-[10px] tracking-[0.75px] leading-[22px] font-[400]">{item.About}</p>
                    </div>

                    {/* Line chart for the price  */}
                    <div className="flex items-center justify-center">
                        <div className="bg-[#181413] p-4 my-5 rounded-xl w-[750px] transition-all duration-500 hover:scale-[1.025]">
                            <Line
                                data={{
                                    labels: item.PriceData.map(entry => entry[0]),
                                    datasets: [
                                        {
                                            label: "Price",
                                            data: item.PriceData.map(entry => entry[1]),
                                            // backgroundColor: 'rgba(0,32,255, 1)',
                                            borderColor: (item.PriceData[item.PriceData.length - 1][1]) - (item.PriceData[0][1]) > 0 ? "rgba(0,255,0,1)" : "rgba(255,0,0,1)",
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
                                            text: "Price Chart",
                                            font: {
                                                size: 18,
                                                weight: "bold",
                                            },
                                            color: "white",
                                            padding: {
                                                top: 10,
                                                bottom: 30,
                                            },
                                        },
                                        legend: {
                                            display: false,

                                        },
                                        tooltip: {
                                            mode: "index",
                                            intersect: false,
                                            bodyColor: "white",
                                            titleColor: "white",
                                            footerColor: "white",
                                        },
                                        scales: {
                                            x: { ticks: { color: "white" } },
                                            y: { ticks: { color: "white" } },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>

                    {/* Company Values */}
                    <div className="grid grid-cols-3 bg-black p-4 my-5 rounded-xl">
                        <div className="bg-[#181413] flex items-center justify-between px-6 py-3 border-2 border-gray-400 my-[8px] mx-[8px] rounded-3xl transition-all duration-300 hover:scale-[1.025]">
                            <p>Market Cap</p>
                            <p>₹{item.MarketCap}Cr.</p>
                        </div>
                        <div className="bg-[#181413] flex items-center justify-between px-6 py-3 border-2 border-gray-400 my-[8px] mx-[8px] rounded-3xl transition-all duration-300 hover:scale-[1.025]">
                            <p>Current Price</p>
                            <p>₹{item.CurrentPrice}</p>
                        </div>
                        <div className="bg-[#181413] flex items-center justify-between px-6 py-3 border-2 border-gray-400 my-[8px] mx-[8px] rounded-3xl transition-all duration-300 hover:scale-[1.025]">
                            <p>High / Low</p>
                            <p>{item.HighLow}</p>
                        </div>
                        <div className="bg-[#181413] flex items-center justify-between px-6 py-3 border-2 border-gray-400 my-[8px] mx-[8px] rounded-3xl transition-all duration-300 hover:scale-[1.025]">
                            <p>Stock P/E</p>
                            <p>{item.StockPE}</p>
                        </div>
                        <div className="bg-[#181413] flex items-center justify-between px-6 py-3 border-2 border-gray-400 my-[8px] mx-[8px] rounded-3xl transition-all duration-300 hover:scale-[1.025]">
                            <p>Book Value</p>
                            <p>₹{item.BookValue}</p>
                        </div>
                        <div className="bg-[#181413] flex items-center justify-between px-6 py-3 border-2 border-gray-400 my-[8px] mx-[8px] rounded-3xl transition-all duration-300 hover:scale-[1.025]">
                            <p>Dividend Yield</p>
                            <p>{item.DividendYield}%</p>
                        </div>
                        <div className="bg-[#181413] flex items-center justify-between px-6 py-3 border-2 border-gray-400 my-[8px] mx-[8px] rounded-3xl transition-all duration-300 hover:scale-[1.025]">
                            <p>ROCE</p>
                            <p>{item.ROCE}%</p>
                        </div>
                        <div className="bg-[#181413] flex items-center justify-between px-6 py-3 border-2 border-gray-400 my-[8px] mx-[8px] rounded-3xl transition-all duration-300 hover:scale-[1.025]">
                            <p>ROE</p>
                            <p>{item.ROE}%</p>
                        </div>
                        <div className="bg-[#181413] flex items-center justify-between px-6 py-3 border-2 border-gray-400 my-[8px] mx-[8px] rounded-3xl transition-all duration-300 hover:scale-[1.025]">
                            <p>Face Value</p>
                            <p>₹{item.FaceValue}</p>
                        </div>
                    </div>

                    {/* Bar chart for Quarterly Results */}
                    <div className="flex items-center justify-center">
                        <div className="bg-[#181413] p-4 my-5 rounded-xl w-[750px] transition-all duration-500 hover:scale-[1.025]">
                            <Bar
                                data={{
                                    labels: item.QuaterlyResults[0].slice(1),
                                    datasets: [
                                        {
                                            label: "Sales",
                                            data: item.QuaterlyResults[1].slice(1).map(value => parseInt(value.replace(/,/g, ''))),
                                            backgroundColor: 'rgba(155,25,245, 1)',
                                        },
                                        {
                                            label: "Profit",
                                            data: item.QuaterlyResults[10].slice(1).map(value => parseInt(value.replace(/,/g, ''))),
                                            backgroundColor: 'rgba(255,163,0,1)',
                                        }
                                    ],
                                }}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: "Assets and Liabilities",
                                            font: {
                                                size: 18,
                                                weight: "bold",
                                            },
                                            color: "white",
                                            padding: {
                                                top: 10,
                                                bottom: 30,
                                            },
                                        },
                                        legend: {
                                            position: "bottom",
                                            labels: {
                                                color: "white",
                                            },
                                        },
                                        tooltip: {
                                            bodyColor: "white",
                                            titleColor: "white",
                                            footerColor: "white",
                                        },
                                        scales: {
                                            x: {
                                                ticks: { color: "white" },
                                            },
                                            y: {
                                                ticks: { color: "white" },
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>


                    {/* Quaterly Results */}
                    <div className="bg-[#181413] p-4 my-5 rounded-xl transition-all duration-500 hover:scale-[1.025]">
                        <p className='text-[24px] font-bold pb-5 text-center'>Quarterly Results<span className="text-[16px] ml-2 font-mono">( values in Crores )</span></p>


                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2"></th>
                                    {item.QuaterlyResults[0].slice(1).map((year, yearIndex) => (
                                        <th key={yearIndex} className="border border-gray-300 px-4 py-2">{year}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {item.QuaterlyResults.slice(1).map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td className="border border-gray-300 px-6 py-2 font-bold">{row[0]}</td>
                                        {row.slice(1).map((value, valueIndex) => (
                                            <td key={valueIndex} className="border border-gray-300 px-4 py-2 text-center">{value}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Bar chart for Balance Sheet */}
                    <div className="flex items-center justify-center">
                        <div className="bg-[#181413] p-4 my-5 rounded-xl w-[750px] transition-all duration-500 hover:scale-[1.025]">
                            <Bar
                                data={{
                                    labels: item.BalanceSheet[0].slice(1),
                                    datasets: [
                                        {
                                            label: "Reserves",
                                            data: item.BalanceSheet[2].slice(1).map(value => parseInt(value.replace(/,/g, ''))),
                                            backgroundColor: 'rgba(0,32,255, 1)',
                                        },
                                        {
                                            label: "Fixed Assets",
                                            data: item.BalanceSheet[6].slice(1).map(value => parseInt(value.replace(/,/g, ''))),
                                            backgroundColor: 'rgba(222,37,218, 1)',
                                        }
                                    ],
                                }}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: "Reserves and Fixed Assets",
                                            font: {
                                                size: 18,
                                                weight: "bold",
                                            },
                                            color: "white",
                                            padding: {
                                                top: 10,
                                                bottom: 30,
                                            },
                                        },
                                        legend: {
                                            position: "bottom",
                                            labels: {
                                                color: "white",
                                            },
                                        },
                                        tooltip: {
                                            bodyColor: "white",
                                            titleColor: "white",
                                            footerColor: "white",
                                        },
                                        scales: {
                                            x: {
                                                ticks: { color: "white" },
                                            },
                                            y: {
                                                ticks: { color: "white" },
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>

                    {/* Balance Sheet */}
                    <div className="bg-[#181413] p-4 my-5 rounded-xl transition-all duration-500 hover:scale-[1.025]">
                        <p className='text-[24px] font-bold pb-5 text-center'>Balance Sheet<span className="text-[16px] ml-2 font-mono">( values in Crores )</span></p>
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2"></th>
                                    {item.BalanceSheet[0].slice(1).map((year, yearIndex) => (
                                        <th key={yearIndex} className="border border-gray-300 px-4 py-2">{year}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {item.BalanceSheet.slice(1).map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td className="border border-gray-300 px-6 py-2 font-bold">{row[0]}</td>
                                        {row.slice(1).map((value, valueIndex) => (
                                            <td key={valueIndex} className="border border-gray-300 px-4 py-2 text-center">{value}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pie chart for share holding pattern */}
                    <div className="flex items-center justify-center">
                        <div className="bg-[#181413] p-4 my-5 rounded-xl transition-all duration-500 hover:scale-[1.025]">
                            <div style={{ width: "400px", height: "400px", margin: "auto" }}>
                                <Pie
                                    data={{
                                        labels: item.ShareHoldingPattern.slice(1, -1).map(row => row[0]),
                                        datasets: [
                                            {
                                                label: "Shareholding % (Dec 2024)",
                                                data: item.ShareHoldingPattern.slice(1, -1).map(row => parseFloat(row[row.length - 1])), // Data values in percentages
                                                backgroundColor: [
                                                    "rgba(55, 0, 255, 1)",
                                                    "rgba(251, 0, 7, 1)",
                                                    "rgba(254, 214, 10, 1)",
                                                    "rgba(251, 19, 243, 1)",
                                                    "rgba(68, 255, 7, 1)",
                                                    "rgba(155,25,245, 1)"
                                                ], // Colors for the pie sections
                                            },
                                        ],
                                    }}
                                    options={{
                                        responsive: true,
                                        plugins: {
                                            title: {
                                                display: true,
                                                text: "Shareholding Pattern (Dec 2024)", // Chart Title
                                                font: { size: 18, weight: "bold" },
                                                color: "white",
                                                padding: { top: 10, bottom: 20 },
                                            },
                                            legend: {
                                                position: "bottom",
                                                labels: { color: "white" },
                                            },
                                            tooltip: {
                                                bodyColor: "white",
                                                titleColor: "white",
                                                footerColor: "white",
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Share Holding Pattern */}
                    <div className="bg-[#181413] p-4 my-5 rounded-xl transition-all duration-500 hover:scale-[1.025]">
                        <h2 className='text-[24px] font-bold pb-5 text-center'>Share Holding Pattern</h2>
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2"></th>
                                    {item.ShareHoldingPattern[0].slice(1).map((year, yearIndex) => (
                                        <th key={yearIndex} className="border border-gray-300 px-4 py-2">{year}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {item.ShareHoldingPattern.slice(1).map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        <td className="border border-gray-300 px-6 py-2 font-bold">{row[0]}</td>
                                        {row.slice(1).map((value, valueIndex) => (
                                            <td key={valueIndex} className="border border-gray-300 px-4 py-2 text-center">{value}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pros and Cons */}
                    <div className="flex items-stretch justify-between mx-5 mt-5 pb-10">

                        {/* Pros */}
                        <div className="bg-[#181413] p-7 rounded-xl w-1/2 mr-[10px] border-2 border-green-500/60 transition-all duration-500 hover:scale-[1.025] ">
                            <p className="text-[18px] font-bold">Pros : </p>
                            {item.Pros.length === 0 ? (
                                <li className="text-[16px] list-disc list-inside">Nothing to show here</li>
                            ) : (
                                <ul className="list-disc list-inside text-[16px]">
                                    {item.Pros.map((pro, index) => (
                                        <li key={index}>{pro}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Cons */}
                        <div className="bg-[#181413] p-7 rounded-xl w-1/2 ml-[10px] border-2 border-red-500/60 transition-all duration-500 hover:scale-[1.025]">
                            <p className="text-[18px] font-bold">Cons : </p>
                            {item.Cons.length === 0 ? (
                                <li className="text-[16px] list-disc list-inside">Nothing to show here</li>
                            ) : (
                                <ul className="list-disc list-inside text-[16px]">
                                    {item.Cons.map((con, index) => (
                                        <li key={index}>{con}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                    </div>

                </div>

            ))}

        </div>
    )
}

export default SearchStock
