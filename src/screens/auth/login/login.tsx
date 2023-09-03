import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {Fonts, height, width, wp} from 'theme';
import {LOGOBLACK, BOTTOMICON} from 'constants/icons';
import {Icon, Input} from '@ui-kitten/components';
import {GradientButton} from 'components';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {SocialLogin} from './lib';
import {useForm, Controller} from 'react-hook-form';
// import Toast from 'react-native-toast-message';
import {AuthParamsList} from '../../../navigation/paramsList';
import {StackNavigationProp} from '@react-navigation/stack';
import {authStyle} from '../authStyles';
import {useDispatch, useSelector} from 'react-redux';
import {
  loginUser,
  selectLoading,
  selectLOG,
  setMessagLOG,
  setFinsish,
  setComplete,
} from 'store/auth';
import {WEB_CLIENT_ID} from 'constants/index';
import {_signInGoogle} from 'src/helper/googleLogin';
import LinearGradient from 'react-native-linear-gradient';
import {_loginWithFacebook} from 'src/helper/facebookLogin';
interface Props {
  // navigation: StackNavigationProp<AuthParamsList, 'Login'>;
}

export const LoginScreen: React.FC<Props> = ({navigation}: any) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const message = useSelector(selectLOG);
  const [showPass, setShowPass] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const _handleLogin = React.useCallback(
    // (data: any) => {
    //   dispatch(
    //     loginUser({
    //       username: data?.number,
    //       password: data?.password,
    //     }),
    //   );
    // },
    // [dispatch],
    () => {
      navigation.navigate('App', {screen: 'bottomScreens'});
    },
    [],
  );
  const _configureGoogleSign = () => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      offlineAccess: false,
    });
  };
  React.useEffect(() => {
    _configureGoogleSign();
  }, []);
  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={() => setShowPass(!showPass)}>
      <Icon {...props} name={showPass ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );
  return (
    <>
      <LinearGradient
        colors={['#FF0F39', '#B00523']}
        style={{
          height: Platform.OS === 'ios' ? height * 0.12 : height / 10,
          width: width,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}
      />

      <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
        <LOGOBLACK style={{marginTop: 29, alignSelf: 'center'}} />
        <ScrollView style={{zIndex: 9999}}>
          <View style={{marginHorizontal: 16}}>
            <Text style={{...authStyle.loginText}}>Login</Text>
            <Text style={authStyle.mobileText}>Phone Number</Text>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <Input
                  value={value}
                  keyboardType="number-pad"
                  style={authStyle.inputNumber}
                  textStyle={authStyle.textInputSTyle}
                  size="large"
                  placeholderTextColor="#DBDBDB"
                  placeholder="Enter Phone Number"
                  status={errors.number?.message && 'danger'}
                  onChangeText={value => onChange(value)}
                  caption={errors.number?.message}
                />
              )}
              name="number"
              rules={{
                required: {
                  value: true,
                  message: 'Phone Number Is Required',
                },
              }}
              defaultValue=""
            />
            <Text style={authStyle.passwordText}>Password</Text>
            <Controller
              control={control}
              render={({field: {onChange, value}}) => (
                <Input
                  value={value}
                  style={authStyle.passwordInput}
                  textStyle={authStyle.textInputSTyle}
                  caption={errors.password?.message}
                  size="large"
                  accessoryLeft={renderIcon}
                  placeholderTextColor="#DBDBDB"
                  placeholder="Enter Password"
                  secureTextEntry={showPass ? true : false}
                  status={errors.password?.message && 'danger'}
                  onChangeText={value => onChange(value)}
                />
              )}
              name="password"
              rules={{
                required: {
                  value: true,
                  message: 'Password Is Required',
                },
              }}
              defaultValue=""
            />
            <Text
              onPress={() => navigation.navigate('ForgetPassword')}
              style={authStyle.forgotPassText}>
              Did You Forget Your Password ?
            </Text>
          </View>
          <GradientButton
            buttonName="Login"
            onPress={handleSubmit(_handleLogin)}
            loading={loading}
            hasIcon={false}
            bR={32}
            pV={16}
            mgT={68}
            buttonWidth={width / 1.1}
            styleText={{
              fontFamily: Fonts.CBOLD,
              fontSize: 15,
              color: '#F6F6F6',
            }}
          />
          <Text style={authStyle.dontHaveAccText}>
            Don't Have An Account?
            <Text
              onPress={() => navigation.navigate('SignUp')}
              style={authStyle.createNowText}>
              {' '}
              Register Now
            </Text>
          </Text>
          <SocialLogin
            google={() => _signInGoogle(dispatch)}
            facebook={() => _loginWithFacebook(dispatch)}
          />
        </ScrollView>
        <BOTTOMICON style={{left: wp(-15), position: 'absolute', bottom: 10}} />
      </View>
    </>
  );
};
