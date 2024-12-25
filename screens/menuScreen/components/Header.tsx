import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  isDelivery: boolean;
  username: string;
}

const Header: React.FC<HeaderProps> = ({ isDelivery, username }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity onPress={() => navigation.goBack()} accessibilityLabel="Go back">
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={20} color="black" />
          <View>
            <Text style={styles.pickupText}>{isDelivery ? 'Delivery to' : 'Pickup from'}</Text>
            <Text style={styles.username}>{username}</Text>
          </View>
        </View>
      </View>
      <View style={styles.headerRight}>
        <Image 
          source={require('../../assets/KFClogo.png')} 
          style={styles.logo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pickupText: {
    fontSize: 12,
    color: '#666',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logo: {
    width: 60,
    height: 40,
    resizeMode: 'contain',
  },
});

export default Header;

