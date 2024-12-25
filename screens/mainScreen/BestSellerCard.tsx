import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type BestSellerCardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function BestSellerCard({ id, name, price, image }: BestSellerCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>PKR {price}</Text>
      <Image source={{ uri: image }} style={styles.image} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 190,
    borderRadius: 3,
    borderWidth: 1,
    padding: 8,
    marginRight: 6,
    borderStyle: 'dotted',
    borderColor: '#3b3939',
    position: 'relative',
  },
  image: {
    marginTop: 40,
    justifyContent:'flex-end',
    width: '100%',
    height: 130,
  },
  name: {
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  price: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#dc2626',
    backgroundColor: '#dc2626',
    fontSize: 11,
    paddingHorizontal: 10,
    paddingVertical: 1,
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    top: 35,
    right: 8,
    textAlign: 'right',
  },
});

