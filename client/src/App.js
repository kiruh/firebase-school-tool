import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Courseworks from "./components/Courseworks";
import UploadForm from "./components/UploadForm";
import { fetchUser, logout } from "./apis";
import "bootstrap/dist/css/bootstrap.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  async componentDidMount() {
    const user = await fetchUser();
    this.setState({ user, loading: false });
  }

  onLogin(user) {
    this.setState({ user });
    window.history.pushState(null, null, "/courseworks");
  }

  async onLogout() {
    await logout();
    this.setState({ user: null });
    window.history.pushState(null, null, "/login");
  }

  renderContent() {
    const { loading, user } = this.state;
    if (loading) return "Loading";
    const authRequired = node => (user ? node : <Redirect to="/login" />);
    const anonRequired = node =>
      !user ? node : <Redirect to="/courseworks" />;
    return (
      <Router>
        <>
          <Route exact path="/">
            <Redirect to={user ? "/courseworks" : "/login"} />
          </Route>
          <Route path="/login">
            {anonRequired(<LoginForm onLogin={this.onLogin} />)}
          </Route>
          <Route path="/register">
            {anonRequired(<RegisterForm onLogin={this.onLogin} />)}
          </Route>
          <Route path="/courseworks">
            {authRequired(<Courseworks onLogout={this.onLogout} />)}
          </Route>
          <Route path="/upload">{authRequired(<UploadForm />)}</Route>
        </>
      </Router>
    );
  }

  render() {
    return <div className="container">{this.renderContent()}</div>;
  }
}

export default App;
