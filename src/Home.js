import React from 'react';
import { Link } from 'react-router-dom';
import './css/Home.css';


const Home = () => {

    const routes = [
        {
            name:'Qr Generator',
            img: 'https://www.barcoding.co.uk/wp-content/uploads/2018/04/QR-Code-1024x1024.jpg',
            to: '/qr-generator',
            description: 'Generate QR codes instantly.'
        },
        {
            name:'Customized Qr Generator',
            img: 'https://files.oaiusercontent.com/file-Dbrwz71zUOgU5nFWHKg5iucn?se=2123-10-24T01:54:19Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3Df518066e-aa7d-4fc1-9ef2-64f3a1d81112.png&sig=Vk64VEL66hfr16e%2BJCmfgL7enKOckDSdVGHEG5DZ5QU%3D',
            to: '/custom-qr-generator',
            description: 'Generate customized QR codes instantly.'
        },
        {
            name:'BMI Calculator',
            img: 'https://is2-ssl.mzstatic.com/image/thumb/Purple114/v4/a0/a5/bb/a0a5bb2c-ad09-707d-5449-0e234ca05210/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg',
            to: '/bmi-calculator',
            description: 'Calculate your BMI quickly.'
        },
        {
            name:'Unit Converter',
            img: 'https://content.instructables.com/FSY/EOC9/HLZREKU8/FSYEOC9HLZREKU8.png?auto=webp&fit=bounds&frame=1auto=webp&frame=1&height=300',
            to: '/unit-converter',
            description: 'Convert units efficiently.'
        },
        {
            name:'Weather App',
            img: 'https://naturemood.vercel.app/image.png',
            to: 'https://naturemood.vercel.app/',
            description: 'Tells Your City weather Mood.'
        },
        {
            name:'Task Tracker',
            img: 'https://raw.githubusercontent.com/dsak789/Task-Tracker-App/refs/heads/dev7/assets/images/TaskTracker1024.png',
            to: 'https://tasktracker.streamlit.app/',
            description: 'An Advanced Todo List App.'
        },
        
    ];

    return (
        <div>
            <div className='banner'>Multi Utility Tools</div>
            <div className='homemain'>
                {routes.map((route, index) => (
                    <Link to={route.to} key={index} className='router-link'>
                        <div className='route-card' >
                            <h3>
                                {route.name}
                            </h3>
                            <div className='card-img'>
                                <img src={route.img} alt={`${route.name} logo`} />
                            </div>
                            <div className='card-description'>
                                <p>{route.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Home;
