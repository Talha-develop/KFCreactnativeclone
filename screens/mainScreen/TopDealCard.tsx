import React from 'react';
import { View, Text, Image, TouchableOpacity,ToastAndroid, StyleSheet } from 'react-native';

type TopDealCardProps = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

export default function TopDealCard({ id, name, price, image, description }: TopDealCardProps) {
  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>PKR:{price}</Text>
          <Text style={styles.viewButtonText}>VIEW</Text>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "auto" ,
    // backgroundColor: 'white',
    borderRadius: 3,
    borderWidth: 1,
    
    padding: 12,
    marginRight: 6,
    
    flexDirection: 'row',
    borderStyle: 'dotted',
    borderColor: '#3b3939',

    
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  price: {
    fontSize: 11,
    color: 'black',
    marginTop: 4,
    marginBottom: 8,
    marginLeft: -10,
    position: 'absolute',
    bottom: -10,
  },
  viewButton: {
    borderWidth: 1,
    borderColor: '#dc2626',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 2,
    top: 80,
    alignSelf: 'flex-end',
    position: 'absolute',

    
  },
  viewButtonText: {
    borderWidth: 1,
    borderColor: '#dc2626',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    top: 80,
    // marginRight: -10,
    alignSelf: 'flex-end',
    position: 'absolute',
    color: '#dc2626',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

