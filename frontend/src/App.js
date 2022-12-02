import React from 'react';
import './App.module.css';

import {Route} from 'react-router-dom';

import FirstPage from './components/FirstPage/FirstPage';

const App = () => {
  return(
    <Route path='/' exact component={FirstPage} />
  );
}

export default App;
