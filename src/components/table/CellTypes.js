import React, { Component } from 'react';

class AttackStatusBadge extends Component {
    constructor(props) {
        super(props);

        this.state = {
            style: {
                width: '60px',
                height: '20px',
                lineHeight: '20px',
                borderRadius: '100px',
                margin: '0 auto',
                color: '#fff'
            }
        };
    }

    componentWillMount() {
        let background = this.props.status === 'completed' ? '#f46f6d' : '#8dc63f';
        this.setState({ badgeColor: {background} })
    }
    render() {
        return (<div style={Object.assign({}, this.state.style, this.state.badgeColor)}>
            {this.props.content}
        </div>)
    }
}

class SimpleTextCell extends Component {
    render() {
        return (
            <div className={this.props.bolded === true ? 'text-bolded': ''}>
                {this.props.content}
            </div>
        )
    }
}

export {
    AttackStatusBadge,
    SimpleTextCell
}