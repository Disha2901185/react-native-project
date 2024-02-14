import { AppRegistry } from 'react-native';
import App from './App';  
import { MyContextProvider } from './src/Context/AuthContext';
import { Provider } from 'react-redux';
import {store} from './src/Store/store'
import { ConfigureStore } from '@reduxjs/toolkit';



const RootComponent = () => (
    <MyContextProvider>
 <Provider store={store}>
    <App />
  </Provider>,
    </MyContextProvider>

);

AppRegistry.registerComponent('AwesomeProject', () => RootComponent);
