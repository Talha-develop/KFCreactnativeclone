import React, { useState, useEffect, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {SafeAreaView,View,Text,TextInput,TouchableOpacity,StyleSheet,StatusBar,FlatList,Alert,Animated,} from 'react-native';
import CartItem from './CartItem';
import RecommendationCard from './RecommendationCard';
import Header from '../menuScreen/components/Header';
import BottomBar from './BottomBar';
import { CartProvider, useCart } from './CartContext';
import { recommendations } from '../../data/menuData';
import { getProductById } from '../../data/menuData';

export default function App() {
  return (
    <CartProvider>
      <CartScreen />
    </CartProvider>
  );
}

function CartScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { cart, updateQuantity, removeFromCart, addToCart } = useCart();
  const [lastAddedItem, setLastAddedItem] = useState(null);
  const [isDelivery, setIsDelivery] = useState(route.params?.isDelivery || false);
  const [username, setUsername] = useState(route.params?.username || 'Guest');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleUpdateQuantity = (id, change) => {
    if (change < 0 && cart.find(item => item.id === id)?.quantity === 1) {
      Alert.alert(
        "Remove Item",
        "Are you sure you want to remove this item from your cart?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Remove", onPress: () => removeFromCart(id) }
        ]
      );
    } else {
      updateQuantity(id, change);
    }
  };

  const handleAddToCart = (item) => {
    const productToAdd = getProductById(item.id);
    if (productToAdd) {
      addToCart(productToAdd);
      setLastAddedItem(productToAdd);
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalAmount = cart.length === 0 ? 0 : Math.round(totalPrice * 1.16 + 50);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" />
      
      <Header isDelivery={isDelivery} username={username} />

      <Animated.ScrollView 
        style={[styles.content, { opacity: fadeAnim }]}
        showsVerticalScrollIndicator={false}
      >
        {cart.map(item => (
          <CartItem
            key={item.id}
            item={item}
            quantity={item.quantity}
            onIncrease={() => handleUpdateQuantity(item.id, 1)}
            onDecrease={() => handleUpdateQuantity(item.id, -1)}
          />
        ))}

        <View style={styles.inputContainer}>
          <Text style={styles.inputIcon}>✏️</Text>
          <TextInput
            style={styles.input}
            placeholder="Add Cooking/Delivery Instructions (Optional)"
            placeholderTextColor="#666"
          />
        </View>

        <TextInput
          style={styles.phoneInput}
          placeholder="Alternate Phone Number (Optional)"
          placeholderTextColor="#666"
        />

        <TouchableOpacity style={styles.exploreMenu} onPress={() => navigation.navigate('Menu', { isDelivery, username })}>
          <View style={styles.exploreContent}>
            <View>
              <Text style={styles.exploreTitle}>Explore Menu</Text>
              <Text style={styles.exploreSubtitle}>Add more items in your bucket</Text>
            </View>
            <Text style={styles.exploreIcon}>→</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.priceBreakdown}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Sub Total</Text>
            <Text style={styles.priceValue}>Rs {totalPrice}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>GST (16 %)</Text>
            <Text style={styles.priceValue}>Rs {Math.round(totalPrice * 0.16)}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery Fee</Text>
            <Text style={styles.priceValue}>Rs 50</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>Rs {totalAmount}</Text>
          </View>
        </View>

        <View style={styles.recommendationsSection}>
          <Text style={styles.recommendationsTitle}>You May Also Like</Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={recommendations.map(id => getProductById(id)).filter(Boolean)}
            renderItem={({ item }) => (
              <RecommendationCard
                item={item}
                onPress={() => handleAddToCart(item)}
              />
            )}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={styles.recommendationsList}
          />
        </View>
      </Animated.ScrollView>

      <BottomBar
        totalAmount={totalAmount}
        itemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        lastItemImage={lastAddedItem?.image || cart[cart.length - 1]?.image}
        isCheckoutDisabled={cart.length === 0}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  content: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3e3e3',
    borderRadius: 4,
    padding: 8,
    marginHorizontal: 16,
    marginBottom: 4,
    borderTopColor: '#f0f0f0',
    borderTopWidth: 1,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  phoneInput: {
    backgroundColor: '#e3e3e3',
    borderRadius: 4,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 5,
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  exploreMenu: {
    backgroundColor: '#e3e3e3',
    borderRadius: 4,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  exploreContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  exploreTitle: {
    color: '#000',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  exploreSubtitle: {
    color: '#666',
    fontSize: 11,
    fontWeight: '500',
  },
  exploreIcon: {
    fontSize: 20,
    color: 'black',
  },
  priceBreakdown: {
    backgroundColor: '#e3e3e3',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'grey',
    borderStyle: 'dotted',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceLabel: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  priceValue: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 12,
    marginTop: 4,
  },
  totalLabel: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    color: '#E4002B',
    fontSize: 16,
    fontWeight: '600',
  },
  recommendationsSection: {
    marginTop: 20,
    marginBottom: 100,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 12,
    color: '#000',
  },
  recommendationsList: {
    paddingLeft: 16,
  },
});

