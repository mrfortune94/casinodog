import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Default configuration - users can update this in settings
const DEFAULT_API_BASE_URL = 'https://your-casinodog-server.com';

class CasinoDogAPI {
  constructor() {
    this.baseURL = DEFAULT_API_BASE_URL;
    this.accessKey = null;
    this.initializeAPI();
  }

  async initializeAPI() {
    try {
      const storedBaseURL = await AsyncStorage.getItem('apiBaseURL');
      const storedAccessKey = await AsyncStorage.getItem('accessKey');
      
      if (storedBaseURL) {
        this.baseURL = storedBaseURL;
      }
      if (storedAccessKey) {
        this.accessKey = storedAccessKey;
      }
    } catch (error) {
      console.error('Error initializing API:', error);
    }
  }

  async setBaseURL(url) {
    this.baseURL = url;
    await AsyncStorage.setItem('apiBaseURL', url);
  }

  async setAccessKey(key) {
    this.accessKey = key;
    await AsyncStorage.setItem('accessKey', key);
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    if (this.accessKey) {
      headers['Authorization'] = `Bearer ${this.accessKey}`;
    }
    
    return headers;
  }

  /**
   * Ping access to check if API is reachable
   */
  async pingAccess() {
    try {
      const response = await axios.get(
        `${this.baseURL}/api/accessPing`,
        {
          headers: this.getHeaders(),
          timeout: 5000,
        }
      );
      return response.data;
    } catch (error) {
      console.error('Access ping failed:', error);
      throw error;
    }
  }

  /**
   * Get list of games
   * @param {string} layout - 'full' or 'compact'
   */
  async getGamesList(layout = 'full') {
    try {
      const response = await axios.get(
        `${this.baseURL}/api/gameslist/${layout}`,
        {
          headers: this.getHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch games list:', error);
      throw error;
    }
  }

  /**
   * Create a game session
   * @param {object} params - Session parameters
   */
  async createSession(params) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await axios.get(
        `${this.baseURL}/api/createSession?${queryString}`,
        {
          headers: this.getHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to create session:', error);
      throw error;
    }
  }

  /**
   * Create a session and get iframed URL
   * @param {object} params - Session parameters
   */
  async createSessionIframed(params) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await axios.get(
        `${this.baseURL}/api/createSessionIframed?${queryString}`,
        {
          headers: this.getHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to create iframed session:', error);
      throw error;
    }
  }

  /**
   * Add free spins to a session
   * @param {object} params - Promotion parameters
   */
  async addFreeSpins(params) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await axios.get(
        `${this.baseURL}/api/control/add_freespins?${queryString}`,
        {
          headers: this.getHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to add free spins:', error);
      throw error;
    }
  }

  /**
   * Toggle respin feature
   * @param {object} params - Control parameters
   */
  async toggleRespin(params) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await axios.get(
        `${this.baseURL}/api/control/toggle_respin?${queryString}`,
        {
          headers: this.getHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to toggle respin:', error);
      throw error;
    }
  }

  /**
   * Get version information
   */
  async getVersion() {
    try {
      const response = await axios.get(
        `${this.baseURL}/api/version`,
        {
          headers: this.getHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to get version:', error);
      throw error;
    }
  }
}

// Export singleton instance
export default new CasinoDogAPI();
