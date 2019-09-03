import React, { Component } from "react";

class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchableText: ""
    };
  }

  componentDidMount(){
    /* componentDidMount() is invoked immediately after a component is mounted */

    console.log("Search Component Mounted!");
  }

  handleInputChange = e => {
    this.setState({ searchableText: e.target.value });
  };

  handleSearch = () => {
    this.props.handleSearch(this.state.searchableText);
  };

  render() {
    return (
      <div>
        <form>
          <label>Enter repo name</label>
          <input
            name="text"
            type="text"
            onChange={this.handleInputChange}
            required
          />
          <input type="button" value="Search" onClick={this.handleSearch} />
        </form>
      </div>
    );
  }
}

export default SearchForm;
