import React, {Component} from 'react';
import { List, Card, Header } from 'semantic-ui-react';

class RecentAlerts extends Component {
  constructor(props) {
    super(props);

  }

  renderAlert = (item) => {
    return (
      <List.Item>
        <List.Icon name='circle' />
        <List.Content>
          {item.alertDate}
          <div>
            Attack: <a href={item.attackLink}> #{item.attackId} </a> on {item.targetIp}
          </div>
        </List.Content>
      </List.Item>
    )
  };

  render() {
    let alertsList = this.props.alerts.map(this.renderAlert);

    return (
      <div>
        <Header as='h3'> Recent alerts </Header>
        <Card>
          <Card.Content>
            <List>
              {alertsList}
            </List>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

RecentAlerts.propTypes = {
  alerts: React.PropTypes.array.isRequired
};

export default RecentAlerts;