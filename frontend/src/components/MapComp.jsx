import React, { useState } from 'react';
import {
  GoogleMap, 
  withScriptjs, 
  withGoogleMap, 
  Marker,
  InfoWindow
} from "react-google-maps";



function Map(data) {
  console.log('Map data', data)
  var parksData = data.listings || [];
  var crime_data = typeof data.parentProps !== 'undefined' ? data.parentProps.crime_scores : {};
  var walk_score = typeof data.parentProps !== 'undefined' ? data.parentProps.walk_scores : {};
  const [selectedPark, setSelectedPark] = useState(null);

  return(
     <GoogleMap 
     defaultZoom={10}
      zoom = {15} 
      center = {{lat: data.lat, lng: data.lng}}
      >

    <Marker
      position = {{
        lat: data.lat,
        lng: data.lng
      }}  
      icon={{
        url: require('../styles/university.png')
      }}
      />

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
    {selectedPark &&
        selectedPark.recommendation.map(reco =>(
          <Marker 
          position = {{
            lat: reco.loc.coordinates[1],
            lng: reco.loc.coordinates[0]
          }}
          icon={{
            url: require('../styles/bar-pin.png')
          }}
          />
        ))     
      }
      {selectedPark &&
        selectedPark.school.map(reco =>(
          <Marker 
          position = {{
            lat: reco.loc.coordinates[1],
            lng: reco.loc.coordinates[0]
          }}
          icon={{
            url: require('../styles/school.png')
          }}
          />
        )) 
      }
{selectedPark && (
      <InfoWindow
      maxWidth = '200'
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
  </GoogleMap>  
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));


export default function MapComp(props) {

  var univ_lat = typeof props.data !== 'undefined' ? props.data.loc[1]: 39.5501;
  var univ_lng = typeof props.data !== 'undefined' ? props.data.loc[0]: -105.7821;
  
  
  return (
    <div style = {{width: '55vw' , height: '75vh'}}>
      <WrappedMap 
      googleMapURL = {'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDBOEkOwM6YnGA6DWHVRQSs83N35hv9fRY'}
      loadingElement = {<div style = {{height: '100%'}} />}
      containerElement = {<div style = {{height: '100%'}} />}
      mapElement = {<div style = {{height: '100%'}} />}
      parentProps={props.data}
      listings={props.listings}
      lat={univ_lat}
      lng={univ_lng}
      />
    </div>
  );
  }