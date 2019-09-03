import React, { Component } from "react";

class DisplayPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      output: props.data
    };
  }

  componentDidMount() {
    /* componentDidMount() is invoked immediately after a component is mounted */

    console.log("Display Component Mounted!");
  }

  shouldComponentUpdate(nextProps, nextState) {
    /* shouldComponentUpdate() to let React know if a 
    component’s output is not affected by the current 
    change in state or props. */

    if (this.props.data !== nextProps.data) {
      console.log("Component Should Updated!");
      return true;
    }

    return false;
  }

  static getDerivedStateFromProps(props, state) {
    /* getDerivedStateFromProps is invoked right before calling
    the render method, both on the initial mount and on 
    subsequent updates. It should return an object to update 
    the state, or null to update nothing. */

    return { output: props.data };
  }

  render() {
    let data = this.state.output;
    console.log("Data recieved", data);

    if (this.props.searchType === "user")
      return (
        <div>
          <h4>Total Repositries: {data.length}</h4>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Desciption</th>
                <th>Language</th>
                <th>URL</th>
                <th>Last Updated</th>
                <th>Owner</th>
                <th>Profile</th>
              </tr>
            </thead>
            <tbody>
              {data.map(record => {
                return (
                  <tr key={record.id}>
                    <td>{record.name}</td>
                    <td>{record.description}</td>
                    <td>{record.language}</td>
                    <td>{record.html_url}</td>
                    <td>{record.pushed_at}</td>
                    <td>{record.owner.login}</td>
                    <td>{record.owner.html_url}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );

      if (this.props.searchType === "public")
      return (
        <div>
          <h4>Total Repositries: {data.total_count}</h4>
          { data.total_count > 30 && <span>Showing first 30 records!</span>}
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Desciption</th>
                <th>URL</th>
                <th>Owner</th>
                <th>Profile</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map(record => {
                return (
                  <tr key={record.id}>
                    <td>{record.name}</td>
                    <td>{record.description}</td>
                    <td>{record.url}</td>
                    <td>{record.owner.login}</td>
                    <td>{record.owner.html_url}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );

    return null;
  }
}

export default DisplayPanel;
