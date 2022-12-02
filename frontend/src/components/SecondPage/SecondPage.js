import React , {useEffect , useState} from 'react';
import classes from './SecondPage.module.css';
import {connect} from 'react-redux';
import NavBar from '../NavBar/NavBar';
import SearchedSimilarMovieTitle from '../SearchedSimilarMovieTitle/SearchedSimilarMovieTitle';
import {useNavigate} from 'react-router-dom';

const SecondPage = (props) => {
    const [recommendedMovies , updateRecommendedMovies] = useState([]);
    const [loading , setLoading] = useState(true);
    const navigate = useNavigate();

    // const getRecommendedMovies = async () => {
    //     try{
    //         const res = await fetch('http://127.0.0.1:5000/getRecommendedMovies');
    //         const json = await res.json();
    //         const data = await json.send_recommended_movies;
    //         if(res.status === 200){
    //             updateRecommendedMovies(data);
    //             setLoading(false);
    //         }
    //     }catch(e){
    //         console.log(e);
    //         localStorage.setItem('recommendedMoviesSet' , false);
    //     }
    // }

    

    useEffect(() => {
        if(localStorage.getItem('movieSelectedStatus') === 'false' || localStorage.getItem('recommendedMoviesSet') === 'false'){
            navigate('/');
        }else if(localStorage.getItem('recommendedMoviesSet') === null){
            navigate('/')
        }else{
            let data = JSON.parse(localStorage.getItem('recommendedMovies'));
            updateRecommendedMovies(data);
            setLoading(false);            
            // getRecommendedMovies();
            // console.log("got movies is : " , props.recommendedMovies);
        }

        localStorage.removeItem('loginError');
        
    },[loading])

    const viewClickHandler = (id) => {
        navigate(`/searchPage/${id}`);
    }


    const movies = recommendedMovies.map((movie) => {
        for(let m in movie){
            return <SearchedSimilarMovieTitle movieTitle={movie[m][0]} key={m} movieId={m} backgroundImage={movie[m][1]} loading={loading} large={true} onViewClick={viewClickHandler}/>
        }
    })

    return (
        <div className={classes.mainContainer}>
            {/* Navbar */}
            <NavBar showInputBox={true} showButtons={true} />

            {/* select 10 movies title */}
            <h1 className={classes.selectMoviesText}>Movies Recommended For You:</h1>

            {/* Grid of movies title with movie name */}
            <div className={classes.moviesContainer}>
                {movies}
            </div>

        </div>
    )
}

const mapStateToProps = state => {
    return {
        recommendedMovies : state.recommendedMovies
    }
}


export default connect(mapStateToProps)(SecondPage);
