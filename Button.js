import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Pressable } from 'react-native';

const Button = ({ value, onPress, isClear }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        isClear && styles.clearButton,
        pressed && styles.buttonPressed, 
      ]}
      onPress={() => onPress(value)}
    >
      <Text style={styles.buttonText}>{value}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '22%',
    padding: 20,
    margin: 5,
    backgroundColor: '#9b6bf3',  
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonPressed: {
    backgroundColor: '#4727ce',  
  },
  clearButton: {
    width: '95%',
    backgroundColor: '#633eda',  
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
  },
});

export default Button;