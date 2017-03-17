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
    this.onChangeFunc('email2jie');

  }

  onHandleSubmit = (event) => {
    event.preventDefault();
    var input = document.getElementById('name').value;
    this.onChangeFunc(input);
  }

  onChangeFunc = (user) => {
    fetch(`https://api.github.com/users/${user}/repos`, {
      method: 'GET',
    }).then(res => res.json())
      .then(value => this.setState({repos: value, owner: value[0].owner}))
  }


  render() {
    let repoList = null;
    let avatar = null;
    let chart = null;
    let language = null;
    if (this.state.repos.length > 0){
      repoList = <div>
        <RepoList className='pure-u-1-2' key={this.state.value} repoList={this.state.repos} />
      </div>

      avatar = <img className='pure-u-1-2' src={this.state.owner.avatar_url} alt='avatar' />
      chart = <StarChart className='pure-u-1' repoList={this.state.repos}/>
      language = <LanguageData repoList={this.state.repos} />
      }else{
      }
return (
  <div className="App pure-g">
    <div className="App-header pure-u-1">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Talent Hunt: Find your next super dev here!</h2>
    </div>
    <div className="pure-u-1-2">
      <form className='pure-form pure-u-1' onSubmit={this.onHandleSubmit}>
        <label for='name'>
          <input id='name' type='text' placeholder="Search Github User" />
        </label>
      </form>

      {avatar}

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
