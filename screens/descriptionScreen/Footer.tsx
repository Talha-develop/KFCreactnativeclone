import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type FooterProps = {
  quantity: number;
  totalPrice: number;
  onDecreaseQuantity: () => void;
  onIncreaseQuantity: () => void;
  onAddToBucket: () => void;
};

export const Footer: React.FC<FooterProps> = ({
  quantity,
  totalPrice,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onAddToBucket,
}) => (
  <View style={styles.footer}>
    <View style={styles.quantityContainer}>
      <TouchableOpacity style={styles.quantityButton} onPress={onDecreaseQuantity}>
        <Text style={styles.quantityButtonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.quantityText}>{quantity}</Text>
      <TouchableOpacity style={styles.quantityButton} onPress={onIncreaseQuantity}>
        <Text style={styles.quantityButtonText}>+</Text>
      </TouchableOpacity>
    </View>
    <TouchableOpacity style={styles.addToBucketButton} onPress={onAddToBucket}>
      <Text style={styles.addToBucketButtonText}>
        Rs {totalPrice.toFixed(2)}
      </Text>
      <Text style={styles.addToBucketButtonText}>
        Add to Bucket
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
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
  addToBucketButton: {
    backgroundColor: '#e53935',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    flex: 0.9999,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 10,
  },
  addToBucketButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

