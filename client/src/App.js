import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import { fetchUser } from "./apis";
import "bootstrap/dist/css/bootstrap.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
    this.onLogin = this.onLogin.bind(this);
  }

  async componentDidMount() {
    const user = await fetchUser();
    this.setState({ user, loading: false });
  }

  onLogin(user) {
    this.setState(user);
    window.history.pushState(null, null, "/courseworks");
  }

  render() {
    const { loading, user } = this.state;
    if (loading) return null;
    return (
      <div className="container">
        <Router>
          <>
            <Route exact path="/">
              <Redirect to={user ? "/courseworks" : "/login"} />
            </Route>
            <Route path="/login">
              <LoginForm onLogin={this.onLogin} />
            </Route>
            <Route path="/register">
              <RegisterForm onLogin={this.onLogin} />
            </Route>
          </>
        </Router>
      </div>
    );
  }
}

export default App;
