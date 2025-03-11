import requests
from bs4 import BeautifulSoup
import json
import yfinance as yf


def fetch_stock_data(stock_name):
    url = f'https://www.screener.in/company/{stock_name}/' 
    response = requests.get(url)

    tv_url = f'https://www.tradingview.com/symbols/NSE-{stock_name}/'
    tv_response = requests.get(tv_url)

    # Ensure the website is responding
    if response.status_code != 200:
        return {'error': 'Failed to retrieve data'}

    soup = BeautifulSoup(response.text, 'html.parser')

    tv_soup = BeautifulSoup(tv_response.text,'html.parser')

    # Fetch the stock data
    session = requests.Session()
    stock = yf.Ticker(stock_name+".NS",session)
    current_price = stock.info['currentPrice']
    previous_close_price = stock.info['previousClose']

    # Calculate the difference
    price_difference = current_price - previous_close_price

    # Determine if the change is positive or negative
    if current_price > previous_close_price:
        change_symbol = "+"
    else:
        change_symbol = "-"
    
    # change in price today
    priceChange = f'{change_symbol} ₹{abs(price_difference):.2f}'

    # percentage change today
    change = f'{change_symbol}{abs((price_difference/current_price)*100):.2f}%'

    # about the stock
    about = stock.info['longBusinessSummary']

    # stock website
    website = stock.info['website']

    # Get historical data
    historical_data = stock.history(period='3mo')
    # Convert datetime index to timezone-unaware
    historical_data.index = historical_data.index.tz_localize(None)
    # Reset index to move Date from index to a column
    historical_data = historical_data.reset_index()
    # Format the Date column as 'DD-MM-YYYY'
    historical_data['Date'] = historical_data['Date'].dt.strftime('%d-%m-%Y')
    historical_data['Price'] = ((historical_data['Open'] + historical_data['Close']) / 2).round(2)

    # price data of last 3 months
    priceData = [[row['Date'], row['Price']] for _, row in historical_data.iterrows()]
    # print(priceData)

    logolink = tv_soup.find("img", class_="logo-PsAlMQQF xxlarge-PsAlMQQF medium-xoKMfU7r wrapper-TJ9ObuLF skeleton-PsAlMQQF")['src']
    # print(logolink)
    
    name = soup.find_all(class_="flex-row flex-wrap flex-align-center flex-grow")[0].find_all('h1')[0].text
    # print("Name : "+name)

    symbols = soup.find_all(class_="ink-700 upper")

    bsedata = symbols[0].text.strip().split(" ")
    # Remove \n and empty strings
    cleaned_data = [item.strip() for item in bsedata if item.strip()]
    bseresult = f"{cleaned_data[0].replace(':', ' :')} {cleaned_data[-1]}"  # Format as "BSE : 532540"

    # print(bseresult)

    nsedata = symbols[1].text.strip().split(" ")
    # Remove \n and empty strings
    cleaned_data = [item.strip() for item in nsedata if item.strip()]
    nseresult = f"{cleaned_data[0].replace(':', ' :')} {cleaned_data[-1]}"  # Format as "NSE : TCS"

    # print(nseresult)

    comp = soup.find('h2', string="Peer comparison").find_next_sibling().find_all('a')
    sector = comp[0].text
    # print("Sector : "+sector)
    industry = comp[1].text
    # print("Industry : "+industry)

    values = soup.find(class_='company-ratios').find_all('li')
    marketCap = values[0].find(class_='number').text
    # print("Market Cap"+'₹ '+marketCap+' cr')

    currPrice = values[1].find(class_='number').text
    # print("Current Price : "+'₹ '+currPrice)

    high_low = "₹ "+values[2].find_all(class_='number')[0].text + " / ₹ "+values[2].find_all(class_='number')[0].text
    # print("High / Low : "+high_low)

    stock_pe = values[3].find(class_='number').text
    # print("Stock P/E : "+stock_pe)

    bookValue = values[4].find(class_='number').text
    # print("Book Value : "+'₹ '+bookValue)

    dividendYield = values[5].find(class_='number').text
    # print("Dividend Yield : "+dividendYield+"%")

    roce = values[6].find(class_='number').text
    # print("ROCE : "+roce+"%")

    roe = values[7].find(class_='number').text
    # print("ROE : "+roe+"%")

    faceValue = values[8].find(class_='number').text
    # print("Face Value : "+'₹ '+faceValue)

    prosarr = soup.find(class_='pros').find_all('li')
    pros = [pro.text for pro in prosarr]
    # print("Pros : ")
    # print(pros)

    consarr = soup.find(class_='cons').find_all('li')
    cons = [con.text for con in consarr]
    # print("Cons : ")
    # print(cons)

    tables = soup.find_all(class_="data-table")

    # print("\nQuaterly Results : ")

    quaterlytable = tables[0]
    # print(quaterlytable)

    quaterlyrows = quaterlytable.find_all('tr')

    # Initialize a list to hold the extracted columns
    quaterly_extracted_data = []

    # Loop through each row
    for row in quaterlyrows:
        # Extract all columns (cells) in the current row
        # Include both header (<th>) and data (<td>)
        cells = row.find_all(['td', 'th'])

        # Get the first column and the last four columns
        selected_columns = [cells[0]] + cells[-4:]

        # Clean the text (remove \n, \xa0, and trim the last 2 characters for specific cases)
        cleaned_columns = []
        for i, cell in enumerate(selected_columns):
            text = cell.text.strip()  # Remove leading/trailing spaces
            if i == 0 and text.endswith('\xa0+'):  # First column check
                text = text[:-2]  # Remove the last 2 characters
            cleaned_columns.append(text)

        # Add the cleaned row to the extracted data
        quaterly_extracted_data.append(cleaned_columns)

        # Stop processing if the first column is "EPS in Rs"
        if cleaned_columns[0] == "EPS in Rs":
            break

    # Print the extracted data
    # print(quaterly_extracted_data)

    # print("\nBalance Sheet : ")

    balancesheettable = tables[2]
    # print(quaterlytable)

    balancesheetrows = balancesheettable.find_all('tr')

    # Initialize a list to hold the extracted columns
    balancesheet_extracted_data = []

    # Loop through each row
    for row in balancesheetrows:
        # Extract all columns (cells) in the current row
        # Include both header (<th>) and data (<td>)
        cells = row.find_all(['td', 'th'])

        # Get the first column and the last four columns
        selected_columns = [cells[0]] + cells[-4:]

        # Clean the text (remove \n, \xa0, and trim the last 2 characters for specific cases)
        cleaned_columns = []
        for i, cell in enumerate(selected_columns):
            text = cell.text.strip()  # Remove leading/trailing spaces
            if i == 0 and text.endswith('\xa0+'):  # First column check
                text = text[:-2]  # Remove the last 2 characters
            cleaned_columns.append(text)

        # Add the cleaned row to the extracted data
        balancesheet_extracted_data.append(cleaned_columns)

        # Stop processing if the first column is "EPS in Rs"
        if cleaned_columns[0] == "Total Assets":
            break

    # Print the extracted data
    # print(balancesheet_extracted_data)

    # print("\nShare Holding Pattern : ")

    shareholdingpatterntable = tables[6]
    # print(quaterlytable)

    shareholdingpatternrows = shareholdingpatterntable.find_all('tr')

    # Initialize a list to hold the extracted columns
    shareholdingpattern_extracted_data = []

    # Loop through each row
    for row in shareholdingpatternrows:
        # Extract all columns (cells) in the current row
        # Include both header (<th>) and data (<td>)
        cells = row.find_all(['td', 'th'])

        # Get the first column and the last four columns
        selected_columns = [cells[0]] + cells[-4:]

        # Clean the text (remove \n, \xa0, and trim the last 2 characters for specific cases)
        cleaned_columns = []
        for i, cell in enumerate(selected_columns):
            text = cell.text.strip()  # Remove leading/trailing spaces
            if i == 0 and text.endswith('\xa0+'):  # First column check
                text = text[:-2]  # Remove the last 2 characters
            cleaned_columns.append(text)

        # Add the cleaned row to the extracted data
        shareholdingpattern_extracted_data.append(cleaned_columns)

        # Stop processing if the first column is "EPS in Rs"
        if cleaned_columns[0] == "No. of Shareholders":
            break

    # Print the extracted data
    # print(shareholdingpattern_extracted_data)

    # Send the data to return
    stock_data = {
        "info" : [
            {
        "Name" : name, 
        "Price" : current_price,
        "priceChange" : priceChange,
        "Change" : change,
        "BSE" : bseresult,
        "NSE" : nseresult,
        "Sector" : sector,
        "Industry" : industry,
        "MarketCap" : marketCap,
        "CurrentPrice" : currPrice,
        "HighLow" : high_low,
        "StockPE" : stock_pe,
        "BookValue" : bookValue,
        "DividendYield" : dividendYield,
        "ROCE" : roce,
        "ROE" : roe,
        "FaceValue" : faceValue,
        "About" : about,
        "website" : website,
        "Pros" : pros,
        "Cons" : cons,
        "QuaterlyResults" : quaterly_extracted_data,
        "BalanceSheet" : balancesheet_extracted_data,
        "ShareHoldingPattern" : shareholdingpattern_extracted_data,
        "logolink" : logolink,
        "PriceData" : priceData
    }
        ]
    }

    return stock_data['info']

# Get the stock name from command-line arguments
import sys
stock_name = sys.argv[1] if len(sys.argv) > 1 else ''

# Ensure stock_name is not empty
if stock_name:
    stock_data = fetch_stock_data(stock_name)
    print(json.dumps(stock_data))  # Ensure JSON output
else:
    print(json.dumps({'error': 'Stock name is missing'}))
