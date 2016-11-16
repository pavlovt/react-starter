import Dispatcher from './dispatcher';
import {EventEmitter} from 'events';
import _ from 'lodash';

/**
 * The idea is to lower the Flux boilerplate to minimum
 */
class Flush {
    defaultMethods = {
        changed: function () {
          this.emit(this.changeEvent);
        },

        /**
         * @param {function} callback
         */
        addChangeListener: function (callback) {
          this.on(this.changeEvent, callback);
        },

        /**
         * @param {function} callback
         */
        removeChangeListener: function (callback) {
          this.removeListener(this.changeEvent, callback);
        }
    }

    constructor() {
        this.changeEvent = 'change';
    }

    bind = (bindables, bindWith) => {
        _.each(bindables, (bindable) => {
            bindWith[bindable].bind(bindWith);
        })

        return bindWith;
    }

    /**
     * Generate the Flux actions
     */
    actions = (actions) => {
        let res = {};
        _.each(actions, (action) => {
            res[action] = (data) => {
                Dispatcher.dispatch({type: action, data: data});
            }
        });

        return res;
    }

    /**
     * Create new store
     * @param methods object Contains all the store's methods
     * @param createActions boolean You can create the actions together with the store
     */
    store = (methods, createActions = true) => {
        let actions = createActions ? this.actions(_.keys(methods)) : null;
        let store = _.assign({}, EventEmitter.prototype, this.defaultMethods, methods);
        store.changeEvent = this.changeEvent;
        // bind all default and custom methods to the store
        this.bind([..._.keys(this.defaultMethods), ..._.keys(methods)], store);

        store.dispatcherIndex = Dispatcher.register((action) => {
            _.each(_.keys(methods), (methodName) => {
                if (action.type === methodName) store[methodName](action.data);
            });
        });

        return {actions, store};
    }
}

export default new Flush();
