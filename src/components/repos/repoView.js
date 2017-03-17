const React = require('react');


const RepoView = React.createClass({
  render(){
    this.repo = this.props.repo;
    console.log(this.repo);
    return (
        <li>
          <a href={this.repo.html_url}>
          {this.repo.full_name}
          </a>
        </li>
      )
}

});

module.exports = RepoView;
