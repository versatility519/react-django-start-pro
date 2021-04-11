import React, { Component, Fragment} from 'react';
import {withAlert} from 'react-alert';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';


export class Alerts extends Component{

    static propTypes = {

    }


    static propTypes = {
        error : PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }


//    componentDidMount(){
//        this.props.alert.show("Its works");
//    }


    componentDidUpdate(prevProps){
        const {error , alert , message} = this.props; //destructuring props from mapStateToProps
        //checking of the previous props is not equal to the latest coming props for errors
        // comparing the previous props with the latest
        if(error !== prevProps.error){
            //checking individual field for its error message from the server
            if(error.msg.name) alert.error(`Name: ${error.msg.name.join()}`); //join() turns the array to a string
            if(error.msg.email) alert.error(`Email : ${error.msg.email.join()}`);
            if(error.msg.message) alert.error(`Message : ${error.msg.message.join()}`);
            if(error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
            if(error.msg.username) alert.error (error.msg.username.join());
        }



        if(message !== prevProps.message){

            if(message.deleteLead) alert.success(message.deleteLead);
            if(message.addLead) alert.success(message.deleteLead);
            if(message.passwordNotMatch) alert.error(message.passwordNotMatch);
          }
       }

    render(){
        return  <Fragment />;
        }
}

const mapStateToProps = state => ({
    error : state.errors,
    message : state.messages
})

export default connect(mapStateToProps)(withAlert(Alerts));