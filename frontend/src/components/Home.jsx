import React from 'react';
// import { Link } from 'react-router';
import '../styles/main.css';
import '../styles/home.css';
import MiddleHomeSection from './MiddleHomeSection.jsx';
import InfoFooter from './InfoFooter.jsx';
import Footer from './Footer.jsx';

const Home = (props) => {
    //Probably need to pass down image from api or amazon on props and set image here
    return (
        <div>
            <div className='homeContainer'>
                <div className='videoSection'>
                    <header className='searchBoxHeader'>
                        <h1>Find your safe off-campus home</h1>
                    </header>
                    <section className='searchBox'>
                        <div className='searchBody'>
                            <label className='buy'>Buy</label>
                            <label className='rent'>Rent</label>
                            <label className='sell'>Sell</label>
                        </div>
                        <div className='searchInputAndButton'>
                            <input placeholder='Enter an address, neighborhood, city or ZIP code' className='searchInput' type='text' />
                            <button className='searchButton' type='submit'>
                                <h5 className='searchBtnText'>Search</h5>
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Home;