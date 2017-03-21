const React = require('react');


const RepoView = React.createClass({
  render(){
    this.repo = this.props.repo;
    return (
      <li>
        <a target='_blank' href={this.repo.html_url}>
          {this.repo.full_name}
        </a>
      </li>
      )
}

});

module.exports = RepoView;
