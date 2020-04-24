import React, { useState } from 'react';
import {
  GoogleMap, 
  withScriptjs, 
  withGoogleMap, 
  Marker,
  InfoWindow
} from "react-google-maps";
import * as parksData from "./skateboard-parks.json";



function Map() {
  const [selectedPark, setSelectedPark] = useState(null);
  return(
     <GoogleMap 
  defaultZoom = {10} 
  defaultCenter = {{lat: 45.421532, lng: -75.697189}}
   
  >
    {parksData.features.map(park =>(
      <Marker 
      key = {park.properties.PARK_ID} 
      position = {{
        lat: park.geometry.coordinates[1],
        lng: park.geometry.coordinates[0]
      }}  
      onClick = {() => { 
        setSelectedPark(park);
      }}
      icon = {{
        url: '/skateboarding.svg',
        scaledSize: new window.google.maps.Size(25,25)
      }}
      />
    ))}
{selectedPark && (
      <InfoWindow
      position = {{
        lat: selectedPark.geometry.coordinates[1],
        lng: selectedPark.geometry.coordinates[0]
      }} 
      onCloseClick={() =>{
        setSelectedPark(null);
      }} 
      >
        <div>
          <h2>{selectedPark.properties.NAME}</h2>
          <p>{selectedPark.properties.DESCRIPTIO}</p>
        </div>
      </InfoWindow>
    )}
  </GoogleMap>  
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));


export default function MapComp() {
	return (
	  <div style = {{width: '58vw' , height: '125vh'}}>
			<WrappedMap 
			googleMapURL = {'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDBOEkOwM6YnGA6DWHVRQSs83N35hv9fRY'}
			loadingElement = {<div style = {{height: '100%'}} />}
			containerElement = {<div style = {{height: '100%'}} />}
			mapElement = {<div style = {{height: '100%'}} />}
			/>
	  </div>
	);
  }
  