import axios from 'axios';

export const getPokemon = async pokemonName => {
  return axios
    .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response => {
      let pokemonObject = {
        id: response.data.id,
        name: response.data.name[0].toUpperCase() + response.data.name.slice(1),
        types: response.data.types,
        weight: response.data.weight,
        height: response.data.height,
        sprite: response.data.sprites.front_default,
        stats: response.data.stats,
      };
      return pokemonObject;
    })
    .catch(error => {
      return null;
    });
};
