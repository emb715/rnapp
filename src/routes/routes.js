import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthLoaderScreen from '../screens/_authLoader';
import HomeScreen from '../screens/home';
import PostScreen from '../screens/post';

const AppNavigator = createStackNavigator({
  home: {
    screen: HomeScreen,
  },
  post: {
    screen: PostScreen,
  },
}, {
  initialRouteName: 'home',
  headerMode: 'none',
});

const AuthNavigator = createSwitchNavigator({
  welcome: HomeScreen,
}, {
  initialRouteName: 'welcome',
  headerMode: 'none',
});

const Routes = createSwitchNavigator({
  initial: AuthLoaderScreen,
  auth: AuthNavigator,
  app: AppNavigator,
}, {
  initialRouteName: 'app',
  headerMode: 'none',
});

export default createAppContainer(Routes);
