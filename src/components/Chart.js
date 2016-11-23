
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
    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      tooltipEl.id = 'chartjs-tooltip';
      tooltipEl.innerHTML = "<table></table>"
      document.body.appendChild(tooltipEl);
    }
    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }
    // Set caret Position
    tooltipEl.classList.remove('above', 'below', 'no-transform');
    if (tooltip.yAlign) {
      tooltipEl.classList.add(tooltip.yAlign);
    } else {
      tooltipEl.classList.add('no-transform');
    }
    function getBody(bodyItem) {
      return bodyItem.lines;
    }
    // Set Text
    if (tooltip.body) {
      var titleLines = tooltip.title || [];
      var bodyLines = tooltip.body.map(getBody);
      var innerHtml = '<thead>';
      titleLines.forEach(function(title) {
        innerHtml += '<tr><th>' + title + '</th></tr>';
      });
      innerHtml += '</thead><tbody>';
      bodyLines.forEach(function(body, i) {
        var colors = tooltip.labelColors[i];
        var style = 'background:' + colors.backgroundColor;
        style += '; border-color:' + colors.borderColor;
        style += '; border-width: 2px';
        var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
        innerHtml += '<tr><td>' + span + body + '</td></tr>';
      });
      innerHtml += '</tbody>';
      var tableRoot = tooltipEl.querySelector('table');
      tableRoot.innerHTML = innerHtml;
    }
    var position = this._chart.canvas.getBoundingClientRect();
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
