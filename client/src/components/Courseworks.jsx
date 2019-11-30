import React from "react";
import { Link } from "react-router-dom";
import { fetchCourseworks } from "../apis";

class Courseworks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseworks: null,
      loading: true
    };
  }

  async componentDidMount() {
    const courseworks = await fetchCourseworks();
    this.setState({
      courseworks,
      loading: false
    });
  }

  renderRows() {
    const { courseworks } = this.state;
    return courseworks
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map(coursework => {
        const { id, name, date, file } = coursework;
        return (
          <tr key={id}>
            <td>{name}</td>
            <td>{date}</td>
            <td>
              <a href={file} download>
                Download
              </a>
            </td>
          </tr>
        );
      });
  }

  render() {
    const { loading } = this.state;
    if (loading) return "Loading";
    const { onLogout } = this.props;
    return (
      <div className="card m-3 p-3">
        <h2>Course works</h2>
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Upload date</th>
              <th>File</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
        <div>
          <Link to="/upload" className="btn btn-primary">
            Upload new
          </Link>
          <button className="btn btn-link" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default Courseworks;
