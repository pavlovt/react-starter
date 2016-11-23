
import React, { Component, PropTypes } from 'react';
import ChartJS from 'chart.js';
import _ from 'lodash';

ChartJS.defaults.global.maintainAspectRatio = false;
ChartJS.defaults.global.legend.display = false;
//console.log(ChartJS);
ChartJS.Scale.extend({getRightValue: function () {
  //console.log('qqq');
}})

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {data: props.data};
    this.state.width = this.props.width || '100%';
  }
  /*tooltip*/
  customTooltips = (tooltip) => {

    // Tooltip Element
    var tooltipEl = document.getElementById('chartjs-tooltip');

  };
  /*end of tooltip*/

  changeValues = () => {
    let options = this.props.options;
    _.each(this.props.data.data.datasets, function(data) {
      _.each(data.data, function(data){
        data.x = data[options.xAxis];
        data.y = data[options.yAxis];
      });
    })
  }
  checkForRenderFunction = () => {
      if (_.get(this, 'props.data.data.options.tooltips.render')) {
        _.set(this, 'props.data.data.options.tooltips.custom', this.customTooltips);
          this.renderTooltip = _.get(this, 'props.data.data.options.tooltips.render');
      }
  }
  addChart = () => {
    this.changeValues()
    this.checkForRenderFunction()
    var ctx = document.getElementById(this.props.id).getContext('2d');
    let myChart = new ChartJS(ctx, this.props.data);
  }
  componentDidMount(){
    this.addChart()
  }

  render() {
    return (<canvas id={this.props.id} width={this.state.width} height={this.props.height}></canvas>);
  }
}


Chart.propTypes = {
  height: React.PropTypes.string.isRequired
}
