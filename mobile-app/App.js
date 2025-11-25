import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import GamesListScreen from './src/screens/GamesListScreen';
import GameDetailScreen from './src/screens/GameDetailScreen';
import GameLauncherScreen from './src/screens/GameLauncherScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a2e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{title: 'CasinoDog Casino'}}
      />
      <Stack.Screen 
        name="GamesList" 
        component={GamesListScreen}
        options={{title: 'Browse Games'}}
      />
      <Stack.Screen 
        name="GameDetail" 
        component={GameDetailScreen}
        options={{title: 'Game Details'}}
      />
      <Stack.Screen 
        name="GameLauncher" 
        component={GameLauncherScreen}
        options={{
          title: 'Play Game',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1a1a2e',
        },
        headerTintColor: '#fff',
      }}>
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{title: 'My Profile'}}
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{title: 'Settings'}}
      />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'HomeTab') {
              iconName = 'casino';
            } else if (route.name === 'ProfileTab') {
              iconName = 'person';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#e94560',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#16213e',
            borderTopColor: '#0f3460',
          },
          headerShown: false,
        })}>
        <Tab.Screen 
          name="HomeTab" 
          component={HomeStack}
          options={{title: 'Games'}}
        />
        <Tab.Screen 
          name="ProfileTab" 
          component={ProfileStack}
          options={{title: 'Profile'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
