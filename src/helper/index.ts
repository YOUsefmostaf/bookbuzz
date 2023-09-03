// import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import VersionCheck from 'react-native-version-check';
import {Alert, Linking, BackHandler} from 'react-native';
import tron from 'reactotron-react-native';

export const requestUserPermission = async () => {
  // const authStatus = await messaging().requestPermission();
  // const enabled =
  //   authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //   authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  // if (enabled) {
  //   getFcmToken();
  //   console.log('Authorization status:', authStatus);
  //   console.log('Authorization status:', authStatus);
  // }
};
export const _setFcmToken = async (key: any) => {
  try {
    await AsyncStorage.setItem('@fcmToken', key);
  } catch (error) {
    console.log(error);
  }
};

export const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('@fcmToken');

  if (!fcmToken) {
    try {
      // const fcmTokens = await messaging().getToken();
      // _setFcmToken(fcmTokens);
      // tron.log('Setfcm', fcmTokens);
    } catch (e) {
      console.log('firebase error', e);
    }
  } else {
    tron.log('fcm', fcmToken);
  }
};
export const checkVersion = async () => {
  try {
    // let updateNeeded = await VersionCheck.needUpdate();
    // if (updateNeeded && updateNeeded.isNeeded) {
    //   Alert.alert(
    //     'please Update',
    //     'You will have to update your app to the latest version to continue using.',
    //     [
    //       {
    //         text: 'Update',
    //         onPress: () => {
    //           BackHandler.exitApp();
    //           Linking.openURL(updateNeeded.storeUrl);
    //         },
    //       },
    //     ],
    //     {cancelable: false},
    //   );
    // } else {
    //   console.log('YPU WIM');
    // }
  } catch (error) {
    console.log('error', error);
  }
};
export const getLocalFcm = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@fcmToken');
    tron.log('hay get fcm', jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
