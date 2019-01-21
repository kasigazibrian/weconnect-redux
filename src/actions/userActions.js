import {SIGN_UP, USER_ACTION_FAILED,
  LOGIN_FAILED,
  INTERNAL_SERVER_ERROR,
  LOGIN, GET_USER_PROFILE, CHANGE_PASSWORD } from "./actionTypes";
import axios from 'axios';
import Config from '../App.config';

export const signUp = (user) => (dispatch) => {
  axios.post(`${Config.API_BASE_URL}/api/v2/auth/register`,
    JSON.stringify(user),
    {
      headers: {'Content-Type':'application/json'}
    })
    .then (response => {
      return dispatch({
        payload: response.data,
        type: SIGN_UP
      });
    })
    .catch(error =>{
      if(error.response !== undefined) {
        return dispatch({
          payload: error.response.data,
          type: USER_ACTION_FAILED
        });
      }
      else{
        return dispatch({
          payload: null,
          type: INTERNAL_SERVER_ERROR
        });
      }
    });

};

export const logIn = (userCredentials) => (dispatch) => {
  axios.post(`${Config.API_BASE_URL}/api/v2/login`,
    JSON.stringify(userCredentials),
    {
      headers: {'Content-Type':'application/json'}
    })
    .then(response => {
      return dispatch({
        payload: response.data,
        type: LOGIN
      });

    })
    .catch(error =>{
      if(error.response !== undefined) {
        return dispatch({
          payload: error.response.data,
          type: LOGIN_FAILED
        });
      }
      else{
        return dispatch({
          payload: null,
          type: INTERNAL_SERVER_ERROR
        });
      }
    });
};

export const getUserProfile = (token) => (dispatch) => {
  axios.defaults.headers.common['access-token'] = token;
  axios.get(`${Config.API_BASE_URL}/api/v2/auth/register`,  {
    headers: {'Content-Type':'application/json'}
  })
    .then(response=> {
      return dispatch({
        type: GET_USER_PROFILE,
        payload: response.data
      });
    })
    .catch(error =>{
      if(error.response !== undefined) {
        return dispatch({
          payload: error.response.data,
          type: USER_ACTION_FAILED
        });
      }
      else{
        return dispatch({
          payload: null,
          type: INTERNAL_SERVER_ERROR
        });
      }
    });
};

export const changePassword = (newPassword, token) => (dispatch) => {
  axios.defaults.headers.common['access-token'] = token;
  axios.post(`${Config.API_BASE_URL}/api/v2/auth/reset-password`, JSON.stringify(newPassword), {
    headers: {'Content-Type':'application/json', 'Accept': 'application/json'}
  })
    .then(response=> {
      return dispatch({
        type: CHANGE_PASSWORD,
        payload: response.data
      });
    })
    .catch(error =>{
      if(error.response !== undefined) {
        return dispatch({
          payload: error.response.data,
          type: USER_ACTION_FAILED
        });
      }
      else{
        return dispatch({
          payload: null,
          type: INTERNAL_SERVER_ERROR
        });
      }
    });
};
