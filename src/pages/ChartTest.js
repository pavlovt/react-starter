import React, { Component } from 'react';
import Chart from '../components/Chart';



export default class ChartTest extends Component {
    constructor() {
        super();
        this.state = {data:{

          type: "line",
          data: {
              labels: ["01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM","07:00 AM","08:00 AM","09:00 AM","10:00 AM","11:00 AM"],
              datasets: [
                  {
                      label: "My First dataset",
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: "rgba(75,192,192,0.4)",
                      borderColor: "rgba(75,192,192,1)",
                      borderCapStyle: 'butt',
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      pointBorderColor: "rgba(75,192,192,1)",
                      pointBackgroundColor: "#fff",
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: "rgba(75,192,192,1)",
                      pointHoverBorderColor: "rgba(220,220,220,1)",
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 50],
                      spanGaps: false,
                  },
                  {
                      label: "My First dataset",
                      fill: false,
                      lineTension: 0.1,
                      backgroundColor: "rgba(75,192,192,0.4)",
                      borderColor: "rgba(75,192,192,1)",
                      borderCapStyle: 'butt',
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      pointBorderColor: "rgba(75,192,192,1)",
                      pointBackgroundColor: "#fff",
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: "rgba(75,192,192,1)",
                      pointHoverBorderColor: "rgba(220,220,220,1)",
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: [65, 59, 80, 81, 56, 55, 40, 80, 81, 56, 50],
                      spanGaps: false,
                  }
              ]
          },
          options: {
              layout: {
                padding: 50
              },
              title: {
                display: true,
                text: "Traffic Status"
              },
          }
        },
        maintainAspectRatio: false,
        responsive: true
      }
  }

    render() {
        return (<Chart id="chart" data={this.state.data} height="400" />);
    }

}
