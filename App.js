import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Display from '../calculadora/Display.js'; 
import Button from '../calculadora/Button.js';   

const App = () => {
  const [display, setDisplay] = useState('0');  
  const [result, setResult] = useState('');   
  const [lastInput, setLastInput] = useState(''); 
  const [isDegrees, setIsDegrees] = useState(true); 
  const { width, height } = Dimensions.get('window');

  const handlePress = (value) => {
    const operators = ['/', '*', '-', '+'];
    const trigFunctions = ['sin', 'cos', 'tan'];
    const allFunctions = ['sec', 'csc', 'cot', 'asin', 'acos', 'atan', 'asec', 'acsc', 'acot'];

    if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      setDisplay('0');
      setResult('');
    } else if (value === '←') {
      setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
    } else if (value === '(') {
      setDisplay(display + '(');
    } else if (value === ')') {
      const openCount = (display.match(/\(/g) || []).length;
      const closeCount = (display.match(/\)/g) || []).length;
      if (openCount > closeCount) {
        setDisplay(display + ')');
      }
    } else if (value === '√') {
      setDisplay(display === '0' ? '√(' : display + '√(');
    } else if (value === '1/x') {
      setDisplay(display + '1(');
    } else if (value === 'x²') {
      setDisplay(display + '**2');
    } else if (value === 'π') {
      setDisplay(display === '0' ? 'π' : display + 'π');
    } else if (value === 'e') {
      setDisplay(display === '0' ? 'e' : display + 'e');
    } else if (value === '.') {
      const lastNumber = display.split(/[^0-9.]+/).pop();
      if (!lastNumber.includes('.')) {
        setDisplay(display + value);
      }
    } else if (operators.includes(value)) {
      if (operators.includes(display.slice(-1))) {
        return;
      }
      setDisplay(display + value);
    } else if (trigFunctions.includes(value) || allFunctions.includes(value)) {
      setDisplay(display === '0' ? value + '(' : display + value + '(');
    } else {
      setDisplay(display === '0' ? value : display + value);
    }
  };

  const calculateResult = () => {
    try {
      let modifiedDisplay = display
        .replace(/√/g, 'Math.sqrt')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E');
  
      modifiedDisplay = modifiedDisplay
        .replace(/asin\(([^)]+)\)/g, 'Math.asin($1) * 180 / Math.PI')
        .replace(/acos\(([^)]+)\)/g, 'Math.acos($1) * 180 / Math.PI')
        .replace(/atan\(([^)]+)\)/g, 'Math.atan($1) * 180 / Math.PI')
        .replace(/(?<!a)asec\(([^)]+)\)/g, 'Math.acos(1/$1) * 180 / Math.PI')
        .replace(/acsc\(([^)]+)\)/g, 'Math.asin(1/$1) * 180 / Math.PI')
        .replace(/acot\(([^)]+)\)/g, '(90 - Math.atan($1) * 180 / Math.PI)');
  
      modifiedDisplay = modifiedDisplay
        .replace(/(?<!a)sin\(([^)]+)\)/g, 'Math.sin($1 * Math.PI / 180)')
        .replace(/(?<!a)cos\(([^)]+)\)/g, 'Math.cos($1 * Math.PI / 180)')
        .replace(/(?<!a)tan\(([^)]+)\)/g, 'Math.tan($1 * Math.PI / 180)')
        .replace(/cot\(([^)]+)\)/g, '1/Math.tan($1 * Math.PI / 180)')
        .replace(/sec\(([^)]+)\)/g, '1/Math.cos($1 * Math.PI / 180)')
        .replace(/csc\(([^)]+)\)/g, '1/Math.sin($1 * Math.PI / 180)')
        .replace(/sMath\.Ec\(([^)]+)\)/g, '1/Math.cos($1 * Math.PI / 180)');  // Nueva regla de reemplazo

      console.log(modifiedDisplay);
      const result = eval(modifiedDisplay);
      setResult(result);
      setDisplay(result.toString());
    } catch (error) {
      console.error(error);
      setResult('Error');
      setDisplay('Error');
    }
  };

  return (
    <View style={[styles.Wrapper, { width, height }]}>
      <View style={styles.container}>
        <Display display={display} result={result} />
        <View style={styles.buttonContainer}>
          <View style={styles.row}>
            <Button value="C" onPress={handlePress} isClear={true} />
            <Button value="←" onPress={handlePress} />
            <Button value="π" onPress={handlePress} />
            <Button value="e" onPress={handlePress} />
          </View>
          <View style={styles.row}>
            <Button value="sin" onPress={handlePress} />
            <Button value="cos" onPress={handlePress} />
            <Button value="tan" onPress={handlePress} />
            <Button value="sec" onPress={handlePress} />
          </View>
          <View style={styles.row}>
            <Button value="csc" onPress={handlePress} />
            <Button value="cot" onPress={handlePress} />
            <Button value="asin" onPress={handlePress} />
            <Button value="acos" onPress={handlePress} />
          </View>
          <View style={styles.row}>
            <Button value="atan" onPress={handlePress} />
            <Button value="√" onPress={handlePress} />
            <Button value="1/x" onPress={handlePress} />
            <Button value="x²" onPress={handlePress} />
          </View>
          <View style={styles.row}>
            <Button value="7" onPress={handlePress} />
            <Button value="8" onPress={handlePress} />
            <Button value="9" onPress={handlePress} />
            <Button value="/" onPress={handlePress} />
          </View>
          <View style={styles.row}>
            <Button value="4" onPress={handlePress} />
            <Button value="5" onPress={handlePress} />
            <Button value="6" onPress={handlePress} />
            <Button value="*" onPress={handlePress} />
          </View>
          <View style={styles.row}>
            <Button value="1" onPress={handlePress} />
            <Button value="2" onPress={handlePress} />
            <Button value="3" onPress={handlePress} />
            <Button value="-" onPress={handlePress} />
          </View>
          <View style={styles.row}>
            <Button value="0" onPress={handlePress} />
            <Button value="." onPress={handlePress} />
            <Button value="=" onPress={handlePress} />
            <Button value="+" onPress={handlePress} />
          </View>
          <View style={styles.row}>
            <Button value="(" onPress={handlePress} />
            <Button value=")" onPress={handlePress} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282c34',
    height: '200%',
  },
  container: {
    width: '90%',
    height: '90%',
    borderRadius: 15,
    backgroundColor: '#181a1d',
    padding: 20,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default App;