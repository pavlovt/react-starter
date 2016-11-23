import React, {Component} from 'react';
import Chart from '../components/Chart';


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
      options: {
          scales: {
              xAxes: [{
                  stacked: true
              }],
              yAxes: [{
                  stacked: true
              }]
          }
      }

    };

    return (
      <div className="row">
          <div className="col-md-4">
            {tenants}
          </div>
          <div className="col-md-2">
            {numbers}
          </div>
          <div className="col-md-6">
            <Chart id="topAttackedTenants" data={chartData}/>
          </div>
      </div>
    )
  }
}

export default TopAttackedTenants;
