import React,{Component} from 'react';

export default class DropDown extends Component {
  

  constructor(props){
    super(props);
    this.state = {
      options: []
    };

  }

  onchange(event){
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    this.props.onChange(fieldName, fieldValue);
  }

  

  componentDidMount() {

  if(this.props.dropdownKey === 'university')
  {
    fetch(
      "http://demo8493610.mockable.io/universities/list"
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        let optionsFromApi = data["universities"].map(team => {
          return { value: team.name, display: team.name };
        });
        this.setState({
          options: [
            {
              value: "",
              display: this.props.baseDisplay
            }
          ].concat(optionsFromApi)
        });
      })
      .catch(error => {
        console.log(error);
      });
    }
    else if(['minbath', 'maxbath', 'minbed', 'maxbed', 'radius'].includes(this.props.dropdownKey))
    {
      var customOptions = [{
        value: "",
        display: this.props.baseDisplay
      }]

      for(var i=0; i<7; i++)
        customOptions.push({value: i.toString(), display: i.toString()})

      this.setState({
        options: customOptions
      });
    }
    else if(['minprice', 'maxprice'].includes(this.props.dropdownKey))
    {
      var customOptions = [{
        value: "",
        display: this.props.baseDisplay
      }]

      for(var i=0; i<13000; i=i+1000)
        customOptions.push({value: i, display: `$${i}`})

      this.setState({
        options: customOptions
      });
    }
  }

  render() {
    return (
      <div className='drop-down-comp' id={this.props.id}>
        <select
          value={this.state.selectedValue}
          onChange={e => {

            this.setState({
              selectedValue: e.target.value,
              validationError:
                e.target.value === ""
                  ? "You must select an option"
                  : ""
            })
            this.props.onChange(this.props.dropdownKey, e.target.value);
          }
          }
        >
          {this.state.options.map(team => (
            <option
              key={team.value}
              value={team.value}
            >
              {team.display}
            </option>
          ))}
        </select>
        <div className="select-icon">
          <svg focusable="false" viewBox="0 0 104 128" width="25" height="35" className="icon">
            <path d="m2e1 95a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm0-3e1a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm0-3e1a9 9 0 0 1 -9 9 9 9 0 0 1 -9 -9 9 9 0 0 1 9 -9 9 9 0 0 1 9 9zm14 55h68v1e1h-68zm0-3e1h68v1e1h-68zm0-3e1h68v1e1h-68z"></path>
          </svg>
        </div>
        <div
          style={{
            color: "red",
            marginTop: "5px"
          }}
        >
          {this.state.validationError}
        </div>
      </div>
    );
  }
}