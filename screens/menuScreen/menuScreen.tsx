import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Text, FlatList } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';
import Header from './components/Header';
import DeliveryToggle from '../mainScreen/DeliveryToggle';
import CategoryTabs from './components/CategoryTabs';
import MenuItem from './components/MenuItem';
import { CartProvider, useCart } from '../cartScreen/CartContext';
import { menuCategories, menuCategoryItems, getProductsByIds } from '../../data/menuData';
import { Product } from '../../data/productData';

type RouteParams = {
  params: {
    categoryId: number;
    isDelivery: boolean;
    username: string;
  };
};

function MenuScreen() {
  const route = useRoute<RouteProp<RouteParams, 'params'>>();
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const categoryId = route.params?.categoryId || 1;
  const [activeCategory, setActiveCategory] = useState(menuCategories[categoryId - 1].title);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isDelivery, setIsDelivery] = useState(route.params?.isDelivery || false);
  const [username, setUsername] = useState(route.params?.username || 'Guest');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, full_name')
          .eq('id', session.user.id)
          .single();

        if (data && !error) {
          setUsername(data.full_name || data.username || 'Guest');
        }
      }
    };

    fetchUserProfile();
  }, []);

  const getCategoryItems = (category: string): Product[] => {
    const categoryItemIds = menuCategoryItems[category] || [];
    return getProductsByIds(categoryItemIds);
  };

  const toggleFavorite = (itemId: number) => {
    setFavorites((prevFavorites) => 
      prevFavorites.includes(itemId) 
        ? prevFavorites.filter(id => id !== itemId) 
        : [...prevFavorites, itemId]
    );
  };

  const handleAddToBucket = (item: Product) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    });
    console.log('Added to bucket:', item.name);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <MenuItem
      name={item.name}
      description={item.description}
      price={item.price}
      image={item.image}
      onAddToBucket={() => handleAddToBucket(item)}
      onCustomize={() => navigation.navigate('Description', { id: item.id })}
      onToggleFavorite={() => toggleFavorite(item.id)}
      isFavorite={favorites.includes(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="default" />
      <Header isDelivery={isDelivery} username={username} />
      <DeliveryToggle isDelivery={isDelivery} setIsDelivery={setIsDelivery} />
      <CategoryTabs 
        categories={menuCategories.map(cat => cat.title)}
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
      />
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryTitle}>{activeCategory}</Text>
      </View>
      <FlatList
        data={getCategoryItems(activeCategory)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.menuContainer}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MenuScreen />
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuContainer: {
    padding: 16,
  },
  categoryHeader: {
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

