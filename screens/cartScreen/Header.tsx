import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
    <View style={styles.headerLeft}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.locationContainer}>
        <Ionicons name="location-outline" size={20} color="black" />
        <View>
          <Text style={styles.pickupText}>Pickup From</Text>
          <Text style={styles.locationText}>{"QDEVAAN"}</Text>
        </View>
      </View>
    </View>
    <View style={styles.headerRight}>
      <Image 
        source={require('../assets/KFClogo.png')} 
        style={styles.logo}
      />
     
      </View>
    </View>
);
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
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
  locationText: {
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

