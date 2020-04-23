import React from 'react';
import RecipeReviewCard from '../components/Card.jsx';
import DesktopNavBar from '../components/DesktopNavBar.jsx';
import CardClass from '../components/CardComp.jsx';
import SplitPane from 'react-split-pane';
import MapComp from '../components/MapComp.jsx';
import ScrollArea from 'react-scrollbar';
import '../styles/main.css';

//Import nav bars and css files 

const BuyView = (props) => (
	<div>

		  <div className='map-main-div'>
		  	<MapComp/>
		  </div>
	
		  <div className='card-main-div'>
		  	<RecipeReviewCard/>
		  	<RecipeReviewCard/>
		  	<RecipeReviewCard/>
		  	<RecipeReviewCard/>
		  </div>
	</div>
		 
		
)

export default BuyView;