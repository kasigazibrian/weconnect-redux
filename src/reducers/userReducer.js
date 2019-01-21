import {
  SIGN_UP,
  LOGIN,
  LOGIN_FAILED,
  USER_ACTION_FAILED,
  INTERNAL_SERVER_ERROR,
  GET_USER_PROFILE, CHANGE_PASSWORD
} from "../actions/actionTypes";
import { toast } from "react-toastify";

const initialState = {
  data: { User: {}, Token: "", Status: "", Message: "", Businesses: [], passwordChanged: false }
};

export default function(state = initialState, action){
  switch (action.type){
    case SIGN_UP:
      toast.success(`${action.payload.Message}! You can now login!`,{position: toast.POSITION.BOTTOM_CENTER});
      return { data: { ...state.data, ...action.payload }};
    case LOGIN:
      localStorage.setItem('token', action.payload.Token);
      toast.success(action.payload.Message, {position: toast.POSITION.TOP_CENTER});
      return Object.assign({}, state, {data: action.payload});
    case GET_USER_PROFILE:
      return Object.assign({}, state, {data: action.payload});
    case CHANGE_PASSWORD:
      toast.success(action.payload.Message,{position: toast.POSITION.TOP_CENTER});
      return { data: {...state.data, passwordChanged: true} };
    case LOGIN_FAILED:
      toast.error(action.payload.Message, { position: toast.POSITION.BOTTOM_CENTER });
      return state;
    case USER_ACTION_FAILED:
      toast.error(action.payload.Message, { position: toast.POSITION.BOTTOM_CENTER });
      return state;
    case INTERNAL_SERVER_ERROR:
      toast.error("Server ERROR Contact Administrator",{ position: toast.POSITION.BOTTOM_CENTER });
      return state;
    default:
      return state
  }
}