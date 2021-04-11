import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { createMessage } from "../../actions/messages";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { password, password2 } = this.state;
    
    if (password !== password2) {
      // createMessage is exposed to dispatch automatically
      this.props.createMessage({
        passwordNotMatch: " Passwords do not match ",
      });
    } else {
      const newUser = {
        username,
        email,
        password,
      };

      this.props.register(newUser);
    }
  };

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    //checks if the state isAuthenticated property is true i.e user is authenticated then redirect to dashb
    if (this.props.isAuthenticated) {
      return <Redirect to="/login" />;
    }

    const { username, email, password, password2 } = this.state;

    return (
      <Fragment>
        <div className="card mt-4 mb-2">
          <h3 className="card-header info-color white-text text-center py-4 ">
            <strong> Register </strong>
          </h3>

          <div className="card-body px-lg-5 pt-0">
            <form className="text-center" onSubmit={this.onSubmit}>
              <div className="md-form">
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  onChange={this.onChange}
                  value={username}
                />
                <label htmlFor="username">Username</label>
              </div>

              <div className="md-form">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  onChange={this.onChange}
                  value={email}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="md-form">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  onChange={this.onChange}
                  value={password}
                />
                <label htmlFor="password"> Password </label>
              </div>

              <div className="md-form">
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  className="form-control"
                  onChange={this.onChange}
                  value={password2}
                />
                <label htmlFor="password"> Confirm Password </label>
              </div>

              <div className="form-group">
                <button
                  className="btn btn-primary btn-rounded btn-block my-4 waves-effect z-depth-0"
                  type="submit"
                >
                  {" "}
                  Register{" "}
                </button>
              </div>

              <p>
                Already have an account ? <Link to="/login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, createMessage })(Register);
