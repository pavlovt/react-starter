import React, { Component } from 'react';
import _ from 'lodash';
import TodoActions from '../actions/TodoActions';
import TodoStore from '../stores/TodoStore';

class TodoList extends Component {
  constructor() {
    super()
    // this.state = {todos: [{name: 'q'}, {name: 'q1'}]};
    this.state = {todos: TodoStore.getAll()};
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
      TodoActions.create(event.target.value);
    }
  }

  componentDidMount = () => {
    TodoStore.addChangeListener(this._onChange);
  }

  componentWillUnmount =() => {
    TodoStore.removeChangeListener(this._onChange);
  }

  _onChange = () => {
    console.log(TodoStore.getAll());
    this.setState({todos: TodoStore.getAll()});
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
