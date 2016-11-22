import React, { Component } from 'react';
import Input from '../components/form/input/Input';
import {validated} from 'react-custom-validation';
import validator from 'validator';

class Validation1 extends Component {
    constructor() {
        super()
        this.state = {fields: {name: '', email: ''}};
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
                onValid={() => { console.log(this.state.fields); alert('Submitting...');}} // eslint-disable-line no-alert
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
                <Input type="text" name="name" label="Name" {...fields} />
                <Input type="email" name="email" label="Email" {...fields} />

                <button onClick={(e) => {
                    e.preventDefault()
                    this.props.$submit(onValid, onInvalid)
                    }}>Sign up</button>
            </form>
        );
    }
}

Form = validated(validationConfig)(Form);

const isEmail = (email) =>
  validator.isEmail(email || '') ? null : 'This is not a valid email.'

const minLength = (name, length) => {
  return name && name.length >= length ? null : 'Name is too short.'
}

function validationConfig(props) {
  const {name, email} = props.fields

  return {
    fields: ['name', 'email'],

    validations: {
      name: [[minLength, name, 6]],
      email: [
        [isEmail, email]
      ],
      
    },
  }
}

export default Validation1;
