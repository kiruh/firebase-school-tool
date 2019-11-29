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

  render() {
    const { loading } = this.state;
    if (loading) return "Loading";
    const { onLogout } = this.props;
    return (
      <div className="card m-3 p-3">
        <h2>Course works</h2>
        <table></table>
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
