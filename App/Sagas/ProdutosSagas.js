import { call, put } from 'redux-saga/effects';
import ProdutosActions from '../Redux/ProdutosRedux';
import { Alert } from 'react-native';

export function* getProdutos(api, action) {
  const { token } = action;
  const response = yield call(api.getProdutos, token);
  console.tron.log(response);
    if (response.ok) {
      yield put(ProdutosActions.produtosSuccess(response.data));
    } else {
      yield put(ProdutosActions.produtosFailure());
      Alert.alert(
        "Erro ao buscar produtos",
        "Erro ao buscar produtos"
      );
    }
}

