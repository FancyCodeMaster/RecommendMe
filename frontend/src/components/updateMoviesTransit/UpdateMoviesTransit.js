import React , {useEffect} from 'react';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';

const UpdateMoviesTransit = (props) => {
  const navigate = useNavigate();
  let obj = {
    data : `${props.movies}`
  }
  localStorage.setItem('selectedMovies' , JSON.stringify(obj));
  localStorage.setItem('moviesSelectedStatus' , props.moviesSelectedStatus);
  
  useEffect(() => {
    navigate('/sendSelectedMovies');
  })

  return (
    <div>
    </div>
  )
}

const mapStateToProps = state => {
  return{
    movies : state.likedMoviesList,
    moviesSelectedStatus : state.movieSelectedStatus
  }
}

export default connect(mapStateToProps)(UpdateMoviesTransit);

