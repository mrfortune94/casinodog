import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {
  const [username, setUsername] = useState('Demo Player');
  const [balance, setBalance] = useState('1000.00');
  const [currency, setCurrency] = useState('USD');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('username');
      const storedBalance = await AsyncStorage.getItem('balance');
      const storedCurrency = await AsyncStorage.getItem('currency');

      if (storedUsername) setUsername(storedUsername);
      if (storedBalance) setBalance(storedBalance);
      if (storedCurrency) setCurrency(storedCurrency);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const menuItems = [
    {
      icon: 'account-balance-wallet',
      title: 'Balance',
      subtitle: `${currency} ${balance}`,
      onPress: () => Alert.alert('Balance', `Your current balance: ${currency} ${balance}`),
    },
    {
      icon: 'history',
      title: 'Game History',
      subtitle: 'View your recent games',
      onPress: () => Alert.alert('Coming Soon', 'Game history feature coming soon!'),
    },
    {
      icon: 'emoji-events',
      title: 'Achievements',
      subtitle: 'Your gaming achievements',
      onPress: () => Alert.alert('Coming Soon', 'Achievements feature coming soon!'),
    },
    {
      icon: 'favorite',
      title: 'Favorite Games',
      subtitle: 'Manage your favorites',
      onPress: () => Alert.alert('Coming Soon', 'Favorites feature coming soon!'),
    },
    {
      icon: 'settings',
      title: 'Settings',
      subtitle: 'App configuration',
      onPress: () => navigation.navigate('Settings'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Icon name="account-circle" size={80} color="#e94560" />
        </View>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.userStatus}>Active Player</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Icon name="casino" size={30} color="#e94560" />
          <Text style={styles.statValue}>--</Text>
          <Text style={styles.statLabel}>Games Played</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="emoji-events" size={30} color="#ffd700" />
          <Text style={styles.statValue}>--</Text>
          <Text style={styles.statLabel}>Wins</Text>
        </View>
        <View style={styles.statCard}>
          <Icon name="access-time" size={30} color="#4caf50" />
          <Text style={styles.statValue}>--h</Text>
          <Text style={styles.statLabel}>Playtime</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}>
            <View style={styles.menuIconContainer}>
              <Icon name={item.icon} size={24} color="#e94560" />
            </View>
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </View>
            <Icon name="chevron-right" size={24} color="#aaa" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>CasinoDog Mobile v1.0.0</Text>
        <Text style={styles.infoSubtext}>
          Powered by CasinoDog Game Aggregation Platform
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f3460',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#1a1a2e',
  },
  avatarContainer: {
    marginBottom: 15,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  userStatus: {
    fontSize: 14,
    color: '#4caf50',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  statCard: {
    alignItems: 'center',
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 10,
    width: '30%',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
    textAlign: 'center',
  },
  menuContainer: {
    padding: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#aaa',
  },
  infoContainer: {
    alignItems: 'center',
    padding: 30,
  },
  infoText: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 5,
  },
  infoSubtext: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default ProfileScreen;
