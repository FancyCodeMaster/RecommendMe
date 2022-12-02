import React , {useEffect} from 'react';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';

const LocalStorageRecMovies = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        let movies = JSON.parse("[]");
        // let movies = JSON.parse(localStorage.getItem("[]"));
        for(let item of props.data){
            movies.push(item);
        }
        console.log("movies got data" , props.data);
        localStorage.setItem("recommendedMovies" , JSON.stringify(movies));
        localStorage.setItem('recommendedMoviesSet' , true);
        navigate("/secondPage");
    },[])

    return (
        <div>
        
        </div>
    )
}

const mapStateToProps = state => {
    return{
        data : state.recommendedMovies
    }
}

export default connect(mapStateToProps)(LocalStorageRecMovies);
