import React, { useState } from 'react'
import { DatePickerIOS, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { calculateClockOutTime } from './utils'

const TimePicker = () => {
  const [date, setDate] = useState(new Date())
  const [hours, setHours] = useState()
  const [minutes, setMinutes] = useState()
  const [amPm, setAmPm] = useState()
  let dateHours = date.getHours()
  let dateMinutes = date.getMinutes()
  const handlePress = () => {
    let clockOutTime = calculateClockOutTime(dateHours, dateMinutes)
    const { amPm, hours, minutes } = clockOutTime
    setHours(hours)
    setMinutes(minutes)
    setAmPm(amPm)
  }
  return (
    <View style={{ width: 300 }}>
      <DatePickerIOS date={date} onDateChange={setDate} mode={'time'} />
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Find Clock Out Time</Text>
      </TouchableOpacity>
      <View style={styles.timeDisplay}>
        <Text style={styles.timeText}>{hours}</Text>
        <Text style={styles.timeText}>:</Text>
        <Text style={styles.timeText}>{minutes}</Text>
        <Text style={styles.timeText}>{amPm}</Text>
      </View>
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
  },
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

export default TimePicker
