import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  getProdutos: ['token'],
  produtosSuccess: ['payload'],
  produtosFailure: null,
});

export const ProdutosTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  error: false,
  produtosList: {}
});

/* ------------- Selectors ------------- */

export const ProdutosSelectors = {
  getProdutos: state => state.produtos.produtosList || [],
};

/* ------------- Reducers ------------- */

export const request = state => state.merge({ fetching: true });

export const success = (state, { payload }) =>
  state.merge({
    fetching: false,
    error: false,
    produtosList: payload
  });

export const failure = state =>
  state.merge({ fetching: false, error: true, payload: {} });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PRODUTOS]: request,
  [Types.PRODUTOS_SUCCESS]: success,
  [Types.PRODUTOS_FAILURE]: failure,
});
