import React , {useEffect, useState} from 'react';
import classes from './SearchedSimilarMovieTitle.module.css';
import ClipLoader from 'react-spinners/ClipLoader';


const SearchedSimilarMovieTitle = (props) => {
  const lStyle = {
    border: '4px solid #e50914',
    width : '170px',
    height : '290px',
    padding: '30px',
    position: 'relative',
  };
  const [largeStyle , updateLargeStyle] = useState(lStyle);
  const loader = <ClipLoader
  loading={props.loading}
  color="#fff"
  className={classes.loader}
  />;
  
  useEffect(() => {
    if(props.large){
      updateLargeStyle({
        border: '4px solid #e50914',
        width : '170px',
        height : '300px',
        padding: '30px',
        position : 'relative'
      });
    }
  },[props.large]);

  return (
    <div className={classes.mainContainer} style={largeStyle}>
      {(props.loading)?loader : 
        <><img className={classes.movieRound} src={props.backgroundImage} />

        {/* movie title */}
        <h3 className={classes.movieTitle}>{props.movieTitle}</h3>

        <h4 className={classes.showOnHover} onClick={() => props.onViewClick(props.movieId)}>View</h4></>}
    </div>
  )
}

export default SearchedSimilarMovieTitle;
