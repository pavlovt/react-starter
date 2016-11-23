import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import About from './pages/About';
import TodoList from './pages/TodoList';
import GridTest from './pages/GridTest';
import ChartTest from './pages/ChartTest';
import Validation from './pages/Validation';
import Validation1 from './pages/Validation1';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/fonts/ek-mukta.regular.ttf';
import Tenants from './pages/Tenants';
import Overview from './pages/Overview';
import TestBarChart from './pages/TestBarChart';
import Login from './pages/login/Login';
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
      <Route path="validation1" component={Validation1}/>
      <Route path="tenants" component={Tenants}/>
      <Route path="overview" component={Overview}/>
      <Route path="testBarChart" component={TestBarChart}/>
      <Route path="login" component={Login}/>
    </Route>
  </Router>
),
  document.getElementById('root')
);
