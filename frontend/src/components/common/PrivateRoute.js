//proxy for regular route to check if the user is logged in/ for any route we want to protect

import React from 'react';
import {Route , Redirect} from 'react-router-dom';
import  {connect} from 'react-redux';
import PropTypes from 'prop-types';


const PrivateRoute = ({component : Component , auth , ...rest}) => (
 
     <Route {...rest}
             render={props  => {
//            console.log(props);
          if(auth.isLoading){
                return <h2>Loading...</h2>;  //if the auth is still loading display loading
          }else if(!auth.isAuthenticated){  //i.e not logged-in
               return <Redirect to="/login" />; //redirect path to /login if the uer is not authenticated
          }else{
               return <Component {...props} />; //render the component as normal render here
            }
         }}

     />

    )


const mapStateToProps = state => ({
    auth : state.auth
});

export default connect(mapStateToProps)(PrivateRoute);