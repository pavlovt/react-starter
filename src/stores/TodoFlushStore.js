import Flush from '../core/flush';

let _todos = [{name: 'q'}, {name: 'q1'}];

let methods = {
    /**
     * Create a TODO item.
     * @param  {string} text The content of the TODO
     */
    create: function (text) {
      _todos.push({
        id: +new Date(),
        complete: false,
        name: text
      });

      this.changed();
  },

  getAll: function () {
    return _todos;
  }

}

let res = Flush.store(methods);
console.log(res);
export default res;
