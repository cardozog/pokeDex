import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LovedPokemon from './src/views/LovedPokemon/LovedPokemon';
import Home from './src/views/Home/Home';
import PokemonDetails from './src/views/PokemonDetails/PokemonDetails';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer initialRouteName="home">
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PokemonDetails"
          component={PokemonDetails}
          options={{ title: 'Detalhes', headerTransparent: true }}
        />
        <Stack.Screen
          name="LovedPokemon"
          component={LovedPokemon}
          options={{ title: 'Favoritos', headerTransparent: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
