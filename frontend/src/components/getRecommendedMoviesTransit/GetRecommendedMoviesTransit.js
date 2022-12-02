import React , {useEffect} from 'react';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

const GetRecommendedMoviesTransit = (props) => {
    const navigate = useNavigate();

    const loader = <ClipLoader
    loading={true}
    color="#fff"
    style={{position:'absolute' , top:'48%', left:'40%'}}
    />;

    const getRecommendedMovies = async () => {
        try{
            const res = await fetch('http://127.0.0.1:5000/getRecommendedMovies');
            const json = await res.json();
            const data = await json.send_recommended_movies;
            if(res.status === 200){
                props.updateRecommendedMovies(data);
                console.log("Received data is : " , data);
                localStorage.setItem("moviesSelectedStatus" , true);
                navigate("/localStorageRecMovies");
            }
        }catch(e){
            console.log(e);
            localStorage.setItem('recommendedMoviesSet' , false);
        }
    }


    useEffect(() => {
        getRecommendedMovies();
    },[])

    return (
        <div style={{position : 'relative' , height : '100vh' , backgroundColor : '#e50914'}}>
            {loader}
        </div>
    )
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return{
        updateRecommendedMovies : (movies) => {
            return dispatch({type : 'updateRecommendedMovies' , value : movies});
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(GetRecommendedMoviesTransit);
