import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import About from './pages/About';
import TodoList from './pages/TodoList';
import GridTest from './pages/GridTest';
import ChartTest from './pages/ChartTest';
import Validation from './pages/Validation';
import 'fixed-data-table/dist/fixed-data-table.css'
import 'semantic-ui-css/semantic.min.css'
import './index.scss';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

ReactDOM.render(
  (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={TodoList} />
      <Route path="about" component={About}/>
      <Route path="todo" component={TodoList}/>
      <Route path="grid" component={GridTest}/>
      <Route path="chart" component={ChartTest}/>
      <Route path="validation" component={Validation}/>
    </Route>
  </Router>
),
  document.getElementById('root')
);
