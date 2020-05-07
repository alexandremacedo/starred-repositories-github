import Reactotron from 'reactotron-react-native';
const localhost = '127.0.0.1'
if (__DEV__) {
  const tron = Reactotron.configure({ host: localhost })
    .useReactNative()
    .connect();
  console.tron = tron;
  tron.clear();
}
