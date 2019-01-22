import {
  SIGN_UP,
  LOGIN,
  LOGIN_FAILED,
  USER_ACTION_FAILED,
  INTERNAL_SERVER_ERROR,
  GET_USER_PROFILE,
  CHANGE_PASSWORD,
  LOG_OUT,
  LOG_OUT_FAILED
} from "../actions/actionTypes";
import { toast } from "react-toastify";

const initialState = {
  data: {
    User: {},
    Token: "",
    Status: "",
    Message: "",
    Businesses: [],
    passwordChanged: false,
    authenticationStatus: !!localStorage.getItem("token")
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SIGN_UP:
      toast.success(`${action.payload.Message}! You can now login!`, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return { data: { ...state.data, ...action.payload } };
    case LOGIN:
      localStorage.setItem("token", action.payload.Token);
      toast.success(action.payload.Message, {
        position: toast.POSITION.TOP_CENTER
      });
      return {
        data: { ...state.data, ...action.payload, authenticationStatus: true }
      };
    case LOG_OUT:
      localStorage.removeItem("token");
      toast.success(action.payload.Message, {
        position: toast.POSITION.TOP_CENTER
      });
      return { data: { ...state.data, ...action.payload, authenticationStatus: false } };
    case GET_USER_PROFILE:
      return {
        data: { ...state.data, ...action.payload }
      };
    case CHANGE_PASSWORD:
      toast.success(action.payload.Message, {
        position: toast.POSITION.TOP_CENTER
      });
      return { data: { ...state.data, passwordChanged: true } };
    case LOGIN_FAILED:
      toast.error(action.payload.Message, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return state;
    case LOG_OUT_FAILED:
      localStorage.removeItem("token");
      toast.error(action.payload.Message, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return { data: { ...state.data, loggedOut: true } };
    case USER_ACTION_FAILED:
      toast.error(action.payload.Message, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return state;
    case INTERNAL_SERVER_ERROR:
      toast.error("Server ERROR Contact Administrator", {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return state;
    default:
      return state;
  }
}
