import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import colors from '../../assets/colors';

const LovedPokemon = ({ navigation, route }) => {
  const pokemonList = route.params;

  const renderPokemonCard = ({ item }) => {
    return (
      <TouchableOpacity>
        <PokemonCard
          pokemon={item}
          onPress={() => navigation.navigate('PokemonDetails', item)}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={pokemonList}
          renderItem={renderPokemonCard}
          keyExtractor={item => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyTextStyle}>
              Nenhum Pokémon favorito encontrado!
            </Text>
          }
        />
      </View>
    </View>
  );
};

export default LovedPokemon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.identity,
    padding: 5,
  },
  listContainer: {
    flex: 1,
    backgroundColor: colors.grayscale.white,
    marginTop: 50,
  },
  emptyTextStyle: {
    marginTop: 20,
    fontSize: 20,
    color: colors.grayscale.dark,
    textAlign: 'center',
  },
});
