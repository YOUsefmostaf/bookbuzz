import React from 'react';
import {PerfSelectParamsList} from '../../../navigation/paramsList';
import {StackNavigationProp} from '@react-navigation/stack';
import {INONE} from 'constants/icons';
import {GradientButton, HeaderApp} from 'components';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Fonts, width, wp} from 'theme';
import Spinner from 'react-native-spinkit';
import {setLang} from 'store/auth';
// import {LANGUAGES} from '../../../mock/mock';
import {useSelector, useDispatch} from 'react-redux';
import tron from 'reactotron-react-native';
import {
  getSubCategory,
  selectSubCategoires,
  selectLoadingCategories,
  selectLangCate,
} from 'store/categories';

interface Props {
  navigation: StackNavigationProp<PerfSelectParamsList, 'LangSelect'>;
}

export const LangScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoadingCategories);
  const subLangs = useSelector(selectSubCategoires);
  const selectedCategoires = useSelector(selectLangCate);
  const [selectedLang, setSelectedLang] = React.useState<any>([]);

  const _handlePush = (lang: any) => {
    let list = [...selectedLang];
    list.push(lang?.id);
    setSelectedLang(list);
    dispatch(setLang(list));
  };
  const _handlePop = (lang: any) => {
    let list = [...selectedLang];
    let newList = list.filter(l => {
      return l !== lang?.id;
    });
    setSelectedLang(newList);
    dispatch(setLang(newList));
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(getSubCategory({params: {parent: selectedCategoires?.id}}));
    });
    return unsubscribe;
  }, [dispatch, navigation, selectedCategoires?.id]);
  //@ts-ignore
  tron.logImportant('langa', subLangs);
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
          إختر اللغات المفضلة
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
          subLangs.map((lang, index) => (
            <TouchableOpacity
              onPress={() => {
                selectedLang.find((la: any) => la === lang?.id)
                  ? _handlePop(lang)
                  : _handlePush(lang);
              }}
              key={index}
              style={{
                width: width / 1.1,
                height: 45,
                borderRadius: 13,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignSelf: 'center',
                marginBottom: 16,
                paddingHorizontal: 16,
                borderWidth: selectedLang.find((la: any) => la === lang?.id)
                  ? 0
                  : 1,
                borderColor: selectedLang.find((la: any) => la === lang?.id)
                  ? ''
                  : '#AAAAAA',
                backgroundColor: selectedLang.find((la: any) => la === lang?.id)
                  ? '#FF0F39'
                  : '#FCFCFC',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: selectedLang.find((la: any) => la === lang?.id)
                    ? Fonts.CBOLD
                    : Fonts.CSEMIBOLD,
                  color: selectedLang.find((la: any) => la === lang?.id)
                    ? '#F6F6F6'
                    : '#313131',
                }}>
                {lang?.name}
              </Text>
              <Image
                source={{uri: lang?.image?.src}}
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
          ))
        )}
        <View style={{position: 'absolute', bottom: 20, right: 20}}>
          <GradientButton
            buttonName="حفظ"
            onPress={() => {
              navigation.navigate('PerfSelect');
            }}
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
