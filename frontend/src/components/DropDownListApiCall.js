import React from "react";

export default class DropDownListApiCall extends React.Component {
  state = {
    loading: true,
    person: null
  };

  async componentDidMount() {
    const  url = 'http://demo8493610.mockable.io/universities/list';
		fetch(url)
			.then((response) => {
			  return response.json();
			})
		.then((data) => {
			  this.setState({
			    listings: data.listings
			  })
			  console.log(data);
			})
		.catch((error) => {
			  console.log("error while trying to retrieve data")
			})

		if(this.state.search)
		{
			this.searchListings()
		}	
  }

  render() {
    if (this.state.loading) {
      return <div>loading...</div>;
    }

    if (!this.state.person) {
      return <div>didn't get the university</div>;
    }

  }
}
