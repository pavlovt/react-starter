import React, { Component } from 'react';
import { Button, Checkbox, Form, Input } from 'semantic-ui-react';

class About extends Component {
    submit = (event, data) => {
        event.preventDefault();

        console.log(data);

    }

    render() {
        return (
        <div className="about-page">
            About Page

            <Form onSubmit={this.submit}>
                <Form.Field label='First Name' control='input' type='text' name="firstName" zz="q" required />
                <Form.Field label='Last Name' control='input' type='text' name="lastName" />
                <Form.Field label='I agree to the Terms and Conditions' control='input' type="checkbox" name="terms" />
                
                <Button type='submit'>Submit</Button>
            </Form>
        </div>
        );
    }
}

export default About;
