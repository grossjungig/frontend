import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// import App from "./App";
import UnderConstruction from './pages/UnderConstruction'

import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import authReducer from './store/auth/reducers'
import { StylesProvider } from '@material-ui/core/styles'

// TODO: Move it to Redux.
if (!localStorage.getItem("lang")) {
  localStorage.setItem("lang", "de");
}

const store = createStore(authReducer, applyMiddleware(ReduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <StylesProvider injectFirst>
        {/* 
          injectFirst?: bool - this gives priority to the component-CSS files 
          over Material UI Default stylings.
        */}
        {/* <App /> */}
        <UnderConstruction />
      </StylesProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
