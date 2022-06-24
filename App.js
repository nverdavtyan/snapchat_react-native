import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import Register from './screens/Register';
import Login from './screens/Login';
import Camera from './screens/Camera';
import Snap from './screens/Snap';
import OpenCamera from './screens/OpenCamera';
import Profile from './screens/Profile';
import Snaps from './screens/Snaps';
import Users from './screens/Users';


const Stack = createStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Snap" component={Snap} />
        <Stack.Screen name="OpenCamera" component={OpenCamera} />
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="Snaps" component={Snaps} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;