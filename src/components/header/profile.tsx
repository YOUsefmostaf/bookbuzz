import {componentsStyles} from 'components/componentStyles';
import {DRAWER, FORWARDICON} from 'constants/icons';
import * as React from 'react';
import {Image, Platform, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Fonts, height, width} from 'theme';

export interface ProfileHeaderProps {
  hasImage: boolean | undefined;
  Image: (arg: undefined) => React.ReactElement | undefined;
  backPress: (arg: any) => void | undefined;
  mt: any | undefined;
  hasBack: boolean | undefined;
  title: string | undefined;
  hasIcon: boolean | undefined;
  Icon: (arg: any) => React.ReactElement | undefined;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = props => {
  return (
    <LinearGradient
      colors={['#FF0F39', '#B00523']}
      style={componentsStyles.profileHeader}>
      <View style={componentsStyles.profileHeaderEditIcon}>
        {props.hasIcon && props.Icon(undefined)}
      </View>
      <View style={componentsStyles.profileHeaderImage}>
        {props.hasImage && props.Image(undefined)}
      </View>
    </LinearGradient>
  );
};

export default ProfileHeader;
