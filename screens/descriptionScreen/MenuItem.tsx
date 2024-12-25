import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Product } from '../../data/productData';

type MenuItemProps = {
  item: Product;
  isSelected?: boolean;
  onSelect?: () => void;
  quantity?: number;
  onAdd?: () => void;
  onRemove?: () => void;
  type: 'required' | 'optional';
};

const MenuItem: React.FC<MenuItemProps> = ({ 
  item, 
  isSelected,
  onSelect,
  quantity = 0,
  onAdd,
  onRemove,
  type
}) => {
  if (!item) return null;

  const { name, description, price, image, isCompulsory } = item;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: image }} 
          style={styles.image} 
          accessibilityLabel={`Image of ${name}`}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
        <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">{description}</Text>
        <Text style={styles.price}>Rs {price.toFixed(2)}</Text>
      </View>
      <View style={styles.rightContainer}>
        {type === 'optional' ? (
          quantity === 0 ? (
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={onAdd}
              accessibilityLabel="Add to bucket"
            >
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.quantityContainer}>
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={onRemove}
                accessibilityLabel="Remove from bucket"
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity 
                style={styles.quantityButton} 
                onPress={onAdd}
                accessibilityLabel="Add to bucket"
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          )
        ) : (
          <View style={styles.radioButton}>
            <View style={[styles.radio, styles.radioSelected]} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#e5e5e5',
    borderRadius: 8,
    padding: 8,
    marginBottom: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    marginRight: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e53935',
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
  },
  addButton: {
    backgroundColor: '#e53935',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  quantityText: {
    fontSize: 12,
    color: 'black',
    marginHorizontal: 8,
  },
  radioButton: {
    borderRadius: 10,
    padding: 2,
    margin: 2,
    borderColor: '#e53935',
    borderWidth: 1,
  },
  radio: {
    height: 15,
    width: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e53935',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    backgroundColor: '#e53935',
  },
});

export default MenuItem;

