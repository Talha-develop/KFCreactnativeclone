import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, Animated, Alert } from 'react-native'
import { useCart } from './CartContext'

const BottomBar = ({ totalAmount, itemCount, lastItemImage, isCheckoutDisabled }) => {
  const { clearCart } = useCart()

  return (
    <Animated.View style={styles.bottomBar}>
      <View style={styles.bottomLeft}>
        <Image
          source={{ uri: lastItemImage }}
          style={styles.bottomItemImage}
        />
        <Text style={styles.itemCount}>{itemCount} items</Text>
      </View>
      <TouchableOpacity
        style={[styles.checkoutButton, isCheckoutDisabled && styles.disabledCheckoutButton]}
        disabled={isCheckoutDisabled}
        onPress={() => {
          Alert.alert(
            'Order Confirmation',
            'Do you want to place the order?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
              },
              {
                text: 'Confirm',
                onPress: () => {
                  console.log('Order Placed')
                  clearCart()
                  Alert.alert('Success', 'Your order has been placed successfully')
                },
              },
            ],
            { cancelable: true }
          )
        }}
      >
        <Text style={styles.totalAmount}>Rs {totalAmount}</Text>
        <Text style={styles.checkoutText}>Checkout ≫</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    padding: 8,
    flex: 0.2,
  },
  bottomItemImage: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 4,
  },
  checkoutButton: {
    backgroundColor: '#E4002B',
    borderRadius: 4,
    marginLeft: 90,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: 180,
    flex: 1,
  },
  disabledCheckoutButton: {
    backgroundColor: '#ccc',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 20,
    flex: 1,
    textAlign: 'right',
  },
  itemCount: {
    width: 60,
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  totalAmount: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
})

export default BottomBar