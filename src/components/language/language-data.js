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
    this.fetchData(tempUrl);
  }

  componentWillReceiveProps(nextProps){
    if(this.props.owner.id !== nextProps.owner.id){
      let tempUrl = [];
      nextProps.repoList.map( repo =>{
        tempUrl.push(repo.languages_url);
      })
      this.fetchData(tempUrl);
    }
  }

  async fetchData(urls) {
      try {
        const responses = await Promise.map(urls, (url) => fetch(url).then(res => res.json()), {concurrency: 5});
        let result = {};
        responses.forEach(res => {
          this.reduceObject(result, res);
        })
        this.setState({languages: result});
        this.calculateTotalBOC();
      } catch (e) {
        console.log(e);
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
    if(Object.keys(b).length === 0) return;
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
