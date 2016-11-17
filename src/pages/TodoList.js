import React, { Component } from 'react';
import _ from 'lodash';
// import actions from '../actions/actions';
// import store from '../stores/store';

import Collection from '../stores/TodoFlushStore';
let {actions, store} = Collection;

class TodoList extends Component {
  constructor() {
    super()
    // this.state = {todos: [{name: 'q'}, {name: 'q1'}]};
    this.state = {todos: store.getAll()};
  }

  todos = () => {
    return this.state.todos.map((todo, index) => {
      return (
        <Todo data={todo} key={index}/>
      );
    });
  }

  addTodo = (event) => {
    if (event.keyCode === 13 && !_.isEmpty(event.target.value)) {
      //this.setState({todos: [...this.state.todos, {name: event.target.value}]});
      actions.create(event.target.value);
    }
  }

  componentDidMount = () => {
    store.addChangeListener(this._onChange);
  }

  componentWillUnmount =() => {
    store.removeChangeListener(this._onChange);
  }

  _onChange = () => {
    console.log(store.getAll());
    this.setState({todos: store.getAll()});
  }

  render() {
    return (
      <div className="todo-list">
          TodoList
          <input name="name" onKeyDown={this.addTodo} />
          {this.todos()}
      </div>
    );
  }
}

class Todo extends Component {
  render() {
    return (
      <div className="todo-item">
        Todo {this.props.data.name}
      </div>
    );
  }
}

export default TodoList;
