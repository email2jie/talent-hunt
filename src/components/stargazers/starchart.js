import React, { Component } from 'react';
import Chart from 'chart.js';
import './chart.css';

class StarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {labels: [], data: []};
    this.chart = null;
  } 
  componentDidMount() {
    this.createChart(this.props);
  }
  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      this.createChart(nextProps);
    }
  }

  appendHtml = (el, str) => {
    var div = document.createElement('div');
    div.innerHTML = str;
    while(div.children.length > 0) {
      el.appendChild(div.children[0]);
    }
  }

  createChart = (props) => {
    let tempLabels = [];
    let tempData = [];
    if(this.chart !== null) this.chart.destroy();

      props.repoList.map(repo =>{
        if(repo.stargazers_count > 0){
          tempLabels.push(repo.name);
          tempData.push(repo.stargazers_count);
        }
      })

      this.chart = new Chart(this.refs.promptChartRef, {
        type: 'bar',
        data: {
          labels: tempLabels,
          datasets: [{
            label: ['Stargazer Chart', ],
            data: tempData,
            backgroundColor: [
              'rgba(101,103,217,0.6)',
            ],
            lineTension: 0,
            borderColor: [
              'rgba(0,255,0,0.3)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
  
  }

  render() {
    return (
      <div className="chart">
        <div id='chartView' className="chartView">
          <canvas ref="promptChartRef" id="promptChart"></canvas>
        </div>
      </div>
      );
  }
}

export default StarChart;
