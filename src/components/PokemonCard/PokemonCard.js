import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import colors from '../../assets/colors';

const PokemonCard = props => {
  return (
    <View>
      <TouchableOpacity
        style={[
          styles.card,
          { backgroundColor: colors.types[props.pokemon.types[0].type.name] },
        ]}
        onPress={props.onPress}>
        <View style={styles.info}>
          <Text style={styles.pokemonId}>#{props.pokemon.id}</Text>
          <Text style={styles.pokemonName}>{props.pokemon.name}</Text>

          <View style={styles.types}>
            {props.pokemon.types.map((type, index) => (
              <View
                key={index}
                style={[
                  {
                    backgroundColor: colors.types[type.type.name],
                    borderRadius: 5,
                    borderColor: colors.grayscale.dark,
                    borderWidth: 1,
                    padding: 5,
                    opacity: 0.7,
                  },
                ]}>
                <Text style={styles.pokemonTypeText}>{type.type.name}</Text>
              </View>
            ))}
          </View>
        </View>
        <Image
          style={styles.img}
          source={{
            uri: props.pokemon.sprite,
          }}
          width={150}
          height={150}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: colors.types.dark,
    margin: 10,
    borderRadius: 10,
  },
  info: {
    margin: 20,
  },

  types: {
    flexDirection: 'row',
    gap: 10,
  },
  pokemonTypeText: {
    fontSize: 16,
    color: colors.grayscale.dark,
    fontWeight: 'bold',
  },
  pokemonName: {
    fontWeight: 'bold',
    fontSize: 32,
    color: colors.grayscale.dark,
  },
  pokemonId: {
    color: colors.grayscale.dark,
    fontSize: 24,
  },
});
