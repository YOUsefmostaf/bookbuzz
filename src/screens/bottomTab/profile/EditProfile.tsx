import ProfileHeader from 'components/header/profile';
import * as React from 'react';
import {Image, ScrollView, Text, TextInput, View} from 'react-native';
import {Fonts, hp, width, wp} from 'theme';
import {Profile as ProfileStyle} from '../homeStyles';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProfileParamsList} from 'src/navigation/paramsList';
import {selectUser, selectUserMeta, updateUser} from 'store/auth';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {GradientButton, HeaderApp} from 'components';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import {GradientButtonCancel} from 'components/gradientButton/grediantButtonCancel';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {validateProfile} from 'src/helper/Logger';
import Toast from 'react-native-toast-message';
interface EditProfileProps {
  navigation: StackNavigationProp<ProfileParamsList, 'EditProfile'>;
}
export const EditProfile: React.FC<EditProfileProps> = props => {
  const dispatch = useDispatch();
  let profile = {
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
  };
  const [Profile, setProfile] = React.useState<any>(profile);
  const user = useSelector(selectUser);
  const userMeta = useSelector(selectUserMeta);
  React.useEffect(() => {
    dispatch(updateUser({id: user.userId}));
    let profile = {
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      email: user.userEmail,
    };
    console.log(profile, user);
    setProfile(profile);
  }, []);
  React.useEffect(() => {
    props.navigation.getParent()?.setOptions({tabBarStyle: {display: 'none'}});
  }, []);
  const onHandleChnage = (text: string, name: string) => {
    const edit = {...Profile};
    edit[name] = text;
    setProfile(edit);
  };
  const onSubmit = () => {
    let {error, value, warning} = validateProfile(Profile);
    if (error) {
      Toast.show({type: 'error', text1: error?.details[0].message});
    } else {
      dispatch(updateUser({id: user.userId, body: Profile}));
      props.navigation.navigate('Profile');
    }
  };
  return (
    <ScrollView style={ProfileStyle.profile}>
      <HeaderApp
        title="Modify the account"
        mt={hp(5)}
        hasBack={true}
        backPress={() => props.navigation.goBack()}
      />
      <View style={ProfileStyle.EditImage}>
        <TouchableOpacity>
          <Image source={{uri: ''}} style={ProfileStyle.ProfileImage} />
          <FontIcon
            name="camera"
            color={'white'}
            size={15}
            style={ProfileStyle.EditProfileImage}
          />
        </TouchableOpacity>
      </View>
      <Text style={ProfileStyle.InputText}> First Name</Text>
      <TextInput
        onChange={({nativeEvent: {text}}) => onHandleChnage(text, 'first_name')}
        style={ProfileStyle.InputValue}
        value={Profile?.first_name}
      />
      <Text style={ProfileStyle.InputText}> Last Name</Text>
      <TextInput
        onChange={({nativeEvent: {text}}) => onHandleChnage(text, 'last_name')}
        style={ProfileStyle.InputValue}
        value={Profile?.last_name}
      />
      <Text style={ProfileStyle.InputText}>Mobile Number</Text>
      <TextInput
        onChange={({nativeEvent: {text}}) => onHandleChnage(text, 'phone')}
        style={ProfileStyle.InputValue}
        value={Profile?.phone}
      />
      <Text style={ProfileStyle.InputText}>Emails</Text>
      <TextInput
        onChange={({nativeEvent: {text}}) => onHandleChnage(text, 'email')}
        style={ProfileStyle.InputValue}
        value={Profile?.email}
      />
      {/* <Text style={ProfileStyle.InputText}>تاريخ الميلاد</Text>
      <TextInput
        onChange={({nativeEvent: {text}}) => onHandleChnage(text, 'birthdate')}
        style={ProfileStyle.InputValue}
        value={Profile?.birthdate}
      /> */}
      <View
        style={{
          flexDirection: 'row-reverse',
          justifyContent: 'center',
          marginBottom: hp(5),
        }}>
        <GradientButton
          buttonName="Save"
          onPress={() => onSubmit()}
          loading={false}
          hasIcon={false}
          bR={32}
          pV={16}
          mgT={wp(5)}
          buttonWidth={width / 2}
          styleText={{
            fontFamily: Fonts.CBOLD,
            fontSize: 15,
            color: '#F6F6F6',
          }}
        />
        <GradientButtonCancel
          buttonName="Change Password"
          onPress={() => {
            props.navigation.navigate('EditPassword');
          }}
          loading={false}
          hasIcon={false}
          bR={32}
          pV={16}
          mgT={wp(5)}
          buttonWidth={width / 2}
          styleText={{
            fontFamily: Fonts.CBOLD,
            fontSize: 15,
            color: '#F6F6F6',
          }}
        />
      </View>
    </ScrollView>
  );
};
