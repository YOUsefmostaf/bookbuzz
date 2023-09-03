import {StackNavigationProp} from '@react-navigation/stack';
import ProfileHeader from 'components/header/profile';
import React, {useState} from 'react';
import {View, Text, Image, TextInput} from 'react-native';
import {DrawerParamsList, ProfileParamsList} from 'src/navigation/paramsList';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import {Profile as ProfileStyles} from '../homeStyles';
import {Fonts, hp, width} from 'theme';
import {GradientButton, HeaderApp} from 'components';
import {Button, Input} from '@ui-kitten/components';
import normalize from 'react-native-normalize';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser, updateUser} from 'store/auth';
interface EditPasswordScreenProps {
  navigation: StackNavigationProp<ProfileParamsList, 'EditPassword'>;
}

export const EditPasswordScreen: React.FC<EditPasswordScreenProps> = props => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  let edit: any = {
    password: '',
    editPassword: '',
    confirmPassword: '',
  };
  const [PasswordState, editPassword] = useState<any>(edit);
  const onHandleChange = (text: string, name: string) => {
    let state = {...PasswordState};
    state[name] = text;
    editPassword(state);
  };
  const onHandleSubmit = () => {
    // check Joi validation (No time)
    // call api
    console.log(PasswordState);
    if (PasswordState.editPassword !== PasswordState.confirmPassword)
      Toast.show({type: 'error', text1: 'كلمة السر   ليست متطابقة'});
    else {
      dispatch(
        updateUser({
          id: user?.userId,
          body: {password: PasswordState.editPassword},
        }),
      );
      // Navigate to Profile
      props.navigation.navigate('Profile');
    }
  };
  const ProfileHeaderSection = () => {
    return (
      <HeaderApp
        title="Change Password"
        hasBack={true}
        backPress={() => props.navigation.goBack()}
      />
    );
  };
  return (
    <View style={ProfileStyles.editPassContainer}>
      <ProfileHeaderSection />
      <Text style={ProfileStyles.title}>Old Password</Text>
      <TextInput
        style={ProfileStyles.InputValue}
        value={PasswordState?.password}
        onChange={({nativeEvent: {text}}) => onHandleChange(text, 'password')}
        placeholder="Old Password"
        secureTextEntry={true}
      />
      <Text style={ProfileStyles.title}>New Password</Text>
      <TextInput
        style={ProfileStyles.InputValue}
        value={PasswordState?.editPassword}
        onChange={({nativeEvent: {text}}) =>
          onHandleChange(text, 'editPassword')
        }
        placeholder="New Password"
        secureTextEntry={true}
      />
      <Text style={ProfileStyles.title}>Confirm password</Text>
      <TextInput
        style={ProfileStyles.InputValue}
        value={PasswordState?.confirmPassword}
        onChange={({nativeEvent: {text}}) =>
          onHandleChange(text, 'confirmPassword')
        }
        textContentType="password"
        placeholder="Confirm Password"
        secureTextEntry={true}
      />
      <View style={{marginTop: hp(10)}}>
        <GradientButton
          buttonName="Confirm"
          pV={hp(3)}
          buttonWidth={width * 0.91}
          bR={normalize(20)}
          onPress={() => onHandleSubmit()}
          styleText={{
            fontFamily: Fonts.CBOLD,
            fontSize: 15,
            color: '#F6F6F6',
          }}
        />
      </View>
    </View>
  );
};
