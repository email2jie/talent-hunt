import React, { Component } from 'react';
import Chart from 'chart.js';
import './chart.css';

class StarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {labels: [], data: []};
  } 
  componentDidMount() {
    this.createChart(this.props);
  }
  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      this.createChart(nextProps);
    }
  }
  createChart = (props) => {
    let tempLabels = [];
    let tempData = [];
      props.repoList.map(repo =>{
        if(repo.stargazers_count > 0){
          tempLabels.push(repo.name);
          tempData.push(repo.stargazers_count);
        }
      })

      let promptChart = new Chart(this.refs.promptChartRef, {
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
        <div className="chartView">
          <canvas ref="promptChartRef" id="promptChart"></canvas>
        </div>
      </div>
      );
  }
}

export default StarChart;
