import React from 'react';
import {PerfSelectParamsList} from '../../../navigation/paramsList';
import {StackNavigationProp} from '@react-navigation/stack';
import {INONE} from 'constants/icons';
import Toast from 'react-native-toast-message';
import {GradientButton, HeaderApp} from 'components';
import {View, Text} from 'react-native';
import {Fonts, width, wp} from 'theme';
import Spinner from 'react-native-spinkit';
import {CategoiresList} from './list/list';

import {useSelector, useDispatch} from 'react-redux';
import {
  getSubCategory,
  selectSubCategoires,
  selectLoadingCategories,
  selectIntrestCate,
} from 'store/categories';

interface Props {
  navigation: StackNavigationProp<PerfSelectParamsList, 'PerfSelect'>;
}

export const IntrestScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoadingCategories);
  const subLangs = useSelector(selectSubCategoires);
  const selectedCategoires = useSelector(selectIntrestCate);
  const [selectedCate, setSelectedCate] = React.useState<any>([]);
  const _handleOnpress = () => {
    if (selectedCate.length < 3) {
      Toast.show({
        type: 'info',
        text1: 'اختر اكثر من 3 أنواع',
      });
    } else {
      navigation.navigate('authorSelect');
    }
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getSubCategory({params: {parent: selectedCategoires?.id}}));
    });
    return unsubscribe;
  }, [dispatch, navigation, selectedCategoires?.id]);
  return (
    <>
      <HeaderApp hasBack hasIcon={true} />
      <View
        style={{
          flex: 1,
          backgroundColor: '#F6F6F6',
        }}>
        <Text
          style={{
            fontFamily: Fonts.CBOLD,
            fontSize: 18,
            color: '#FF0F39',
            marginTop: 32,
            marginHorizontal: 15,
            writingDirection: 'rtl',
          }}>
          إختر إهتمامتك
        </Text>
        <View
          style={{
            width: 29,
            borderBottomWidth: 2,
            borderColor: '#313131',
            alignSelf: 'flex-start',
            marginTop: 8,
            marginHorizontal: 15,
          }}
        />
        <Text
          style={{
            fontFamily: Fonts.CREG,
            fontSize: 13,
            color: '#313131',
            marginTop: 18,
            flexWrap: 'wrap',
            paddingLeft: wp(10),
            marginHorizontal: 15,
            marginBottom: 32,
            writingDirection: 'rtl',
          }}>
          هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة
        </Text>
        {loading ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Spinner
              style={{
                // position: 'absolute',
                flex: 1,
                transform: [{scaleX: 1}],
                alignSelf: 'center',
                zIndex: 100,
              }}
              isVisible={true}
              size={32}
              type="Bounce"
              color="#FF0F39"
            />
          </View>
        ) : (
          <CategoiresList
            data={subLangs}
            selectedCate={selectedCate}
            setSelectedCate={setSelectedCate}
          />
        )}
        <View style={{position: 'absolute', bottom: 20, right: 20}}>
          <GradientButton
            buttonName="التالي"
            onPress={_handleOnpress}
            loading={false}
            hasIcon={false}
            bR={32}
            pV={16}
            mgT={wp(40)}
            buttonWidth={width / 2}
            styleText={{
              fontFamily: Fonts.CBOLD,
              fontSize: 15,
              color: '#F6F6F6',
            }}
          />
        </View>
        <INONE
          style={{
            position: 'absolute',
            bottom: 20,
            alignSelf: 'center',
            left: 20,
          }}
        />
      </View>
    </>
  );
};
