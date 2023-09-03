import React from 'react';
import {StatusBar, I18nManager} from 'react-native';
import Toast from 'react-native-toast-message';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {Loader} from 'components';
import {selectLoadingAds, selectLoadingCarsoul} from 'store/constants';
import SplashScreen from 'react-native-splash-screen';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/store';
import {Provider, useSelector} from 'react-redux';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {default as theme} from './src/theme/custom-theme.json';
import AppNavigator from 'navigation';
import {useDispatch} from 'react-redux';
import {getAds, getCarousel} from 'store/constants';

const App = () => {
  const dispatch = useDispatch();
  I18nManager.forceRTL(true);
  const loadingOne = useSelector(selectLoadingAds);
  const loadingTwo = useSelector(selectLoadingCarsoul);

  React.useEffect(() => {
    dispatch(getCarousel());
    dispatch(getAds());
  }, [dispatch]);
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <React.Fragment>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <StatusBar
          barStyle={'light-content'}
          backgroundColor={'#EB0D34'}
          animated={true}
        />
        {/* {loadingTwo || loadingOne ? (
          <Loader />
        ) : ( */}
          <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
              <AppNavigator />
            </ApplicationProvider>
          </>
        {/* )} */}
      </SafeAreaProvider>
      <Toast topOffset={50} />
    </React.Fragment>
  );
};

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};
