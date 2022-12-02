import React , {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import classes from './sendSelectedMovies.module.css';

const SendSelectedMovies = () => {
    const loader = <ClipLoader
    loading={true}
    color="#fff"
    className={classes.loader}
    />;

    const navigate = useNavigate();
    let obj = JSON.parse(localStorage.getItem('selectedMovies'));
    let ids = obj["data"].split(",");
    let idList = ids.map((id) => parseInt(id));
    console.log(idList);
    const sendMovieId = async () => {
        try{
          let res = await fetch('http://127.0.0.1:5000/moviesSent' , {
            method : 'POST',
            headers : {
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify({"data" : idList}),
          });
          if(res.status === 200){
            navigate('/getRecommendedMoviesTransit');
          }
        }catch(e){
          console.log(e);
        }
      }

      useEffect(() => {
        sendMovieId();
    
        // if(localStorage.getItem('moviesSelectedStatus')){
        //   navigate('/secondPage');
        // }
      },[]);

    return (
        <div style={{height:'100vh' , backgroundColor:'#e50914' , position:'relative'}}>
          {loader}
        </div>
    )
}

export default SendSelectedMovies;
