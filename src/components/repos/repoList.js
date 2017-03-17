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
  /*
  findMatch = (repo) => {
    if(this.state.filter !== ''){
    
    var re = `/${this.state.filter}/ig`;
      console.log(repo.name.search(re));
    return repo.name.search(re) !== -1;
    }else
      return true;
  }
  */

  handleFilterChange(event){
    this.setState({filter: event.target.value});
  }

  render(){
    this.repoList = filter(this.props.repoList, this.findMatch = (repo) =>{
        console.log(this.state.filter);
        return ~repo.name.toLowerCase().indexOf(this.state.filter);
    });
    return (
      <div>

        <label>
          Find Repo: 
          <input type='text' value={this.state.filter} onChange={this.handleFilterChange} />
        </label>
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
