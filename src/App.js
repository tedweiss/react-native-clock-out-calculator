import React from 'react'
import { StyleSheet, View } from 'react-native'

import EndOfDayPicker from './components/EndOfDayPicker'

const App = () => {
  return (
    <View style={styles.container}>
      <EndOfDayPicker />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
})

export default App
