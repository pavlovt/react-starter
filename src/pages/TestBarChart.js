import React, { Component } from 'react';
import Chart from '../components/Chart';



export default class BarTest extends Component {
    constructor() {
        super();
        this.state = {data:{

          type: "horizontalBar",
          data: {

              labels: ["01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM"],
              datasets: [
                  {
                    label: " ",
                    backgroundColor: [
                        '#1eabd9',
                        '#1eabd9',
                        '#1eabd9',
                        '#1eabd9',
                        '#1eabd9'
                    ],
                    borderWidth: 0.1,
                    data: [50,40,30,20,15,0],
                    spanGaps: true,
                  }
              ]
          },
          options: {
            tooltips: {



              custom: function(tooltip) {
                  // tooltip will be false if tooltip is not visible or should be hidden
                  if (!tooltip) {
                      return;
                  }

              }
            },
            layout: {
                padding: 50
            },
            scales: {
                xAxes: [{
                    categorySpacing: 0
                }],
                yAxes: [{
                    stacked: true
                }]
           }
          }
        }
      }
  }

    render() {
        return (
          <div className="row">
            <div className="col-xs-4">
              <p>tenant name</p>
            </div>
            <div className="col-xs-2">
              <p>Atacks</p>
            </div>
            <div className="col-xs-6">
              <Chart id="chart" data={this.state.data} height="400" />
            </div>
          </div>
          );
    }

}
