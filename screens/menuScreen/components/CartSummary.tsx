import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../cartScreen/CartContext';
import { useNavigation } from '@react-navigation/native';

const CartSummary = () => {
  const { cart } = useCart();
  const navigation = useNavigation();
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleViewBucket = () => {
    navigation.navigate('Cart');
  };

  return (
    <View style={styles.cartSummary}>
      <ScrollView style={styles.cartItemsContainer}>
        {cart.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Text style={styles.itemName}>{item.name} (x{item.quantity})</Text>
            <Text style={styles.itemDescription} numberOfLines={1}>{item.description}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.cartFooter}>
        <View style={styles.cartLeft}>
          <Image 
            source={require('./menu (1).png')} 
            style={styles.cartThumb}
          />
          <Text style={styles.cartItems}>{totalItems} items</Text>
        </View>
        <TouchableOpacity style={styles.viewBucketButton} onPress={handleViewBucket}>
          <Text style={styles.viewBucketText}>Rs {totalPrice.toFixed(2)}</Text>
          <Text style={styles.viewBucketText}>View Bucket</Text>
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartSummary: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  cartItemsContainer: {
    maxHeight: 100,
    paddingHorizontal: 16,
  },
  cartItem: {
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '500',
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
  },
  cartFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  cartLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cartThumb: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cartItems: {
    fontSize: 16,
    fontWeight: '500',
  },
  viewBucketButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
  },
  viewBucketText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default CartSummary;

