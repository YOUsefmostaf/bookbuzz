import {StackNavigationProp} from '@react-navigation/stack';
import {BookContainer, HeaderApp} from 'components';
import * as React from 'react';
import {FlatList, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {BottomTabList} from 'src/navigation/paramsList';
import {getSearch} from 'store/Search';
import {AppColors, Fonts, height, width} from 'theme';

interface FilterReusltProps {
  navigation: StackNavigationProp<BottomTabList, 'Home'>;
}
export const FilterResult: React.FC<FilterReusltProps> = props => {
  const {searchResult} = useSelector(getSearch);
  return (
    <>
      <HeaderApp
        hasBack={true}
        backPress={() => props.navigation.goBack()}
        title="المنتجات"
      />
      <ScrollView>
        <Text
          style={{
            fontFamily: Fonts.CBOLD,
            color: AppColors.red,
            fontSize: 16,
            marginHorizontal: width * 0.075,
            marginVertical: height * 0.02,
            textAlign: 'left',
          }}>
          نتيجة البحث
        </Text>
        <FlatList
          scrollEnabled={false}
          data={searchResult}
          renderItem={({item, index}) => (
            <BookContainer
              book={item?.product_data}
              image={item?.image_url}
              style={{margin: 10}}
              onPress={() =>
                props.navigation?.navigate('BookDetails', {
                  book: item?.product_data,
                })
              }
            />
          )}
          numColumns={3}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
    </>
  );
};
