import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import RepoList from './components/repos/repoList.js';
import StarChart from './components/stargazers/starchart.js';
import LanguageData from './components/language/language-data.js';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {repos: [], owner: {}};
    this.onSubmitFunc('potato');

  }

  onHandleSubmit = (event) => {
    event.preventDefault();
    var input = document.getElementById('name').value;
    if(Object.keys(this.state.owner).length === 0 || this.state.owner.name !== input){
    this.onSubmitFunc(input);
    }
  }

  onSubmitFunc = (user) => {
    fetch(`https://api.github.com/users/${user}/repos`, {
      method: 'GET',
    }).then(this.handleErrors)
      .then(res => res.json())
      .then(value => this.setState({repos: value, owner: value[0].owner}))
      .catch(error => alert(error));
  }

  handleErrors = response => {
    if(!response.ok) throw Error(response.statusText);
    return response;
  }


  render() {
    let repoList = null;
    let avatar = null;
    let chart = null;
    let language = null;
    let error = null;
    let owner = null;
    if (this.state.repos.length > 0){
      owner = <ul className=''>
        <li>Username: {this.state.owner.login}</li>
        <li>User ID: {this.state.owner.id}</li>
        <li><a target="_blank" href={this.state.owner.html_url}>Profile Link</a></li>
        </ul>

      repoList = <div>
        <RepoList className='pure-u-1' key={this.state.value} repoList={this.state.repos} />
      </div>

      avatar = <img className='avatar' src={this.state.owner.avatar_url} alt='avatar' />
      chart = <StarChart className='pure-u-1' repoList={this.state.repos} owner={this.state.owner}/>
      language = 
          <div>
            <br />
            <h3>Languages</h3>
          <LanguageData owner={this.state.owner} repoList={this.state.repos} />
          </div>
      }
return (
  <div className="App pure-g">
    <div className="App-header pure-u-1">
      <div className="logo-container">
      <img src={logo} className="App-logo" alt="logo" />
      </div>
      <h2 className='title'>Talent Hunt: Find your next super dev here!</h2>
    </div>
    <div className="pure-u-1-2">
      <form className='pure-form' onSubmit={this.onHandleSubmit}>
        <label for='name'>
          <input id='name' type='text' placeholder="Search Github User" />
        </label>
      </form>

      {avatar}
      {owner}
      {language}

    </div>

    <div className='pure-u-1-2'>

      <div className='pure-u-1'>
        {repoList}
      </div>

    </div>
    <div className='pure-u-1'>
      {chart}
    </div>


  </div>
  );
  }
}

export default App;
