import Reactotron from 'reactotron-react-native';
import {NativeModules} from 'react-native';
import {reactotronRedux} from 'reactotron-redux';
import url from 'url';

const {hostname}: any = url.parse(NativeModules.SourceCode.scriptURL);

Reactotron.configure({
  name: 'lokle',
  host: hostname,
})
  .useReactNative({})
  .use(reactotronRedux())
  .connect();

export default Reactotron;
