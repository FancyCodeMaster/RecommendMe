import React , {useState} from 'react';
import classes from './SearchMovieTitle.module.css';
import {useNavigate} from 'react-router-dom';
import {connect} from 'react-redux';

const SearchMovieTitle = (props) => {
  const navigate = useNavigate();
  const [clickWatchList , updateClickWatchList] = useState('+ Add To WatchList');
  return (
    <div className={classes.mainContainer}>
        <div className={classes.searchedMovieContainer}>
            {/* movie image round */}
            <div className={classes.imageContainer}>
                <img className={classes.movieRound} src={props.backgroundImage}  />
            </div>


            {/* movie details */}
            <div className={classes.movieDetails}>
                {/* movie name */}
                <h2 className={classes.movieName}>{props.movieTitle?props.movieTitle:"Movie Name"}</h2>
                {/* genres */}
                <div className={classes.genresList}>
                    {JSON.parse(props.genres.replace(/'/g , '"')).map((g) => <span key={g+"abc"}>{g}</span>)}
                    Imdb Score : <span>{props.imdbScore}</span>
                    {/* <span>Comedy</span>
                    <span>Thriller</span>
                    <span>Sci-fi</span>
                    <span>Romantic</span> */}
                </div>
                {/* movie overview */}
                <p className={classes.movieOverview}>
                  {props.overview}
                </p>
                {/* watchlist button */}
                <button className={classes.watchListButton} onClick={() => {
                  if(localStorage.getItem('name')){
                    updateClickWatchList('Added');
                    let movies = [];
                    if(localStorage.getItem('watchlist')){
                      movies = JSON.parse(localStorage.getItem('watchlist'))['watchlist'];
                    }
                    movies.push(props.movieTitle);
                    let moviesSet = new Set(movies);
                    console.log("Movies Set" , moviesSet);
                    let newMovies = [...moviesSet];
                    localStorage.setItem('watchlist' , JSON.stringify({'watchlist' : newMovies}));
                  }else{
                    navigate('/signIn');
                  }
                }}>{clickWatchList}</button>
            </div>
        </div>

        {/* similar recommended movies */}
    </div>
  )
}

const mapStateToProps = state => {
  return{

  }
}

const mapDispatchToProps = dispatch => {
  return{
    updateWatchList : (movies) => {
      return dispatch({type:'updateWatchList' , watchlistMovies : movies});
    }
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(SearchMovieTitle);
