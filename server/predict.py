import os
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"  # Suppress all TensorFlow logs (warnings & info & error)
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"  # Disable oneDNN optimizations

import sys
import json
import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow import keras
import yfinance as yf
from sklearn.preprocessing import MinMaxScaler

# supressing the yf info
import contextlib
from io import StringIO

# Load the trained model
model = keras.models.load_model("stock_price_lstm.keras", compile=False)

# Define input sequence length
time_steps = 120  # Must match training sequence length
num_stocks = 50   # Model expects 50 features

def get_stock_data(stock_name):
    """Fetch stock data and return scaled input for LSTM"""
    with contextlib.redirect_stdout(StringIO()):  # Suppress yfinance standard output
        data = yf.download(stock_name, period="2y", progress=False)  # Fetch last 2 years of data
    
    # last date of the data
    last_date = data.index[-1]
    
    if len(data) < time_steps:
        return {"error": f"Not enough data for {stock_name}. Required: {time_steps}, Found: {len(data)}"}
    
    close_prices = data["Close"].values.reshape(-1, 1)
    
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(close_prices)

    return scaled_data, scaler , last_date

def predict_stock_price(stock_name):
    """Predicts future stock prices"""
    stock_data = get_stock_data(stock_name)

    if isinstance(stock_data, dict) and "error" in stock_data:
        return stock_data  # Return error if data is insufficient

    scaled_data, scaler ,last_date = stock_data

    # Get the last sequence of time_steps
    last_sequence = scaled_data[-time_steps:].reshape(time_steps, 1)

    # Fix the shape to match the training data (batch_size, time_steps, num_stocks)
    last_sequence_padded = np.zeros((time_steps, num_stocks))  # Create zero-padded array
    last_sequence_padded[:, 0] = last_sequence[:, 0]  # Fill only the first column

    future_days = 30
    future_predictions = []

    # Generate future dates starting from the last date in the dataset
    future_dates = pd.date_range(start=pd.to_datetime(last_date) + pd.Timedelta(days=1), periods=future_days, freq='B')  # 'B' = Business day
    # print(future_days) #to see the dates 
    date_list = future_dates.strftime('%Y-%m-%d').tolist()

    for _ in range(future_days):
        next_pred = model.predict(np.expand_dims(last_sequence_padded, axis=0), verbose=0)[0, 0]
        future_predictions.append(next_pred)
        last_sequence_padded = np.roll(last_sequence_padded, -1, axis=0)
        last_sequence_padded[-1, 0] = next_pred  # Update only the first column

    # Inverse transform predictions
    future_padded = np.zeros((len(future_predictions), 1))
    future_padded[:, 0] = future_predictions
    future_prices_actual = scaler.inverse_transform(future_padded)[:, 0]

    return {"stock": stock_name[0:-3], "predictions": future_prices_actual.tolist() , "dates":date_list}

if __name__ == "__main__":
    if len(sys.argv) > 1:
        stock_name = sys.argv[1].upper()+".NS"
        prediction_result = predict_stock_price(stock_name)
        print(json.dumps(prediction_result))  # JSON output for Node.js
    else:
        print(json.dumps({"error": "No stock name provided"}))

