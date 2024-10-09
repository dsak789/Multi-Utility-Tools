import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/CurrencyConverter.css'; // Ensure this CSS file is in your project

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]); // List of all currencies
  const [fromCurrency, setFromCurrency] = useState('INR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
    
  // Fetch the list of currencies and exchange rates
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/INR'); 
        const currencyOptions = Object.keys(response.data.rates);
        setCurrencies(currencyOptions);
      } catch (error) {
        console.error("Error fetching currency data:", error);
      }
    };

    fetchCurrencies();
  }, []);

  // Convert the currency based on user selection
  const convertCurrency = async () => {
    try {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const rate = response.data.rates[toCurrency];
      const result = amount * rate;
      setConvertedAmount(result.toFixed(2));
    } catch (error) {
      console.error("Error fetching conversion rate:", error);
    }
  };

  return (
    <div className="currency-converter-container">
      <h2 className="converter-title">Currency Converter</h2>

      <div className="converter-input-section">
        <input
          type="number"
          value={amount}
          className="converter-input-amount"
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />

        <select
          value={fromCurrency}
          className="converter-select"
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <select
          value={toCurrency}
          className="converter-select"
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      <button className="converter-button" onClick={convertCurrency}>Convert</button>

      {convertedAmount && (
        <div className="converter-result">
          {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
