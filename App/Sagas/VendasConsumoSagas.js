import { call, put } from 'redux-saga/effects';
import VendasConsumoActions from '../Redux/VendasConsumoRedux';
import { Alert } from 'react-native';

export function* createVendaConsumo(api, action) {
  const { payload } = action;
  console.tron.log(payload.data);
  const response = yield call(api.createVendaConsumo, {token: payload.token, data: payload.data});
  console.tron.log(response);
    if (response.ok) {
      yield put(VendasConsumoActions.vendaConsumoSuccess(response.data));
      Alert.alert(
        "Venda criada!",
        `Você acabou de comprar ${payload.data.peso}g de café!
        E vai utilizar ${payload.data.metodo} para prepará-lo =)`
        )
    } else {
      yield put(VendasConsumoActions.vendaConsumoFailure());
      Alert.alert(
        "Erro ao efetuar venda",
        "Erro ao evetuar venda"
      );
    }
}

