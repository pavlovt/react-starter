import Dispatcher from '../core/dispatcher';

var TodoActions = {
  create: function(text) {
    Dispatcher.dispatch({
      actionType: 'create',
      text: text
    });
  },

  updateText: function(id, text) {
    Dispatcher.dispatch({
      actionType: 'updateText',
      id: id,
      text: text
    });
  },

  toggleComplete: function(todo) {
    var id = todo.id;
    var actionType = todo.complete ?
        'undoComplete' :
        'complete';

    Dispatcher.dispatch({
      actionType: actionType,
      id: id
    });
  },

  toggleCompleteAll: function() {
    Dispatcher.dispatch({
      actionType: 'toggleCompleteAll'
    });
  },

  remove: function(id) {
    Dispatcher.dispatch({
      actionType: 'remove',
      id: id
    });
  },

  removeCompleted: function() {
    Dispatcher.dispatch({
      actionType: 'removeCompleted'
    });
  }

};

export default TodoActions;
