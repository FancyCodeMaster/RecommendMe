import React from 'react';
import classes from './SearchBar.module.css';
import {useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';


const SearchBar = (props) => {
  const navigate = useNavigate();

  const viewClickHandler = (id) => {
    props.updateQuery("");
    navigate(`/searchPage/${id}`);
  }

  return (
    <div className={classes.mainContainer} style={props.style}>
        {/* movie 1 */}
        {(props.searchMovie.length > 0) ? props.searchMovie.map((movie) => {
          for(let m in movie){
            return <div className={classes.movieContainer} onClick={() => viewClickHandler(m)} key={m}>
            <div className={classes.imgContainer}><img className={classes.roundImage} src={movie[m][1]}></img></div>
            <h4 className={classes.movieTitle}>{movie[m][0]}</h4>
          </div>
          }
        }) : <></>}
    </div>
  )
}

const mapStateToProps = state => {
  return{
    searchClickedStatus : state.searchClickedStatus
  }
}

const mapDispatchToProps = dispatch => {
  return{
    updateSearchClicked : () => {
      return dispatch({action : 'searchMovieClicked'})
    }
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(SearchBar);
