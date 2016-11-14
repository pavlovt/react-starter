import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import About from './pages/About';
import TodoList from './pages/TodoList';
import './index.css';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

ReactDOM.render(
  (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={TodoList} />
      <Route path="about" component={About}/>
      <Route path="todo" component={TodoList}/>
    </Route>
  </Router>
),
  document.getElementById('root')
);
