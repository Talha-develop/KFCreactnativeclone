import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onLogout: () => void;
  onAbout: () => void;
  user: { email: string } | null;
  userProfile: { username: string; avatar_url: string; full_name: string } | null;
  navigation: any;
}

const DEFAULT_IMAGE_URL = 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg';

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose, onLogin, onLogout, onAbout, user, userProfile, navigation }) => {
  const slideAnim = useRef(new Animated.Value(-300)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  return (
    <Animated.View style={[
      styles.container,
      {
        transform: [{ translateX: slideAnim }],
      },
    ]}>
      <TouchableOpacity style={styles.closeButton} onPress={onClose} accessibilityLabel="Close menu">
        <Ionicons name="close" size={24} color="#dc2626" />
      </TouchableOpacity>
      <View style={styles.content}>
        {user ? (
          <View style={styles.userInfo}>
            <Image 
              source={{ uri: userProfile?.avatar_url ? supabase.storage.from('avatars').getPublicUrl(userProfile.avatar_url).data.publicUrl : DEFAULT_IMAGE_URL }} 
              style={styles.profilePicture} 
            />
            <Text style={styles.userName}>{userProfile?.full_name || userProfile?.username || 'User'}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <TouchableOpacity 
              style={styles.accountButton} 
              onPress={() => navigation.navigate('Account')}
            >
              <Text style={styles.accountButtonText}>Manage Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
              <Text style={styles.loginButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.guestInfo}>
            <Image 
              source={{ uri: DEFAULT_IMAGE_URL }} 
              style={styles.defaultPicture} 
            />
            <Text style={styles.loginPrompt}>Login to avail exclusive deals and promotions</Text>
            <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {/* <TouchableOpacity style={styles.aboutButton} onPress={onAbout} accessibilityLabel="About KFC">
        <Text style={styles.aboutButtonText}>About</Text>
      </TouchableOpacity> */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 250,
    backgroundColor: 'white',
    zIndex: 1000,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1001,
  },
  content: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    gap: 20,
  },
  menuItemText: {
    fontSize: 18,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#eee',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  guestInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  defaultPicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#eee',
  },
  loginPrompt: {
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  loginButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  aboutButton: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  aboutButtonText: {
    fontSize: 16,
    color: '#dc2626',
    fontWeight: 'bold',
  },
  accountButton: {
    // backgroundColor: '#4a5568',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dc2626',
  },
  accountButtonText: {
    color: '#dc2626',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SideMenu;