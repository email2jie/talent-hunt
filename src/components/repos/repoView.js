const React = require('react');


const RepoView = React.createClass({
  render(){
    this.repo = this.props.repo;
    console.log(this.repo);
    return (
      <a href={this.repo.html_url}>
        <li>
          {this.repo.full_name}
        </li>
      </a>
      )
}

});

module.exports = RepoView;
