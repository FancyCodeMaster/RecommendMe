import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from 'react-router-dom';
import {createStore} from 'redux';
import reducer from './store/reducer';
import {Provider} from 'react-redux';
import FirstPage from './components/FirstPage/FirstPage';
import UpdateMoviesTransit from './components/updateMoviesTransit/UpdateMoviesTransit';
import SecondPage from './components/SecondPage/SecondPage';
import SearchPage from './components/SearchPage/SearchPage';
import SendSelectedMovies from './components/sendSelectedMovies/SendSelectedMovies';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import WatchList from './components/WatchList/WatchList';
import GetRecommendedMoviesTransit from './components/getRecommendedMoviesTransit/GetRecommendedMoviesTransit';
import LocalStorageRecMovies from './components/localStorageRecMovies/LocalStorageRecMovies';
import SignUpTransit from './components/SignUp/SignUpTransit';
import SignInTransit from './components/SignIn/SignInTransit';
import WatchListTransit from './components/WatchList/WatchListTransit';

const router = createBrowserRouter([
  {
    path : '/',
    element : <FirstPage />,
  },
  {
    path : '/updateMoviesTransit',
    element : <UpdateMoviesTransit />
  },
  {
    path : '/sendSelectedMovies',
    element : <SendSelectedMovies />
  },
  {
    path : '/getRecommendedMoviesTransit',
    element : <GetRecommendedMoviesTransit />
  },
  {
    path : '/localStorageRecMovies',
    element : <LocalStorageRecMovies />
  },
  {
    path : '/secondPage',
    element : <SecondPage />
  },
  {
    path : '/searchPage/:id',
    element : <SearchPage />
  },
  {
    path : '/signIn',
    element : <SignIn />
  },
  {
    path : '/signInTransit',
    element : <SignInTransit />
  },
  {
    path : '/signUp',
    element : <SignUp />
  },
  {
    path : '/signUpTransit',
    element : <SignUpTransit />
  },
  {
    path : '/watchList',
    element : <WatchList />
  },
  {
    path : '/watchlistTransit',
    element : <WatchListTransit />
  }
]);

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
