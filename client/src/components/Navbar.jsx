import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { recommendations } from "./recommendations";

// For notifications
import { Toaster, toast } from 'sonner';

import axios from "axios";

import logo from "../assets/logo.png"
import search from "../assets/search.png"

const Navbar = () => {

    // To navigate to home whenever clicked on logo
    const home = (() => {
        navigate(`/`);
    })

    // Whether to show the dropdown or not
    const [activeInput, setActiveInput] = useState(null);

    // It is to have transperent backgroound on home page , watchlist and a black background on other pages
    const location = useLocation();
    const navigate = useNavigate();
    let navClass;
    if (location.pathname === '/' || location.pathname === "/watchlist" || location.pathname === "/stockpredictor" || location.pathname === "/contactUs") {
        navClass = 'bg-transparent';
    }
    else {
        navClass = 'bg-black';
    }

    // This is used for the input box 
    const [newStock, setnewStock] = useState("");

    // This is for adding the stock in input box 
    const SearchStock = () => {
        if (newStock.trim() === "") {
            toast.warning(`Enter Stock name to search`, {
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
                toast.error(`${newStock.toUpperCase()} is not a valid stock symbol.`, {
                    position: 'top-center',
                    duration: 3000,
                });
                return;
            }

            if (validStock) {
                // Send stock name to backend whenever watchlist length changes
                const sendStock = async () => {
                    try {
                        await axios.post("http://localhost:5000/api/sendStock", { stock: newStock.toUpperCase() }, {
                            headers: { "Content-Type": "application/json" },
                        });
                        console.log("stock name successfully sent to backend");
                    } catch (error) {
                        console.error("Error sending stock name to backend:", error);
                    }
                };

                sendStock();
            }

            navigate(`/stockinfo/${newStock.trim()}`);

            // Setting the input box to empty
            setnewStock("");
        }
    };

    // Used to select one from the recommendations
    const selectRecommendation = (symbol) => {
        setnewStock(symbol);
    };

    // To have the underline on the page that is currently active
    const isActive = (path) => (location.pathname === path ? 'underline underline-offset-[10px] decoration-2 decoration-[#0335fc]' : '');

    // --------------------------------------------- RENDERING THE NAVBAR COMPONENT --------------------------------------------- //
    return (
        <nav className={`${navClass} pr-[5%] w-full h-[70px] text-white p-[10px] fixed top-0 left-0 flex items-center justify-between z-10 `}>
            <Toaster richColors/>
            {/* Logo of Website */}
            <img src={logo} alt='logo' onClick={home} className='w-[200px] cursor-pointer' />

            {/* Pages of the web Page */}
            <ul>
                <li className={`inline-block list-none mx-[15px] my-[5px]
                text-[18px] px-[10px] py-[5px] rounded-[30px] cursor-pointer hover:bg-white hover:text-black transition-all duration-200 ${isActive('/')} `}><Link to="/">Home</Link></li>
                <li className={`inline-block list-none mx-[15px] my-[5px]
                text-[18px] px-[10px] py-[5px] rounded-[30px] cursor-pointer hover:bg-white hover:text-black transition-all duration-200 ${isActive('/invest')} `}><Link to="/invest">Invest</Link></li>
                <li className={`inline-block list-none mx-[15px] my-[5px]
                text-[18px] px-[10px] py-[5px] rounded-[30px] cursor-pointer hover:bg-white hover:text-black transition-all duration-200 ${isActive('/watchlist')} `}><Link to="/watchlist">Watchlist</Link></li>
                <li className={`inline-block list-none mx-[15px] my-[5px]
                text-[18px] px-[10px] py-[5px] rounded-[30px] cursor-pointer hover:bg-white hover:text-black transition-all duration-200 ${isActive('/stockpredictor')} `}><Link to="/stockpredictor">Stock Predictor</Link></li>
                <li className={`inline-block list-none mx-[15px] my-[5px]
                text-[18px] px-[10px] py-[5px] rounded-[30px] cursor-pointer hover:bg-white hover:text-black transition-all duration-200 ${isActive('/contactUs')} `}><Link to="/contactUs">Contact Us</Link></li>
            </ul>

            <div className="bg-white text-black py-[2px] px-[15px] text-[16px] rounded-[30px] border-0 outline-0 flex flex-row items-center justify-between relative w-[375px]">
                {/* Search for a stock */}
                <input type="text"
                    placeholder="Search Stock (e.g., INFY)"
                    onFocus={() => setActiveInput("search")}
                    onBlur={() => setTimeout(() => setActiveInput(null), 300)} // Delay to allow click on dropdown (below 300 will not allow to select the recommendations )
                    className="bg-transparent text-[#686666] px-4 py-2  focus:outline-none "
                    onChange={(e) => setnewStock(e.target.value)}
                    value={newStock} />
                <button className="text-white py-2 px-2 rounded-[30px] cursor-pointer" onClick={SearchStock}>
                    {/* link to is written in the on click function using navigate */}
                    <img className='w-[20px] ' src={search} alt='search' />
                </button>
                {/* -------------------- RECOMMENDATIONS DROPDOWN -------------------- */}
                {newStock && activeInput === "search" && (
                    <ul className="absolute top-[100%] left-0 bg-[#1a1a1a] text-white rounded-[15px] shadow-lg mt-2 w-full max-h-[150px] overflow-y-auto no-scrollbar">
                        {recommendations
                            .filter((rec) =>
                                rec.name.toLowerCase().includes(newStock.toLowerCase()) ||
                                rec.symbol.toLowerCase().includes(newStock.toLowerCase())
                            )
                            .map((rec, index) => (
                                <li
                                    key={index}
                                    onClick={() => selectRecommendation(rec.symbol)}
                                    className="px-4 py-2 hover:bg-[#333] cursor-pointer"
                                >
                                    <strong>{rec.symbol}</strong> - {rec.name}
                                </li>
                            ))}
                    </ul>
                )}
            </div>
            
        </nav>
    )
}

export default Navbar
