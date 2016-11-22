import React, { Component } from 'react';

class Input extends Component {
    submit = (event, data) => {
        event.preventDefault();

        console.log(data);

    }

    render() {
        let {
            name,
            type,
            label,
            placeholder,
            className,
            $field, 
            $validation,
            onChange,
            fields,
            } = this.props;

        return (
            <div className={className}>
                <div className="form-group">
                    <label htmlFor={name}>{label}</label>
                    <input type={type} className="form-control" placeholder={placeholder} {...$field(name, (e) => onChange(name, e.target.value))} />
                </div>
                <div>{$validation[name].show && <span>{$validation[name].error.reason}</span>}</div>
            </div>
        );
    }
}

Input.ProtoTypes = {
    name: React.PropTypes.string.isRequired,
    '$validation': React.PropTypes.object.isRequired,
    '$field': React.PropTypes.func.isRequired,
}

export default Input;
