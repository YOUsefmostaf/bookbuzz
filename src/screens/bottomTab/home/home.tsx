import {Input} from '@ui-kitten/components';
import {
  BookContainer,
  HeaderApp,
  VendorContainer,
  AuthorContainer,
} from 'components';
import {FILTER, SEARCH, DOT, DOTFILLED} from 'constants/icons';
import {concat, flatMap, join} from 'lodash';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ImageBackground,
  Image,
} from 'react-native';
import {selectAds, selectSliders} from 'store/constants';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectIntrestCate,
  getSubCategory,
  selectSubCategoires,
  selectAuthors,
  selectAuthorsCate,
  getAuthors,
  getVendors,
  selectVendors,
  getCategoryIntrest,
  getCategoryAuthors,
  getCategoryLang,
} from 'store/categories';
import {
  getFeatProd,
  getProductsNew,
  getProductsPopular,
  selectProductsNew,
  selectProductsPopular,
  selectProdutsFeat,
} from 'store/products';
import {getSearch, searchActions} from 'store/Search/initialState';
import {AppColors, Fonts, height, hp, width, wp} from 'theme';
// import {useDebounce} from 'use-debounce/lib';
import {categiresApi} from 'api';
import {getPref} from 'store/pref';

export const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const SLIDER_WIDTH = width + 80;
  const [xx, setIndex] = React.useState(0);
  const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
  const intrestCate = useSelector(selectIntrestCate);
  const isCarousel: any = React.useRef(null);
  const newBoooks = useSelector(selectProdutsFeat);
  const authorCate = useSelector(selectAuthorsCate);
  const sliders = useSelector(selectSliders);
  const ads = useSelector(selectAds);
  const subIntrests = useSelector(selectSubCategoires);
  const authors = useSelector(selectAuthors);
  const vendors = useSelector(selectVendors);
  const productsNew = useSelector(selectProductsNew);
  const productsPopular = useSelector(selectProductsPopular);
  useEffect(() => {
    dispatch(getPref());
  }, []);
  React.useEffect(() => {
    let fetchCat = async () => {
      dispatch(getCategoryAuthors({params: {slug: 'author'}}));
      dispatch(getCategoryIntrest({params: {slug: 'intrest'}}));
      dispatch(getCategoryLang({params: {slug: 'language'}}));
    };
    fetchCat();
  }, []);
  React.useEffect(() => {
    dispatch(getCategoryIntrest({params: {slug: 'intrest'}}));
    dispatch(
      getProductsNew({
        params: {
          orderby: 'date',
        },
      }),
    );
    dispatch(getProductsPopular({params: {orderby: 'popularity'}}));
    dispatch(getVendors({params: {}}));
  }, [dispatch]);
  const filterValues = useSelector(getSearch);

  React.useEffect(() => {
    dispatch(getSubCategory({params: {parent: intrestCate?.id}}));
  }, [dispatch, intrestCate?.id]);

  React.useEffect(() => {
    dispatch(getAuthors({params: {parent: authorCate?.id}}));
  }, [dispatch, authorCate?.id]);

  const [search, setSearch] = useState('');
  // const [searchDelayed] = useDebounce(search, 1000);

  React.useEffect(() => {
    // dispatch(
    //   getProductsNew({
    //     params: {
    //       orderby: 'date',
    //       search: searchDelayed,
    //     },
    //   }),
    // );
    // dispatch(
    //   getProductsPopular({
    //     params: {
    //       orderby: 'popularity',
    //       search: searchDelayed,
    //     },
    //   }),
    // );
    dispatch(getFeatProd());
    // dispatch(getVendors({params: {search: searchDelayed}}));
    // dispatch(
    //   getSubCategory({
    //     params: {parent: intrestCate?.id, search: searchDelayed},
    //   }),
    // );
    // dispatch(
    //   getAuthors({params: {parent: authorCate?.id, search: searchDelayed}}),
    // );
  }, []);
  const renderCarousel = ({item, index}: any) => (
    <TouchableOpacity key={index}>
      <ImageBackground
        source={{uri: item?.image}}
        imageStyle={{borderRadius: 20}}
        style={{
          width: width * 0.9,
          backgroundColor: 'grey',
          height: height * 0.22,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'flex-end',
          flexDirection: 'row',
          borderRadius: 20,
        }}>
        <Pagination
          dotsLength={sliders.length}
          activeDotIndex={xx}
          carouselRef={isCarousel}
          dotStyle={{
            width: wp(5),
            height: hp(2.5),
            borderRadius: 90,
            marginHorizontal: 0,
            backgroundColor: '#FF0F39',
            borderColor: '#F6F6F6',
            borderWidth: 1,
          }}
          inactiveDotStyle={{
            backgroundColor: 'transparent',
            borderColor: '#F6F6F6',
            borderWidth: 1,
          }}
          inactiveDotOpacity={0.8}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
      </ImageBackground>
    </TouchableOpacity>
  );

  const renderCat = ({item}: any) => (
    // <ImageBackground source={item.image}>
    //   </ImageBackground>
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
          marginHorizontal: 16,
          height: height * 0.2,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 20,
          overflow: 'hidden',
        }}>
        <Text
          style={{color: 'white', fontFamily: Fonts.CSEMIBOLD, fontSize: 14}}>
          {item?.name}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );

  const renderBook = ({item}) => (
    <BookContainer
      large
      book={item}
      style={{marginLeft: width * 0.0333333}}
      onPress={() => navigation.navigate('BookDetails', {book: item})}
    />
  );
  const renderBookFeat = ({item}) => (
    <BookContainer
      large
      image={item?.image_url}
      book={item?.product_data}
      style={{marginLeft: width * 0.0333333}}
      onPress={() =>
        navigation.navigate('BookDetails', {book: item?.product_data})
      }
    />
  );

  const renderVendor = ({item}) => (
    <VendorContainer
      vendor={item}
      containerStyle={{marginLeft: width * 0.0333333}}
      large
      onPress={() => navigation.navigate('VendorDetails', {vendor: item})}
    />
  );

  const renderAuthor = ({item}) => (
    <AuthorContainer
      author={item}
      onPress={() => navigation.navigate('AuthorDetails', {author: item})}
    />
  );

  return (
    <View style={{flex: 1, backgroundColor: '#F6F6F6'}}>
      <HeaderApp
        mt={height * 0.05}
        title="Browse"
        onPress={() => navigation.getParent().openDrawer()}
        hasHeart
        heartPress={() =>
          navigation.navigate('ProfileStack', {screen: 'whishlist'})
        }
      />
      <View
        style={{
          width: width * 0.9,
          height: height * 0.06,
          backgroundColor: 'white',
          alignSelf: 'center',
          alignItems: 'center',
          marginTop: -height * 0.03,
          borderRadius: height * 0.04,
          flexDirection: 'row-reverse',
          shadowColor: 'black',
          shadowOpacity: 0.26,
          shadowOffset: {width: 0, height: 2},
          shadowRadius: 10,
          elevation: 3,
          marginBottom: height * 0.02,
        }}>
        <Input
          style={{
            width: width * 0.775,
            borderWidth: 0,
            backgroundColor: 'transparent',
          }}
          textStyle={{
            fontFamily: Fonts.CREG,
            color: '#C5C5C5',
            textAlign: 'left',
            fontSize: 15,
          }}
          value={search}
          onChangeText={nextValue => setSearch(nextValue)}
          accessoryRight={<SEARCH />}
          size="large"
          placeholderTextColor="#C5C5C5"
          placeholder="Search ..."
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('FilterS', {
              filter: {
                FilterOps: [
                  'byPublisher',
                  'byReleaseDate',
                  'byAuthers',
                  'byInterests',
                  'byLangs',
                ],
                fitlerParams: {},
                filterVals: {},
              },
            })
          }
          style={{
            backgroundColor: '#313131',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: width * 0.125,
            borderTopLeftRadius: height * 0.04,
            borderBottomLeftRadius: height * 0.04,
          }}>
          <FILTER />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {/* <Image
          style={{width: width, height: height * 0.06, marginBottom: 24}}
          source={{uri: ads[0]?.image}}
        /> */}
        {/* <Carousel
          data={sliders}
          renderItem={renderCarousel}
          sliderWidth={width}
          itemWidth={width}
          autoplay
          ref={isCarousel}
          onSnapToItem={indexx => setIndex(indexx)}
          loop
          autoplayDelay={5000}
          autoplayInterval={5000}
        /> */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: height * 0.025,
            alignSelf: 'center',
          }}>
          <TouchableOpacity>
            <View
              style={{
                width: width * 0.44,
                backgroundColor: 'grey',
                marginHorizontal: width * 0.01666666,
                marginBottom: width * 0.0333333,
                height: height * 0.2,
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                borderRadius: 20,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: Fonts.CSEMIBOLD,
                  fontSize: 14,
                  marginBottom: height * 0.025,
                  marginLeft: width * 0.15,
                }}>
                Children's books
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                width: width * 0.44,
                backgroundColor: 'grey',
                marginHorizontal: width * 0.01666666,
                marginBottom: width * 0.0333333,
                height: height * 0.2,
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
                borderRadius: 20,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: Fonts.CSEMIBOLD,
                  fontSize: 14,
                  marginBottom: height * 0.025,
                  marginLeft: width * 0.17,
                }}>
                General books{' '}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: width * 0.9,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts.CBOLD,
              color: AppColors.red,
              fontSize: 17,
              // marginHorizontal: width * 0.075,
              textAlign: 'left',
              marginTop: height * 0.01,
            }}>
            Featured Categories
          </Text>
          <Text
            onPress={() =>
              navigation.navigate('bottomScreens', {screen: 'Categoires'})
            }
            style={{
              fontFamily: Fonts.CBOLD,
              color: '#313131',
              fontSize: 13,
              // marginHorizontal: width * 0.075,
              textAlign: 'left',
              marginTop: height * 0.01,
              textDecorationLine: 'underline',
            }}>
            More
          </Text>
        </View>
        <FlatList
          data={subIntrests}
          horizontal
          renderItem={renderCat}
          contentContainerStyle={{
            alignItems: 'center',
            marginVertical: height * 0.025,
          }}
          keyExtractor={item => item.id}
        />

        <View
          style={{
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: width * 0.9,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts.CBOLD,
              color: AppColors.red,
              fontSize: 17,
              // marginHorizontal: width * 0.075,
              textAlign: 'left',
              marginTop: height * 0.01,
            }}>
            Best sales
          </Text>
          <Text
            onPress={() => navigation.navigate('Tags', {orderby: 'popularity'})}
            style={{
              fontFamily: Fonts.CBOLD,
              color: '#313131',
              fontSize: 13,
              // marginHorizontal: width * 0.075,
              textAlign: 'left',
              marginTop: height * 0.01,
              textDecorationLine: 'underline',
            }}>
            More
          </Text>
        </View>
        <FlatList
          data={productsNew}
          horizontal
          renderItem={renderBook}
          contentContainerStyle={{
            alignItems: 'center',
            marginVertical: height * 0.025,
          }}
          keyExtractor={item => item.id}
        />
        {/* <Image
          style={{width: width, height: height * 0.06, marginBottom: 24}}
          source={{uri: ads[1]?.image}}
        /> */}
        <View
          style={{
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: width * 0.9,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts.CBOLD,
              color: AppColors.red,
              fontSize: 17,
              // marginHorizontal: width * 0.075,
              textAlign: 'left',
              marginTop: height * 0.01,
            }}>
            New books
          </Text>
          <Text
            onPress={() => navigation.navigate('Tags', {orderby: 'date'})}
            style={{
              fontFamily: Fonts.CBOLD,
              color: '#313131',
              fontSize: 13,
              // marginHorizontal: width * 0.075,
              textAlign: 'left',
              marginTop: height * 0.01,
              textDecorationLine: 'underline',
            }}>
            More
          </Text>
        </View>
        <FlatList
          data={newBoooks}
          horizontal
          // inverted={true}
          renderItem={renderBookFeat}
          contentContainerStyle={{
            alignItems: 'center',
            marginVertical: height * 0.025,
          }}
          keyExtractor={item => item.id}
        />
        <View
          style={{
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: width * 0.9,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts.CBOLD,
              color: AppColors.red,
              fontSize: 17,
              // marginHorizontal: width * 0.075,
              textAlign: 'left',
              marginTop: height * 0.01,
            }}>
            Shop by publisher
          </Text>
          <Text
            onPress={() => navigation.navigate('Vendors')}
            style={{
              fontFamily: Fonts.CBOLD,
              color: '#313131',
              fontSize: 13,
              // marginHorizontal: width * 0.075,
              textAlign: 'left',
              marginTop: height * 0.01,
              textDecorationLine: 'underline',
            }}>
            More
          </Text>
        </View>
        <FlatList
          data={vendors}
          horizontal
          // inverted={true}
          renderItem={renderVendor}
          contentContainerStyle={{
            alignItems: 'center',
            marginVertical: height * 0.025,
          }}
          keyExtractor={item => item.id}
        />
        <View
          style={{
            flexDirection: 'row-reverse',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: width * 0.9,
            alignSelf: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts.CBOLD,
              color: AppColors.red,
              fontSize: 17,
              // marginHorizontal: width * 0.075,
              textAlign: 'left',
              marginTop: height * 0.01,
            }}>
            Browse authors
          </Text>
          <Text
            onPress={() => navigation.navigate('Authors')}
            style={{
              fontFamily: Fonts.CBOLD,
              color: '#313131',
              fontSize: 13,
              // marginHorizontal: width * 0.075,
              textAlign: 'left',
              marginTop: height * 0.01,
              textDecorationLine: 'underline',
            }}>
            More
          </Text>
        </View>
        <FlatList
          data={authors}
          horizontal
          // inverted
          renderItem={renderAuthor}
          contentContainerStyle={{
            alignItems: 'center',
            marginVertical: height * 0.025,
            marginBottom: height / 10,
          }}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </View>
  );
};
