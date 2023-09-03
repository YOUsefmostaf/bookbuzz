import React from 'react';
import {MINUS, PLUS, DELETE, LIKED, CARTICON} from 'constants/icons';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import normalize from 'react-native-normalize';
import LinearGradient from 'react-native-linear-gradient';
import {Fonts, height, hp, width, wp} from 'theme';
import {HeaderApp} from '../header/header';
import {removeFromCart, selectItems} from 'store/cart';
import {useSelector, useDispatch} from 'react-redux';
import tron from 'reactotron-react-native';

export const ListComponent = ({
  title,
  lists,
  isWish,
  variant,
  total,
  deleteProduct,
  plusQuantity,
  minusQuantity,
  Buy,
  backPress,
  onRemoveFromWishlist,
}: any) => {
  const products = useSelector(selectItems);
  const dispatch = useSelector(useDispatch);
  return (
    <>
      <HeaderApp hasBack={true} onPress={backPress} title={title} />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 20,
          paddingTop: 16,
          paddingHorizontal: 16,
        }}
        style={isWish && {marginBottom: hp(15)}}>
        {lists.length > 0 && lists[0].id !== undefined ? (
          <>
            {lists.map((list: any, index: any) => (
              <View key={index}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 30,
                    marginTop: 16,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    {!isWish ? (
                      <DELETE
                        width={wp(8)}
                        height={wp(10)}
                        onPress={() => dispatch(removeFromCart(list?.id))}
                      />
                    ) : null}
                    <Image
                      style={{
                        width: width / 4.5,
                        height: height / 7,
                        borderRadius: 12,
                        marginRight: 16,
                        marginLeft: 12,
                        backgroundColor: 'gray',
                      }}
                      source={{
                        uri: list?.images[0]?.src,
                      }}
                    />
                    <View>
                      <Text
                        style={{
                          fontFamily: Fonts.CREG,
                          color: '#313131',
                          fontSize: normalize(16),
                          flexWrap: 'wrap',
                          width: width / 3,
                        }}>
                        {list?.name}
                      </Text>
                      <Text
                        style={{
                          fontFamily: Fonts.CBOLD,
                          color: '#FF0F39',
                          fontSize: normalize(13),
                        }}>
                        {list?.authorName}
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: isWish ? '#313131' : '#FF0F39',
                        fontSize: normalize(14),
                        left: wp(2),
                        fontFamily: Fonts.CBOLD,
                        flexWrap: 'nowrap',
                      }}>
                      {list?.price} ج.م
                    </Text>
                    {!isWish ? (
                      <View
                        style={{
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <PLUS
                          style={{right: 8}}
                          width={wp(6)}
                          height={hp(8)}
                          onPress={() => plusQuantity(list)}
                        />
                        <Text
                          style={{
                            fontFamily: Fonts.CREG,
                            fontSize: normalize(15),
                            color: '#313131',
                          }}>
                          {list?.quantity}
                        </Text>
                        <MINUS
                          style={{left: 8}}
                          width={wp(6)}
                          height={hp(8)}
                          onPress={() => minusQuantity(list)}
                        />
                      </View>
                    ) : (
                      <>
                        <LIKED onPress={() => onRemoveFromWishlist(list?.id)} />
                      </>
                    )}
                  </View>
                </View>
                <View
                  style={{
                    borderBottomColor: '#E6E6E6',
                    borderBottomWidth: 1,
                    borderStyle: 'dashed',
                    width: width,
                  }}
                />
              </View>
            ))}
            {!isWish ? (
              <Text
                style={{
                  color: '#313131',
                  fontSize: normalize(14),
                  fontFamily: Fonts.CREG,
                  textAlign: 'right',
                  marginTop: 24,
                }}>
                الإجمالي :
                <Text
                  style={{
                    color: '#FF0F39',
                    fontFamily: Fonts.CBOLD,
                    fontSize: normalize(16),
                  }}>
                  {' '}
                  {total} ج.م
                </Text>
              </Text>
            ) : null}
          </>
        ) : (
          <Text
            style={{
              textAlign: 'center',
              paddingTop: hp(30),
              color: '#c4c4c4',
              fontFamily: Fonts.CSEMIBOLD,
              fontSize: normalize(20),
            }}>
            {isWish ? "You don't have favorites yet" : 'Your cart is empty'}
          </Text>
        )}

        {!isWish && variant !== undefined ? (
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderColor: '#FF0F39',
              borderWidth: 1,
              borderRadius: 12,
              paddingVertical: 24,
              marginTop: 43,
            }}>
            <Text
              style={{
                color: '#FF0F39',
                fontFamily: Fonts.CBOLD,
                fontSize: normalize(17),
                marginHorizontal: 10,
                marginBottom: 16,
              }}>
              كتب ذات صلة
            </Text>
            {variant === undefined ? null : (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {variant?.map((vars: any, index: any) => (
                  <View key={index} style={{marginHorizontal: 10}}>
                    <Image
                      style={{
                        height: height / 7,
                        width: width / 3.5,
                        borderRadius: 12,
                      }}
                      source={{uri: vars?.image}}
                    />
                    <Text
                      style={{
                        color: '#FF0F39',
                        fontSize: normalize(13),
                        fontFamily: Fonts.CREG,
                        textAlign: 'left',
                        paddingTop: 12,
                      }}>
                      23
                      <Text
                        style={{
                          fontSize: normalize(11),
                          fontFamily: Fonts.CREG,
                          color: '#313131',
                        }}>
                        {' '}
                        E.G{' '}
                      </Text>
                    </Text>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        ) : null}
        {!isWish ? (
          products.length === 0 ? null : (
            <TouchableOpacity
              onPress={Buy}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <LinearGradient
                colors={['#F20D35', '#E10B31', '#D30A2D', '#C00828', '#B10624']}
                style={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  borderRadius: 32,
                  height: hp(7),
                  alignSelf: 'center',
                  width: width / 1.1,
                  marginTop: 26,
                  marginBottom: height / 15,
                  paddingHorizontal: 16,
                }}>
                <Text
                  style={{
                    fontSize: normalize(15),
                    fontFamily: Fonts.CBOLD,
                    color: '#F6F6F6',
                  }}>
                  Complete the request
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#F6F6F6',
                    borderRadius: 90,
                    width: wp(10),
                    height: hp(5),
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.CBOLD,
                      color: '#FF0F39',
                      fontSize: normalize(10),
                      position: 'absolute',
                      top: 0,
                      left: 10,
                    }}>
                    {lists?.length}
                  </Text>
                  <CARTICON />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          )
        ) : null}
      </ScrollView>
    </>
  );
};
