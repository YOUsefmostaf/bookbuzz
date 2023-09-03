import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from 'react-native';
import tron from 'reactotron-react-native';
import {width, height, Fonts, theme, wp} from 'theme';
import LinearGradient from 'react-native-linear-gradient';
import {FORWARDICON, LIKED, STAR, WHITESTAR} from 'constants/icons';
import {componentsStyles} from 'components/componentStyles';
import {GradientButton} from 'components';
import RenderHtml from 'react-native-render-html';
import {addToCart} from 'store/cart';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectProductsOwner,
  getProductsOwner,
  getProducts,
  selectProducts,
  getReleatedProducts,
  selectReleatedProduts,
  getProductsWishlist,
  selectProdutsWishlist,
} from 'store/products';
import _ from 'lodash';
import {getPref, savePref, selectPrefs} from 'store/pref';
import {remove} from 'lodash';
import {BookContainer} from 'components';
export const BookDetailsScreen = ({navigation, route}: any) => {
  const {book} = route.params;
  const scrollviewRef = React.useRef(null);
  const dispatch = useDispatch();
  const productsOnwer = useSelector(selectProducts);
  const product = useSelector(selectProductsOwner);
  const related = useSelector(selectReleatedProduts);
  const {products: likedProds} = useSelector(selectPrefs);
  const [liked, setliked] = useState<Boolean>(false);
  // useEffect(() => {
  //   let index = likedProds.findIndex(i => i === route?.params?.book?.id);
  //   if (index >= 0) setliked(true);
  //   else setliked(false);
  // }, [book, likedProds]);
  const onAddToWishlist = () => {
    let id = route?.params?.book?.id;
    let prods = [...likedProds];
    prods.push(id);
    dispatch(savePref({products: [...prods]}));
    dispatch(getPref());
    setliked(true);
  };
  const onRemoveFromWishList = () => {
    let id = route?.params?.book?.id;
    let prods = [...likedProds];
    prods = _.filter(prods, item => item !== id);
    dispatch(savePref({products: [...prods]}));
    dispatch(getPref());
    setliked(false);
  };
  const source = {
    html: `
  ${book?.description}`,
  };

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

  React.useEffect(() => {
    dispatch(
      getProductsOwner({
        id: book?.id,
      }),
    );
    dispatch(getReleatedProducts([book?.id]));
  }, [book?.id, dispatch]);

  React.useEffect(() => {
    if (product[0]?.term_id !== undefined) {
      dispatch(getProducts({params: {category: product[0]?.term_id}}));
    }
  }, [dispatch, product]);
  React.useEffect(() => {
    dispatch(getProductsWishlist({}));
  }, [dispatch]);
  const renderItem = ({item}: any) => (
    <BookContainer
      large
      book={item}
      style={{marginLeft: width * 0.0333333}}
      onPress={() => {
        navigation.navigate('BookDetails', {book: item});
        scrollviewRef.current.scrollTo(0);
      }}
    />
    // <TouchableOpacity
    //   onPress={() => navigation.navigate('BookDetails', {book: item})}
    //   key={item?.id}>
    //   <ImageBackground
    //     source={{
    //       uri:
    //         item?.images !== undefined
    //           ? item?.images[0]?.src
    //           : 'https://source.unsplash.com/random',
    //     }}
    //     imageStyle={{borderRadius: 20}}
    //     style={{
    //       width: width * 0.45,
    //       backgroundColor: 'grey',
    //       marginHorizontal: width * 0.01666666,
    //       marginBottom: width * 0.0333333,
    //       height: height * 0.28,
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //       borderRadius: 20,
    //     }}
    //   />
    //   <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
    //     <Text
    //       style={{
    //         color: '#FF0F39',
    //         fontFamily: Fonts.CSEMIBOLD,
    //         fontSize: 14,
    //         marginLeft: 16,
    //       }}>
    //       {item?.price}

    //       <Text
    //         style={{color: '#313131', fontFamily: Fonts.CREG, fontSize: 11}}>
    //         {''} ج.م
    //       </Text>
    //     </Text>
    //   </View>
    // </TouchableOpacity>
  );
  return (
    <View style={{backgroundColor: '#F6F6F6', flex: 1}}>
      <ScrollView
        ref={scrollviewRef}
        contentContainerStyle={{paddingBottom: 20}}>
        <ImageBackground
          style={{
            height: height * 0.58,
            width: width,
            opacity: 0.9,
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            backgroundColor: 'gray',
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          blurRadius={2.5}
          source={
            {
              // uri:
              //   book && book?.images && book?.images?.length >= 0
              //     ? book?.images[0].src
              //     : null,
            }
          }>
          <LinearGradient
            colors={['#101010', '#101010', '#101010']}
            locations={[0.5, 1.2, 1.4]}
            style={{
              backgroundColor: 'transparent',
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              justifyContent: 'flex-end',
              opacity: 0.7,
            }}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 42,
              left: 20,
              width: width * 0.1,
              height: height * 0.05,
            }}
            onPress={() => navigation.goBack()}>
            <FORWARDICON />
          </TouchableOpacity>
          {liked ? (
            <LIKED
              style={{
                position: 'absolute',
                right: 20,
                top: 42,
              }}
              onPress={() => onRemoveFromWishList()}
            />
          ) : (
            <FontIcon
              name="heart-o"
              style={{
                position: 'absolute',
                right: 20,
                top: 42,
                backgroundColor: '#F6F6F6',
                padding: 10,
                borderRadius: 50,
              }}
              color="#FF0F39"
              size={22}
              onPress={() => onAddToWishlist()}
            />
          )}
          <Image
            source={
              {
                // uri:
                //   book && book?.images && book?.images?.length >= 0
                //     ? book?.images[0].src
                //     : null,
              }
            }
            style={{
              borderRadius: 12,
              backgroundColor: 'black',
              height: height * 0.35,
              width: width * 0.55,
            }}
          />
        </ImageBackground>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 16,
              marginTop: 32,
            }}>
            <View style={{marginLeft: 16}}>
              <Text
                style={{
                  textAlign: 'left',
                  fontFamily: Fonts.CREG,
                  fontSize: 22,
                  color: 'black',
                  // lineHeight: 26,
                  flexWrap: 'wrap',
                  flex: 1,
                  // bottom: 10,
                }}>
                {book?.name}
              </Text>
              {product[0]?.term_id !== undefined ? (
                <Text
                  onPress={() =>
                    navigation.navigate('AuthorDetails', {author: product[0]})
                  }
                  style={{
                    ...componentsStyles.bookDetailsWriterName,
                    textAlign: 'right',
                    alignSelf: 'flex-start',
                    // marginLeft: 16,
                    // bottom: 20,
                  }}>
                  {product[0]?.name}
                </Text>
              ) : null}
            </View>
            <View>
              <Text style={componentsStyles.bookDetailsPrice}>
                {book?.on_sale ? book?.sale_price : book?.regular_price}
                <Text style={{fontSize: 15}}>E.G</Text>
              </Text>
              {book?.on_sale ? (
                <Text
                  style={{
                    ...componentsStyles.bookDetailsDiscount,
                  }}>
                  {book?.regular_price} E.G
                </Text>
              ) : null}
            </View>
          </View>

          <View style={{paddingHorizontal: 22}}>
            <RenderHtml
              baseStyle={{fontFamily: Fonts.CREG, color: '#313131'}}
              contentWidth={width}
              source={source}
            />
          </View>
          {product[0]?.term_id !== undefined ? (
            <View
              style={{
                flexDirection: 'row',
                width: width * 0.9,
                marginTop: height * 0.02,
                marginLeft: 16,
              }}>
              <View
                style={{
                  borderRadius: 7,
                  backgroundColor: 'gray',
                  height: height * 0.075,
                  width: width * 0.2,
                  marginRight: width * 0.04,
                }}
              />
              <View style={{flexDirection: 'column', justifyContent: 'center'}}>
                <Text
                  style={{
                    fontFamily: Fonts.CREG,
                    fontSize: 13,
                    color: 'black',
                  }}>
                  {product[0]?.name}
                </Text>
              </View>
            </View>
          ) : null}
          <View
            style={{
              borderBottomColor: '#707070',
              borderBottomWidth: 0.5,
              width: width,
              marginTop: height * 0.02,
            }}
          />
          <View
            style={{
              marginTop: height * 0.04,
            }}>
            <Text
              style={{
                fontFamily: Fonts.CBOLD,
                fontSize: 17,
                color: '#FF0F39',
                marginRight: 8,
                marginBottom: 16,
                writingDirection: 'rtl',
              }}>
              Related Books
            </Text>
            {related?.length > 0 ? (
              <FlatList
                data={related}
                horizontal
                renderItem={renderItem}
                contentContainerStyle={{
                  alignItems: 'center',
                }}
                keyExtractor={item => item.id}
              />
            ) : null}

            <>
              <Text
                style={{
                  fontFamily: Fonts.CBOLD,
                  fontSize: 17,
                  color: '#FF0F39',
                  marginRight: 8,
                  marginBottom: 16,
                  writingDirection: 'rtl',
                }}>
                Author Books
              </Text>
              <FlatList
                data={productsOnwer}
                horizontal
                // inverted
                renderItem={renderItem}
                contentContainerStyle={{
                  alignItems: 'center',
                  marginVertical: height * 0.025,
                }}
                keyExtractor={item => item.id}
              />
            </>
          </View>
        </View>
        <View style={{marginBottom: width * 0.12}} />
      </ScrollView>
      <View style={{marginBottom: height * 0.01}}>
        <GradientButton
          buttonName="Add To Cart"
          onPress={() => {
            dispatch(addToCart(book));
            navigation.navigate('Cart');
          }}
          loading={false}
          hasIcon={false}
          bR={32}
          pV={16}
          buttonWidth={width / 1.1}
          styleText={{
            fontFamily: Fonts.CBOLD,
            fontSize: 15,
            color: '#F6F6F6',
          }}
        />
      </View>
    </View>
  );
};
