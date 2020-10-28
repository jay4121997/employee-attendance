import axios from "axios";
import axiosMain from "../../axios-main";
import * as key from '../../key'
import * as actionTypes from "./actionTypes";

export const auth_start = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const auth_success = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    userId: userId,
  };
};
export const auth_fail = () => {
  return {
    type: actionTypes.AUTH_FAIL,
  };
};

export const auth = (email, password, isSignin) => {
  return (dispatch) => {
    dispatch(auth_start());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+key.key;
    if (isSignin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+key.key;
    }
    axios
      .post(url, authData)
      .then((responce) => {
        dispatch(auth_success(responce.data.idToken, responce.data.localId));
      })
      .catch((err) => {
        dispatch(auth_fail());
      });
  };
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
  };
};

export const addEmployee = (empData, token) => {
  return (dispatch) => {
    axiosMain
      .post("/employees.json?auth=" + token, empData)
      .then((responce) => {
        dispatch(addSuccess(empData, responce.data.name));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const addSuccess = (empData, id) => {
  let data = {
    ...empData,
    keyID: id,
  };
  return {
    type: actionTypes.ADD_SUCCESS,
    empdata: data,
  };
};

export const fetchSuccess = (empdata, id) => {
  return {
    type: actionTypes.FETCH_SUCCESS,
    empdata: empdata,
    fetched: true,
  };
};

export const viewEmployee = (token, userId) => {
  return (dispatch) => {
    const query =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axiosMain
      .get("/employees.json" + query)
      .then((res) => {
        const employess = [];
        for (let key in res.data) {
          employess.push({ ...res.data[key], keyID: key });
        }
        dispatch(fetchSuccess(employess));
      })
      .catch((err) => console.log(err));
  };
};

export const updateEmployee = (key, hrs, id, name, rate, userId, token) => {
  const employeData = {
    hrs: hrs,
    id: id,
    name: name,
    rate: rate,
    userId: userId,
  };
  return (dispatch) => {
    let query = "/employees/" + key + ".json?auth=" + token;
    axiosMain
      .put(query, employeData)
      .then((res) => dispatch(updateSuccess(key, res.data)))
      .catch((err) => console.log(err));
  };
};
export const updateSuccess = (key, data) => {
  return {
    type: actionTypes.UPDATE_SUCCESS,
    key: key,
    data: data,
  };
};
