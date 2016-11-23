import React, { Component } from 'react';
import Input from '../../components/form/input/Input';
import {validated} from 'react-custom-validation';
import validator from 'validator';
import css from './Login.scss';

class Login extends Component {
    constructor() {
        super()
        this.state = {fields: {username: '', password: ''}};
    }
    componentDidMount = () => {

    }

    fieldChange = (field, value) => {
        this.state.fields[field] = value;
        this.setState({fields: this.state.fields});
    }

    render() {
        return (
            <Form
                fields={this.state.fields}
                onChange={this.fieldChange}
                onValid={() => { console.log(this.state.fields);}} // eslint-disable-line no-alert
                onInvalid={() => alert('Error!')} // eslint-disable-line no-alert
                />
        );
    }
}

class Form extends Component {
    render() {
        const {$field, $validation, onValid, onInvalid, onChange, $fieldEvent} = this.props
        const fields = {$field, $validation, onChange, fields: this.props.fields}; 
        return (
            <form className="row">
                <div className="col-xs-12">
                <div className="col-xs-3 jumbotron">
                    <Input type="text" name="username" label="Username" {...fields} />
                    <Input type="password" name="password" label="Password" {...fields} />

                    <button className="btn btn-default col-xs-12" onClick={(e) => {
                        e.preventDefault()
                        this.props.$submit(onValid, onInvalid)
                        }}>LOGIN</button>
                </div>
                </div>
            </form>
        );
    }
}

Form = validated(validationConfig)(Form);

const isEmail = (email) =>
  validator.isEmail(email || '') ? null : 'This is not a valid email.'

const minLength = (name, length) => {
  return name && name.length >= length ? null : 'This fiels is required'
}

function validationConfig(props) {
  const {username, password} = props.fields

  return {
    fields: ['username', 'password'],

    validations: {
      username: [[minLength, username, 1]],
      password: [[minLength, password, 1]],      
    },
  }
}

export default Login;
