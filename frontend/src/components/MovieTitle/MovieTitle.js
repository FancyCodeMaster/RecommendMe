import React , {useState} from 'react';
import classes from './MovieTitle.module.css';
import {connect} from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';

const MovieTitle = (props) => {
  let [selectText , updateSelectText] = useState('Click To Select');
  let [styleOnButtonClick , updateStyleOnButtonClick] = useState({});
  let [afterClickStyle , updateAfterClickStyle] = useState({});

  const changeTextOnButtonClick = () => {
      updateSelectText('Selected');

      // change the hover style
      updateStyleOnButtonClick({
        border: '4px solid #fff',
        backgroundColor: '#000',
        opacity: '0.6',
      });

      updateAfterClickStyle({
        display : 'none'
      })

  }

  const loader = <ClipLoader
  loading={props.loading}
  color="#fff"
  className={classes.loader}
  />;
  return (
    <div className={classes.mainContainer} style={styleOnButtonClick}>
        {/* movie image round */}
        {(props.loading)?loader : 
        <><img className={classes.movieRound} src={props.backgroundImage} />

        <h3 className={classes.movieTitle}>{props.movieTitle}</h3>

        <h4 className={classes.showOnHover} onClick={() => {
          changeTextOnButtonClick();
          props.onButtonClick(props.movieId);
        }} style={afterClickStyle}>{selectText}</h4></>}
    </div>
  )
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return{
    
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(MovieTitle);
