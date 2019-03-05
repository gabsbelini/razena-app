import { call, put, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import LoginActions from '../Redux/LoginRedux';
import { Alert } from 'react-native';

export function* createUser(api, action) {
  const { credentials } = action;
  console.tron.log(credentials);

  if (!credentials.username || !credentials.password) {
    Alert.alert("Erro ao criar usuário",
    "Campo vazio"
    );
    yield put(LoginActions.loginFailure());
  } else {
    const response = yield call(api.createUser, credentials);
    if (response.ok) {
      yield put(LoginActions.createUserSuccess(response.data));
      yield put(NavigationActions.navigate({ routeName: 'ProductScreen' }));
    } else {
      yield put(LoginActions.loginFailure());
      Alert.alert(
        "Erro ao Criar usuário",
        "Credenciais inválidas"
      );
    }
  }
}

