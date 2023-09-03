// import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
// import {Platform} from 'react-native';
import Toast from 'react-native-toast-message';
import {Dispatch} from 'redux';
// import DeviceInfo from 'react-native-device-info';
// import {googleLogin} from 'store/auth';
import tron from 'reactotron-react-native';
export const _signInGoogle = async (_dispatch: Dispatch<any>) => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfos = await GoogleSignin.signIn();
    // await dispatch(
    //   googleLogin({
    //     full_name: userInfos?.user?.name,
    //     email: userInfos?.user?.email,
    //     device_token: 'dsdsds',
    //     device_id: DeviceInfo.getDeviceId(),
    //     device_type: Platform.OS,
    //     social_token: userInfos?.idToken,
    //     type: 'google',
    //   }),
    // );
    console.log('userInfosGoogle', userInfos);
    tron.log('sdsd', userInfos);
    // const credential = auth.GoogleAuthProvider.credential(userInfos?.idToken);
    // await auth().signInWithCredential(credential);
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      Toast.show({
        type: 'info',
        text1: 'Process Cancelled',
      });
    } else if (error.code === statusCodes.IN_PROGRESS) {
      Toast.show({
        type: 'info',
        text1: 'Process in progress',
      });
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      Toast.show({
        type: 'info',
        text1: 'Play services are not available',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Something else went wrong... ',
        text2: error.toString(),
      });
    }
  }
};
