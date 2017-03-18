import React, { Component } from 'react';
const _ = require('underscore');

class LanguageData extends Component {
  constructor(props) {
    super(props);
    this.state = {repo_language_url: [], languages: {}, totalBOC: 0}
    this.tempLanguage = {};

  }
  componentDidMount(){
    let tempUrl = [];
    this.props.repoList.map( repo =>{
      tempUrl.push(repo.languages_url);
    })

    this.setState({repo_language_url: tempUrl});

    this.state.repo_language_url.forEach(url => {
      this.fetchData(url);

    })

  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){
      let tempUrl = [];
      this.tempLanuage = {};
      this.props.repoList.map( repo =>{
        tempUrl.push(repo.languages_url);
      })
      this.setState({repo_language_url: tempUrl});

      this.state.repo_language_url.forEach(url => {
        this.fetchData(url);
      })
    }
  }


  calculateTotalBOC = () => {
    var tempBOC = 0;
    for(var key in this.state.languages){
      if(!this.state.languages.hasOwnProperty(key)) continue;
      tempBOC += this.state.languages[key];
    }
    this.setState({totalBOC: tempBOC});
  }

  fetchData = (url) => {
    fetch(url, {
      method: 'GET',
    }).then(res => res.json())
      .then(value => {
        this.reduceObject(this.tempLanguage, value);
        this.setState({languages: this.tempLanguage});
        this.calculateTotalBOC()
      })

  }
  reduceObject = (a, b) => {
    for(var key in b){
      if(!b.hasOwnProperty(key)) continue;
      if(key in a){
        a[key] += b[key];
      }else{
        a[key] = b[key];
      }
    }

  }


  render(){

    return (
      <div className='LanguageData'>
        {
        Object.keys(this.state.languages).map((key,index) => {
        var x = (this.state.languages[key] / this.state.totalBOC * 100).toFixed(2);
        return (<div key={index}>{key}: {x}%</div>)
        })
        }

      </div>
      )
}

};

export default LanguageData;
