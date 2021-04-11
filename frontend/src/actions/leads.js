import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";
import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "./types";

//GET LEADS
export const getLeads = () => (dispatch, getState) => {
  axios
    .get("/api/lead", tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_LEADS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};





//DELETE LEADS
//id=> is the parameter passed to the argument as object/item to be deleted
export const deleteLead = (id) => (dispatch, getState) => {
  axios
    .delete(`api/lead/${id}`, tokenConfig(getState))
    .then((res) => {
      //            console.log(`${id} deleted`);
      //            alert('Deleted Successfully!');
      dispatch(createMessage({ deleteLead: "Lead Deleted Successfully" }));
      dispatch({
        type: DELETE_LEAD,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};





//Add Lead
export const addLead = (lead) => (dispatch, getState) => {
  axios
    .post("/api/lead/", lead, tokenConfig(getState))
    .then((res) => {
      console.log(res.data);
      dispatch(createMessage({ addLead: "Lead Added Successfully" }));
      dispatch({
        type: ADD_LEAD,
        payload: res.data,
      });
    })
    .catch((err) =>{
      console.log(err.response);
      dispatch(returnErrors(err.response.data, err.response.status))
    }
    );
};
