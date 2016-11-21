import React, {Component} from 'react';
import {Card, List, Grid} from 'semantic-ui-react'
import Chart from './Chart';


class TopAttackedTenants extends Component {
  constructor(props) {
    super(props); // props.topAttackedList

  }


  render() {
    let tenants = this.props.topAttackedList.map((element) => <p> {element.name} </p> );
    let numbers = this.props.topAttackedList.map((element) => <p> {element.count} </p>);

    let chartData = {
      type: 'horizontalBar',
      data: {
        labels: ['aaaa', 'bbbb', 'cccc', 'dddd', 'eeee'],
        datasets: [{
          data: this.props.topAttackedList.map((element) => element.count),
        }]
      },


    };

    return (
      <Grid columns="{3}" padded="vertically">
        <Grid.Column>
          {tenants}
        </Grid.Column>
        <Grid.Column>
          {numbers}
        </Grid.Column>
        <Grid.Column width={2}>
          <Chart id="topAttackedTenants" data={chartData}/>
        </Grid.Column>
      </Grid>
    )
  }
}

export default TopAttackedTenants;