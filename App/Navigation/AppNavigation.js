import { createStackNavigator, createAppContainer } from 'react-navigation'
import LoginScreen from '../Containers/LoginScreen';
import ProductList from '../Containers/ProductList';
import CreateUserScreen from '../Containers/CreateUserScreen'
import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const PrimaryNav = createStackNavigator(
  {
  LoginScreen: { screen: LoginScreen },
  ProductScreen: { screen: ProductList},
  CreateUserScreen: { screen: CreateUserScreen}
  }, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LoginScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
