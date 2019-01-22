import {
  FETCH_BUSINESSES,
  BUSINESS_ACTION_FAILED,
  INTERNAL_SERVER_ERROR,
  SEARCH_BUSINESSES
} from "./actionTypes";
import axios from "axios";
import Config from "../App.config";

export const getBusinesses = (page, pageSize) => dispatch => {
  axios
    .get(
      `${Config.API_BASE_URL}/api/v2/businesses?limit=${pageSize}&page=${page}`
    )
    .then(response => {
      dispatch({
        payload: {
          businesses: response.data.Businesses,
          count: response.data.count,
          perPage: response.data.limit,
          isActive: response.data.page
        },
        type: FETCH_BUSINESSES
      });
    })
    .catch(error => {
      if (error.response !== undefined) {
        dispatch({
          payload: error.response.data,
          type: BUSINESS_ACTION_FAILED
        });
      } else {
        dispatch({
          payload: null,
          type: INTERNAL_SERVER_ERROR
        });
      }
    });
};

export const searchBusinesses = (
  businessName,
  category,
  location
) => dispatch => {
  // Search get request to the API
  axios
    .get(
      `${
        Config.API_BASE_URL
      }/api/v2/businesses?q=${businessName}&category=${category}&location=${location}`,
      {
        headers: { "Content-Type": "application/json" }
      }
    )
    .then(response => {
      return dispatch({
        type: SEARCH_BUSINESSES,
        payload: response.data
      });
    })
    .catch(error => {
      if (error.response !== undefined) {
        return dispatch({
          payload: error.response.data,
          type: BUSINESS_ACTION_FAILED
        });
      } else {
        return dispatch({
          payload: null,
          type: INTERNAL_SERVER_ERROR
        });
      }
    });
};
