import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ 
  categories, 
  activeCategory, 
  onSelectCategory 
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
        contentContainerStyle={styles.contentContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryTab,
              activeCategory === category && styles.categoryTabActive,
            ]}
            onPress={() => onSelectCategory(category)}
            accessibilityRole="tab"
            accessibilityState={{ selected: activeCategory === category }}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === category && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    height: 35,
    backgroundColor: '#fff',
  },
  categoryContainer: {
    height: 40,
  },
  contentContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryTab: {
    paddingHorizontal: 16,
    height: '100%',
    justifyContent: 'center',
  },
  categoryTabActive: {
    borderBottomWidth: 2,
    borderBottomColor: 'red',
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
  },
  categoryTextActive: {
    color: '#000',
    fontWeight: '500',
  },
});

export default CategoryTabs;

