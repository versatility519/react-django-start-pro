//THE ROOT REDUCER is the meeting place for every other reducers
//e.g leadReducer has to do with leads
//e.g authReducer is reducer that has to do with authentications
//e.g errorReducer is reducer that has to do with bringing errors to which component we want to bring error into
import { combineReducers } from 'redux';
import leads from './leads';
import errors  from  './errors';
import messages  from  './messages';
import auth from './auth';

//
export default combineReducers({
        leads,
        errors,
        messages,
        auth
    });

//const rootReducer  = combineReducers({
//                    leads,
//                    errors,
//                    messages,
//                    auth
//        });
////
//export default rootReducer;