import React, { Component } from 'react';
const Promise = require('bluebird');
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
    const responses = Promise.map(tempUrl, (url) => fetch(url), {concurrency: 5});
    console.log(responses);

  }

  componentWillReceiveProps(nextProps){
    if(this.props.owner.id !== nextProps.owner.id){
      let tempUrl = [];
      this.tempLanuage = {};
      this.props.repoList.map( repo =>{
        tempUrl.push(repo.languages_url);
      })
      const responses = Promise.map(tempUrl, (url) => fetch(url), {concurrency: 5});
    console.log(responses);
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

  handleErrors = response => {
    if(!response.ok) throw Error(response.statusText);
    return response;
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
