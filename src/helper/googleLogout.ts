// import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Alert} from 'react-native';

export const SignOutGoogle = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    // auth()
    //   .signOut()
    //   .then(() => Alert.alert('Your are signed out!'));
  } catch (error) {
    console.log(error);
  }
};
