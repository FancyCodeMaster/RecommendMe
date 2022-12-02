import React from 'react';
import classes from './WatchListMovie.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const WatchListMovie = (props) => {
  return (
    <div className={classes.movieContainer}>
        {/* movie name */}
        <p className={classes.movieName}>{props.movieTitle}</p>

        {/* bin to remove movies */}
        <FontAwesomeIcon icon="fa-solid fa-trash" className={classes.trashIcon} />
    </div>
  )
}

export default WatchListMovie;
