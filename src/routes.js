import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './pages/Main';
import User from './pages/User';
import Detail from './pages/Detail';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      headerBackTitleVisible={false}
      headerBackTitle={false}
      headerLayoutPreset="center"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#23282E',
        },
        headerTintColor: '#FFF',
      }}
    >
      <Stack.Screen
        name="Main"
        component={Main}
        options={{ title: 'Usuários', headerBackTitleVisible: false }}
      />
      <Stack.Screen
        name="User"
        component={User}
        options={({ route }) => ({
          title: route.params.user.name,
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={({ route }) => ({
          title: route.params.start.name,
          headerBackTitleVisible: false,
        })}
      />
    </Stack.Navigator>
  );
}
