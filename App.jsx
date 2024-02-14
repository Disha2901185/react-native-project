import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MyContext} from './src/Context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from './src/components/Profile';
import {Login} from './src/components/Login';
import {Signup} from './src/components/Signup';
import {VerticallyPics} from './src/components/VerticallyPics';
import Headers from './src/components/Headers';
import {Button, TouchableOpacity} from 'react-native';
import {Header} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import {store} from './src/Store/store';
const Stack = createNativeStackNavigator();

function App() {
  const [userData, setUserData] = useState(null);
  const {data} = useContext(MyContext);

  const checkAsyncStorage = async () => {
    try {
      const storedData = JSON.parse(await AsyncStorage.getItem('myData'));
      // console.log(storedData);
      setUserData(storedData);
    } catch (error) {
      console.error('Error reading user data from AsyncStorage:', error);
    }
  };

  useEffect(() => {
    checkAsyncStorage();
  }, [data]);

  return (
    // <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        {/* // screenOptions={{ */}
        {/* // header: () => <Headers />, // }}> */}
        {userData ? (
          <>
            <Stack.Screen
              name="Profile"
              component={Profile}
              options={{
                header: () => <Headers title="Profile" />,
                headerStyle: {backgroundColor: '#525252'},
                headerTintColor: '#fff',
              }}
            />
            <Stack.Screen
              name="VerticallyPics"
              component={VerticallyPics}
              options={{header: () => <Headers title="Flatlist" />}}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{headerStyle: {backgroundColor: '#525252'}, headerTintColor: '#fff'}}
            />
            <Stack.Screen name="Login" component={Login} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
    // </Provider>
  );
}

export default App;
