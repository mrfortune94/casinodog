import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CasinoDogAPI from '../services/api';

const {width} = Dimensions.get('window');

const GamesListScreen = ({navigation, route}) => {
  const [games, setGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(route.params?.provider || null);

  useEffect(() => {
    loadGames();
  }, []);

  useEffect(() => {
    filterGames();
  }, [searchQuery, selectedProvider, games]);

  const loadGames = async () => {
    try {
      setLoading(true);
      const gamesData = await CasinoDogAPI.getGamesList('full');
      
      if (gamesData && Array.isArray(gamesData)) {
        setGames(gamesData);
      }
    } catch (error) {
      console.error('Error loading games:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterGames = () => {
    let filtered = [...games];

    // Filter by provider
    if (selectedProvider) {
      filtered = filtered.filter(
        game => game.provider === selectedProvider
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(game =>
        (game.name || game.game_name)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    setFilteredGames(filtered);
  };

  const renderGameItem = ({item}) => (
    <TouchableOpacity
      style={styles.gameItem}
      onPress={() => navigation.navigate('GameDetail', {game: item})}>
      <View style={styles.gameImageContainer}>
        {item.thumbnail || item.image ? (
          <Image
            source={{uri: item.thumbnail || item.image}}
            style={styles.gameImage}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.gameImage, styles.placeholderImage]}>
            <Icon name="casino" size={40} color="#555" />
          </View>
        )}
      </View>
      <View style={styles.gameInfo}>
        <Text style={styles.gameName} numberOfLines={2}>
          {item.name || item.game_name}
        </Text>
        <Text style={styles.gameProvider}>{item.provider}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e94560" />
        <Text style={styles.loadingText}>Loading games...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#aaa" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search games..."
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="clear" size={24} color="#aaa" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Bar */}
      {selectedProvider && (
        <View style={styles.filterBar}>
          <Text style={styles.filterText}>Provider: {selectedProvider}</Text>
          <TouchableOpacity onPress={() => setSelectedProvider(null)}>
            <Icon name="close" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}

      {/* Games Count */}
      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          {filteredGames.length} game{filteredGames.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      {/* Games Grid */}
      <FlatList
        data={filteredGames}
        renderItem={renderGameItem}
        keyExtractor={(item, index) => item.game_id || item.id || index.toString()}
        numColumns={2}
        contentContainerStyle={styles.gamesList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f3460',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f3460',
  },
  loadingText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213e',
    margin: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    paddingVertical: 12,
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e94560',
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  countContainer: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  countText: {
    color: '#aaa',
    fontSize: 14,
  },
  gamesList: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  gameItem: {
    width: width / 2 - 20,
    margin: 5,
    backgroundColor: '#16213e',
    borderRadius: 10,
    overflow: 'hidden',
  },
  gameImageContainer: {
    width: '100%',
    height: 150,
  },
  gameImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameInfo: {
    padding: 12,
  },
  gameName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  gameProvider: {
    color: '#aaa',
    fontSize: 12,
  },
});

export default GamesListScreen;
