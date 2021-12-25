import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import DataProvider from "./redux/store"
import { CastContextProvider } from "./redux/castContext/CastContext"

ReactDOM.render (
  
  <Router>
  <React.StrictMode>
    <DataProvider> 
      <CastContextProvider>

      
      <App />
      </CastContextProvider>
    </DataProvider>
  </React.StrictMode>
    </Router>,
     
    
    document.getElementById('root')
);
