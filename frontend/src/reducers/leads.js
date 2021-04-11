//importing the action type from the actions folder
import { GET_LEADS, DELETE_LEAD, ADD_LEAD } from "../actions/types";

//defining the initial state of our reducer
//anything we fetch from the backend will be stored in the state
const initialState = {
  leads: [],
};



//we will now export  our reducer function which takes in reducer current state and the action being dispatch from store
export default function (state = initialState, action) {
  //        console.log(action.payload);
  switch (
    action.type //switching the action type
  ) {
    case GET_LEADS: //checking the action type
      
      return {
        //returning the new reducer object
        ...state, //this is spread operator which is extracting the state object properties and values to form another object which we intent to return
        leads: action.payload,
      };

    case DELETE_LEAD:
        
      return {
         ...state, //any current state using the spread operator
         leads : state.leads.filter(lead => lead.id !== action.payload)
        
      };

    case ADD_LEAD:
      return {
        ...state,
        leads : [...state.leads , action.payload]
      };

    default:
      return state;
  }
}
