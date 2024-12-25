import React from 'react';
import { View, Text, Image, ToastAndroid, TouchableOpacity, StyleSheet } from 'react-native';

interface MenuItemProps {
  name: string;
  description: string;
  price: number;
  image: string;
  onAddToBucket: () => void;
  onCustomize: () => void;
  onToggleFavorite: () => void;
  isFavorite: boolean;
}

const showToast = (message: string) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

const MenuItem: React.FC<MenuItemProps> = ({ 
  name, 
  description, 
  price, 
  image, 
  onAddToBucket, 
  onCustomize, 
  onToggleFavorite,
  isFavorite 
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TouchableOpacity 
          style={styles.favoriteButton} 
          onPress={onToggleFavorite}
          accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Text style={[styles.favoriteIcon, isFavorite && styles.favoriteIconActive]}>
            ♥
          </Text>
        </TouchableOpacity>
        <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">{name}</Text>
        <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail">{description}</Text>
        <TouchableOpacity 
          style={styles.customizeButton} 
          onPress={onCustomize}
          accessibilityLabel="Customize item"
        >
          <Text style={styles.customizeText}>CUSTOMIZE</Text>
          <Text style={styles.arrowIcon}>→</Text>
        </TouchableOpacity>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>Rs {price.toFixed(2)}</Text>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={() => {
              showToast('Added to Bucket');
              onAddToBucket();
            }}
            accessibilityLabel="Add to bucket"
          >
            <Text style={styles.addButtonText}>ADD TO BUCKET</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: image }} 
          style={styles.image} 
          accessibilityLabel={`Image of ${name}`}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e3e3e3',
    borderRadius: 4,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contentContainer: {
    flex: 1,
    marginRight: 16,
  },
  favoriteButton: {
    position: 'absolute',
    right: -20,
    top: -10,
    zIndex: 1,
    padding: 8,
  },
  favoriteIcon: {
    fontSize: 20,
    color: '#e53935',
  },
  favoriteIconActive: {
    color: '#e53935',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingRight: 32,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  customizeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  customizeText: {
    color: '#e53935',
    fontWeight: '500',
    marginRight: 4,
  },
  arrowIcon: {
    color: '#e53935',
    fontSize: 16,
    paddingRight: 4,
  },
  bottomRow: {

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  addButton: {
    marginLeft: 8,
    flex: 1,
    backgroundColor: '#e53935',
    paddingHorizontal: 12,
    padding:4,
    borderRadius: 4,
  },
  addButtonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
    fontSize: 11,
  },
  imageContainer: {
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 8,
  },
});

export default MenuItem;

