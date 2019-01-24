import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer 
} from 'react-navigation';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Inicio from './pages/Inicio';
import Historico from './pages/Historico';
import Info from './pages/Info';

const getTabBarIcon = (navigation, tintColor) => {
  let { routeName } = navigation.state;
  let iconName;

  if (routeName === 'Inicio' || routeName === 'Info') {
    iconName = 'home';
  } else if (routeName === 'Historico') {
    iconName = 'history';
  }

  return <FontAwesome name={iconName} size={25} color={tintColor} />;
};

const MainStack = createBottomTabNavigator({
    Inicio: { screen: Inicio },
    Historico: { screen: Historico },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) =>
        getTabBarIcon(navigation, tintColor),
    }),

    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
});

MainStack.navigationOptions = ({ navigation }) => {
  const {routeName } = navigation.state.routes[navigation.state.index];
  let title = routeName === 'Inicio' ? title = 'Resturantes': title = 'Histórico'
  return { 
    headerTitle: title,    
  };
}

const RootStack = createStackNavigator({
    Inicio: { screen: MainStack },
    Info: { screen: Info},
  }, 
  {
    mode: 'card',//******server para os dois navs */

    defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: 'tomato',
      },
      
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;