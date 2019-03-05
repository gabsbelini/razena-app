import React, { Component } from 'react'
import { ScrollView, View, Button, TextInput, ActivityIndicator,Text, TouchableHighlight} from 'react-native'
import { connect } from 'react-redux';
import LoginActions, { LoginSelectors } from '../Redux/LoginRedux';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'gabsbelini@gmail.com',
      password: '123'
    }
  }

  handleChangeText = (field, text) => this.setState(
    {
      [field]: text
    }
  );

  render () {
    const { username, password } = this.state;
    const { fetching, doSignin, navigation } = this.props;
    console.tron.log(this.props);
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#636363'}}>
          <View style={{ width: '70%', height: '70%', justifyContent: 'center', padding: 20 }}>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: '#FFF', marginBottom: 8}}
              onChangeText={(text) => this.handleChangeText('username', text)}
              value={username}
              placeholder="Username"
            />
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: '#FFF', marginBottom: 16}}
              onChangeText={(text) => this.setState({text})}
              value={password}
              placeholder="Password"
            />

            <TouchableHighlight
              activeOpacity={0.45}
              onPress={() => doSignin(username, password)}
              underlayColor="#D0D0D0"
            >
              <View style={{backgroundColor: '#f2c432', height: 32, alignItems: 'center', justifyContent: 'center'}}>
                {fetching ? <ActivityIndicator /> : <Text>Login</Text>}
              </View>
            </TouchableHighlight>
            <View style={{marginTop: 8}} />
            <TouchableHighlight
              activeOpacity={0.45}
              onPress={() => {navigation.navigate('CreateUserScreen')}}
              underlayColor="#D0D0D0"
            >
              <View style={{backgroundColor: '#FFF', height: 32, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Criar Usuário</Text>
              </View>
            </TouchableHighlight>
          </View>
          </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: LoginSelectors.isLoginFetching(state)
  }
}

const mapsDispatchToProps = dispatch => {
  return {
    doSignin: (username, password) =>
      dispatch(LoginActions.doLogin({ username, password })),
  }
};
export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(LoginScreen);
