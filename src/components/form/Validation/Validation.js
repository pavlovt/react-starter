import React, { Component } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react';

class Validation extends Component {
    submit = (event, data) => {
        event.preventDefault();

        console.log(data);

    }

    render() {
        return (
            <div class="ui text container">
            </div>
        );
    }
}

Validation.protoTypes = {
    data: React.PropTypes.array.isRequired
}

export default Validation;
