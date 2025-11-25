import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CasinoDogAPI from '../services/api';

const {width} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const [featuredGames, setFeaturedGames] = useState([]);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      setLoading(true);
      const gamesData = await CasinoDogAPI.getGamesList('full');
      
      if (gamesData && Array.isArray(gamesData)) {
        // Get featured games (first 10)
        setFeaturedGames(gamesData.slice(0, 10));
        
        // Extract unique providers
        const uniqueProviders = [...new Set(gamesData.map(game => game.provider))];
        setProviders(uniqueProviders);
      }
    } catch (error) {
      console.error('Error loading games:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadGames();
  };

  const renderProviderCard = (provider) => (
    <TouchableOpacity
      key={provider}
      style={styles.providerCard}
      onPress={() => navigation.navigate('GamesList', {provider})}>
      <View style={styles.providerIconContainer}>
        <Icon name="casino" size={40} color="#e94560" />
      </View>
      <Text style={styles.providerName}>{provider}</Text>
    </TouchableOpacity>
  );

  const renderGameCard = (game) => (
    <TouchableOpacity
      key={game.game_id || game.id}
      style={styles.gameCard}
      onPress={() => navigation.navigate('GameDetail', {game})}>
      <View style={styles.gameImageContainer}>
        {game.thumbnail || game.image ? (
          <Image
            source={{uri: game.thumbnail || game.image}}
            style={styles.gameImage}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.gameImage, styles.placeholderImage]}>
            <Icon name="casino" size={50} color="#555" />
          </View>
        )}
      </View>
      <View style={styles.gameInfo}>
        <Text style={styles.gameName} numberOfLines={2}>
          {game.name || game.game_name}
        </Text>
        <Text style={styles.gameProvider}>{game.provider}</Text>
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
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Icon name="casino" size={60} color="#e94560" />
        <Text style={styles.heroTitle}>Welcome to CasinoDog</Text>
        <Text style={styles.heroSubtitle}>
          Play thousands of casino games from top providers
        </Text>
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActionsContainer}>
        <TouchableOpacity
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('GamesList')}>
          <Icon name="grid-view" size={30} color="#fff" />
          <Text style={styles.quickActionText}>All Games</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('GamesList', {filter: 'popular'})}>
          <Icon name="trending-up" size={30} color="#fff" />
          <Text style={styles.quickActionText}>Popular</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickActionButton}
          onPress={() => navigation.navigate('GamesList', {filter: 'new'})}>
          <Icon name="new-releases" size={30} color="#fff" />
          <Text style={styles.quickActionText}>New Games</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Games */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Games</Text>
          <TouchableOpacity onPress={() => navigation.navigate('GamesList')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.gamesRow}>
            {featuredGames.map(game => renderGameCard(game))}
          </View>
        </ScrollView>
      </View>

      {/* Providers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Game Providers</Text>
        <View style={styles.providersGrid}>
          {providers.slice(0, 6).map(provider => renderProviderCard(provider))}
        </View>
        {providers.length > 6 && (
          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => navigation.navigate('GamesList')}>
            <Text style={styles.viewAllText}>View All Providers</Text>
            <Icon name="arrow-forward" size={20} color="#e94560" />
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
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
  heroSection: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#1a1a2e',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 8,
    textAlign: 'center',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  quickActionButton: {
    alignItems: 'center',
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 10,
    width: width / 3.5,
  },
  quickActionText: {
    color: '#fff',
    marginTop: 8,
    fontSize: 12,
  },
  section: {
    padding: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  seeAllText: {
    color: '#e94560',
    fontSize: 14,
  },
  gamesRow: {
    flexDirection: 'row',
  },
  gameCard: {
    width: 150,
    marginRight: 15,
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
    padding: 10,
  },
  gameName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  gameProvider: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 4,
  },
  providersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  providerCard: {
    width: width / 2.3,
    backgroundColor: '#16213e',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  providerIconContainer: {
    marginBottom: 10,
  },
  providerName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  viewAllButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#16213e',
    borderRadius: 10,
    marginTop: 10,
  },
  viewAllText: {
    color: '#e94560',
    fontSize: 16,
    marginRight: 5,
  },
});

export default HomeScreen;
