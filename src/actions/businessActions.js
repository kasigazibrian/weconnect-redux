import {
  FETCH_BUSINESSES,
  BUSINESS_ACTION_FAILED,
  INTERNAL_SERVER_ERROR, REGISTER_BUSINESS, EDIT_BUSINESS, GET_BUSINESS, DELETE_BUSINESS, ADD_REVIEW, FETCH_REVIEWS
} from "./actionTypes";
import axios from "axios";
import Config from "../App.config";

export const getBusinesses = (
  page,
  pageSize,
  businessName = "",
  category = "",
  location = ""
) => dispatch => {
  axios
    .get(
      `${
        Config.API_BASE_URL
      }/api/v2/businesses?limit=${pageSize}&page=${page}&q=${businessName}&category=${category}&location=${location}`
    )
    .then(response => {
      let searchAction = !!businessName || !!category || !!location;
      dispatch({
        payload: {
          businesses: response.data.Businesses,
          count: response.data.count,
          perPage: response.data.limit,
          isActive: response.data.page,
          searchAction: searchAction,
          businessName: businessName,
          category: category,
          location: location
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

export const createBusiness = (business) => (dispatch) => {
  axios.defaults.headers.common["access-token"] = localStorage.getItem("token");
  axios.post(`${Config.API_BASE_URL}/api/v2/businesses`,
    JSON.stringify(business),
    {
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      return dispatch({
        payload: response.data,
        type: REGISTER_BUSINESS
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

export const updateBusiness = (business) => (dispatch) => {
  axios.defaults.headers.common["access-token"] = localStorage.getItem("token");
  axios.put(`${Config.API_BASE_URL}/api/v2/businesses`,
    JSON.stringify(business),
    {
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => {
      return dispatch({
        payload: response.data,
        type: EDIT_BUSINESS
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

export const getBusiness = (business_id) => (dispatch) => {
  axios.get(`${Config.API_BASE_URL}/api/v2/businesses/${business_id}`)
    .then(response => {
      return dispatch({
        payload: response.data,
        type: GET_BUSINESS
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


export const deleteBusiness = (business_id) => (dispatch) => {
  axios.defaults.headers.common['access-token'] = localStorage.getItem('token');
  axios.delete(`${Config.API_BASE_URL}/api/v2/businesses/${business_id}`, {
    headers: {'Content-Type':'application/json'}
  })
    .then(response => {
      return dispatch({
        payload: response.data,
        type: DELETE_BUSINESS
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

export const addReview = (business_id, review) => (dispatch) => {
  axios.post(`${Config.API_BASE_URL}/api/v2/businesses/${business_id}/reviews`, JSON.stringify(review),
    {
      headers: {'Content-Type':'application/json'}
    })
    .then(response => {
      return dispatch({
        payload: response.data,
        type: ADD_REVIEW
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

export const getReviews = (business_id) => (dispatch) => {
  axios.get(`${Config.API_BASE_URL}/api/v2/businesses/${business_id}/reviews`)
    .then(response => {
      return dispatch({
        payload: response.data,
        type: FETCH_REVIEWS
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




