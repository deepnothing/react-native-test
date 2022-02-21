import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import plus from './assets/plus-icon.png';
import minus from './assets/minus-icon.png';
import multiply from './assets/multiply-icon.png';
import divide from './assets/divide-icon.png';
import equals from './assets/equals-icon.png'

export default function App() {
  const numbers = [{ row: [7, 8, 9] }, { row: [4, 5, 6] }, { row: [1, 2, 3] }];
  const operators = ['x', '-', '+'];
  const operatorPNG = [multiply, minus, plus, divide]
  const [primaryNum, setPrimaryNum] = useState('0');
  const [secondaryNum, setSecondaryNum] = useState('0');
  const [operator, setOperator] = useState(null);

  const calculate = () => {
    switch (operator) {
      case 'x':
        setPrimaryNum(+primaryNum * +secondaryNum);
        break;
      case '-':
        setPrimaryNum(+primaryNum - +secondaryNum);
        break;
      case '+':
        setPrimaryNum(+primaryNum + +secondaryNum);
        break;
      case '/':
        setPrimaryNum(+primaryNum / +secondaryNum);
        break;

      default:
        console.log("default")
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.field}>{!operator ? primaryNum : secondaryNum}</Text>
      <View style={styles.pressableContainer}>
        <View style={styles.rowContainer}>
          <Pressable onPress={() => (setPrimaryNum('0'), setSecondaryNum("0"), setOperator(null))} style={styles.topRowButton}><Text style={styles.blackInput}>AC</Text></Pressable>
          <Pressable style={styles.topRowButton}><Text style={styles.blackInput}>+/-</Text></Pressable>
          <Pressable style={styles.topRowButton}><Text style={styles.blackInput}>%</Text></Pressable>
          <Pressable onPress={() => { operator ? (calculate(), setOperator(null)) : setOperator('/') }} style={styles.operator}><Image source={divide} style={styles.icon} /></Pressable>
        </View>
        {numbers.map((number, index) =>
          <View style={styles.rowContainer} key={index} >
            {number.row.map((value, d) =>
              <Pressable key={d} onPress={() => operator ? setSecondaryNum(secondaryNum + value) : setPrimaryNum(primaryNum + value)} style={styles.pressable}>
                <Text style={styles.whiteInput}>{value.toString()}</Text>
              </Pressable>
            )}
            <Pressable
              onPress={() => { operator ? (calculate(), setOperator(null)) : setOperator(operators[index]) }}
              style={styles.operator}
            >
              <Text style={operator == operators[index] ? styles.pickedInput : styles.whiteInput}>
                <Image source={operatorPNG[index]} style={styles.icon} />
              </Text>
            </Pressable>
          </View>
        )}
        <View style={styles.rowContainer}>
          <Pressable style={styles.pressableZero}><Text style={styles.whiteInput}>0</Text></Pressable>
          <Pressable style={styles.pressable}><Text style={styles.whiteInput}>.</Text></Pressable>
          <Pressable style={styles.operator}><Image source={equals} style={styles.icon} /></Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 70
  },
  field: {
    color: '#fff',
    fontSize: 90,
    display: 'flex',
    marginLeft: 'auto',
    fontWeight: '200',
    paddingRight: 32
  },
  pressableContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  pressable: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 7,
    height: 85,
    width: 85,
    borderRadius: 50,
    backgroundColor: '#323333'
  },
  pressableZero: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 30,
    margin: 7,
    height: 85,
    width: 183,
    borderRadius: 50,
    backgroundColor: '#323333'
  },
  operator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 7,
    height: 85,
    width: 85,
    borderRadius: 50,
    backgroundColor: 'red'
  },
  pickedOperator: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 7,
    height: 85,
    width: 85,
    borderRadius: 50,
    backgroundColor: '#fff'
  },
  topRowButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 7,
    height: 85,
    width: 85,
    borderRadius: 50,
    backgroundColor: '#A4A5A4'
  },
  whiteInput: {
    color: "#fff",
    fontSize: 40
  },
  pickedInput: {
    color: "red",
    fontSize: 40
  },
  blackInput: {
    color: "#000",
    fontSize: 35,
    fontWeight: '500'
  },
  icon: {
    height: 25,
    width: 40
  }

});
