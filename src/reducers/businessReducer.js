import {
  REGISTER_BUSINESS,
  FETCH_BUSINESSES,
  BUSINESS_ACTION_FAILED, GET_BUSINESS, DELETE_BUSINESS, ADD_REVIEW, FETCH_REVIEWS
} from "../actions/actionTypes";
import { toast } from "react-toastify";

const initialState = {
  data: { businesses: [], business: {}, reviews: [{review: "None"}], searchComplete: false }
};

export default function(state = initialState, action) {
  // let newState;
  switch (action.type) {
    case FETCH_BUSINESSES:
      if (action.payload.searchAction) {
        toast.success("We have found " + action.payload.count + " results", {
          position: toast.POSITION.TOP_CENTER
        });
        // newState  = { ...state.data, searchComplete: true }
      }
      return { data: { ...state.data, ...action.payload } };
    case GET_BUSINESS:
      return { data: { ...state.data, business: {...action.payload.Businesses[0]} } };
    case REGISTER_BUSINESS:
      toast.success(action.payload.Message, {position: toast.POSITION.BOTTOM_CENTER});
      return { data: { ...state.data, ...action.payload } };
    case FETCH_REVIEWS:
      return { data: { ...state.data, reviews: [...action.payload["Business Reviews"]] } };
    case ADD_REVIEW:
      toast.success(action.payload.Message, {position: toast.POSITION.BOTTOM_CENTER});
      return { data: { ...state.data, ...action.payload } };
    case DELETE_BUSINESS:
      toast.success(action.payload.Message,{position: toast.POSITION.TOP_CENTER});
      return { data: { ...state.data, ...action.payload } };
    case BUSINESS_ACTION_FAILED:
      toast.error(action.payload.Message, {
        position: toast.POSITION.BOTTOM_CENTER
      });
      return state;
    default:
      return state;
  }
}
