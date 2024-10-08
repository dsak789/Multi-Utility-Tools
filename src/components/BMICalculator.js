import React, { useState } from 'react';
import '../css/BMICalculator.css'; 

const BMICalculator = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState('');

    const calculateBMI = () => {
        if (weight > 0 && height > 0) {
            const heightInMeters = height / 100; 
            const calculatedBMI = weight / (heightInMeters * heightInMeters);
            setBmi(calculatedBMI.toFixed(2)); 
            determineCategory(calculatedBMI); 
        }
    };

    const determineCategory = (calculatedBMI) => {
        if (calculatedBMI < 18.5) {
            setCategory('Underweight');
        } else if (calculatedBMI >= 18.5 && calculatedBMI < 24.9) {
            setCategory('Normal weight');
        } else if (calculatedBMI >= 25 && calculatedBMI < 29.9) {
            setCategory('Overweight');
        } else {
            setCategory('Obesity');
        }
    };

    return (
        <div className="bmi-calculator-container">
            <h2 className="title">BMI Calculator</h2>
            <div className="input-container">
                <input
                    type="number"
                    placeholder="Weight (kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Height (cm)"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />
                <button className="calculate-btn" onClick={calculateBMI}>
                    Calculate BMI
                </button>
            </div>
            {bmi && (
                <div className="result-container">
                    <h3>Your BMI: {bmi}</h3>
                    <h4>Category: {category}</h4>
                </div>
            )}
        </div>
    );
};

export default BMICalculator;
