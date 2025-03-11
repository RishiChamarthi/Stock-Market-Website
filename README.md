# Real-Time Stock Market Tracking and Price Prediction System Using Machine Learning
This project is a modern stock market dashboard designed to help users track and analyze stocks efficiently. It provides real-time market insights, AI-driven stock price predictions, and a customizable watchlist for Indian market investors.
 
## 🌟 Features  

### 📈 Market Overview  
- **Real-time data** for major Indian indices: **NIFTY 50, Sensex, Bank NIFTY**, along with **gold, silver, and INR-USD exchange rates**.  
- Focuses on **essential market data** .  

### ⭐ Watchlist  
- **Manually add/remove** stocks to track.  
- **Auto-updating prices** without needing a page refresh.  
- Displays **stock symbol, price, and % change**.  
- No stock limit, but users **scroll to view more**.  

### 📊 Stock Details Page  
- **Interactive charts:**  
  - **Line charts** (price trends).  
  - **Bar charts** (financial values).  
  - **Pie charts** (shareholding pattern).  
- **Detailed stock data:**  
  - **Company info**, sector, **BSE/NSE symbol**.
  - **Company values and stastics**
  - **3-month stock price chart**.  
  - **Balance sheet, profit & loss statement, shareholding patterns**.  
  - **Pros & cons** of the stock.    

### 🤖 AI Stock Prediction  
- Predicts **NIFTY 50 stocks** for the **next 30 business days**.  
- Users type stock name → get **smart recommendations**.  
- Displays a **graph of predicted prices** and **Day 1, 7, 30 price values**.  
- Uses a **LSTM-based deep learning model**.  

### 💡 Invest Page  
- Covers **basics of investing and types of investing**.  
- **Expanding content** with future **interactive elements & external resource links**.  

### 🎨 Dark Theme  
- **Custom-designed** (not inspired by other websites).  
- Colors: **Black, gray, dark violet, green, red**, transparent backgrounds.  
- **Stock-related background images**.  
- **Green for price increase, red for price decrease**.  

### 📩 Contact Page  
- **Form submission sends an email** with user details & message.  
- No social media links yet.  

## 🚀 Installation & Setup  
 
### 📥 Clone the Repository   
``` bash
git clone https://github.com/RishiChamarthi/Stock-Market-Website.git
```
- Change directory to frontend
  ``` bash
  cd Stock-Market-Website/frontend
  ```
- change directory to backend
  ``` bash
  cd Stock-Market-Website/backend
  ```

### 🏗️ Frontend

- Navigate to the client folder
  ``` bash
  cd client
  ```
- Install dependencies
  ``` bash
  npm install
  ```
- Start the frontend server
  ``` bash
  npm run dev
  ```

### ⚙️ Backend

- Navigate to the server folder
  ``` bash
  cd server
  ```
- Install dependencies
  ``` bash
  npm install
  ```
- Start the backend server
  ``` bash
  npm run start
  ```
Open <a>http://localhost:3000</a> in your browser to view the project

## 🛠️ Tech Stack
- Frontend : React.js, Vite, Tailwind CSS
- Backend : Node.js, Express.js
- Web Scraping : Python (BeautifulSoup/Selenium)
- Stock Data API : yfinance (Yahoo Finance API)
- Machine Learning : LSTM (Long Short-Term Memory)

