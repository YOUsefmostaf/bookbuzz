import React from 'react';
import {PerfSelectParamsList} from '../../../navigation/paramsList';
import {StackNavigationProp} from '@react-navigation/stack';
import {INONE} from 'constants/icons';
import Toast from 'react-native-toast-message';
import {GradientButton, HeaderApp} from 'components';
import {View, Text} from 'react-native';
import {Fonts, width, wp} from 'theme';
import {AuthorsList} from './list/list';
import tron from 'reactotron-react-native';
import {
  savePref,
  selectLoadingSpref,
  selectMessagePref,
  setMessagePref,
} from 'store/pref';
import {
  selectIntrest,
  selectAuthors,
  selectLangs,
  setComplete,
  setFinsish,
} from 'store/auth';
import Spinner from 'react-native-spinkit';
import {useSelector, useDispatch} from 'react-redux';
import {
  getSubCategory,
  selectSubCategoires,
  selectLoadingCategories,
  selectAuthorsCate,
  setSub,
  setAuthorByLang,
  selectAuthorsEnglish,
  selectAuthorsByLang,
  selectAuthorsArabic,
  selectAuthorsTranslator,
} from 'store/categories';

interface Props {
  navigation: StackNavigationProp<PerfSelectParamsList, 'authorSelect'>;
}

export const WritersScreen: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const message = useSelector(selectMessagePref);
  const loadingPref = useSelector(selectLoadingSpref);
  const langs = useSelector(selectLangs);
  const intersts = useSelector(selectIntrest);
  const englishAuthor = useSelector(selectAuthorsEnglish);
  const authors = useSelector(selectAuthors);
  const loading = useSelector(selectLoadingCategories);
  const trans = useSelector(selectAuthorsTranslator);
  const arabic = useSelector(selectAuthorsArabic);
  const subLangs = useSelector(selectSubCategoires);
  const authorss = useSelector(selectAuthorsByLang);
  const selectedCategoires = useSelector(selectAuthorsCate);
  const [selectedAuthors, setSelectedAuthors] = React.useState<any>([]);
  const _handleOnpress = () => {
    if (selectedAuthors.length < 3) {
      Toast.show({
        type: 'info',
        text1: 'اختر اكثر من 3 أنواع',
      });
    } else {
      // navigation.navigate('authorSelect');
      dispatch(
        savePref({
          lang: langs,
          authors: authors,
          interests: intersts,
        }),
      );
    }
  };
  React.useEffect(() => {
    if (message) {
      //@ts-ignore
      dispatch(setComplete(true));
      dispatch(setFinsish(true));
      //@ts-ignore
      navigation.navigate('App');
    }
    return () => {
      dispatch(setMessagePref(false));
    };
  }, [dispatch, message, navigation]);
  React.useEffect(() => {
    if (langs.find(id => id === 5808)) {
      dispatch(setAuthorByLang(englishAuthor));
    } else if (langs.find(id => id === 5410)) {
      dispatch(setAuthorByLang(arabic));
    } else {
      dispatch(setAuthorByLang(trans));
    }
  }, [arabic, dispatch, englishAuthor, langs, trans]);
  tron.logImportant('dssd', englishAuthor);
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
          إختر المؤلفين المفضلين
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
          <AuthorsList
            data={authorss}
            selectedCate={selectedAuthors}
            setSelectedCate={setSelectedAuthors}
          />
        )}
        <View style={{position: 'absolute', bottom: 20, right: 20}}>
          <GradientButton
            buttonName="حفظ"
            onPress={() => {
              _handleOnpress();
              // navigation.navigate('PerfSelect');
            }}
            loading={loadingPref}
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
