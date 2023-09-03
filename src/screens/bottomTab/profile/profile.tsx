import * as React from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import ProfileHeader from 'components/header/profile';
import {hp} from 'theme';
import {ProfileParamsList} from '../../../navigation/paramsList';
import {StackNavigationProp} from '@react-navigation/stack';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import {Profile as ProfileStyle} from '../homeStyles';
import LinearGradient from 'react-native-linear-gradient';
import {selectUser, updateUser} from 'store/auth';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
interface ProfileScreeProps {
  navigation: StackNavigationProp<ProfileParamsList, 'Profile'>;
}
export const ProfileScreen: React.FC<ProfileScreeProps> = props => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(updateUser({id: user?.userId}));
  }, []);
  return (
    <ScrollView style={ProfileStyle.profile}>
      <ProfileHeader
        hasImage={true}
        Image={() => (
          <Image
            source={{uri: user?.avatar_url}}
            style={ProfileStyle.ProfileImage}
          />
        )}
        title=""
        mt={hp(5)}
        hasBack={false}
        hasIcon={true}
        Icon={() => (
          <TouchableOpacity
            onPress={() => props.navigation.navigate('EditProfile')}>
            <MatIcon
              name="edit"
              color={'black'}
              style={ProfileStyle.ProfileEditIcon}
              size={18}
            />
          </TouchableOpacity>
        )}
        backPress={() => props.navigation.goBack()}
      />
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={ProfileStyle.ProfileUserName}>{user?.displayName}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <LinearGradient
          colors={['#F10D35', '#B00523']}
          style={ProfileStyle.loayltyPoints}>
          <Text style={ProfileStyle.LoyaltyPointsTxt}>loyalty points</Text>
          <Text style={ProfileStyle.loyaltyPointsNum}>{}</Text>
        </LinearGradient>
      </View>
      <Text style={ProfileStyle.InputText}>Name</Text>
      <Text style={ProfileStyle.InputValue}>{user?.displayName}</Text>
      <Text style={ProfileStyle.InputText}>Mobile Number</Text>
      <Text style={ProfileStyle.InputValue}>{user?.phone}</Text>
      <Text style={ProfileStyle.InputText}>Email</Text>
      <Text style={ProfileStyle.InputValue}>{user?.userEmail}</Text>
      <Text style={ProfileStyle.InputText}>Date Of Birth</Text>
      <Text style={ProfileStyle.InputValue}>{user?.birthdate}</Text>
    </ScrollView>
  );
};
