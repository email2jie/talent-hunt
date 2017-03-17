import React, { Component } from 'react';
import Chart from 'chart.js';
import './chart.css';

class StarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {labels: [], data: []};
    this.tempLabel = [];
    this.tempData = [];
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
      props.repoList.map(repo =>{
        if(repo.stargazers_count > 0){
          this.tempLabel.push(repo.name);
          this.tempData.push(repo.stargazers_count);
        }
      })
      this.setState({labels: this.tempLabel, data: this.tempData});
      this.tempLabel = [];
      this.tempData = [];

      let promptChart = new Chart(this.refs.promptChartRef, {
        type: 'bar',
        data: {
          labels: this.state.labels,
          datasets: [{
            label: ['Stargazer Chart', ],
            data: this.state.data,
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
