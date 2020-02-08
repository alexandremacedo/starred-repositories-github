import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({ host: '150.163.64.55' })
    .useReactNative()
    .connect();
  console.tron = tron;
  tron.clear();
}
