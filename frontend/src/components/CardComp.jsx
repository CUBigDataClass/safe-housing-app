import React,{Component} from 'react';
import { Grid, Card, Icon, Image , Button} from 'semantic-ui-react'

const src = 'https://react.semantic-ui.com/images/wireframe/image.png'

export default class CardClass extends Component {

 
  constructor(props){
    super(props);
    this.state = {
      news:[],
    };
  }

componentDidMount() {

 const  url = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=d5cf45043cd34b59b432df10e3cef274';


  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      this.setState({
        news: data.articles
      })
      console.log(data);
    })
    .catch((error) => {
      console.log("error while trying to retrieve data")
    })
}

renderItems(){
  return this.state.news.map((item) =>(
      <Card
      	id={item.publishedAt}
        image={item.urlToImage}
        header={item.author}
        meta={item.url}
        description={item.description}
      />
  ));
}

cardSample(){
	return (
			<Card.Group itemsPerRow={4}>
			    <Card raised image={src} />
			    <Card raised image={src} />
			    <Card raised image={src} />
			    <Card raised image={src} />
			    <Card raised image={src} />
			    <Card raised image={src} />
			    <Card raised image={src} />
			    <Card raised image={src} />
			</Card.Group>
		)
}

    render() {
    	// return (
     //    <div>
     //        {this.cardSample()}
     //    </div>
     //    );

        return (
        <Card.Group itemsPerRow={2}>
            {this.renderItems()}
        </Card.Group>
        );
    }
}