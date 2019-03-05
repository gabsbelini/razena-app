import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  createVenda: ['payload'],
  getVenda: ['token'],
  vendaConsumoSuccess: ['payload'],
  vendaConsumoFailure: null,
});

export const VendasConsumoTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetching: false,
  error: false,
  vendasList: {},
  vendaRequest: {}
});

/* ------------- Selectors ------------- */

export const VendasSelectors = {
  getVendas: state => state.vendas.vendasList || [],
};

/* ------------- Reducers ------------- */

export const request = state => state.merge({ fetching: true });

export const createVenda = (state, { payload }) =>
  state.merge({
    vendasList: payload
  });

export const success = (state, { payload }) =>
  state.merge({
    fetching: false,
    error: false,
    vendasList: payload
  });

export const failure = state =>
  state.merge({ fetching: false, error: true, payload: {} });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_VENDA]: createVenda,
  [Types.GET_VENDA]: request,
  [Types.VENDA_CONSUMO_SUCCESS]: success,
  [Types.VENDA_CONSUMO_FAILURE]: failure,
});
