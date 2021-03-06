import './css/repoList.css';
import React, { Component } from 'react';
import { filter } from 'underscore';

const RepoView = require('./repoView.js');

class RepoList extends Component {
  constructor(props) {
    super(props);
    this.state = {filter: ''};
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.repoList = this.props.repoList;
  }

  handleFilterChange(event){
    this.setState({filter: event.target.value});
  }

  onHandleSubmit(event){
    event.preventDefault();
  }

  render(){
    this.repoList = filter(this.props.repoList, this.findMatch = (repo) =>{
      return ~repo.name.toLowerCase().indexOf(this.state.filter);
    });
    return (
      <div className='RepoList'>

        <form className='pure-form' onSubmit={this.onHandleSubmit}>
          <label>
            <input id='filter' type='text' placeholder='Filter Repo' value={this.state.filter} onChange={this.handleFilterChange} />
          </label>
        </form>
        <ul>
          {
          this.repoList.map((repo) => {
          return (<RepoView key={repo.id} repo={repo} />)
          })
          }
        </ul>
      </div>
      )
}

};

export default RepoList;
