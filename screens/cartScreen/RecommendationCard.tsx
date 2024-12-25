import React from 'react'
import { TouchableOpacity, Image, Text, StyleSheet, View, Animated } from 'react-native'
import { Product } from '../../data/productData'

interface RecommendationCardProps {
  item: Product;
  onPress: () => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ item, onPress }) => (
  <Animated.View 
    style={styles.recommendationCard} >
    <Image source={{ uri: item.image }} style={styles.recommendationImage} />
    <Text style={styles.recommendationName}>{item.name}</Text>
    <Text style={styles.recommendationPrice}>Rs {item.price}</Text>
    <TouchableOpacity style={styles.addButton} onPress={onPress}>
      <Text style={styles.addButtonText}>Add to Bucket</Text>
    </TouchableOpacity>
  </Animated.View>
)

const styles = StyleSheet.create({
  recommendationCard: {
    width: 140,
    marginRight: 16,
    backgroundColor: '#e3e3e3',
    borderRadius: 4,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendationImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  recommendationName: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  recommendationPrice: {
    color: '#666',
    fontSize: 10,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#E4002B',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
})

export default RecommendationCard

