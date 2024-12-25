import React from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
// import {MenuItem} from './MenuItem';

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 120;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

type HeaderProps = {
  scrollY: Animated.Value;
  selectedItems: { [key: number]: number };
  menuItem: MenuItem;
};

export const Header: React.FC<HeaderProps> = ({ scrollY, selectedItems, menuItem }) => {
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT + 120],
    extrapolate: 'clamp',
  });

  const imageScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1.1, 0.7],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.header, { height: headerHeight }]}>
      {selectedItems[menuItem.id] ? (
        <Animated.Image
          source={{ uri: menuItem.image }}
          style={[
            styles.headerImage,
            {
              transform: [{ scale: imageScale }],
            },
          ]}
        />
      ) : null}
      <View style={styles.headerContent}>
        <Text style={styles.headerTitle}>{menuItem.name}</Text>
        <Text style={styles.headerDescription}>
          {menuItem.description || 'Description not available'}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    overflow: 'hidden',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  headerContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  headerDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
});

