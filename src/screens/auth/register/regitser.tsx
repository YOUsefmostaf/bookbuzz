import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Fonts, width, wp} from 'theme';
import {BOTTOMICON, CALLNDAR} from 'constants/icons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DatePicker from 'react-native-date-picker';
import {Input} from '@ui-kitten/components';
import Toast from 'react-native-toast-message';
import {
  loginUser,
  newUser,
  selectLoadingReg,
  selectMessage,
  setMessage,
} from 'store/auth';
import {useDispatch, useSelector} from 'react-redux';
import {GradientButton, HeaderApp} from 'components';
import {useForm, Controller} from 'react-hook-form';
// import {SocialLogin} from './lib';
import {AuthParamsList} from '../../../navigation/paramsList';
import {StackNavigationProp} from '@react-navigation/stack';
import {EMAIL_REGEX, PHONE_REGEX} from 'constants/index';
interface Props {
  navigation: StackNavigationProp<AuthParamsList, 'SignUp'>;
}

export const RegitserScreen: React.FC<Props> = ({navigation}) => {
  const loading = useSelector(selectLoadingReg);
  const dispatch = useDispatch();
  const message = useSelector(selectMessage);
  const [mobile, setMobile] = React.useState();
  const [pass, setPass] = React.useState();
  const [modal, setModal] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const [birthDate, setBirthDate] = React.useState(new Date());
  const _handleNewUser = (data: any) => {
    const {name, email, number, password, Cpassword} = data;
    if (Cpassword !== password) {
      Toast.show({
        type: 'info',
        text1: 'كلمة تأكيد المرور غير متوافقة',
      });
    } else {
      let formdata = new FormData();
      formdata.append('username', name);
      formdata.append('password', password);
      formdata.append('email', email);
      formdata.append('birthdate', birthDate.toISOString().slice(0, 10));
      formdata.append('phone', number);
      setPass(password);
      setMobile(number);
      dispatch(newUser(formdata));
    }
  };
  React.useEffect(() => {
    if (message) {
      //@ts-ignore
      navigation.navigate('Perf');
      dispatch(
        loginUser({
          username: mobile,
          password: pass,
        }),
      );
    }
    return () => {
      dispatch(setMessage(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, message, navigation]);

  return (
    <>
      <HeaderApp hasIcon={true} hasBack backPress={() => navigation.goBack()} />
      <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
        <ScrollView contentContainerStyle={{paddingVertical: 20}}>
          <KeyboardAwareScrollView
            extraScrollHeight={30}
            enableOnAndroid
            extraHeight={40}>
            <View style={{marginHorizontal: 16}}>
              <Text
                style={{
                  fontFamily: Fonts.CBOLD,
                  fontSize: 18,
                  color: '#FF0F39',
                  marginTop: 32,
                  writingDirection: 'rtl',
                }}>
                Create A New Account
              </Text>
              <Text
                style={{
                  color: '#313131',
                  fontSize: 13,
                  fontFamily: Fonts.CREG,
                  marginTop: 16,
                  writingDirection: 'rtl',
                }}>
                Name
              </Text>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <Input
                    value={value}
                    caption={errors.name?.message}
                    style={{
                      marginRight: 'auto',
                      width: width / 1.01,
                      borderRadius: 32,
                      paddingRight: 16,
                      backgroundColor: '#FCFCFC',
                      borderColor: '#E6E6E6',
                      alignSelf: 'center',
                      marginTop: 5,
                    }}
                    textStyle={{
                      fontFamily: Fonts.CREG,
                      color: '#313131',
                      fontSize: 13,
                      writingDirection: 'rtl',
                    }}
                    size="large"
                    placeholderTextColor="#DBDBDB"
                    placeholder="Enter Your Name"
                    onChangeText={value => onChange(value)}
                    status={errors.name?.message && 'danger'}
                  />
                )}
                name="name"
                rules={{
                  required: {
                    value: true,
                    message: 'Name Is Required',
                  },
                }}
                defaultValue=""
              />
              <Text
                style={{
                  color: '#313131',
                  fontSize: 13,
                  fontFamily: Fonts.CREG,
                  marginTop: 16,
                  writingDirection: 'rtl',
                }}>
                Phone Number
              </Text>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <Input
                    value={value}
                    caption={errors.number?.message}
                    keyboardType="number-pad"
                    style={{
                      marginRight: 'auto',
                      width: width / 1.01,
                      borderRadius: 32,
                      paddingRight: 16,
                      backgroundColor: '#FCFCFC',
                      borderColor: '#E6E6E6',
                      alignSelf: 'center',
                      marginTop: 5,
                    }}
                    textStyle={{
                      fontFamily: Fonts.CREG,
                      color: '#313131',
                      fontSize: 13,
                      writingDirection: 'rtl',
                    }}
                    size="large"
                    placeholderTextColor="#DBDBDB"
                    placeholder="Enter Phone Number"
                    onChangeText={value => onChange(value)}
                    status={errors.number?.message && 'danger'}
                  />
                )}
                name="number"
                rules={{
                  required: {
                    value: true,
                    message: 'Phone  Number Is Required',
                  },
                  pattern: {
                    value: PHONE_REGEX,
                    message: 'Invalid Phone Number',
                  },
                }}
                defaultValue=""
              />
              <Text
                style={{
                  color: '#313131',
                  fontSize: 13,
                  fontFamily: Fonts.CREG,
                  marginTop: 16,
                  writingDirection: 'rtl',
                }}>
                Email
              </Text>
              <Controller
                control={control}
                render={({field: {onChange, value}}) => (
                  <Input
                    value={value}
                    keyboardType="email-address"
                    style={{
                      marginRight: 'auto',
                      width: width / 1.01,
                      borderRadius: 32,
                      paddingRight: 16,
                      backgroundColor: '#FCFCFC',
                      borderColor: '#E6E6E6',
                      alignSelf: 'center',
                      marginTop: 5,
                    }}
                    textStyle={{
                      fontFamily: Fonts.CREG,
                      color: '#313131',
                      fontSize: 13,
                      writingDirection: 'rtl',
                    }}
                    size="large"
                    placeholderTextColor="#DBDBDB"
                    placeholder="Enter Email"
                    status={errors.email?.message && 'danger'}
                    onChangeText={value => onChange(value)}
                    caption={errors.email?.message}
                  />
                )}
                name="email"
                rules={{
                  required: {
                    value: true,
                    message: 'Email Is Required',
                  },
                  pattern: {
                    value: EMAIL_REGEX,
                    message: 'Email Is Not Valid',
                  },
                }}
                defaultValue=""
              />
              <Text
                style={{
                  color: '#313131',
                  fontSize: 13,
                  fontFamily: Fonts.CREG,
                  marginTop: 16,
                  writingDirection: 'rtl',
                }}>
                Date Of Birth
              </Text>
              <TouchableOpacity
                onPress={() => setModal(true)}
                style={{
                  flexDirection: 'row-reverse',
                  justifyContent: 'space-between',
                  borderRadius: 32,
                  backgroundColor: '#FCFCFC',
                  borderColor: '#E6E6E6',
                  borderWidth: 1,
                  height: 48,
                  paddingHorizontal: 16,
                  alignItems: 'center',
                  marginTop: 5,
                  width: width / 1.05,
                  marginLeft: 'auto',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.CREG,
                    fontSize: 13,
                    color: '#313131',
                    paddingLeft: 2,
                    writingDirection: 'rtl',
                  }}>
                  {birthDate.toLocaleDateString()}
                </Text>
                <CALLNDAR />
              </TouchableOpacity>
              <DatePicker
                modal
                open={modal}
                date={birthDate}
                mode="date"
                maximumDate={new Date('2020-01-01')}
                onDateChange={(d: any) => setBirthDate(d)}
                onConfirm={(date: any) => {
                  setModal(false);
                  setBirthDate(date);
                }}
                onCancel={() => {
                  setModal(false);
                }}
              />
              <View
                style={{
                  flexDirection: 'row-reverse',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={{right: 4}}>
                  <Text
                    style={{
                      color: '#313131',
                      fontSize: 13,
                      fontFamily: Fonts.CREG,
                      marginTop: 16,
                      writingDirection: 'rtl',
                      left: -10,
                    }}>
                    Password
                  </Text>
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Input
                        value={value}
                        style={{
                          // marginRight:'auto',
                          width: width / 2.2,
                          borderRadius: 32,
                          zIndex: 9999,
                          backgroundColor: '#FCFCFC',
                          borderColor: '#E6E6E6',
                          alignSelf: 'center',
                          marginTop: 5,
                        }}
                        textStyle={{
                          fontFamily: Fonts.CREG,
                          color: '#313131',
                          fontSize: 13,
                          writingDirection: 'rtl',
                        }}
                        size="large"
                        placeholderTextColor="#DBDBDB"
                        placeholder="Enter Password"
                        status={errors.password?.message && 'danger'}
                        onChangeText={value => onChange(value)}
                        caption={errors.password?.message}
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
                </View>
                <View style={{marginRight: 16}}>
                  <Text
                    style={{
                      color: '#313131',
                      fontSize: 13,
                      fontFamily: Fonts.CREG,
                      marginTop: 16,
                      writingDirection: 'rtl',
                      left: -10,
                    }}>
                    Confirm Password
                  </Text>
                  <Controller
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <Input
                        value={value}
                        style={{
                          marginRight: 'auto',
                          width: width / 2.2,
                          borderRadius: 32,
                          backgroundColor: '#FCFCFC',
                          borderColor: '#E6E6E6',
                          alignSelf: 'center',
                          marginTop: 5,
                        }}
                        textStyle={{
                          fontFamily: Fonts.CREG,
                          color: '#313131',
                          fontSize: 13,
                          writingDirection: 'rtl',
                        }}
                        size="large"
                        placeholderTextColor="#DBDBDB"
                        placeholder="Confirm Password"
                        status={errors.Cpassword?.message && 'danger'}
                        onChangeText={value => onChange(value)}
                        caption={errors.Cpassword?.message}
                      />
                    )}
                    name="Cpassword"
                    rules={{
                      required: {
                        value: true,
                        message: 'Password Is Required',
                      },
                    }}
                    defaultValue=""
                  />
                </View>
              </View>
            </View>
            <BOTTOMICON
              style={{
                left: wp(-10),
                position: 'absolute',
                bottom: wp(-20),
                zIndex: 8888,
                overflow: 'hidden',
              }}
            />
            <GradientButton
              buttonName="Login"
              onPress={handleSubmit(_handleNewUser)}
              loading={loading}
              hasIcon={false}
              bR={32}
              pV={16}
              mgT={55}
              buttonWidth={width / 1.1}
              styleText={{
                fontFamily: Fonts.CBOLD,
                fontSize: 15,
                color: '#F6F6F6',
              }}
            />
          </KeyboardAwareScrollView>
        </ScrollView>
        {/* <SocialLogin /> */}
      </View>
    </>
  );
};
