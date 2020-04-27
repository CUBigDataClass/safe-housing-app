import React, { useState } from 'react';
import {
  GoogleMap, 
  withScriptjs, 
  withGoogleMap, 
  Marker,
  InfoWindow
} from "react-google-maps";



function Map(data) {
  var parksData = data.listings || [];
  var crime_data = typeof data.parentProps !== 'undefined' ? data.parentProps.crime_scores : {};
  var walk_score = typeof data.parentProps !== 'undefined' ? data.parentProps.walk_scores : {};

  const [selectedPark, setSelectedPark] = useState(null);

  return(
     <GoogleMap 
  defaultZoom = {10} 
  defaultCenter = {{lat: 45.421532, lng: -75.697189}}
   
  >
    {parksData.map(park =>(
      <Marker
      key = {park.listing_id} 
      position = {{
        lat: park.loc.coordinates[1],
        lng: park.loc.coordinates[0]
      }}  
      onClick = {() => { 
        setSelectedPark(park);
      }}

      />
    ))}
{selectedPark && (
      <InfoWindow
      position = {{
        lat: selectedPark.loc.coordinates[1],
        lng: selectedPark.loc.coordinates[0]
      }} 
      onCloseClick={() =>{
        setSelectedPark(null);
      }} 
      >
        <div>
          <h2>{selectedPark.name}</h2>
          <p>
            Price:{selectedPark.short_price} &nbsp;
            Sqft:{selectedPark.sqft} &nbsp;
            Bed:{selectedPark.beds} &nbsp;
            Bath:{selectedPark.baths} &nbsp;
          </p>
          <h3>
            Crime Index: {crime_data.crime_index} &nbsp;
            Safety Index: {crime_data.safety_index}
          </h3>
          <h3>
            Transit Score: {walk_score.transit_score} &nbsp;
            Walk Score: {walk_score.walk_score}
          </h3>
        </div>
      </InfoWindow>
    )}

{console.log(selectedPark)}
  </GoogleMap>  
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));


export default function MapComp(props) {
  return (
    <div style = {{width: '58vw' , height: '125vh'}}>
      <WrappedMap 
      googleMapURL = {'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDBOEkOwM6YnGA6DWHVRQSs83N35hv9fRY'}
      loadingElement = {<div style = {{height: '100%'}} />}
      containerElement = {<div style = {{height: '100%'}} />}
      mapElement = {<div style = {{height: '100%'}} />}
      parentProps={props.data}
      listings={props.listings}
      />
    </div>
  );
  }