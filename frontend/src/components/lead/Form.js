import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addLead } from "../../actions/leads";

export class Form extends Component {
  state = {
    name: "",
    email: "",
    message: "",
  };

  static propTypes = {
    addLead: PropTypes.func.isRequired,
    // leads : PropTypes.array.isRequired
  };

  //[e.target.name] accessing the array of form names
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = (e) => {
    e.preventDefault(); //will prevent the form from submitting on form submit
    const { name, email, message } = this.state;
    const lead = { name, email, message };

    this.props.addLead(lead);
    
    this.setState({
      name: "",
      email: "",
      message: "",
    });

    // console.log(this.props.leads);
  };

  render() {
    const { name, email, message } = this.state;

    return (
      <Fragment>
        <div className="card mt-4 mb-2">
          <h3 className="card-header info-color white-text text-center py-4 ">
            <strong>Add Lead</strong>
          </h3>
          <div className="card-body px-lg-5 pt-0">
            <form className="text-center" onSubmit={this.onSubmit}>
              <div className="md-form">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  onChange={this.onChange}
                  value={name}
                />
                <label htmlFor="name">Name</label>
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
                <label htmlFor="email">E-mail</label>
              </div>

              <div className="md-form">
                <textarea
                  id="message"
                  name="message"
                  className="form-control"
                  onChange={this.onChange}
                  value={message}
                ></textarea>
                <label htmlFor="message">message</label>
              </div>

              <button
                className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0"
                type="submit"
              >
                {" "}
                Add Lead{" "}
              </button>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

// const mapStateToProps = state => ({
//   leads : state.leads.leads

// })

export default connect(null, { addLead })(Form);
