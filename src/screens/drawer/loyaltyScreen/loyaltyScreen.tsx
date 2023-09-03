import React from 'react';
import {HeaderApp} from 'components';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Fonts, height, hp, width, wp} from 'theme';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {selectUser} from 'store/auth';
import {normalize} from 'react-native-elements';
import {REWARDS} from '../../../mock/mock';

export const LoyaltyScreen = ({navigation}: any) => {
  const user = useSelector(selectUser);
  const [rewards, setRewards] = React.useState(REWARDS);
  String.prototype.toIndiaDigits = function () {
    var id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return this.replace(/[0-9]/g, function (w) {
      return id[+w];
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
      <HeaderApp
        mt={height * 0.1}
        hasBack
        title="Loyalty System"
        onPress={() => navigation.navigate('bottomScreens')}
      />
      <Text
        style={{
          marginTop: wp(5),
          textAlign: 'right',
          color: '#FF0F39',
          fontSize: normalize(20),
          fontFamily: Fonts.CBOLD,
          paddingLeft: 20,
        }}>
        Loyalty system
      </Text>
      <Text
        style={{
          paddingRight: 20,
          paddingLeft: 20,
          color: '#000000',
          fontFamily: Fonts.CREG,
          fontSize: normalize(12),
        }}>
        Lorem Ipsum is a hypothetical model that is placed in designs to be
        displayed for the client to visualize How to place texts in designs,
        whether they are printed designs... a brochure or a flyer
      </Text>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: '#707070',
          opacity: 0.1,
          marginTop: wp(7),
        }}
      />
      <ScrollView contentContainerStyle={{paddingVertical: 24}}>
        <View
          style={{
            flexDirection: 'row-reverse',
            alignItems: 'center',
            paddingLeft: 16,
            justifyContent: 'flex-start',
          }}>
          <Image
            style={{
              width: wp(14),
              height: hp(7),
              borderRadius: 12,
              backgroundColor: 'white',
            }}
            source={{uri: 'https://source.unsplash.com/random'}}
          />
          <Text
            style={{
              fontSize: normalize(16),
              fontFamily: Fonts.CBOLD,
              color: '#313131',
              paddingRight: 14,
              paddingLeft: 14,
            }}>
            {user?.displayName}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: wp(8),
          }}>
          <LinearGradient
            colors={['#F10D35', '#B00523']}
            style={{
              flexDirection: 'row-reverse',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: 14,
              height: hp(8),
              width: width / 1.1,
              paddingHorizontal: 24,
            }}>
            <Text
              style={{
                fontFamily: Fonts.CBOLD,
                fontSize: normalize(16),
                color: '#FFFFFF',
              }}>
              Loyalty Points
            </Text>
            <Text
              style={{
                fontFamily: Fonts.CBOLD,
                fontSize: normalize(16),
                color: '#FFFFFF',
              }}>
              250
            </Text>
          </LinearGradient>
        </View>
        <Text
          style={{
            fontSize: normalize(20),
            fontFamily: Fonts.CBOLD,
            color: '#FF0F39',
            paddingVertical: 28,
            paddingHorizontal: 16,
          }}>
          Awards
        </Text>
        {rewards.map(reward => (
          <View key={reward.id}>
            <View
              style={{
                flexDirection: 'row-reverse',
                justifyContent: 'space-between',
                paddingLeft: 16,
                paddingRight: 16,
              }}>
              <View style={{flexDirection: 'row-reverse'}}>
                <View
                  style={{
                    width: wp(14),
                    height: hp(7),
                    borderRadius: 14,
                    backgroundColor: '#313131',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.CBOLD,
                      color: '#FFFFFF',
                      fontSize: normalize(18),
                    }}>
                    %
                  </Text>
                </View>
                <View style={{paddingLeft: 12, paddingRight: 12}}>
                  <Text
                    style={{
                      fontSize: normalize(15),
                      color: '#313131',
                      fontFamily: Fonts.CREG,
                    }}>
                    {reward.text}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.CSEMIBOLD,
                      fontSize: normalize(15),
                      color: '#313131',
                      marginTop: 5,
                      textAlign: 'left',
                    }}>
                    {reward.point}{' '}
                    <Text
                      style={{
                        fontFamily: Fonts.CSEMIBOLD,
                        fontSize: normalize(15),
                        color: '#313131',
                        marginTop: 2,
                        textAlign: 'left',
                      }}>
                      Point
                    </Text>
                  </Text>
                </View>
              </View>
              <TouchableOpacity disabled={reward?.active ? false : true}>
                <LinearGradient
                  colors={
                    reward?.active
                      ? ['#F10D35', '#B00523']
                      : ['#E6E6E6', '#E6E6E6']
                  }
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 14,
                    height: hp(5),
                    width: wp(26),
                    paddingHorizontal: 24,
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.CSEMIBOLD,
                      fontSize: normalize(12),
                      color: '#FFFFFF',
                    }}>
                    تطبيق
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: '#707070',
                opacity: 0.1,
                marginTop: wp(7),
                marginBottom: wp(7),
              }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
