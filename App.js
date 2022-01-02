import 'react-native-gesture-handler';

import React, { useContext } from 'react';

import AuthContext from './src/context/authContext'
import { FontAwesome } from '@expo/vector-icons';

import { FontAwesome5 } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';






import firebase from 'firebase'
import { firebaseConfig } from './src/config';
//firebase.initializeApp(firebaseConfig)

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}


import signin from './src/signin'
import signup from './src/signup'
import sellersScreen from './src/sellers'
import RequestsScreen from './src/requests'
import requestScreen from './src/requestPost'
import AccountScreen from './src/account'
import MyRequestsScreen from './src/myRequests'
import MySellsScreen from './src/mySells'

import { AuthProvider } from './src/context/authContext'
import { SellersProvider } from './src/context/sellersContext'
import { UserProvider } from './src/context/userContext'
import { RequestsProvider } from './src/context/requestsContext'

import sellScreen from './src/sell'




import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function selling() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="sellers" component={sellersScreen} options={{
        headerStyle: {
          backgroundColor: '#cae3eb',
        }
      }} />
      <Stack.Screen name="sell" component={sellScreen} />

    </Stack.Navigator>
  )
}
function requesting() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="requests" component={RequestsScreen} />
      <Stack.Screen name="request" component={requestScreen} />

    </Stack.Navigator>
  )
}
function Account() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="mySells" component={MySellsScreen} />
      <Stack.Screen name="myRequests" component={MyRequestsScreen} />

    </Stack.Navigator>
  )
}

const main = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="selling" component={selling} options={{ headerShown: false, tabBarIcon: () => (<FontAwesome name="refresh" size={24} color="black" />) }} />
      <Tab.Screen name="requesting" component={requesting} options={{ headerShown: false, tabBarIcon: () => (<FontAwesome5 name="praying-hands" size={22} color="black" />) }} />
      <Tab.Screen name="Account" component={Account} options={{ headerShown: false, tabBarIcon: () => (<MaterialCommunityIcons name="account-box-outline" size={24} color="black" />) }} />
    </Tab.Navigator>
  );
}


const Application = () => {
  const { user } = useContext(AuthContext)
  return (
    <Stack.Navigator>
      {

        (user.uid == "") ?
          <>
            <Stack.Screen name="sign" component={signin} />
            <Stack.Screen name="signu" component={signup} />
          </> :
          <Stack.Screen name="main" component={main} options={{ headerShown: false }} />

      }
    </Stack.Navigator>

  )
}


const Stack = createStackNavigator();

const App = () => {


  return (
    <AuthProvider>
      <UserProvider>
        <SellersProvider>
          <RequestsProvider>

            <NavigationContainer>
              <Application />
            </NavigationContainer>

          </RequestsProvider>

        </SellersProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;

/*<Stack.Navigator>
          <Stack.Screen name="sign" component={signin} />
          <Stack.Screen name="signu" component={signup} />
          <Stack.Screen name="main" component={main} options={{ headerShown: false }} />
        </Stack.Navigator>  */


/*const AppNavigator = createStackNavigator({
  sign: signin,
  signu: signup,


  <Stack.Screen name="main" component={main} options={{ headerShown: false }} />


  mainFlow: createBottomTabNavigator({
    sellers: sellersScreen,
    Requests: RequestsScreen,
    Account: AccountScreen,
  }),

}, {
  initialRouteName: 'sign',
  defaultNavigationOptions: {
    title: 'Auth'
  }

});*/

