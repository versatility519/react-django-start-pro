import { CREATE_MESSAGE , GET_ERRORS} from './types';


//CREATE MESSAGE for success messages
export const createMessage = msg =>{
   return {
        type : CREATE_MESSAGE,
        payload : msg
   };
};



//RETURN ERRORS for errors
export const returnErrors = (msg , status) => {
    return {
        type: GET_ERRORS,
        payload : {msg,status}
    }

  }