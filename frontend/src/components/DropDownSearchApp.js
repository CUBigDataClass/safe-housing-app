import React,{Component} from 'react';
import '../styles/DropDownListStyle.css';
import DropDownSearch from './DropDownSearch.js';
import './DropDownListApiCall.js'

export default class FavouriteTeam extends Component {
    state = {
      teams: [],
      selectedTeam: "",
      validationError: ""
    };
  
    componentDidMount() {
      fetch(
        "http://demo8493610.mockable.io/universities/list"
      )
        .then(response => {
          return response.json();
        })
        .then(data => {
          let teamsFromApi = data["universities"].map(team => {
            return { value: team.name, display: team.value };
          });
          this.setState({
            teams: [
              {
                value: "",
                display:
                  "(Select your favourite team)"
              }
            ].concat(teamsFromApi)
          });
        })
        .catch(error => {
          console.log(error);
        });
    }

render() {
  return (
    <div className="container">
      <h1 style={{ textAlign: 'center' }}>
        <span role="img" aria-label="University projector">
          🎥
        </span>
      </h1>
      <DropDownSearch title="Select University" items={this.state.teams}/>
    </div>
  );
  }
}
