import React, { Component } from 'react';
import Chart from '../components/Chart';



export default class ChartTest extends Component {
    constructor() {
        super();

        this.state = {data:{

          type: "line",
          data: {
              xAxisData: 'x1',
              yAxisData: 'y1',
              labels: ["01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM", "06:00 AM","07:00 AM","08:00 AM","09:00 AM","10:00 AM","11:00 AM"],
              datasets: [
                  {
                      label: "Allowed Traffic",
                      fill: true,
                      lineTension: 0.1,
                      backgroundColor: "rgba(141,198,63,0.4)",
                      borderColor: "#8dc63f",// color of the line
                      borderCapStyle: 'round',
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      pointBorderColor: "#8dc63f",
                      pointBackgroundColor: "#fff",
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: "#fff",
                      pointHoverBorderColor: "#8dc63f",
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      /*xAxisID: 'x1',
                      yAxisID: 'y1',*/
                      data: [{
                          x1: 1,
                          y1: 1
                      }, {
                          x1: 20,
                          y1: 20
                      }, {
                          x1: 3,
                          y1: 3
                      }, {
                          x1: 4,
                          y1: 4
                      }, {
                          x1: 5,
                          y1: 5
                      }, {
                          x1: 6,
                          y1: 6
                      }, {
                          x1: 7,
                          y1: 70
                      }, {
                          x1: 8,
                          y1: 8
                      }, {
                          x1: 9,
                          y1: 9
                      }, {
                          x1: 10,
                          y1: 10
                      }, {
                          x1: 11,
                          y1: 11
                      }],
                      spanGaps: true,
                  },
                  {
                      label: "Blocked Traffic",
                      fill: true,
                      lineTension: 0.1,
                      backgroundColor: "rgba(227,77,94,0.4)",
                      borderColor: "#e34d5e",
                      borderCapStyle: 'round',
                      borderDash: [],
                      borderDashOffset: 0.0,
                      borderJoinStyle: 'miter',
                      pointBorderColor: "rgba(75,192,192,1)",
                      pointBackgroundColor: "#fff",
                      pointBorderWidth: 1,
                      pointHoverRadius: 5,
                      pointHoverBackgroundColor: "#fff",
                      pointHoverBorderColor: "rgba(220,220,220,1)",
                      pointHoverBorderWidth: 2,
                      pointRadius: 1,
                      pointHitRadius: 10,
                      data: [{
                          x1: 1,
                          y1: 1
                      }, {
                          x1: 2,
                          y1: 2
                      }, {
                          x1: 3,
                          y1: 30
                      }, {
                          x1: 4,
                          y1: 4
                      }, {
                          x1: 5,
                          y1: 5
                      }, {
                          x1: 6,
                          y1: 6
                      }, {
                          x1: 7,
                          y1: 7
                      }, {
                          x1: 8,
                          y1: 8
                      }, {
                          x1: 9,
                          y1: 9
                      }, {
                          x1: 10,
                          y1: 10
                      }, {
                          x1: 11,
                          y1: 41
                      }],
                      spanGaps: true,
                  }
              ]
          },
          options: {
              tooltips: {
                enabled: false,
    						mode: 'index',
    						position: 'nearest',
    						render: function(data){
                  return '<div>hhhhh</div>';
                }
              },
              layout: {
                padding: 50
              },
          }
        }
      }
      this.state.options = {xAxis:'x1',yAxis:'y1'}
  }

    render() {
        return (<Chart id="chart" data={this.state.data} options={this.state.options} height="400" />);
    }

}
