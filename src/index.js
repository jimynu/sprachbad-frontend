import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Learn from './containers/Learn';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <Provider store={ store }>
    <Router>
      <Switch>
        <Route exact path="/" component={ Learn } />
        <Route exact path="/prepare" component={ Learn } />
        <Route exact path="/learn" component={ Learn } />
        <Route exact path="/users/:userId" component={ Learn } />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
