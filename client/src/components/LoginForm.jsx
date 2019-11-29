import React from "react";
import { Link } from "react-router-dom";
import { login } from "../apis";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", error: null };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(event) {
    event.preventDefault();
    if (!this.isValid) return null;
    const { username, password } = this.state;
    const user = await login({ username, password });
    if (user) {
      this.props.onLogin(user);
    } else {
      this.setState({
        error: "Invalid username or password"
      });
    }
  }

  onChange(field, value) {
    this.setState({
      [field]: value,
      error: null
    });
  }

  get isValid() {
    const { username, password } = this.state;
    return username && password;
  }

  render() {
    const { username, password, error } = this.state;
    return (
      <div className="card m-3 p-3">
        <h2>Login</h2>
        <form onSubmit={this.onSubmit}>
          {error ? <div className="alert alert-danger">{error}</div> : null}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              className="form-control"
              type="text"
              value={username}
              required
              minLength="5"
              maxLength="20"
              onChange={event => {
                this.onChange("username", event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="form-control"
              type="password"
              value={password}
              required
              minLength="6"
              maxLength="30"
              onChange={event => {
                this.onChange("password", event.target.value);
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <Link to="/register" className="btn btn-link">
            Register
          </Link>
        </form>
      </div>
    );
  }
}

export default LoginForm;
