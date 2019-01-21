import { CREATE_BUSINESS, FETCH_BUSINESSES, BUSINESS_ACTION_FAILED,
  INTERNAL_SERVER_ERROR, SEARCH_BUSINESSES } from "../actions/actionTypes";
import { toast } from "react-toastify";

const initialState = {
  data: { businesses: []}
};

export default function(state = initialState, action){
  switch (action.type){
    case FETCH_BUSINESSES:
      return Object.assign({}, state, {data: action.payload});
    case CREATE_BUSINESS:
      return Object.assign({}, state, {data: action.payload});
    case SEARCH_BUSINESSES:
      toast.success("We have found "+action.payload.count + " results", {position: toast.POSITION.TOP_CENTER});
      return Object.assign({}, state, {data: action.payload});
    case BUSINESS_ACTION_FAILED:
      toast.error(action.payload.Message, { position: toast.POSITION.BOTTOM_CENTER });
      return state;
    case INTERNAL_SERVER_ERROR:
      toast.error("Server ERROR Contact Administrator",{ position: toast.POSITION.BOTTOM_CENTER });
      return state;
    default:
      return state;
  }
}