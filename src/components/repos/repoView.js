const React = require('react');


const RepoView = React.createClass({
  render(){
    this.repo = this.props.repo;
    console.log(this.repo);
    return (
      <li>
        {this.repo.full_name}
      </li>
      )
}

});

module.exports = RepoView;
