import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import allReducers from './reducers';

import {rootSaga} from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const storiesStore = createStore(
  allReducers,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
    )
  
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store = {storiesStore}>
    <App />
  </Provider>,
  document.getElementById('root')
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
