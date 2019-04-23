// import { compose } from 'proppy';
import { NavigationActions, StackActions, DrawerActions } from 'react-navigation';
// import AnalyticsService from './analytics';
// import { withStore } from '../utils/withStore';

// eslint-disable-next-line no-underscore-dangle
let _navigator;

let initialized;
const initializedPromise = new Promise((res) => {
  initialized = res;
});

class NavigatorService {
  static initialize(navigatorRef) {
    _navigator = navigatorRef;
    initialized();
  }

  static async navigate(routeName, params, action, cb) {
    if (!_navigator) {
      await initializedPromise;
    }
    _navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
        action: NavigationActions.navigate({ routeName: action, params }),
      }),
    );
    if (cb) {
      cb();
    }
  }

  static async push(
    routeName, params, action, cb,
  ) {
    if (!_navigator) {
      await initializedPromise;
    }
    _navigator.dispatch(
      StackActions.push({
        routeName,
        params,
        action: NavigationActions.navigate({ routeName: action, params }),
      }),
    );
    if (cb) {
      cb();
    }
  }

  static async openDrawer() {
    _navigator.dispatch(DrawerActions.openDrawer());
  }

  static closeDrawer() {
    _navigator.dispatch(DrawerActions.closeDrawer());
  }

  static async toggleDrawer() {
    _navigator.dispatch(DrawerActions.toggleDrawer());
  }

  /**
   *
   * @param params object - required - New params to be merged into existing route params
   * @param key string - required
   */
  static setParams(params, key) {
    _navigator.dispatch(
      NavigationActions.setParams({
        params,
        key,
      }),
    );
  }

  /**
   * key - string or null - optional
   * If set, navigation will go back from the given key. If null, navigation will go back anywhere.
   */
  static back(key) {
    _navigator.dispatch(
      NavigationActions.back(key),
    );
  }

  /**
   *
   * @param {Object} navigationState
   * @return {} route
   */
  static getActiveRoute(navigationState) {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
      return NavigatorService.getActiveRoute(route);
    }
    return route;
  }

  // eslint-disable-next-line no-unused-vars
  static stateChange(prevState, newState, _action) {
    // currentScreen = { key, routeName, params }
    const currentScreen = NavigatorService.getActiveRoute(newState);
    const prevScreen = NavigatorService.getActiveRoute(prevState);

    if (prevScreen !== currentScreen) {
      // Set current screen to state
      // _providers.dispatch.navigation.setCurrentScreen(currentScreen);
      // const { routeName, params } = currentScreen;
      // AnalyticsService.track(routeName, params);
    }
  }
}

export default NavigatorService;
