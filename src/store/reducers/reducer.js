import * as actionTypes from "../actions/actionTypes";

let initialState = {
  isLogin: false,
  token: null,
  userId: null,
  auth_fail: false,
  employees: [],
  fetched: false,
};

const reducer = (state = initialState, actions) => {
  switch (actions.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        authStatus: !initialState.authStatus,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: actions.token,
        userId: actions.userId,
        auth_fail: false,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
        auth_fail: false,
        employees: [],
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        token: null,
        userId: null,
        auth_fail: true,
      };
    case actionTypes.FETCH_SUCCESS:
      return {
        ...state,
        employees: actions.empdata,
        fetched: actions.fetched,
      };
    case actionTypes.ADD_SUCCESS:
      return {
        ...state,
        employees: state.employees.concat(actions.empdata),
      };
    case actionTypes.UPDATE_SUCCESS:
      const emp = { ...actions.data, keyID: actions.key };
      const updatedEmp = [...state.employees];
      const getIndex = updatedEmp.findIndex((x) => x.keyID === actions.key);
      updatedEmp[getIndex] = emp;
      return {
        ...state,
        employees: updatedEmp,
      };
    default:
      return state;
  }
};

export default reducer;
