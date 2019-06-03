import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import ClockOutPicker from './ClockOutPicker'

const TimePicker = () => {
  const [screen, setScreen] = useState(0)
  const updateScreen = newScreen => {
    setScreen(newScreen)
  }
  return (
    <View style={{ width: 300 }}>
      {screen === 0 && (
        <>
          <Text style={styles.title}>What time to clock out?</Text>
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
          <TouchableOpacity
            onPress={() => {
              updateScreen(3)
            }}
            style={styles.button}>
            <Text style={styles.buttonText}>Get on Track</Text>
          </TouchableOpacity>
        </>
      )}
      {screen === 1 && <ClockOutPicker updateScreen={updateScreen} />}
      {screen === 2 && <ClockOutPicker updateScreen={updateScreen} endOfWeek />}
      {screen === 3 && <ClockOutPicker updateScreen={updateScreen} getOnTrack />}
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 40
  },
  button: {
    marginTop: 25,
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
