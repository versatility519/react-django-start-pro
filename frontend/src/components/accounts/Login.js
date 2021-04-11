import React , {Component , Fragment } from 'react';
import { Link , Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import {login} from '../../actions/auth';
import * as authActions from '../../actions/auth';
import { bindActionCreators } from "redux";

export class Login extends Component{
    state = {
        username : '',
        password : ''
    }

    static propTypes = {
        actions : PropTypes.object.isRequired,
        isAuthenticated : PropTypes.bool
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.actions.login(this.state.username , this.state.password);
    }

    onChange = e => this.setState({ [e.target.name] : e.target.value });

    render(){
        // redirect user to the dashboard if the user is authenticated
        if(this.props.isAuthenticated){
            return <Redirect to="/" />;
        }

        const {username , password  } = this.state;

         return (
        <Fragment>

         <div className="card mt-4 mb-2">
              <h3 className="card-header info-color white-text text-center py-4 ">
                <strong> Login </strong>
         </h3>
            <div className="card-body px-lg-5 pt-0">
            <form className="text-center" onSubmit={this.onSubmit} >
                  <div className="md-form">
                    <input type="text" id="username" name="username" className="form-control" onChange={this.onChange}  value={username} />
                    <label  htmlFor="username" >Username</label>
                  </div>

                 <div className="md-form">
                    <input type="password" id="password" name="password" className="form-control" onChange={this.onChange}  value={password}  />
                    <label  htmlFor="password" > Password </label>
                  </div>


                 <div className="form-group">
                  <button className="btn btn-primary btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit"> Login </button>
                 </div>

                 <p>
                    Dont have an account ? <Link to="/register" >Register</Link>
                 </p>

            </form>

        </div>
        </div>
       </Fragment>

        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
    // this line binds all our actions in one line
    actions: bindActionCreators(authActions, dispatch),
    
  });

export default connect(mapStateToProps , mapDispatchToProps )(Login);
