'use strict'

import React, { Component, PropTypes } from 'react';
import Chart from 'chart.js';

export default class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {data: props.data};
  }
  addChart = (ctx, data) => {
    var ctx = document.getElementById(this.props.id).getContext('2d');
      let myChart = new Chart(ctx, this.props.data);
    }
      componentDidMount(){
        this.addChart()
      }

    render() {
        return (<canvas id={this.props.id} width="200" height="200" ></canvas>);
    }
}
