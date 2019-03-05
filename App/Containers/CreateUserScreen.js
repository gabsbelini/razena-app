import React, { Component } from 'react'
import { ActivityIndicator, Text, View, TouchableHighlight, TextInput } from 'react-native'
import { connect } from 'react-redux';
import LoginActions, { LoginSelectors } from '../Redux/LoginRedux';

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  handleChangeText = (field, text) => this.setState(
    {
      [field]: text
    }
  );

  render () {
    const { username, password } = this.state;
    const { fetching, createUser } = this.props;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black'}}>
          <View style={{ width: '70%', height: '70%', backgroundColor: 'yellow', justifyContent: 'center', padding: 20 }}>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: '#FFF', marginBottom: 8}}
              onChangeText={(text) => this.handleChangeText('username', text)}
              value={username}
              placeholder="Username"
            />
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: '#FFF', marginBottom: 16}}
              onChangeText={(text) => this.handleChangeText('password', text)}
              value={password}
              placeholder="Password"
            />
            <TouchableHighlight
              activeOpacity={0.45}
              onPress={() => createUser(username, password)}
              underlayColor="#D0D0D0"
            >
              <View style={{backgroundColor: 'orange', height: 32, alignItems: 'center', justifyContent: 'center'}}>
                {fetching ? <ActivityIndicator /> : <Text>Login</Text>}
              </View>
            </TouchableHighlight>

          </View>
          </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetching: LoginSelectors.isCreateUserFetching(state)
  }
}

const mapsDispatchToProps = dispatch => {
  return {
    createUser: (username, password) =>
      dispatch(LoginActions.createUser({ username, password })),
  }
};

export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(LoginScreen);
