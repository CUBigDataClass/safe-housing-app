import React from 'react';
import '../styles/home.css';
import Dropdown from '../components/DropdownComp.jsx';
import {browserHistory} from 'react-router';

export default class Home extends React.Component {

	constructor(props){
		super(props);
        this.state = {
            university: props.searchText || 'Arizona State University',
            minbath: 0,
            maxbath:10,
            maxbed:10,
            minbed: 0,
            radius: 5,
            minprice: 0,
            maxprice: 12000
        }
        this.handleClick = this.handleClick.bind(this);
    }


    onChange(field, value) {
        this.setState({[field]: value});
    }

    handleClick = () => {
        console.log("inside handle click", this.state)
        var url = '?university=' + this.state.university +'&minbed=' +this.state.minbed +'&maxbed=' +this.state.maxbed + '&minbath=' +this.state.minbath + '&maxbath=' +this.state.maxbath + '&radius=' +this.state.radius + '&minprice=' +this.state.minprice + '&maxprice=' +this.state.maxprice
        console.log(url) 

        browserHistory.push(
            {
                pathname: '/buy',
                search: url,
                state: {some: 'state'}
            }
        )
    }

 
    render(){
        console.log(this.state);
        return (
            <div>
                <div className='homeContainer'>
                    <div className='videoSection'>
                        <header className='searchBoxHeader'>
                            <h1>Find your safe off-campus home</h1>
                        </header>
                        <section className='searchBox'>
                           
                            <div className='searchInputAndButton'>
                                <div className='home-drop-down-section'>
                                    <Dropdown key='1' dropdownKey='university' baseDisplay='Select University' id='home-univ-drop-down' onChange={this.onChange.bind(this)} /> 
                                    <Dropdown key='2' dropdownKey='minbed' baseDisplay='Min Bed' id='home-minbed-drop-down' onChange={this.onChange.bind(this)} />
                                    <Dropdown key='3' dropdownKey='maxbed' baseDisplay='Max Bed' id='home-maxbed-drop-down' onChange={this.onChange.bind(this)} />
                                    <Dropdown key='4' dropdownKey='minbath' baseDisplay='Min Bath' id='home-minbath-drop-down' onChange={this.onChange.bind(this)} />
                                    <Dropdown key='5' dropdownKey='maxbath' baseDisplay='Max Bath' id='home-maxbath-drop-down' onChange={this.onChange.bind(this)} />
                                    <Dropdown key='6' dropdownKey='radius' baseDisplay='Radius' id='home-radius' onChange={this.onChange.bind(this)} />
                                    <Dropdown key='7' dropdownKey='minprice' baseDisplay='Min Price' id='home-minprice-drop-down' onChange={this.onChange.bind(this)} />
                                    <Dropdown key='8' dropdownKey='maxprice' baseDisplay='Max Price' id='home-maxprice-drop-down' onChange={this.onChange.bind(this)} />
                            
                                    
                                    <button className="searchButton" onClick={this.handleClick}>
                                        Submit 
                                    </button>
                                    
                                </div>
    
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        )

    }

}