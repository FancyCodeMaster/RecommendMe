import React , {useEffect , useState} from 'react';
import WatchListMovie from '../WatchListMovie/WatchListMovie';
import classes from './WatchList.module.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';

const WatchList = (props) => {
  const [movies , updateMovies] = useState([]);
  const [reload , updateReload] = useState(false);
  useEffect(() => {
    if(JSON.parse(localStorage.getItem('watchlist'))){
      if(movies !== JSON.parse(localStorage.getItem('watchlist'))['watchlist']){
        let movieCollections = [...JSON.parse(localStorage.getItem('watchlist'))['watchlist']];
        updateMovies(movieCollections);
        console.log(movieCollections);
      }
    }

  } , []);

  const navigate = useNavigate();

  const clearWatchList = () => {
    navigate('/watchlistTransit');
    console.log("clicked");
  }

  return (
    <div className={classes.mainContainer}>
        <div className={classes.watchListContainer}>
            <Link to="/" style={{textDecoration:'none'}}><h2 className={classes.logoTitle}>RecommendMe</h2></Link>
            <h2 className={classes.watchListHeading}>WatchList</h2>
            {/* Movies Collection */}
            {(movies.length >0) ? movies.map((m) => {
                return <WatchListMovie movieTitle={m} key={m+"123"} />
            }) : <h3 style={{color : '#e50914' , textAlign : 'center'}}>No watchlist to show</h3>}
            {(movies.length>0) ? <h3 onClick={clearWatchList} className={classes.clearWatchListButton}>Clear WatchList</h3> : <></>}
        </div>
    </div>
  )
}

const mapStateToProps = state => {
  return{
    movies : state.watchlistMovies
  }
}

export default connect(mapStateToProps)(WatchList);
