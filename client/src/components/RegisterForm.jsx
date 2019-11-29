import React from "react";
import { Link } from "react-router-dom";
import { register } from "../apis";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      repeatPassword: "",
      firstName: "",
      middleName: "",
      lastName: "",
      facnum: "",
      specialty: "",
      course: 1,
      educationType: "ft",
      error: null
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  async onSubmit(event) {
    event.preventDefault();
    if (!this.isValid) return null;
    const {
      username,
      password,
      firstName,
      middleName,
      lastName,
      specialty,
      course,
      educationType,
      facnum
    } = this.state;
    const user = await register({
      username,
      password,
      firstName,
      middleName,
      lastName,
      specialty,
      course,
      educationType,
      facnum
    });
    if (user) {
      this.props.onLogin(user);
    } else {
      this.setState({
        error: "Could not create user"
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
    const {
      username,
      password,
      repeatPassword,
      firstName,
      lastName,
      facnum,
      specialty
    } = this.state;
    return (
      username &&
      password &&
      repeatPassword &&
      password === repeatPassword &&
      firstName &&
      lastName &&
      specialty &&
      facnum
    );
  }

  render() {
    const {
      username,
      password,
      repeatPassword,
      firstName,
      middleName,
      lastName,
      specialty,
      course,
      educationType,
      facnum,
      error
    } = this.state;
    return (
      <div className="card m-3 p-3">
        <h2>Register</h2>
        <form onSubmit={this.onSubmit}>
          {error ? <div className="alert alert-danger">{error}</div> : null}
          <div className="form-group">
            <label htmlFor="firstName">First name</label>
            <input
              id="firstName"
              className="form-control"
              type="text"
              value={firstName}
              required
              maxLength="100"
              onChange={event => {
                this.setState({
                  firstName: event.target.value
                });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="middleName">Middle name</label>
            <input
              id="middleName"
              className="form-control"
              type="text"
              value={middleName}
              maxLength="100"
              onChange={event => {
                this.setState({
                  middleName: event.target.value
                });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last name</label>
            <input
              id="lastName"
              className="form-control"
              type="text"
              value={lastName}
              required
              maxLength="100"
              onChange={event => {
                this.setState({
                  lastName: event.target.value
                });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="facnum">Fac. number</label>
            <input
              id="facnum"
              className="form-control"
              type="text"
              value={facnum}
              required
              minLength="10"
              maxLength="10"
              onChange={event => {
                this.setState({
                  facnum: event.target.value
                });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="specialty">Specialty</label>
            <input
              id="specialty"
              className="form-control"
              type="text"
              value={specialty}
              required
              maxLength="100"
              onChange={event => {
                this.setState({
                  specialty: event.target.value
                });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="course">Course</label>
            <select
              name="course"
              className="form-control"
              value={String(course)}
              onChange={event => {
                this.setState({
                  course: Number(event.target.value)
                });
              }}
              id="course"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="educationType">Education type</label>
            <select
              name="educationType"
              className="form-control"
              value={educationType}
              onChange={event => {
                this.setState({
                  educationType: event.target.value
                });
              }}
              id="educationType"
            >
              <option value="ft">Full-time</option>
              <option value="pt">Part-time</option>
            </select>
          </div>
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
                this.setState({
                  username: event.target.value
                });
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
                this.setState({
                  password: event.target.value
                });
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="repeatPassword">Repeat password</label>
            <input
              id="repeatPassword"
              className="form-control"
              type="password"
              value={repeatPassword}
              required
              minLength="6"
              maxLength="30"
              onChange={event => {
                this.setState({
                  repeatPassword: event.target.value
                });
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          <Link to="/login" className="btn btn-link">
            Login
          </Link>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
