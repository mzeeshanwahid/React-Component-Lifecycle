import React, { Component } from "react";
import SearchForm from "./components/SearchForm";
import DisplayPanel from "./components/DisplayPanel";
import Axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResult: "",
      hasError: false,
      searchType: ""
    };
  }

  handleSearch = async text => {
    if (this.state.searchType === "") return alert("Select Search Type First!");

    console.log("Searching ...");
    var url = "https://api.github.com/search/repositories?q=" + text;

    if (this.state.searchType === "user")
      url = "https://api.github.com/users/" + text + "/repos";

    let res = await Axios.get(url);
    console.log("Result", res);

    if (this.state.searchType === "public") {
      this.setState({ searchResult: res.data });
    } else {
      this.setState({ searchResult: res.data });
    }
  };

  handleSelect = e => {
    this.setState({ searchType: e.target.value });
  };

  componentDidMount() {
    /* componentDidMount() is invoked immediately after a component is mounted */

    console.log("App Component Mounted!");
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    /* getSnapshotBeforeUpdate() is invoked right before the most recently
     rendered output is committed to e.g. the DOM. It enables your component
      to capture some information from the DOM (e.g. scroll position) before
      it is potentially changed. */

    if (prevState.searchResult === "") {
      console.log("Previous Search Result was blank!");
    }
    return null;
  }

  componentDidUpdate() {
    /* componentDidUpdate() is invoked immediately after updating occurs. 
    This method is not called for the initial render. */

    if (this.state.searchResult !== "" && this.state.searchResult !== 0) {
      console.log("Component Updated Successfully!");
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    /* componentDidCatch() is called during the “commit” phase, 
    so side-effects are permitted. It should be used for things 
    like logging errors */
  }

  componentWillUnmount() {
    /* This method is called when a component is being removed from the DOM*/

    console.log("App Component UnMounted!");
  }

  render() {
    if (!this.state.hasError)
      return (
        <div>
          <h1>New React App</h1>
          <hr />
          <SearchForm handleSearch={this.handleSearch} />
          <br />
          <input
            type="radio"
            name="searchType"
            value="public"
            onChange={this.handleSelect}
          />
          Public Repositories
          <br />
          <input
            type="radio"
            name="searchType"
            value="user"
            onChange={this.handleSelect}
          />
          User Repositories
          <br />
          <hr />
          <DisplayPanel
            data={this.state.searchResult}
            searchType={this.state.searchType}
          />
        </div>
      );

    return "<h1>Invalid Error Occurred!</h1>";
  }
}

export default App;
