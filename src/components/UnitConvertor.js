import axios from 'axios';
import React, { useState } from 'react';
import '../css/UnitConverter.css'; 

const UnitConvertor = () => {
    const [conversionType, setConversionType] = useState('length');
    const [fromUnit, setFromUnit] = useState('meter');
    const [toUnit, setToUnit] = useState('feet');
    const [inputValue, setInputValue] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    const unitOptions = {
        angle: ['radian', 'turn', 'degree', 'gradian'],
        area: [
            'square-meter', 'square-petameter', 'square-terameter', 'square-gigameter', 
            'square-megameter', 'square-kilometer', 'square-hectometer', 'square-decameter', 
            'square-decimeter', 'square-centimeter', 'square-millimeter', 'square-micrometer', 
            'square-nanometer', 'square-picometer', 'square-femtometer', 'acre', 
            'centiare', 'deciare', 'are', 'decare', 'hectare', 
            'square-feet', 'square-inch', 'square-yard', 'square-mile'
        ],
        data: [
            'bit', 'pebibit', 'tebibit', 'gibibit', 'mebibit', 
            'kibibit', 'petabit', 'terabit', 'gigabit', 'megabit', 
            'kilobit', 'hectobit', 'decabit', 'decibit', 'centibit', 
            'millibit', 'microbit', 'nanobit', 'picobit', 'femtobit', 
            'nibble', 'byte', 'pebibyte', 'tebibyte', 'gibibyte', 
            'mebibyte', 'kibibyte', 'petabyte', 'terabyte', 'gigabyte', 
            'megabyte', 'kilobyte', 'hectobyte', 'decabyte', 'decibyte', 
            'centibyte', 'millibyte', 'microbyte', 'nanobyte', 'picobyte', 
            'femtobyte', 'hextet'
        ],
        force: ['newton', 'dyne', 'kilogram-force', 'kilopond', 'pound-force', 'poundal'],
        length: [
            'meter', 'petameter', 'terameter', 'gigameter', 'megameter', 
            'kilometer', 'hectometer', 'decameter', 'decimeter', 'centimeter', 
            'millimeter', 'micrometer', 'nanometer', 'picometer', 'femtometer', 
            'feet', 'inch', 'yard', 'mile', 'nautical-mile', 'light-year'
        ],
        mass: [
            'gram', 'petagram', 'teragram', 'gigagram', 'megagram', 
            'kilogram', 'hectogram', 'decagram', 'decigram', 'centigram', 
            'milligram', 'microgram', 'nanogram', 'picogram', 'femtogram', 
            'tonne', 'pound', 'stone', 'ounce', 'short-ton', 
            'US-ton', 'long-ton'
        ],
        pressure: [
            'pascal', 'petapascal', 'terapascal', 'gigapascal', 'megapascal', 
            'kilopascal', 'hectopascal', 'decapascal', 'decipascal', 'centipascal', 
            'millipascal', 'micropascal', 'nanopascal', 'picopascal', 'femtopascal', 
            'bar', 'petabar', 'terabar', 'gigabar', 'megabar', 
            'kilobar', 'hectobar', 'decabar', 'decibar', 'centibar', 
            'millibar', 'microbar', 'nanobar', 'picobar', 'femtobar', 
            'torr', 'millitorr', 'atmosphere'
        ],
        temperature: [
            'kelvin', 'petakelvin', 'terakelvin', 'gigakelvin', 'megakelvin', 
            'kilokelvin', 'hectokelvin', 'decakelvin', 'decikelvin', 'centikelvin', 
            'millikelvin', 'microkelvin', 'nanokelvin', 'picokelvin', 'femtokelvin', 
            'fahrenheit', 'celsius', 'rankine'
        ],
        time: [
            'second', 'petasecond', 'terasecond', 'gigasecond', 'megasecond', 
            'kilosecond', 'hectosecond', 'decasecond', 'decisecond', 'centisecond', 
            'millisecond', 'microsecond', 'nanosecond', 'picosecond', 'femtosecond', 
            'minute', 'hour', 'milliday', 'day', 'week', 
            'fortnight', 'month', 'year', 'decade', 'century', 
            'millennium', 'moment', 'shake', 'time-unit', 'svedberg'
        ],
        volume: [
            'cubic-meter', 'cubic-petameter', 'cubic-terameter', 'cubic-gigameter', 
            'cubic-megameter', 'cubic-kilometer', 'cubic-hectometer', 'cubic-decameter', 
            'cubic-decimeter', 'cubic-centimeter', 'cubic-millimeter', 'cubic-micrometer', 
            'cubic-nanometer', 'cubic-picometer', 'cubic-femtometer', 'liter', 
            'petaliter', 'teraliter', 'gigaliter', 'megaliter', 
            'kiloliter', 'hectoliter', 'decaliter', 'deciliter', 'centiliter', 
            'milliliter', 'microliter', 'nanoliter', 'picoliter', 'femtoliter', 
            'cubic-mile', 'acre-foot', 'cubic-yard', 'cubic-foot', 
            'board-foot', 'cubic-inch', 'measurement-ton', 'imperial-barrel', 
            'imperial-bushel', 'imperial-peck', 'imperial-gallon', 
            'imperial-quart', 'imperial-pint', 'imperial-fluid-ounce', 
            'teaspoon', 'tablespoon', 'US-fluid-ounce', 'cup', 
            'pint', 'quart', 'gallon', 'US-bushel', 'US-peck', 
            'US-dry-gallon', 'US-dry-barrel', 'US-dry-quart', 'US-dry-pint'
        ]
    };

    const handleConversion = async () => {
        setResult('');
        setError('');

        const options = {
            method: 'GET',
            url: `https://unitconversion.p.rapidapi.com/${conversionType}/${fromUnit}/${toUnit}/${inputValue}`,
            headers: {
                'x-rapidapi-key': '85b86a0198msh8a1fdd06a25a4c4p1bf304jsnb279d97e4dc5',
                'x-rapidapi-host': 'unitconversion.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            setResult(`${inputValue} ${fromUnit} = ${response.data.result} ${toUnit}`);
        } catch (err) {
            setError('Conversion failed. Please try again.');
        }
    };

    const handleTypeChange = (event) => {
        const selectedType = event.target.value;
        setConversionType(selectedType);
        setFromUnit(unitOptions[selectedType][0]);
        setToUnit(unitOptions[selectedType][1]);
    };

    const handleFromUnitChange = (event) => {
        setFromUnit(event.target.value);
    };

    const handleToUnitChange = (event) => {
        setToUnit(event.target.value);
    };

    return (
        <div className='unitmain'>
        <div className="unitcontainer">
            <h2>Unit Converter</h2>
            <div>
                <label>Conversion Type:</label>
                <select value={conversionType} onChange={handleTypeChange}>
                    {Object.keys(unitOptions).map(type => (
                        <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>From Unit:</label>
                <select value={fromUnit} onChange={handleFromUnitChange}>
                    {unitOptions[conversionType].map(unit => (
                        <option key={unit} value={unit}>
                            {unit.charAt(0).toUpperCase() + unit.slice(1)}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>To Unit:</label>
                <select value={toUnit} onChange={handleToUnitChange}>
                    {unitOptions[conversionType].map(unit => (
                        <option key={unit} value={unit}>
                            {unit.charAt(0).toUpperCase() + unit.slice(1)}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label>Value:</label>
                <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    />
            </div>
            <button className='cnt-btn' onClick={handleConversion}>Convert</button>
            {result && <div className="result">{result}</div>}
            {error && <div className="error">{error}</div>}
        </div>
        </div>
    );
};

export default UnitConvertor;
