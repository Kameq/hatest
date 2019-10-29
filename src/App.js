import React, { useEffect } from 'react';
import './App.css';

import ChartView from './Views/ChartView';
import MainView from './Views/MainView';
import DetailsView from './Views/DetailsView';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { relodRequested } from './actions';

function App() {
  useEffect(() => {
    onStart();
  }, []);

  const dispatch = useDispatch();
  const onStart = () => {
    dispatch(relodRequested());
    }

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={MainView} />
          <Route path="/chart" component={ChartView} />
          <Route path="/details/:id" component={DetailsView} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
