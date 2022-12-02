import React , {useEffect , useState} from 'react';
import MovieTitle from '../MovieTitle/MovieTitle';
import NavBar from '../NavBar/NavBar';
import classes from './FirstPage.module.css';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';

const FirstPage = (props) => {
    const navigate = useNavigate();
    const [topMovies , updateTopMovies] = useState([]);
    const [loading , setLoading] = useState(true);
    const getJson = async () => {
        try{
            const res = await fetch('http://127.0.0.1:5000');
            const data = await res.json();
            const movies = await data.top_18_movies;
            if(res.status === 200){
                updateTopMovies(movies);
                setLoading(false);
            }
        }catch(e){
            console.log(e);
        }
    }
    useEffect(() => {
        getJson();
        console.log(typeof(localStorage.getItem('moviesSelectedStatus')));
        if(localStorage.getItem('moviesSelectedStatus') === 'true'){
            navigate('/secondPage');
        }
    },[])

    let moviesList = [];
    const getSelectedMoviesId = (mId) => {
        moviesList.push(mId);
        if(moviesList.length === 10){
            props.updateMovies(moviesList);
            props.moviesSelectedStatus();
            navigate("/updateMoviesTransit");
        }
        console.log(moviesList);
    }


    const movies = topMovies.map((movie) => {
        for(let m in movie){
            return <MovieTitle movieTitle={movie[m][0]} key={m} movieId={m} backgroundImage={movie[m][1]} onButtonClick={getSelectedMoviesId} loading={loading}/>
        }
    })



    return(
        <div className={classes.mainContainer}>
            {/* Navbar */}
            <NavBar showInputBox={false} showButtons={false} />

            {/* select 10 movies title */}
            <h1 className={classes.selectMoviesText}>Select 10 Movies You Like:</h1>

            {/* Grid of movies title with movie name */}
            <div className={classes.moviesContainer}>
                {movies}
            </div>

        </div>
    );
}

const mapStateToProps = state => {
    return {
        moviesList : state.likedMoviesList,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        updateMovies : (moviesList) => {
            return dispatch({type : 'SELECTED_MOVIES_LIST' , moviesList : moviesList});   
        },
        moviesSelectedStatus : () => {
            return dispatch({type : 'MOVIES_SELECTED_STATUS'});
        }
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(FirstPage);