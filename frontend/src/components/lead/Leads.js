import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; //whenever we have props in react we use PropTypes
import * as leadActions from '../../actions/leads';
import { bindActionCreators } from "redux";


 class Leads extends Component {

   

   static propTypes = {
        // leads : PropTypes.array.isRequired,
        // getLeads : PropTypes.func.isRequired,
        // deleteLead : PropTypes.func.isRequired
        actions : PropTypes.object.isRequired,
        
        
    }

    //componentDidMount react life cycle ; when the component mount on the browser before it loads
    //so se call get leads when the component mounts
    componentDidMount(){
        this.props.actions.getLeads();
    }

  render() {
      
    return (
        <Fragment>

            <table className="table table-striped w-100">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th />
                </tr>
              </thead>

              <tbody>

              {this.props.leads.map( lead => (

                <tr className="table-stripped" key={lead.id} >

                  <th scope="row">{lead.id}</th>
                  <td>{lead.name}</td>
                  <td>{lead.address}</td>
                  <td>{lead.email}</td>
                  <td>{lead.message}</td>

                  <td><button onClick={this.props.actions.deleteLead.bind(this, lead.id)} className="btn  btn-danger  btn-sm"  > Delete </button></td>

                </tr>

               ))}

              </tbody>
            </table>

                
        </Fragment>
    )
  }
}

//we are mapping our reducer state to props of this component i.e Leads component
const mapStateToProps = state => ({
        //the state is the state in the leads reducer IT MAY SEEMS A BIT TRICKY HERE ; TAKE NOTE
        //state.leads => is 'leads' reducer from the 'combine reducer' leads then to => leads
        //the second 'leads' is the leads value from the reducer state leads
        leads : state.leads.leads
    });


    const mapDispatchToProps = (dispatch) => ({
      // this line binds all our actions in one line
      actions: bindActionCreators(leadActions, dispatch),
      
    });

    a
export default connect(mapStateToProps, mapDispatchToProps)(Leads);
