import React , {useState , useEffect} from 'react';
import classes from './NavBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import {Link} from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import {useNavigate} from 'react-router-dom';

const NavBar = (props) => {
    const [query , updateQuery] = useState("");
    const [similarQuery , updateSimilarQuery] = useState("");

    const navigate = useNavigate();

    const viewClickHandler = (id) => {
        navigate(`/searchPage/${id}`);
    }

    const onLogOut = () => {
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        navigate("/");
    }

    const getSearchQuery = async (movieTitle) => {
        try{
            const res = await fetch(`http://127.0.0.1:5000/searchBarMovie/${movieTitle}`);
            if(res.status === 200){
                const json = await res.json();
                const data = await json.search_similar_movies;
                updateSimilarQuery(data);
                console.log(data);
            }
        }catch(e){
            updateSimilarQuery([]);
            console.log(e);
        }
    }

    useEffect(() => {
        console.log(query);

        if(query !== ""){
            getSearchQuery(query);
        }
    },[query]);
    let leftNavBars = <></>;
    if(props.showInputBox && props.showButtons){
        leftNavBars = <>
            <input type='text' className={classes.inputBox} placeholder="Search Movie Title" onChange={(e) => updateQuery(e.target.value)} onKeyDown={(e) => {
                if(e.key == 'Enter'){
                    for(let m in similarQuery[0]){
                        viewClickHandler(m);
                        updateQuery("");
                    }
                }
            }} value={query} onBlur={() => updateQuery("")} />
            <FontAwesomeIcon icon={faMagnifyingGlass} className={classes.searchIcon} style={{zIndex : '110'}} />
            {(query!=="")?<SearchBar style={{zIndex : '1'}} searchMovie={similarQuery} updateQuery={updateQuery} /> : <></>}


            <div>
                {/* if present sign in button */}
                {(localStorage.getItem('name')) ? <h4 className={classes.logoutButton} onClick={onLogOut}>Log Out</h4> : <></>}
                {(localStorage.getItem('name')) ? <h4 className={classes.signInButton}>{localStorage.getItem('name')}</h4> : <Link to='/signIn' style={{textDecoration : 'none' , color : '#fff'}}><h4 className={classes.signInButton}>Sign In</h4></Link>}

                {/* if present watchlist */}
                <Link to={(localStorage.getItem('name') !== '') ? '/watchList' : '/signIn'} style={{textDecoration : 'none' , color : '#fff'}}><h4 className={classes.watchlistButton}>Watchlist</h4></Link>
            </div></>;
    }
    return (
        <div className={classes.mainContainer}>
            {/* logo */}
            <Link to='/' style={{textDecoration : 'none'}}><h2 className={classes.logoTitle}>RecommendMe</h2></Link>

            {/* if present input box */}
            {leftNavBars}
        </div>
    )
}

export default NavBar;
