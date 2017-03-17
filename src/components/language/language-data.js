import React, { Component } from 'react';
const _ = require('underscore');

class LanguageData extends Component {
  constructor(props) {
    super(props);
    this.state = {repo_language_url: [], languages: {}}
    this.totalLOC = 0;

    this.tempUrl = [];


  }
  componentDidMount(){
    this.props.repoList.map( repo =>{
      this.tempUrl.push(repo.languages_url);
    })

    this.setState({repo_language_url: this.tempUrl});

    this.state.repo_language_url.forEach(url => {
      this.fetchData(url);
    })

    this.calculateTotalLOC();

  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      this.setState({repo_language_url: [], languages: {}});

      this.props.repoList.map( repo =>{
        this.tempUrl.push(repo.languages_url);
      })
      this.setState({repo_language_url: this.tempUrl});

      this.state.repo_language_url.forEach(url => {
        this.fetchData(url);
      })

    }
    this.calculateTotalLOC();
  }


  calculateTotalLOC = () =>{
    this.totalLOC = 0;
    for(var key in this.state.languages){
      if(!this.state.languages.hasOwnProperty(key)) continue;
      this.totalLOC += this.state.languages[key];
    }
  }

  fetchData = (url) => {
    fetch(url, {
      method: 'GET',
    }).then(res => res.json())
      .then(value => {
        this.setState({languages: this.reduceObject(value, this.state.languages)});
      })
  }
  reduceObject = (a, b) => {
    const newObj = _.reduce([a, b], (memo, obj) => {
      return _.mapObject(obj, (val, key) => {
        return ! _.isUndefined(memo[key]) ? (memo[key] + val) : val
      })
    }, {})


    return newObj;
  }


  render(){

    return (
      <div className='LanguageData'>
        {
        Object.keys(this.state.languages).map((key,index) => {
        var x = (this.state.languages[key] / this.totalLOC * 100).toFixed(2);
        return (<div key={index}>{key}: {x}%</div>)
        })
        }

      </div>
      )
}

};

export default LanguageData;
