import React, {Component} from 'react';
import RecipeReviewCard from '../components/Card.jsx';
import DesktopNavBar from '../components/DesktopNavBar.jsx';
import CardClass from '../components/CardComp.jsx';
import SplitPane from 'react-split-pane';
import MapComp from '../components/MapComp.jsx';
import ScrollArea from 'react-scrollbar';
import '../styles/main.css';
import Dropdown from '../components/DropdownComp.jsx';



export default class BuyView extends React.Component {

	constructor(props){
		super(props);
				this.state = {
				  	listings:[],
					university: props.searchText || 'Arizona State University',
					minbath: 0,
					maxbath:10,
					minbath: 0,
					maxbath:10,
					minbath: 0,
					maxbath:10,
					radius: 5,
				};
		this.searchListings = this.searchListings.bind(this);
		// this.setUnivSelectedVal = this.setUnivSelectedVal.bind(this);
		// this.setMinBedSelectedVal = this.setMinBedSelectedVal.bind(this);
		// this.setMaxBedSelectedVal = this.setMaxBedSelectedVal.bind(this);
		// this.setMinBathSelectedVal = this.setMinBathSelectedVal.bind(this);
		// this.setMaxBathSelectedVal = this.setMaxBathSelectedVal.bind(this);
		// this.setRadiusSelectedVal = this.setRadiusSelectedVal.bind(this);
		// this.setMinPriceSelectedVal = this.setMinPriceSelectedVal.bind(this);
		// this.setMaxPriceSelectedVal = this.setMaxPriceSelectedVal.bind(this);
	
	}

	onChange(field, value) {
        // parent class change handler is always called with field name and value
        this.setState({[field]: value});
    }

	// setUnivSelectedVal(val)
	// {
	// 	this.setState({
	// 		university: val
	// 	})
	// }

	// setMinBedSelectedVal(val)
	// {
	// 	this.setState({
	// 		minbed: val
	// 	})
	// }

	// setMaxBedSelectedVal(val)
	// {
	// 	this.setState({
	// 		maxbed: val
	// 	})
	// }

	// setMinBathSelectedVal(val)
	// {
	// 	this.setState({
	// 		minbath: val
	// 	})
	// }

	// setMaxBathSelectedVal(val)
	// {
	// 	this.setState({
	// 		maxbath: val
	// 	})
	// }

	// setRadiusSelectedVal(val)
	// {
	// 	this.setState({
	// 		radius: val
	// 	})
	// }

	// setMinPriceSelectedVal(val)
	// {
	// 	this.setState({
	// 		minprice: val
	// 	})
	// }

	// setMaxPriceSelectedVal(val)
	// {
	// 	this.setState({
	// 		maxprice: val
	// 	})
	// }



	componentDidMount() {

		// const  url = 'http://demo8493610.mockable.io/universities/list';
		// fetch(url)
		// 	.then((response) => {
		// 	  return response.json();
		// 	})
		// .then((data) => {
		// 	  this.setState({
		// 	    universities: data.universities
		// 	  })
		// 	})
		// .catch((error) => {
		// 	  console.log("error while trying to retrieve data")
		// 	})

	}

	searchListings() {
		console.log("Need to search")
		console.log(this.state)
	    const requestOptions = {
	        method: 'POST',
	        mode: 'cors',
	        headers: { 'Content-Type': 'application/json'}
	    };
		const  url = `http://10.0.0.71:5000/university/fetch?uni_name=${this.state.university}&baths_max=${this.state.maxbath}&baths_min=${this.state.minbath}&beds_max=${this.state.maxbed}&beds_min=${this.state.minbed}&price_max=${this.state.maxprice}&price_min=${this.state.minprice}&radius=${this.state.radius}`;
		var self = this;
		fetch(url, requestOptions)
			.then((response) => {
			  return response.json();
			})
		.then((data) => {
			  console.log(data);
			  self.setState({
			    listings: data.properties,
			    data: data
			  })
			})
		.catch((error) => {
			  console.log(error);
			})
	  };



	render() {
		return (
			<div id='buy-view'>
				<div className='map-main-div'>
					<div className='drop-down-section'>
						<Dropdown key='1' dropdownKey='university' baseDisplay='Select University' id='univ-drop-down' onchange={this.setUnivSelectedVal} onChange={this.onChange.bind(this)}/> 
						<Dropdown key='2' dropdownKey='minbed' baseDisplay='Min Bed' id='minbed-drop-down' onchange={this.setMinBedSelectedVal} onChange={this.onChange.bind(this)}/>
						<Dropdown key='3' dropdownKey='maxbed' baseDisplay='Max Bed' id='maxbed-drop-down' onchange={this.setMaxBedSelectedVal} onChange={this.onChange.bind(this)}/>
						<Dropdown key='4' dropdownKey='minbath' baseDisplay='Min Bath' id='minbath-drop-down' onchange={this.setMinBathSelectedVal} onChange={this.onChange.bind(this)}/>
						<Dropdown key='5' dropdownKey='maxbath' baseDisplay='Max Bath' id='maxbath-drop-down' onchange={this.setMaxBathSelectedVal} onChange={this.onChange.bind(this)}/>
						<Dropdown key='6' dropdownKey='radius' baseDisplay='Radius' id='radius' onchange={this.setRadiusSelectedVal} onChange={this.onChange.bind(this)}/>
						<Dropdown key='7' dropdownKey='minprice' baseDisplay='Min Price' id='minprice-drop-down' onchange={this.setMinPriceSelectedVal} onChange={this.onChange.bind(this)}/>
						<Dropdown key='8' dropdownKey='maxprice' baseDisplay='Max Price' id='maxprice-drop-down' onchange={this.setMaxPriceSelectedVal} onChange={this.onChange.bind(this)}/>
				
						<button className='searchButtonBuyView' onClick={this.searchListings}> Submit </button>
					</div>
					<MapComp listings={this.state.listings} data={this.state.data}/>
				</div>
				<div className='card-main-div'>
				{ this.state.listings.map((value, index) => {
					return <RecipeReviewCard key={index} data={value}/>
					})}
				</div>
			</div>
			);
		}
}

