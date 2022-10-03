import React from 'react';
import ReactDOM from 'react-dom';
//import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { render } from "react-dom";

//ReactDOM.render(<App />, document.getElementById('root'));


import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './authContext';


//const root = ReactDOM.createRoot(document.getElementById('root'));



//const root = ReactDOM.render(<App />, document.getElementById('root'));


/*
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);*/


//const root = document.getElementById('root');
//render(<App />, root);



ReactDOM.render(
  <React.StrictMode>

    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>

  </React.StrictMode>,
  document.getElementById("root")
);

