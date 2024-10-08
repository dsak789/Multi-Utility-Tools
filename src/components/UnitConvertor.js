import React, { useState } from 'react';
import '../css/UnitConverter.css'; 

const UnitConverter = () => {
    const [conversionType, setConversionType] = useState('length');
    const [inputValue, setInputValue] = useState('');
    const [outputValue, setOutputValue] = useState('');

    // Conversion functions
    const convertLength = (value) => {
        const metersToFeet = value * 3.28084;
        return metersToFeet.toFixed(2);
    };

    const convertWeight = (value) => {
        const kilogramsToPounds = value * 2.20462;
        return kilogramsToPounds.toFixed(2);
    };

    const convertTemperature = (value) => {
        const celsiusToFahrenheit = (value * 9/5) + 32;
        return celsiusToFahrenheit.toFixed(2);
    };

    const handleConversion = () => {
        let result;
        const value = parseFloat(inputValue);

        if (isNaN(value)) {
            setOutputValue('Please enter a valid number');
            return;
        }

        switch (conversionType) {
            case 'length':
                result = convertLength(value);
                setOutputValue(`${value} meters = ${result} feet`);
                break;
            case 'weight':
                result = convertWeight(value);
                setOutputValue(`${value} kilograms = ${result} pounds`);
                break;
            case 'temperature':
                result = convertTemperature(value);
                setOutputValue(`${value} °C = ${result} °F`);
                break;
            default:
                setOutputValue('Invalid conversion type');
        }
    };

    return (
        <div className="unit-converter-container">
            <h2 className="title">Unit Converter</h2>
            <div className="input-container">
                <select value={conversionType} onChange={(e) => setConversionType(e.target.value)}>
                    <option value="length">Length (meters to feet)</option>
                    <option value="weight">Weight (kilograms to pounds)</option>
                    <option value="temperature">Temperature (Celsius to Fahrenheit)</option>
                </select>
                <input
                    type="number"
                    placeholder="Enter value"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button className="convert-btn" onClick={handleConversion}>
                    Convert
                </button>
            </div>
            {outputValue && (
                <div className="result-container">
                    <h3>{outputValue}</h3>
                </div>
            )}
        </div>
    );
};

export default UnitConverter;
