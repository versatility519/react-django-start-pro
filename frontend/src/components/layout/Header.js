import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import { logout } from '../../actions/auth';
import * as authActions from "../../actions/auth";
import { bindActionCreators } from "redux";

class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    return (
      <nav className="navbar navbar-expand-sm navbar-dark primary-color">
        <div className="container">
          <a className="navbar-brand" href="/">
            {" "}
            Aiziks Infotech{" "}
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#basicExampleNav"
            aria-controls="basicExampleNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="basicExampleNav">
            {isAuthenticated ? (
              <ul className="navbar-nav ml-auto">
                <span className="navbar-text mr-3">
                  <strong>{user ? `Welcome ${user.username}` : ""}</strong>
                </span>
                <li className="nav-item">
                  <button
                    onClick={this.props.actions.logout}
                    className="nav-link  btn btn-info btn-sm text-light"
                  >
                    {" "}
                    Logout{" "}
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    {" "}
                    Register{" "}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    {" "}
                    Login{" "}
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
    return {
  actions: bindActionCreators(authActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
