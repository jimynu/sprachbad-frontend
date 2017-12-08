import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store'

import './index.css';
import './resources/buttons.css';

import Bath from './routes/Bath';
import Settings from './routes/Settings';
import Summary from './routes/Summary';
import About from './routes/About';


ReactDOM.render(
  <Provider store={ store }>
    <Router>
      <Switch>
        <Route exact path="/" component={ Summary } />
        <Route exact path="/summary" component={ Summary } />
        <Route exact path="/settings" component={ Settings } />
        <Route exact path="/bath" component={ Bath } />
        <Route exact path="/about" component={ About } />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
