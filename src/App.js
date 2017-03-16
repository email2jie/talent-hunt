import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import RepoList from './components/repos/repoList.js' 


class App extends Component {
  constructor(props){
    super(props);
    this.state = {value: '', repos: [], owner: {}, filter: ''};

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onChange(event){
    this.setState({value: event.target.value});
  }

  onBlur(event){
    event.preventDefault();
    this.onChangeFunc(this.state.value);
  }

  onChangeFunc(user) {
    console.log(user);
    fetch(`https://api.github.com/users/${user}/repos`, {
      method: 'GET',
    }).then(res => res.json())
      .then(value => this.setState({repos: value, owner: value[0].owner}))
  }


  render() {
    let repoList = null;
    if (this.state.repos.length > 0){
      repoList = <div>
        <img src={this.state.owner.avatar_url} alt='avatar' />
        <RepoList key={this.state.value} repoList={this.state.repos} />;
      </div>
      
    }else{
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <form onSubmit={this.onBlur}>
          <label>
            Search User:
            <input type='text' value={this.state.value} onChange={this.onChange} />
          </label>
        </form>

        {repoList}


      </div>
    );
  }
}

export default App;
