import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CasinoDogAPI from '../services/api';

const SettingsScreen = ({navigation}) => {
  const [apiBaseURL, setApiBaseURL] = useState('');
  const [accessKey, setAccessKey] = useState('');
  const [username, setUsername] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const storedURL = await AsyncStorage.getItem('apiBaseURL');
      const storedKey = await AsyncStorage.getItem('accessKey');
      const storedUsername = await AsyncStorage.getItem('username');
      const storedNotifications = await AsyncStorage.getItem('notifications');
      const storedSound = await AsyncStorage.getItem('soundEnabled');

      if (storedURL) setApiBaseURL(storedURL);
      if (storedKey) setAccessKey(storedKey);
      if (storedUsername) setUsername(storedUsername);
      if (storedNotifications !== null) {
        setNotifications(storedNotifications === 'true');
      }
      if (storedSound !== null) {
        setSoundEnabled(storedSound === 'true');
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const saveSettings = async () => {
    try {
      setSaving(true);

      // Save API settings
      if (apiBaseURL) {
        await AsyncStorage.setItem('apiBaseURL', apiBaseURL);
        await CasinoDogAPI.setBaseURL(apiBaseURL);
      }

      if (accessKey) {
        await AsyncStorage.setItem('accessKey', accessKey);
        await CasinoDogAPI.setAccessKey(accessKey);
      }

      if (username) {
        await AsyncStorage.setItem('username', username);
      }

      await AsyncStorage.setItem('notifications', notifications.toString());
      await AsyncStorage.setItem('soundEnabled', soundEnabled.toString());

      Alert.alert('Success', 'Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      Alert.alert('Error', 'Failed to save settings. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const testConnection = async () => {
    try {
      setSaving(true);
      
      // Update API settings temporarily
      if (apiBaseURL) {
        await CasinoDogAPI.setBaseURL(apiBaseURL);
      }
      if (accessKey) {
        await CasinoDogAPI.setAccessKey(accessKey);
      }

      const result = await CasinoDogAPI.pingAccess();
      Alert.alert('Success', 'Connection to CasinoDog API successful!');
    } catch (error) {
      Alert.alert(
        'Connection Failed',
        'Could not connect to the API. Please check your settings and try again.'
      );
    } finally {
      setSaving(false);
    }
  };

  const clearCache = async () => {
    Alert.alert(
      'Clear Cache',
      'Are you sure you want to clear all cached data?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert('Success', 'Cache cleared successfully!');
              loadSettings();
            } catch (error) {
              Alert.alert('Error', 'Failed to clear cache.');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* API Configuration */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>API Configuration</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>API Base URL</Text>
          <TextInput
            style={styles.input}
            placeholder="https://your-casinodog-server.com"
            placeholderTextColor="#666"
            value={apiBaseURL}
            onChangeText={setApiBaseURL}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.inputHint}>
            Enter your CasinoDog backend server URL
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Access Key (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your access key"
            placeholderTextColor="#666"
            value={accessKey}
            onChangeText={setAccessKey}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={styles.inputHint}>
            Required if your server uses authentication
          </Text>
        </View>

        <TouchableOpacity
          style={styles.testButton}
          onPress={testConnection}
          disabled={saving}>
          <Icon name="wifi" size={20} color="#fff" />
          <Text style={styles.testButtonText}>Test Connection</Text>
        </TouchableOpacity>
      </View>

      {/* User Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>User Settings</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            placeholderTextColor="#666"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        </View>
      </View>

      {/* App Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Preferences</Text>
        
        <View style={styles.switchContainer}>
          <View style={styles.switchLabel}>
            <Icon name="notifications" size={24} color="#e94560" />
            <View style={styles.switchTextContainer}>
              <Text style={styles.switchText}>Notifications</Text>
              <Text style={styles.switchSubtext}>
                Receive game updates and promotions
              </Text>
            </View>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{false: '#555', true: '#e94560'}}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.switchContainer}>
          <View style={styles.switchLabel}>
            <Icon name="volume-up" size={24} color="#e94560" />
            <View style={styles.switchTextContainer}>
              <Text style={styles.switchText}>Sound Effects</Text>
              <Text style={styles.switchSubtext}>
                Enable sound effects in games
              </Text>
            </View>
          </View>
          <Switch
            value={soundEnabled}
            onValueChange={setSoundEnabled}
            trackColor={{false: '#555', true: '#e94560'}}
            thumbColor="#fff"
          />
        </View>
      </View>

      {/* Actions */}
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveSettings}
          disabled={saving}>
          <Icon name="save" size={20} color="#fff" />
          <Text style={styles.saveButtonText}>
            {saving ? 'Saving...' : 'Save Settings'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearCache}>
          <Icon name="delete-sweep" size={20} color="#ff5252" />
          <Text style={styles.clearButtonText}>Clear Cache</Text>
        </TouchableOpacity>
      </View>

      {/* Info */}
      <View style={styles.infoSection}>
        <Text style={styles.infoText}>
          Configure your CasinoDog backend connection settings here. Make sure
          your server is running and accessible before testing the connection.
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
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#16213e',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#16213e',
    color: '#fff',
    fontSize: 16,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1a1a2e',
  },
  inputHint: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 6,
  },
  testButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  testButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  switchLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  switchTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  switchText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  switchSubtext: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 2,
  },
  saveButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e94560',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  clearButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ff5252',
  },
  clearButtonText: {
    color: '#ff5252',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  infoSection: {
    padding: 20,
  },
  infoText: {
    color: '#aaa',
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default SettingsScreen;
