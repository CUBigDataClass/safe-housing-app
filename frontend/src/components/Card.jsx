import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import HomeIcon from '../styles/house2.jpg';
import StarRateIcon from '@material-ui/icons/StarRate';
import '../styles/card.css';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  }
}));

export default function RecipeReviewCard(props) {
  var cardData = props.data;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }

        title={cardData.name}
        subheader={`Costs $`+ cardData.price +`, `+cardData.beds+` beds, `+cardData.baths+` baths, Listed on `+ new Date(Date.parse(cardData.list_date)).toUTCString()}
      />
      <CardMedia
        className={classes.media}
        image= {cardData.photo ? cardData.photo : HomeIcon} 
        title={cardData.name}
      />
      <CardContent>
        <Typography variant="body2" color="textPrimary" component="p">
          <h3>{`Utilities last modified: `+ new Date(Date.parse(cardData.last_update)).toUTCString()} <br/>
            {`Listing at `+cardData.name+` costs `+ cardData.short_price +`, `+cardData.beds+` beds, `+cardData.baths+` baths, Listed on `+ new Date(Date.parse(cardData.list_date)).toUTCString()}</h3>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            <div className='card-headers'>Description</div>
              <div style={{columns: '2 auto'}}>
              <div colSpan='6'>
                {`Property Rank: `+ cardData.rank} <br />
                {`Sqft: `+ cardData.sqft} <br/>
                {`Property Status: `+ cardData.prop_status} <br/>
                {cardData.is_showcase? `Up for Showing: Yes`:  `Up for Showing: No`}
              </div>

              <div colSpan='6'>
                {`Listing Source: `+ cardData.source} <br/>
                {cardData.has_leadform? `Has Lead Form: Yes `: `Has Lead Form: No`} <br/>
                {`Property Type: `+ cardData.prop_type} <br/>
                {cardData.is_showcase? `Has special utitlities: Yes`:  `Has special utitlities: No`}
              </div>
            </div>
            

          </Typography>
          <Typography paragraph>
            <div className='card-headers'>Restaurtant Recommendations</div>

            { cardData.recommendation.map((value, index) => {
              return(
                <div>
                  <div className="reco-card">
                  <div className="reco-name">
                    {value.Name}
                  </div>
                  <div className="reco-address">
                    {value.address}
                  </div>
                </div>
                  <div className="reco-rating">
                    {Array(value.Rating).fill(<StarRateIcon />)}
                  </div> 
                </div>
              )
            }          
              )}
         </Typography>

         <Typography paragraph>
            <div className='card-headers'>Elementary School Recommendations</div>
            { cardData.school.map((value, index) => {
              return(
                <div className="school-reco-card">
                  <div className="school-reco-name">
                    {value.school_name}
                  </div>
                  <div className="school-reco-address">
                    {value.street_address}
                  </div>
                  <div className="school-reco-rating">
                    {Array(value.rating).fill(<StarRateIcon />)}
                  </div>     
                </div>
              )
            }          
              )}
         </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
