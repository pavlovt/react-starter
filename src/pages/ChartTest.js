import React, { Component } from 'react';
import Chart from '../components/Chart';



export default class ChartTest extends Component {
    constructor() {
        super();
        this.state = {data:{
          type: 'line',
          data: {
              labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
              datasets: [{
                  data: [12, 19, 3, 5, 2, 3],
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:false
                      }
                  }]
              }
          }
                    }
                  }
  }

    render() {
        return (<Chart id="chart" data={this.state.data} />);
    }

}
