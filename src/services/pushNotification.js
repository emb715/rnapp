// import moment from 'moment';
// import { Permissions, Notifications, SecureStore } from 'expo';
// import NavigatorService from './navigator';
// import { userApi } from './api';
// import ErrorHandlerService from './errorHandler';

// let _dataHandlerReady = false;
// const delayedNotifications = [];
// let _dispatch = null;
// class PushNotificationService {
//   static setDispatch(dispatch) {
//     _dispatch = dispatch;
//   }

//   // This will be fire in the main screen to ensure the existence of the user data
//   static async initialize() {
//     try {
//       const oldToken = await SecureStore.getItemAsync('pushToken');
//       const oldExpiration = await SecureStore.getItemAsync('pushTokenExpiration');
//       if (!oldToken || !oldExpiration || parseInt(oldExpiration, 10) < moment().valueOf()) {
//         await PushNotificationService.deleteToken();
//         await PushNotificationService.createToken();
//       }
//     } catch (error) {
//       ErrorHandlerService.create({
//         error,
//         errorInfo: {
//           log: 'Cant initialize pushNotification',
//         },
//       });
//     }
//   }

//   static notificationHandler(notification) {
//     if (_dataHandlerReady) {
//       const { orderId } = notification.data;
//       _dispatch.orders.getById({ id: orderId });
//       NavigatorService.navigate('OrderDetail', { orderId });
//     } else {
//       delayedNotifications.push(notification);
//     }
//   }

//   static setDataHandlerReady() {
//     _dataHandlerReady = true;
//     delayedNotifications.forEach(
//       notification => PushNotificationService.notificationHandler(notification),
//     );
//   }

//   static async deleteToken() {
//     const pushToken = await SecureStore.getItemAsync('pushToken');
//     if (pushToken) {
//       await userApi.removePushToken(pushToken);
//     }
//     await SecureStore.deleteItemAsync('pushToken');
//     await SecureStore.deleteItemAsync('pushTokenExpiration');
//   }

//   static async createToken() {
//     const { status: existingStatus } = await Permissions.getAsync(
//       Permissions.NOTIFICATIONS,
//     );
//     let finalStatus = existingStatus;
//     // only ask if permissions have not already been determined, because
//     // iOS won't necessarily prompt the user a second time.
//     if (existingStatus !== 'granted') {
//       // Android remote notification permissions are granted during the app
//       // install, so this will only ask on iOS
//       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//       finalStatus = status;
//     }
//     // Stop here if the user did not grant permissions
//     if (finalStatus !== 'granted') {
//       // TODO notify to the user than this action cant change the app experience
//       return;
//     }
//     // Get the token that uniquely identifies this device
//     const pushToken = await Notifications.getExpoPushTokenAsync();
//     await userApi.addPushToken(pushToken);
//     await SecureStore.setItemAsync('pushToken', pushToken);
//     // Setting validation of token
//     const expiration = moment().add(1, 'days').valueOf();
//     await SecureStore.setItemAsync('pushTokenExpiration', expiration.toString());
//   }
// }

// export default PushNotificationService;
