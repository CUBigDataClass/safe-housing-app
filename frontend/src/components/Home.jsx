import React from 'react';
// import { Link } from 'react-router';
import '../styles/main.css';
import '../styles/home.css';
import MiddleHomeSection from './MiddleHomeSection.jsx';
import InfoFooter from './InfoFooter.jsx';
import Footer from './Footer.jsx';
import FavouriteTeam from './DropDownSearchApp';

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
                        <div className='searchInputAndButtons'>
                        <FavouriteTeam/>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Home;