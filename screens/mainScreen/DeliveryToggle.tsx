import React from 'react';
import { View, ToastAndroid, TouchableOpacity, StyleSheet, Image } from 'react-native';

interface DeliveryToggleProps {
  isDelivery: boolean;
  setIsDelivery: (isDelivery: boolean) => void;
}

const DeliveryToggle: React.FC<DeliveryToggleProps> = ({ isDelivery, setIsDelivery }) => {
  const showToast = (message: string) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  return (
    <View style={styles.toggleContainer}>
      <TouchableOpacity 
        style={[styles.toggleButton, !isDelivery && styles.toggleButtonActive]}
        onPress={() => { showToast('Pickup Selected'); setIsDelivery(false); }}
      >
        <Image source={require('../assets/pickup.png')} style={{ width: 140, height: 45 }} />
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.toggleButton, isDelivery && styles.toggleButtonActive]}
        onPress={() => { showToast('Delivery Selected'); setIsDelivery(true); }}
      >
        <Image source={require('../assets/delivery.png')} style={{ width: 140, height: 45 }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    padding: 8,
    paddingHorizontal: 16,
    gap: 8,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  toggleButtonActive: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#dc2626',
  },
});

export default DeliveryToggle;

