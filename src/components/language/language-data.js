import React, { Component } from 'react';

class LanguageData extends Component {
  constructor(props) {
    super(props);
    this.state = {repo_language_url: [], languages: {}}
    this.totalLOC = 0;

    this.tempUrl = [];
    this.props.repoList.map( repo =>{
      this.tempUrl.push(repo.languages_url);
    })
    this.tempUrl = [];

    this.state.repo_language_url.forEach(url => {
      this.fetchData(url);
    })

    this.calculateTotalLOC();


  }

  componentWillReceiveProps(nextProps){
    if(this.props !== nextProps){

      this.props.repoList.map( repo =>{
        this.tempUrl.push(repo.languages_url);
      })
      this.tempUrl = [];

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
    var newObj = {};

    for(var key in a){

      if(!a.hasOwnProperty(key)) continue;

      if(key in newObj){
        newObj[key] += a[key];
      }else{
        newObj[key] = a[key];
      }
    }
    for(var key in b){

      if(!b.hasOwnProperty(key)) continue;

      if(key in newObj){
        newObj[key] += b[key];
      }else{
        newObj[key] = b[key];
      }
    }

    return newObj;


  }


  render(){

    console.log(this.state.languages);
    console.log(this.totalLOC);
    return (
      <div className='LanguageData'>
        {
        Object.keys(this.state.languages).map((key,index) => {
        return (<div key={index}>key</div>)
        })
        }
        
      </div>
      )
  }

};

export default LanguageData;
