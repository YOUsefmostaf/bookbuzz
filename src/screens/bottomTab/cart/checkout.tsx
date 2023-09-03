import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {selectTokenToPay, clearCart} from 'store/cart';
export const CheckOutScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(true);
  const token = useSelector(selectTokenToPay);
  const dispatch = useDispatch();
  const hideSpinner = () => {
    setLoading(false);
  };
  const _onNavigationStateChange = (webViewState: any) => {
    if (webViewState.url.includes('success=true')) {
      //@ts-ignore
      navigation.navigate('OrderSuccess');
      // this.setState({viewBtn:true})
      dispatch(clearCart());
    } else if (webViewState.url.includes('success=false')) {
      //@ts-ignore
      navigation.navigate('OrderFail');
    }
  };
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <WebView
          onNavigationStateChange={_onNavigationStateChange}
          onLoad={() => hideSpinner()}
          source={{
            uri:
              'https://accept.paymob.com/api/acceptance/iframes/18922' +
              '?payment_token=' +
              token,
          }}
          style={{flex: 1}}
        />
      </View>
    </View>
  );
};
