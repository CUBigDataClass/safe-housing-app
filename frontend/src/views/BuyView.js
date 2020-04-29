import React from 'react';
import RecipeReviewCard from '../components/Card.jsx';
import MapComp from '../components/MapComp.jsx';
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
					maxbed:10,
					minbed: 0,
					radius: 5,
					minprice: 0,
					maxprice: 12000
				};
		this.searchListings = this.searchListings.bind(this);	
	}

	onChange(field, value) {
        // parent class change handler is always called with field name and value
        this.setState({[field]: value});
    }


	componentDidMount() {

		const queryString = window.location.search;
		console.log(queryString);
		const urlParams = new URLSearchParams(queryString.slice(1));
		const university = urlParams.get('university');
		const minbed = urlParams.get('minbed');
		const maxbed = urlParams.get('maxbed');
		const minbath = urlParams.get('minbath');
		const maxbath = urlParams.get('maxbath');
		const radius = urlParams.get('radius');
		const minprice = urlParams.get('minprice');
		const maxprice = urlParams.get('maxprice');
		this.setState({
			university: university || 'Arizona State University',
			minbath: minbath ? minbath: this.state.minbath,
			maxbath: maxbath ? maxbath: this.state.maxbath,
			minbed: minbed ? minbed: this.state.minbed,
			maxbed: maxbed ? maxbed: this.state.maxbed,
			radius: radius ? radius: this.state.radius,
			minprice: minprice ? minprice: this.state.minprice,
			maxprice: maxprice ? maxprice: this.state.maxprice
		})

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
						<Dropdown key='1' dropdownKey='university' baseDisplay='Select University' id='univ-drop-down' onChange={this.onChange.bind(this)} selectedValue={this.state.university}/> 
						<Dropdown key='2' dropdownKey='minbed' baseDisplay='Min Bed' id='minbed-drop-down' onChange={this.onChange.bind(this)} selectedValue={this.state.minbed}/>
						<Dropdown key='3' dropdownKey='maxbed' baseDisplay='Max Bed' id='maxbed-drop-down' onChange={this.onChange.bind(this)} selectedValue={this.state.maxbed}/>
						<Dropdown key='4' dropdownKey='minbath' baseDisplay='Min Bath' id='minbath-drop-down' onChange={this.onChange.bind(this)} selectedValue={this.state.minbath}/>
						<Dropdown key='5' dropdownKey='maxbath' baseDisplay='Max Bath' id='maxbath-drop-down' onChange={this.onChange.bind(this)} selectedValue={this.state.maxbath}/>
						<Dropdown key='6' dropdownKey='radius' baseDisplay='Radius' id='radius' onChange={this.onChange.bind(this)} selectedValue={this.state.radius}/>
						<Dropdown key='7' dropdownKey='minprice' baseDisplay='Min Price' id='minprice-drop-down' onChange={this.onChange.bind(this)} selectedValue={this.state.minprice}/>
						<Dropdown key='8' dropdownKey='maxprice' baseDisplay='Max Price' id='maxprice-drop-down' onChange={this.onChange.bind(this)} selectedValue={this.state.maxprice}/>
				
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

