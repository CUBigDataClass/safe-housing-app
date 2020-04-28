import React from 'react';
import {useHistory, Link, Router} from 'react-router-dom';
import '../styles/home.css';
import MiddleHomeSection from './MiddleHomeSection.jsx';
import InfoFooter from './InfoFooter.jsx';
import Footer from './Footer.jsx';
import Dropdown from '../components/DropdownComp.jsx';
import BuyView from '../views/BuyView';
import { BrowserRouter } from 'react-router-dom';
import {browserHistory} from 'react-router';


export default class Home extends React.Component {

	constructor(props){
		super(props);
        this.state = {
        
        }
        this.handleClick = this.handleClick.bind(this);
    }


    onChange(field,value) {
        // console.log(field)
        // console.log(value)
        // parent class change handler is always called with field name and value
        // this.setState({[field]: value});
        // var x = this.state.university
        // console.log(x)
        
        this.setState({
            [field]:value
        })
    }
    handleClick = () => {
        console.log("inside handle click")
        console.log(this.state)

        var url = '?university=' + this.state.university +'&minbed=' +this.state.minbed +'&maxbed=' +this.state.maxbed + '&minbath=' +this.state.minbath + '&maxbath=' +this.state.maxbath + '&radius=' +this.state.radius + '&minprice=' +this.state.minprice + '&maxprice=' +this.state.maxprice
        console.log(url) 

        // let url = new URL('localhost:3000/buy');
        // let params = new URLSearchParams(url);
        // console.log(params);

        // let x = params.append('university',5);
        // console.log('testing');
        // console.log(x);
        browserHistory.push(
            {
                pathname: '/buy',
                search: url,
                state: {some: 'state'}
                
    })
}

    //Probably need to pass down image from api or amazon on props and set image here
    
    render(){
        console.log(this.state.minbed)
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
                                    <Dropdown key='1' dropdownKey='university' baseDisplay='Select University' id='home-univ-drop-down' onChange={this.onChange.bind(this)}/> 
                                    <Dropdown key='2' dropdownKey='minbed' baseDisplay='Min Bed' id='home-minbed-drop-down' onChange={this.onChange.bind(this)}/>
                                    <Dropdown key='3' dropdownKey='maxbed' baseDisplay='Max Bed' id='home-maxbed-drop-down' onChange={this.onChange.bind(this)}/>
                                    <Dropdown key='4' dropdownKey='minbath' baseDisplay='Min Bath' id='home-minbath-drop-down' onChange={this.onChange.bind(this)}/>
                                    <Dropdown key='5' dropdownKey='maxbath' baseDisplay='Max Bath' id='home-maxbath-drop-down' onChange={this.onChange.bind(this)}/>
                                    <Dropdown key='6' dropdownKey='radius' baseDisplay='Radius' id='home-radius' onChange={this.onChange.bind(this)}/>
                                    <Dropdown key='7' dropdownKey='minprice' baseDisplay='Min Price' id='home-minprice-drop-down' onChange={this.onChange.bind(this)}/>
                                    <Dropdown key='8' dropdownKey='maxprice' baseDisplay='Max Price' id='home-maxprice-drop-down' onChange={this.onChange.bind(this)}/>
                            
                                    
                                    {/* <a className="searchButton" href='/buy?univ=abc'>
                                        Submit  */}
                                    {/* </a> */}
                                    {/* <BrowserRouter> */}
                                    {/* <Link to ={{
                                        pathname: '/buy',
                                        aboutProps:{
                                            name: "akash"
                                        }
                                    }}>Submit</Link>
                                    </BrowserRouter> */}
                                    <button onClick={this.handleClick} type="button">Submit</button>
                                    
                                </div>
    
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        )

    }

}