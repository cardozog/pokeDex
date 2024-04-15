import { Image, StyleSheet, Text, View } from 'react-native';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import React from 'react';
import colors from '../../assets/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const PokemonDetails = ({ navigation, route }) => {
  const pokemon = route.params;
  console.log(pokemon)
  return (
    <View style={styles.container}>
      <View style={styles.backgroundImage}>
        <Image source={require('../../assets/imgs/pokeball.png')} />
      </View>
      <View style={styles.infoContainer}>
        <Image source={{ uri: pokemon.sprite }} style={styles.pokemonImage} />

        <Text style={[styles.fields, styles.pokemonName]}>{pokemon.name}</Text>
        <View style={styles.typesContainer}>

          {pokemon.types && pokemon.types.map((type, index) => (
            <View
              key={index}
              style={[
                {
                  backgroundColor: colors.types[type.type.name],
                  borderRadius: 5,
                  padding: 5,
                },
              ]}>
              <Text style={styles.pokemonTypeText}>{type.type.name}</Text>
            </View>
          ))}
        </View>
        <Text style={[styles.fields, { textAlign: 'center' }]}>Sobre</Text>
        <View style={styles.otherInfo}>
          <View style={styles.weightField}>
            <MaterialCommunityIcons name="weight" size={32} />
            <Text style={styles.pokemonTypeText}>{pokemon.weight / 10}kg</Text>
          </View>

          <View style={styles.heightField}>
            <MaterialCommunityIcons name="human-male-height" size={32} />
            <Text style={styles.pokemonTypeText}>{pokemon.height / 10}m</Text>
          </View>
        </View>
        <View>
          {pokemon.stats && pokemon.stats.map((stat, index) => (
            <View key={index} style={styles.statContainer}>
              <Text style={styles.pokemonTypeText}>{stat.stat.name}</Text>
              <View style={{ flexDirection: 'row', gap: 5 }}>
                <Text>{stat.base_stat}</Text>
                <ProgressBar
                  styleAttr="Horizontal"
                  indeterminate={false}
                  progress={stat.base_stat / 100}
                  color={colors.stats[index]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default PokemonDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B8B8B8',
    paddingTop: 80,
  },
  backgroundImage: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: colors.grayscale.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
    position: 'relative',
    paddingTop: 100,
    gap: 20,
  },
  pokemonImage: {
    width: 300,
    height: 300,
    position: 'absolute',
    top: -180,
    right: 40,
  },
  fields: {
    fontWeight: 'bold',
    color: colors.grayscale.medium,
    fontSize: 32,
  },
  pokemonName: {
    color: colors.grayscale.dark,
  },
  typesContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  pokemonTypeText: {
    fontSize: 16,
  },
  otherInfo: {
    flexDirection: 'row',
  },
  weightField: {
    borderRightColor: colors.grayscale.medium,
    borderRightWidth: 3,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  heightField: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  statContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 30,
  },
});
