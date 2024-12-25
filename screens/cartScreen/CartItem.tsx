import React, { useRef, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native'
import { CartItem as CartItemType } from './CartContext';

interface CartItemProps {
  item: CartItemType;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, quantity, onIncrease, onDecrease }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [])

  return (
    <Animated.View style={[styles.itemCard, { opacity: fadeAnim }]}>
      <View style={styles.itemContent}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
          <Text style={styles.itemPrice}>Rs {item.price * quantity}</Text>
        </View>
        <Image
          source={{ uri: item.image }}
          style={styles.itemImage}
        />
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={onDecrease} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{quantity}</Text>
        <TouchableOpacity onPress={onIncrease} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: '#e3e3e3',
    borderRadius: 4,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: -4,
    borderTopColor: '#f0f0f0',
    borderTopWidth: 1,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemDescription: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
  itemPrice: {
    color: '#E4002B',
    fontSize: 16,
    fontWeight: '600',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
})

export default CartItem