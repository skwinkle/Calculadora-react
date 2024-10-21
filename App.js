import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Display from '../calculadora/Display.js'; 
import Button from '../calculadora/Button.js';   

const App = () => {
  const [display, setDisplay] = useState('0');  
  const [result, setResult] = useState('');   
  const [lastInput, setLastInput] = useState(''); 
  const { width, height } = Dimensions.get('window');

  const handlePress = (value) => {
    const operators = ['/', '*', '-', '+', '%'];

    if (value === '=') {
      if (operators.includes(lastInput)) {

        setDisplay(display); 
      } else {
        calculateResult();
      }
    } else if (value === 'C') {
      setDisplay('0');  
      setResult('');
      setLastInput('');
    } else if (value === '←') {

      setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
    } else if (operators.includes(value)) {

      if (display !== '0') {

        if (operators.includes(lastInput)) {
          setDisplay(display.slice(0, -1) + value);
        } else {
          setDisplay(display + value);
        }
      }
      setLastInput(value); 
    } else if (value === '.') {

      if (!operators.includes(lastInput) && !display.endsWith('.')) {
        setDisplay(display === '0' ? value : display + value);
        setLastInput(value); 
      }
    } else {

      if (display === '0') {
        setDisplay(value); 
      } else {
        setDisplay(display + value); 
      }
      setLastInput(value); 
    }


    if (value === '%') {
      if (display !== '0' && !operators.includes(lastInput)) {
        
        setDisplay(display + '%*'); 
        setLastInput('%'); 
      }
    }
  };

  const calculateResult = () => {
    try {
      let modifiedDisplay = display.replace(/([0-9.]+)%/g, (match, num) => {
        return `(${num}*0.01)`; 
      });

      modifiedDisplay = modifiedDisplay.replace(/%/g, '*'); 

      const resultado = eval(modifiedDisplay);  
      setResult(resultado);
      setDisplay(resultado.toString()); 
    } catch (error) {
      setResult('Error');
    }
  };

  return (
    <View style={[styles.Wrapper, { width, height }]}>
      <View style={styles.container}>
        <Display display={display} result={result} />

        <View style={styles.buttonContainer}>
          <Button value="7" onPress={handlePress} />
          <Button value="8" onPress={handlePress} />
          <Button value="9" onPress={handlePress} />
          <Button value="/" onPress={handlePress} />

          <Button value="4" onPress={handlePress} />
          <Button value="5" onPress={handlePress} />
          <Button value="6" onPress={handlePress} />
          <Button value="*" onPress={handlePress} />

          <Button value="1" onPress={handlePress} />
          <Button value="2" onPress={handlePress} />
          <Button value="3" onPress={handlePress} />
          <Button value="-" onPress={handlePress} />

          <Button value="0" onPress={handlePress} />
          <Button value="." onPress={handlePress} />
          <Button value="=" onPress={handlePress} />
          <Button value="+" onPress={handlePress} />
          <Button value="←" onPress={handlePress} />
          <Button value="%" onPress={handlePress} />
          <Button value="C" onPress={handlePress} isClear={true} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#4727ce',
    width: '50%', 
    minWidth: 300,    
    maxWidth: 600,   
  },
  Wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4727ce',
  },
  
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default App;
