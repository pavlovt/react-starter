
import React, { Component, PropTypes } from 'react';
import ChartJS from 'chart.js';
ChartJS.defaults.global.maintainAspectRatio = false;
export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {data: props.data};
    this.state.width = this.props.width || '100%';
  }
  addChart = () => {
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
