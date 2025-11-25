import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CasinoDogAPI from '../services/api';

const {width} = Dimensions.get('window');

const GameDetailScreen = ({navigation, route}) => {
  const {game} = route.params;
  const [launching, setLaunching] = useState(false);

  const launchGame = async (mode = 'real') => {
    try {
      setLaunching(true);

      // Create session parameters
      const sessionParams = {
        game_id: game.game_id || game.id,
        game_name: game.name || game.game_name,
        provider: game.provider,
        mode: mode, // 'real' or 'demo'
        player_id: 'demo_player_' + Date.now(),
        currency: 'USD',
        balance: 1000,
      };

      const sessionData = await CasinoDogAPI.createSessionIframed(sessionParams);

      if (sessionData && (sessionData.url || sessionData.game_url)) {
        navigation.navigate('GameLauncher', {
          gameUrl: sessionData.url || sessionData.game_url,
          gameName: game.name || game.game_name,
          sessionData: sessionData,
        });
      } else {
        Alert.alert('Error', 'Failed to launch game. Please try again.');
      }
    } catch (error) {
      console.error('Error launching game:', error);
      Alert.alert(
        'Error',
        'Could not launch game. Please check your connection and try again.'
      );
    } finally {
      setLaunching(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Game Image */}
      <View style={styles.imageContainer}>
        {game.thumbnail || game.image ? (
          <Image
            source={{uri: game.thumbnail || game.image}}
            style={styles.gameImage}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.gameImage, styles.placeholderImage]}>
            <Icon name="casino" size={100} color="#555" />
          </View>
        )}
        <View style={styles.imageOverlay}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Game Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.gameName}>{game.name || game.game_name}</Text>
        <View style={styles.providerContainer}>
          <Icon name="business" size={18} color="#e94560" />
          <Text style={styles.providerText}>{game.provider}</Text>
        </View>

        {/* Game Details */}
        <View style={styles.detailsContainer}>
          {game.category && (
            <View style={styles.detailItem}>
              <Icon name="category" size={20} color="#aaa" />
              <Text style={styles.detailText}>{game.category}</Text>
            </View>
          )}
          {game.volatility && (
            <View style={styles.detailItem}>
              <Icon name="trending-up" size={20} color="#aaa" />
              <Text style={styles.detailText}>Volatility: {game.volatility}</Text>
            </View>
          )}
          {game.rtp && (
            <View style={styles.detailItem}>
              <Icon name="percent" size={20} color="#aaa" />
              <Text style={styles.detailText}>RTP: {game.rtp}%</Text>
            </View>
          )}
        </View>

        {/* Description */}
        {game.description && (
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>About this game</Text>
            <Text style={styles.descriptionText}>{game.description}</Text>
          </View>
        )}

        {/* Play Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.playButton, styles.playRealButton]}
            onPress={() => launchGame('real')}
            disabled={launching}>
            {launching ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Icon name="play-arrow" size={28} color="#fff" />
                <Text style={styles.playButtonText}>Play for Real</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.playButton, styles.playDemoButton]}
            onPress={() => launchGame('demo')}
            disabled={launching}>
            {launching ? (
              <ActivityIndicator color="#e94560" />
            ) : (
              <>
                <Icon name="play-circle-outline" size={28} color="#e94560" />
                <Text style={[styles.playButtonText, styles.playDemoText]}>
                  Try Demo
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Icon name="check-circle" size={20} color="#4caf50" />
              <Text style={styles.featureText}>Mobile Optimized</Text>
            </View>
            <View style={styles.featureItem}>
              <Icon name="check-circle" size={20} color="#4caf50" />
              <Text style={styles.featureText}>HD Graphics</Text>
            </View>
            <View style={styles.featureItem}>
              <Icon name="check-circle" size={20} color="#4caf50" />
              <Text style={styles.featureText}>Fast Loading</Text>
            </View>
            {game.has_freespins && (
              <View style={styles.featureItem}>
                <Icon name="check-circle" size={20} color="#4caf50" />
                <Text style={styles.featureText}>Free Spins Available</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f3460',
  },
  imageContainer: {
    width: width,
    height: 300,
    position: 'relative',
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
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 15,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    padding: 20,
  },
  gameName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  providerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  providerText: {
    color: '#e94560',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
  },
  detailsContainer: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  descriptionText: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20,
  },
  buttonsContainer: {
    marginBottom: 30,
  },
  playButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
  },
  playRealButton: {
    backgroundColor: '#e94560',
  },
  playDemoButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#e94560',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  playDemoText: {
    color: '#e94560',
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featuresList: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
  },
});

export default GameDetailScreen;
