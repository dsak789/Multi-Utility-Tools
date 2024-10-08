import React from 'react'
import './App.css'
import { BrowserRouter as  Router, Route, Routes } from 'react-router-dom'

import Home from './Home'
import Invalid404 from './components/Invalid404'
import QrGeneratort from './components/QrGenerator'
import UnitConvertor from './components/UnitConvertor'
import BMICalculator from './components/BMICalculator'
import CustomQRGenerator from './components/CustomQrGenerator'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/qr-generator' element={<QrGeneratort/>} />
          <Route path='/custom-qr-generator' element={<CustomQRGenerator/>} />
          <Route path='/unit-converter' element={<UnitConvertor/>} />
          <Route path='/bmi-calculator' element={<BMICalculator/>} />
          <Route path='*' element={<Invalid404/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App