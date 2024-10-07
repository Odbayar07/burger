import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { legacy_createStore as createStore} from 'redux';

import { applyMiddleware, combineReducers, compose } from "redux";
import { Provider } from "react-redux"
import { thunk } from 'redux-thunk';
import burgerReducer from './redux/reducer/burgerReducer';
import orderReducer from "./redux/reducer/orderReducer";
import signupReducer from "./redux/reducer/signupLoginReducer"

const loggerMidleware = store => {
  return next => {
    return action => {
      // console.log('Mylog', action);
      // console.log('Mylog', store.getState());
      const result = next(action);
      // console.log('Mylog', store.getState());
      return result;
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOL_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  burgerReducer,
  orderReducer,
  signupReducer
});

const middlewares = [loggerMidleware, thunk]

const store = createStore(reducers, composeEnhancers(applyMiddleware(...middlewares)));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
