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
                  "(Select your university)"
              }
            ].concat(teamsFromApi)
          });
        })
        .catch(error => {
          console.log(error);
        });
    }

// render() {
//   return (
//     <div className="container">
//       <h1 style={{ textAlign: 'center' }}>
//         <span role="img" aria-label="University projector">
//           🎥
//         </span>
//       </h1>
//       <DropDownSearch title="Select University" items={this.state.teams}/>
//     </div>
//   );

render() {
  return (
    <div className="container">
      <select
        value={this.state.selectedTeam}
        onChange={e =>
          this.setState({
            selectedTeam: e.target.value,
            validationError:
              e.target.value === ""
                ? "You must select your university"
                : ""
          })
        }
      >
        {this.state.teams.map(team => (
          <option
            key={team.value}
            value={team.value}
          >
            {team.display}
          </option>
        ))}
      </select>
      <div
        style={{
          color: "white",
          marginTop: "5px"
        }}
      >
        {this.state.validationError}
      </div>
    </div>
  );

  }
}
