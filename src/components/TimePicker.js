import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import EndOfDayPicker from './EndOfDayPicker'

const TimePicker = () => {
  const [screen, setScreen] = useState(0)
  const updateScreen = newScreen => {
    setScreen(newScreen)
  }
  return (
    <View style={{ width: 300 }}>
      {screen === 0 && (
        <>
          <TouchableOpacity
            onPress={() => {
              updateScreen(1)
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>End of Day</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              updateScreen(2)
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>End of Week</Text>
          </TouchableOpacity>
        </>
      )}
      {screen === 1 && <EndOfDayPicker updateScreen={updateScreen} />}
      {screen === 2 && <Text>End of Week</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: 'blue',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
})

export default TimePicker
