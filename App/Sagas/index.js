import { takeLatest, all } from 'redux-saga/effects'
import RazenaApi from '../Services/RazenaApi'
/* ------------- Types ------------- */

import { LoginTypes } from '../Redux/LoginRedux';
import { ProdutosTypes } from '../Redux/ProdutosRedux';
import { VendasConsumoTypes } from '../Redux/VendasConsumoRedux';

/* ------------- Sagas ------------- */

import { doLogin } from './LoginSagas';
import { createUser } from './CreateUserSagas';
import { getProdutos } from './ProdutosSagas';
import { createVendaConsumo } from './VendasConsumoSagas';

/* ------------- API ------------- */

const razenaApi = RazenaApi.create();

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(LoginTypes.DO_LOGIN, doLogin, razenaApi),
    takeLatest(LoginTypes.CREATE_USER, createUser, razenaApi),
    takeLatest(ProdutosTypes.GET_PRODUTOS, getProdutos, razenaApi),
    takeLatest(VendasConsumoTypes.CREATE_VENDA, createVendaConsumo, razenaApi),
  ])
}
