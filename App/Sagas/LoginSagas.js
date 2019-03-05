import { call, put, select } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import LoginActions, { LoginSelectors } from '../Redux/LoginRedux';
import { Alert } from 'react-native';

export function* doLogin(api, action) {
  const { credentials } = action;
  console.tron.log(credentials);

  if (!credentials.username || !credentials.password) {
    Alert.alert("Erro de login", "Campo vazio");
    yield put(LoginActions.loginFailure());
  } else {
    const response = yield call(api.login, credentials);
    if (response.ok) {
      yield AsyncStorage.setItem('token', response.data.id);

      yield put(LoginActions.loginSuccess(response.data));
      yield put(NavigationActions.navigate({ routeName: 'ProductScreen' }));
    } else {
      yield put(LoginActions.loginFailure());
      Alert.alert(
        "Erro de Login",
        "Credenciais inválidas"
      );
    }
  }
}

