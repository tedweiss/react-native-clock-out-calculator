import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const DisplayClockOutTime = props => {
  const { amPm, hours, minutes } = props
  return (
    <View style={styles.timeDisplay}>
      <Text style={styles.timeText}>{hours}</Text>
      <Text style={styles.timeText}>:</Text>
      <Text style={styles.timeText}>{minutes}</Text>
      <Text style={styles.timeText}>{amPm}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  timeDisplay: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 25
  },
  timeText: {
    fontSize: 20
  }
})

export default DisplayClockOutTime
