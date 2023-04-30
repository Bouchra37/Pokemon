import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import PokemonCard from './PokemonCard';

const PokemonList = ({ pokemon, onSelectPokemon }) => {
  const renderItem = ({ item }) => (
    <PokemonCard pokemon={item} onPress={() => onSelectPokemon(item)} />
  );

  return (
    <FlatList
      data={pokemon}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={2} // affiche deux éléments par ligne
      contentContainerStyle={styles.container} // ajoute un espace entre les éléments
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  }
});

export default PokemonList;