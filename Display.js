import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Display = ({ display, result }) => {
  return (
    <View style={styles.displayContainer}>
      <Text style={styles.resultText}>{result}</Text>
      <View className="scroll-container">
        <Text style={styles.displayText}>{display}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  displayContainer: {
    width: '100%',
    backgroundColor: '#7f54e6',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    alignItems: 'flex-end',
    overflow: 'hidden',
  },
  displayText: {
    fontSize: 15,
    color: '#000060',
  },
  resultText: {
    fontSize: 16,
    color: '#000060',
  },
});

export default Display;
