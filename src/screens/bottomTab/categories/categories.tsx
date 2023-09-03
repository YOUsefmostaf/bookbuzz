import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {HeaderApp} from 'components';
import {Fonts, height, width, wp} from 'theme';
import printer from 'reactotron-react-native';
import Spinner from 'react-native-spinkit';
import {useSelector, useDispatch} from 'react-redux';
import {
  getSubCategory,
  selectSubCategoires,
  selectLoadingCategories,
  selectIntrestCate,
  getSubCategoryPagination,
} from 'store/categories';
import {getSearch, searchActions} from 'store/Search';
import {concat, flatMap, join} from 'lodash';

export const CategoriesScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const loading = useSelector(selectLoadingCategories);
  const subIntrests = useSelector(selectSubCategoires);
  const selectedCategoires = useSelector(selectIntrestCate);

  React.useEffect(() => {
    dispatch(
      getSubCategory({
        params: {parent: selectedCategoires?.id, per_page: 2, page: 1},
      }),
    );
  }, [dispatch, selectedCategoires?.id]);
  const _handleMore = () => {
    let pa = page;
    pa = pa + 1;
    setPage(pa);
    dispatch(
      getSubCategoryPagination({
        params: {parent: selectedCategoires?.id, per_page: 2, page: pa},
      }),
    );
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Subcategories', {
            id: item.id,
            image: item.image?.src,
          })
        }>
        <ImageBackground
          source={{
            uri: item.image?.src,
          }}
          style={{
            width: width * 0.45,
            backgroundColor: 'grey',
            marginHorizontal: width * 0.01666666,
            marginBottom: width * 0.0333333,
            height: height * 0.2,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            overflow: 'hidden',
          }}>
          <Text
            style={{color: 'white', fontFamily: Fonts.CSEMIBOLD, fontSize: 14}}>
            {item.name}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
      <HeaderApp
        mt={height * 0.1}
        title="Categories"
        onPress={() => navigation.getParent().openDrawer()}
      />
      <FlatList
        data={subIntrests}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        onEndReached={_handleMore}
        onEndReachedThreshold={0.8}
        contentContainerStyle={{
          alignItems: 'center',
          marginVertical: height * 0.04,
          paddingBottom: wp(30),
          // height: height,
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
