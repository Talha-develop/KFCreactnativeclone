import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

type PromotionCardProps = {
  image: string;
};

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32; // Full width minus padding

export default function PromotionCard({ image }: PromotionCardProps) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    // backgroundColor: 'white',
    borderRadius: 8,
    // overflow: 'hidden',
    // marginRight: 16,
    // marginBottom: 16,
  },
  image: {
    borderRadius: 4,
    width: '100%',
    height: 135,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  price: {
    fontSize: 16,
    color: '#dc2626',
    fontWeight: 'bold',
    marginTop: 4,
  },
});

