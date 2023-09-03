// import {
//   AccessToken,
//   GraphRequest,
//   GraphRequestManager,
//   LoginManager,
// } from 'react-native-fbsdk-next';
// import {Platform} from 'react-native';
// import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import {Dispatch} from 'redux';
// import {facebookLogin} from 'store/auth';
import tron from 'reactotron-react-native';
const getInfoFromToken = (token: any, _dispatch: Dispatch<any>) => {
  const PROFILE_REQUEST_PARAMS = {
    fields: {
      string: 'id,name,email',
    },
  };
  // const profileRequest = new GraphRequest(
  //   '/me',
  //   //@ts-ignore
  //   {token, parameters: PROFILE_REQUEST_PARAMS},
  //   (error: any, user: any) => {
  //     if (error) {
  //       tron.log('error', error);
  //       Toast.show({
  //         type: 'error',
  //         text1: error,
  //       });
  //     } else {
  //       tron.log('user', token, user);
  //       // dispatch(
  //       //   facebookLogin({
  //       //     full_name: user?.name,
  //       //     email: user?.email,
  //       //     device_token: 'dsdsds',
  //       //     device_id: DeviceInfo.getDeviceId(),
  //       //     device_type: Platform.OS,
  //       //     social_token: token,
  //       //     type: 'facebook',
  //       //   }),
  //       // );
  //     }
  //   },
  // );
  // new GraphRequestManager().addRequest(profileRequest).start();
};

export const _loginWithFacebook = async (dispatch: Dispatch<any>) => {
  // LoginManager.logInWithPermissions(['public_profile,email']).then(
  //   (loginface: any) => {
  //     if (loginface.isCancelled) {
  //       Toast.show({
  //         type: 'info',
  //         text1: 'Login Cancceled',
  //       });
  //     } else {
        // AccessToken.getCurrentAccessToken().then((data: any) => {
        //   const accessToken = data.accessToken.toString();
        //   getInfoFromToken(accessToken, dispatch);
        // });
  //     }
  //   },
  //   (error: any) => {
  //     tron.log('error', error);
  //     Toast.show({
  //       type: 'info',
  //       text1: error,
  //     });
  //   },
  // );
};
