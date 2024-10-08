import React, { useState, useRef } from 'react';
import '../css/CustomQrGenerator.css';  

const QrGenerator = () => {
    const [input, setInput] = useState('');
    const [generate, setGenerate] = useState(false);
    const [qrprops, setQrProps] = useState({
        data: 'Enter Something to generate a new QR',
        size: 200,
        color: '#000000',
        bgcolor: '#ffffff',
        margin: 0,
        qzone: 1,
        format: 'png'
    });

    const canvasRef = useRef(null);
    const [qrImageUrl, setQrImageUrl] = useState('');

    const qr_url = `https://api.qrserver.com/v1/create-qr-code/?data=${qrprops.data}&size=${qrprops.size}x${qrprops.size}&ecc=H&color=${qrprops.color.replace('#', '')}&bgcolor=${qrprops.bgcolor.replace('#', '')}&margin=${qrprops.margin}&qzone=${qrprops.qzone}&format=${qrprops.format}`;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQrProps((prev) => ({
            ...prev,
            [name]: value
        }));
        setGenerate(false);
    };

    const handleTextChange = (e) => {
        setInput(e.target.value);
        setQrProps((prev) => ({
            ...prev,
            data: e.target.value
        }));
        setGenerate(false);
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png'); 
        link.download = `qr_code_${Date.now()}.png`; 
        link.click(); 
    };

    const generateQRCode = async () => {
        setGenerate(true);
        const response = await fetch(qr_url);
        const blob = await response.blob(); 
        const imageUrl = URL.createObjectURL(blob); 
        setQrImageUrl(imageUrl); 
    };

    return (
        <div className="qr-generator-container">
            <h2 className="title">QR Code Generator</h2>
            <div className="input-grid-container">
                <div className="input-group">
                    <label>Enter Text/URL:</label>
                    <textarea
                        type="text"
                        className="qr-input"
                        value={input}
                        onChange={handleTextChange}
                        placeholder="Enter text, message, or URL"
                    />
                </div>

                <div className="input-group">
                    <label>Size (10 - 700):</label>
                    <input
                        type="number"
                        name="size"
                        className="qr-input"
                        value={qrprops.size}
                        min={10}
                        max={700}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group">
                    <label>Foreground Color:</label>
                    <input
                        type="color"
                        name="color"
                        className="qr-input"
                        value={qrprops.color}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group">
                    <label>Background Color:</label>
                    <input
                        type="color"
                        name="bgcolor"
                        className="qr-input"
                        value={qrprops.bgcolor}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group">
                    <label>Margin (0 - 50):</label>
                    <input
                        type="number"
                        name="margin"
                        className="qr-input"
                        value={qrprops.margin}
                        min={0}
                        max={50}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="input-group">
                    <label>Quiet Zone (0 - 100):</label>
                    <input
                        type="number"
                        name="qzone"
                        className="qr-input"
                        value={qrprops.qzone}
                        min={0}
                        max={100}
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <button 
                className="generate-btn" 
                disabled={!input} 
                onClick={generateQRCode}
            >
                Generate
            </button>

            {generate && qrImageUrl && (
                <div className="qr-code">
                    <canvas
                        ref={canvasRef}
                        width={qrprops.size}
                        height={qrprops.size}
                        style={{ display: 'none' }} 
                    />
                    <img 
                        src={qrImageUrl} 
                        alt="Generated QR code" 
                        onLoad={(e) => {
                            const ctx = canvasRef.current.getContext('2d');
                            ctx.drawImage(e.target, 0, 0, qrprops.size, qrprops.size);
                        }} 
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
