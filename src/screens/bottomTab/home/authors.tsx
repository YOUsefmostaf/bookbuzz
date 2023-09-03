import React, {useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import {AuthorContainer, HeaderApp, VendorContainer} from 'components';
import {Fonts, height, width, wp, AppColors} from 'theme';
import printer from 'reactotron-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectAuthorsCate} from 'store/categories';
import {
  getAllAuthors,
  selectLoadingAuthors,
  selectAuthors,
  getAllAuthorsPagination,
} from 'store/authors';
import Spinner from 'react-native-spinkit';

export const AuthorsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(1);
  const authorCate = useSelector(selectAuthorsCate);

  React.useEffect(() => {
    dispatch(
      getAllAuthors({params: {parent: authorCate?.id, per_page: 10, page: 1}}),
    );
  }, [dispatch, authorCate?.id]);

  const loadingAuthors = useSelector(selectLoadingAuthors);
  const authors = useSelector(selectAuthors);

  useEffect(() => {
    const parent = navigation.getParent();
    parent.setOptions({
      tabBarStyle: {display: 'none'},
    });
    return () =>
      parent.setOptions({
        tabBarStyle: {
          height: height * 0.05,
          backgroundColor: '#E6E6E6',
          borderRadius: height * 0.025,
          position: 'absolute',
          bottom: wp(5),
          paddingHorizontal: 5,
          marginHorizontal: width * 0.05,
          borderTopWidth: 0,
          alignItems: 'center',
        },
      });
  }, []);

  const renderItem = ({item}) => (
    <AuthorContainer
      author={item}
      containerStyle={{
        marginTop: height * 0.025,
      }}
      onPress={() => navigation.navigate('AuthorDetails', {author: item})}
    />
  );
  const _handleLoadMore = () => {
    let pa = page;
    pa = pa + 1;
    setPage(pa);
    dispatch(
      getAllAuthorsPagination({
        params: {per_page: 10, page: pa},
      }),
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
      <HeaderApp
        mt={height * 0.05}
        hasBack
        title={'Authors'}
        onPress={() => navigation.goBack()}
      />

      <Text
        style={{
          fontFamily: Fonts.CBOLD,
          color: AppColors.red,
          fontSize: 16,
          marginHorizontal: width * 0.075,
          textAlign: 'left',
          marginTop: height * 0.01,
        }}>
        Authors
      </Text>

      <FlatList
        data={authors}
        numColumns={2}
        onEndReached={_handleLoadMore}
        onEndReachedThreshold={0.3}
        renderItem={renderItem}
        contentContainerStyle={{
          alignItems: 'center',
          paddingBottom: wp(10),
          // height: height,
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};
