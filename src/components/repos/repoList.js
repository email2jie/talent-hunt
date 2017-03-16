import './css/repoList.css';
import React, { Component } from 'react';

const RepoView = require('./repoView.js');

class RepoList extends Component {
  constructor(){
    super();
    this.state = {filter: 'airbnb'};
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  findMatch(repo) {
    if(this.state.filter){
    return repo.name.includes(this.state.filter);
    }else{
      return true;
    }
  }

  handleFilterChange(event){
    this.setState({filter: event.target.value});
  }

  render(){
      this.repoList = this.props.repoList.filter(this.findMatch);
    return (
      <div>

        <label>
          Find Repo: 
          <input type='text' value={this.state.filter} onChange={this.handleFilterChange} />
        </label>
        <ul>
          {
            this.repoList.map((repo) => {
              return (<RepoView key={repo.id} repo={repo} />);
            })
          }
        </ul>
      </div>
      )
}

};

export default RepoList;
