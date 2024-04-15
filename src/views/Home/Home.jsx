import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import colors from '../../assets/colors';
import { getPokemon } from '../../../api';
import { MMKVLoader } from 'react-native-mmkv-storage';
const Home = ({ navigation }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonObject, setPokemonObject] = useState(false);
  const [heartFilled, setHeartFilled] = useState(false);

  const MMKVwithID = new MMKVLoader()
    .withInstanceID('getPokemonListStoraged')
    .initialize();

  const setPokemonListStoraged = () => {
    MMKVwithID.setArray('pokemonListStoraged', pokemonList);
  };

  const getPokemonListStoraged = () => {
    return MMKVwithID.getArray('pokemonListStoraged');
  };

  const toggleHeart = () => {
    setHeartFilled(!heartFilled);
    const index = pokemonList.findIndex(
      pokemon => pokemon.id === pokemonObject.id,
    );

    if (index !== -1) {
      const updatedList = [...pokemonList];
      updatedList.splice(index, 1);
      setPokemonList(updatedList);
    } else {
      setPokemonList([...pokemonList, pokemonObject]);
    }
  };

  useEffect(() => {
    setPokemonList(getPokemonListStoraged());
  }, []);

  useEffect(() => {
    const index = pokemonList.findIndex(
      pokemon => pokemon.id === pokemonObject.id,
    );
    index !== -1 ? setHeartFilled(true) : setHeartFilled(false);
  }, [pokemonObject]);
  useEffect(() => {
    setPokemonListStoraged();
  }, [pokemonList]);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />

        <TouchableOpacity
          onPress={() => navigation.navigate('LovedPokemon', pokemonList)}>
          <View style={styles.favoriteButton}>
            <MaterialCommunityIcons
              name="heart"
              size={32}
              color={colors.identity}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Pesquisar"
          value={pokemonName}
          onChangeText={pokemon => {
            setPokemonName(pokemon);
          }}
          onBlur={async () => {
            let pokemon = await getPokemon(pokemonName.toLowerCase());
            if (pokemon) {
              setPokemonObject(pokemon);
            }
            setPokemonName('');
          }}
          returnKeyType="search"
        />
      </View>
      {!pokemonObject && (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={require('../../assets/imgs/pokeball.png')} />
        </View>
      )}

      {pokemonObject && (
        <View style={styles.pokemonContainer}>
          <View>
            <TouchableOpacity
              style={styles.viewPokemon}
              onPress={() => {
                navigation.navigate('PokemonDetails', pokemonObject);
              }}>
              <TouchableOpacity onPress={toggleHeart}>
                <MaterialCommunityIcons
                  name={heartFilled ? 'heart' : 'heart-outline'}
                  size={48}
                  color={colors.identity}
                />
              </TouchableOpacity>
              <Image
                source={{ uri: pokemonObject.sprite }}
                style={{ width: 230, height: 230 }}
              />
              <View style={styles.favoriteContainer}>
                <Text style={styles.pokemonID}>#{pokemonObject.id}</Text>

                <Text style={styles.pokemonName}>
                  {pokemonObject.name[0].toUpperCase() +
                    pokemonObject.name.slice(1)}
                </Text>

                <View
                  style={{
                    justifyContent: 'center',
                    flexDirection: 'row',
                    gap: 10,
                  }}>
                  {pokemonObject.types.map((type, index) => (
                    <View
                      key={index}
                      style={[
                        {
                          backgroundColor: colors.types[type.type.name],
                          borderRadius: 5,
                          padding: 5,
                        },
                      ]}>
                      <Text style={styles.pokemonTypeText}>
                        {type.type.name}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.identity,
    padding: 5,
  },
  searchContainer: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: colors.grayscale.light,
  },
  favoriteButton: {
    backgroundColor: colors.grayscale.white,
    borderRadius: 30,
    padding: 6,
  },
  favoriteContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  pokemonContainer: {
    backgroundColor: colors.grayscale.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 20,
  },
  viewPokemon: {
    borderColor: colors.grayscale.medium,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  pokemonType: {
    margin: 20,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokemonTypeText: {
    fontSize: 16,
  },
  pokemonID: {
    fontWeight: 'bold',
    color: colors.grayscale.medium,
    fontSize: 20,
  },
  pokemonName: {
    fontWeight: 'bold',
    color: colors.grayscale.dark,
    fontSize: 32,
  },
});
