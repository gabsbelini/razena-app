import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  doLogin: ['credentials'],
  createUser: ['credentials'],
  createUserSuccess: ['payload'],
  loginSuccess: ['payload'],
  loginFailure: null,
});

export const LoginTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  credentials: null,
  loginFetching: false,
  createUserFetching: false,
  payload: {},
  token: "nao tem token",
  error: null,
  username: '',
  email: '',
  userId: null
});

/* ------------- Selectors ------------- */

export const LoginSelectors = {
  getToken: state => state.login.token,
  isLoginFetching: state => state.login.loginFetching,
  isCreateUserFetching: state => state.login.createUserFetching,
  getUserId: state => state.login.userId
};

/* ------------- Reducers ------------- */

export const doLogin = (state, { credentials }) =>
  state.merge({
    loginFetching: true,
    credentials,
    payload: null,
  });

export const createUser = (state, { credentials }) =>
  state.merge({
    createUserFetching: true,
    credentials,
    payload: null
  })

export const createUserSuccess = (state, { payload }) =>
  state.merge({
    createUserFetching: false,
    error: null,
    userId: payload.id
  })

export const success = (state, { payload }) =>
  state.merge({
    token: payload.id,
    loginFetching: false,
    error: null,
    userId: payload.userId
  });

export const failure = state =>
  state.merge({
    credentials: null,
    loginFetching: false,
    createUserFetching: false,
    error: true,
    payload: null
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DO_LOGIN]: doLogin,
  [Types.CREATE_USER]: createUser,
  [Types.CREATE_USER_SUCCESS]: createUserSuccess,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
});
