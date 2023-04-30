import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity, Image } from 'react-native';
import PokemonDetails from './components/PokemonDetails';

const groupByType = (pokemonData) => {
  const groupedData = {};
  pokemonData.forEach((pokemon) => {
    pokemon.type.forEach((type) => {
      if (!groupedData[type]) {
        groupedData[type] = [];
      }
      groupedData[type].push(pokemon);
    });
  });
  return groupedData;
};

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json');
        const data = await response.json();
        setPokemons(data.pokemon);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleModalClose = () => {
    setSelectedPokemon(null);
  };

  const renderModal = () => {
    return (
      <Modal visible={selectedPokemon !== null} transparent>
        <View style={styles.modal}>
          {selectedPokemon !== null && <PokemonDetails pokemon={selectedPokemon} onClose={handleModalClose} />}
        </View>
      </Modal>
    );
  };

  const renderCard = ({ item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedPokemon(item);
        }}
        
      >
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Image source={{ uri: item.img }} style={styles.cardImage} resizeMode="contain" />
      </TouchableOpacity>
    );
  };

  const renderSection = ({ item }) => {
    return (
      <View>
        <Text style={styles.sectionHeader}>{item.title}</Text>
        <View style={styles.section}>
          <FlatList
            data={item.data}
            keyExtractor={(item) => item.num}
            renderItem={renderCard}
            numColumns={2}
            scrollEnabled={false}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderModal()}
      <View style={styles.container}>
        {pokemons && (
          <FlatList
            data={Object.keys(groupByType(pokemons)).map((type) => ({
              title: type,
              data: groupByType(pokemons)[type],
            }))}
            keyExtractor={(item) => item.title}
            renderItem={renderSection}
            scrollEnabled={true}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
  },
card: {
 width: '50%',
 margin: 5,
 borderRadius: 10,
 backgroundColor: '#fff',
 justifyContent: 'center',
 alignItems: 'center',
},
cardTitle: {
 fontSize: 18,
 fontWeight: 'bold',
 marginBottom: 8,
 color: '#333',
},
cardImage: {
 height: 150,
 width: 120,
 marginBottom: 10,
},
sectionHeader: {
 fontSize: 30,
 fontWeight: 'bold',
 marginBottom: 10,
},
section: {
 borderWidth: 2,
 borderColor: 'black',
 borderRadius: 10,
 marginVertical: 10,
},
});

export default App;