import React from 'react';
// import { Link } from 'react-router';
import '../styles/desktopNavBar.css';
import MainLogo from '../styles/zillow-logo.png';

const DesktopNavBar = (props) => {
    return (
        <header className="mainHeader">
            <img src={ MainLogo } className='mainLogo' alt='' />
            <nav className="desktopNav">
                <a className="headerLink" href='/buy'>
                    <span className="buyLink">Buy</span>
                </a>
                <a className="headerLink" href='/rent'>
                    <span className="rentLink">Rent</span>
                </a>
                <a className="headerLink" href='/sell'>
                    <span className="sellLink">Sell</span>
                </a>
            </nav>
        </header>
    )
}

export default DesktopNavBar; 