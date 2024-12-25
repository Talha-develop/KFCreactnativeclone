import React, { useRef, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedScrollHandler, useAnimatedStyle, interpolate, Extrapolate } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PromotionCard from './PromotionCard';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

type CarouselProps = {
  data: { id: string; image: string }[];
  autoPlayInterval?: number;
};

export default function Carousel({ data, autoPlayInterval = 3000 }: CarouselProps) {
  const scrollViewRef = useRef<ScrollView>(null);
  const scrollX = useSharedValue(0);
  const currentIndex = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
      currentIndex.value = Math.round(scrollX.value / CARD_WIDTH);
    },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex.value < data.length - 1) {
        scrollViewRef.current?.scrollTo({ x: (currentIndex.value + 1) * CARD_WIDTH, animated: true });
      } else {
        scrollViewRef.current?.scrollTo({ x: 0, animated: true });
      }
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [data.length, autoPlayInterval]);

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {data.map((item, index) => (
          <View key={item.id}>
            <PromotionCard image={item.image} />
          </View>
        ))}
      </Animated.ScrollView>
      <View style={styles.pagination}>
        {data.map((_, index) => {
          const dotStyle = useAnimatedStyle(() => {
            const inputRange = [(index - 1) * CARD_WIDTH, index * CARD_WIDTH, (index + 1) * CARD_WIDTH];
            return {
              width: interpolate(scrollX.value, inputRange, [8, 16, 8], Extrapolate.CLAMP),
              opacity: interpolate(scrollX.value, inputRange, [0.5, 1, 0.5], Extrapolate.CLAMP),
            };
          });

          return <Animated.View key={index} style={[styles.dot, dotStyle]} />;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    overflow: 'hidden',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  dot: {
    // height: 8,
    // borderRadius: 4,
    // backgroundColor: '#000',
    // marginHorizontal: 4,
  },
});

