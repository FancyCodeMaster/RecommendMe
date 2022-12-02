import React , {useEffect , useState} from 'react';
import classes from './SearchPage.module.css';
import NavBar from '../NavBar/NavBar';
import SearchMovieTitle from '../SearchMovieTitle/SearchMovieTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronCircleLeft , faChevronCircleRight} from '@fortawesome/free-solid-svg-icons';
import SearchedSimilarMovieTitle from '../SearchedSimilarMovieTitle/SearchedSimilarMovieTitle';
import {connect} from 'react-redux';
import {useParams , useNavigate} from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const SearchPage = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const {id} = params;
  // console.log("params" , id);
  // console.log("params type" , typeof(id));

  const [currentMovieInfo , updateCurrentMovieInfo] = useState([]);
  const [loading , updateLoading] = useState(true);

  const loader = <ClipLoader
    loading={true}
    color="#fff"
    style={{position:'absolute' , top:'48%', left:'40%'}}
    />;

  const giveIdDetails = async (id) => {
    try{
      const res = await fetch(`http://127.0.0.1:5000/giveIdDetails/${parseInt(id)}`);
      const json = await res.json();
      const data = await json.movie_details;
      if(res.status === 200){
        updateCurrentMovieInfo(data);
        updateLoading(false);
      }
    }catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    if(localStorage.getItem('recommendedMoviesSet') === null || localStorage.getItem('recommendedMoviesSet') === 'false'){
      navigate('/');
    }

    giveIdDetails(id);
  },[id]);

  const viewClickHandler = (id) => {
    navigate(`/searchPage/${id}`);
  }

  return (
    <div className={classes.mainContainer}>
            {/* Navbar */}
            <NavBar showInputBox={true} showButtons={true} />

            {/* movie content after search */}
                {/* movie name */}
                {/* movie overview */}
                {/* movie image */}
                {/* watchlist button */}
            {/* {JSON.parse(localStorage.getItem("recommendedMovies"))?JSON.parse(localStorage.getItem("recommendedMovies")) */}
            {(loading) ? loader :  (currentMovieInfo.length!== 0) ? currentMovieInfo.map((movie) => {
              for(let m in movie){
                if(parseInt(id) === parseInt(m)){
                  return <React.Fragment key={m}>
                  <div className={classes.searchedMovieContainer}>
                  <SearchMovieTitle movieTitle={movie[m][0]} key={m} movieId={m} backgroundImage={movie[m][1]} overview={movie[m][3]} genres={movie[m][4]} imdbScore={movie[m][2]} />
                  </div>

                  {/* Similar Movies as above */}
                  <h2 className={classes.similarMoviesHeading}>Similar Movies as above:</h2>

                  <div className={classes.searchedRecommendedMoviesContainer}>
                    {/* <FontAwesomeIcon icon={faChevronCircleLeft} className={classes.leftIcon} />
                    <FontAwesomeIcon icon={faChevronCircleRight} className={classes.rightIcon} /> */}
                    {movie[m][5].map((obj) => {
                      for(let id in obj){
                        return <SearchedSimilarMovieTitle key={id} movieId={id} movieTitle={obj[id][0]} backgroundImage={obj[id][1]} onViewClick={viewClickHandler} />
                      }
                    })}
                  </div>
                  </React.Fragment>
                }
              }
            }):<h2>Movie Not Loaded</h2>}
            
        </div>
  )
}

const mapStateToProps = state => {
  return {
    recommendedMovies : state.recommendedMovies
  }
}

const mapDispatchToProps = dispatch => {
  return{

  }
}

export default connect(mapStateToProps , mapDispatchToProps)(SearchPage);
