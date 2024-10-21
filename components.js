
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const MyButton = ({ title, onPress }) => {
    return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);
};


const styles = StyleSheet.create({
    button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    },
    buttonText: {
    color: '#fff',
    fontSize: 18,
},
});


export default MyButton;
