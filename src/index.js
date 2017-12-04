import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './resources/buttons.css';
import BathContainer from './containers/BathContainer';
import PrepareContainer from './containers/PrepareContainer';
import SummaryContainer from './containers/SummaryContainer';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

ReactDOM.render(
  <Provider store={ store }>
    <Router>
      <Switch>
        <Route exact path="/" component={ SummaryContainer } />
        <Route exact path="/summary" component={ SummaryContainer } />
        <Route exact path="/prepare" component={ PrepareContainer } />
        <Route exact path="/bath" component={ BathContainer } />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
