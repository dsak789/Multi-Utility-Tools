import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import '../css/QrGenerator.css';  

const QrGenerator = () => {
    const [input, setInput] = useState('');
    const [generate, setGenerate] = useState(false);
    const canvasRef = useRef(null); // Reference to the QR code canvas

    // Function to handle QR code download
    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png'); // Get the image as data URL
            link.download = `qr_code_${Date.now()}.png`; // Set the filename
            link.click(); // Simulate a click to download
        }
    };

    return (
        <div className="qr-generator-container">
            <h2 className="title">QR Code Generator</h2>
            <div className="input-container">
                <textarea
                    type="text"
                    className="qr-input"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value); 
                      setGenerate(false);
                    }}
                    placeholder="Enter text or message or URL"
                />
                <button 
                    className="generate-btn" 
                    disabled={!input} 
                    hidden={!input} 
                    onClick={() => setGenerate(true)}
                >
                    Generate
                </button>
            </div>
            {generate && (
                <div className="qr-code">
                    <QRCodeCanvas 
                        value={input} 
                        size={200} 
                        ref={canvasRef} // Set the ref to the QRCodeCanvas
                    />
                    <button className="download-btn" onClick={handleDownload}>
                        Download QR Code
                    </button>
                </div>
            )}
        </div>
    );
};

export default QrGenerator;
