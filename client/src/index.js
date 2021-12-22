import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import DataProvider from "./redux/store"

ReactDOM.render (
  
  <Router>
  <React.StrictMode>
    <DataProvider> 
      <App />
    </DataProvider>
  </React.StrictMode>
    </Router>,
     
    
    document.getElementById('root')
);
