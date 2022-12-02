const initialState = {
    likedMoviesList : [],
    moviesSelectedStatus : false,
    recommendedMovies : [],
    searchMovieClicked : false,
    signUpEmail : "",
    signUpName : "",
    signUpPassword : "",
    logInEmail : "",
    logInPassword : "",
    watchlistMovies : []
}

const reducer = (state = initialState , action) => {
    if(action.type === 'SELECTED_MOVIES_LIST'){
        return{
            ...state,
            likedMoviesList : [...action.moviesList]
        }
    }
    if(action.type === 'MOVIES_SELECTED_STATUS'){
        return{
            ...state,
            moviesSelectedStatus : true
        }
    }
    if(action.type === "updateRecommendedMovies"){
        return{
            ...state,
            recommendedMovies : [...action.value]
        }
    }
    if(action.type === 'searchMovieClicked'){
        return{
            ...state,
            searchMovieClicked : true
        }
    }
    if(action.type === 'signUp'){
        return{
            ...state,
            signUpEmail : action.signUpEmail,
            signUpName : action.signUpName,
            signUpPassword : action.signUpPassword
        }
    }
    if(action.type === 'logIn'){
        return{
            ...state,
            logInEmail : action.logInEmail,
            logInPassword : action.logInPassword
        }
    }
    if(action.type === 'updateWatchList'){
        return{
            ...state,
            watchlistMovies : [...action.watchlistMovies]
        }
    }
    return state;
}

export default reducer;