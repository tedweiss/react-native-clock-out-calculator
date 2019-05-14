import React, { useState } from 'react'
import { DatePickerIOS, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import DisplayClockOutTime from './DisplayClockOutTime'
import { calculateClockOutTime } from '../utils'

const TimePicker = () => {
  const [date, setDate] = useState(new Date())
  const [hours, setHours] = useState()
  const [minutes, setMinutes] = useState()
  const [amPm, setAmPm] = useState()
  const [displayTime, setDisplayTime] = useState(false)
  let dateHours = date.getHours()
  let dateMinutes = date.getMinutes()
  const handlePress = () => {
    let clockOutTime = calculateClockOutTime(dateHours, dateMinutes)
    const { amPm, hours, minutes } = clockOutTime
    let displayMinutes = minutes < 10 ? '0' + minutes : minutes
    setHours(hours.toString())
    setMinutes(displayMinutes.toString())
    setAmPm(amPm)
    setDisplayTime(true)
  }
  const handleDateChange = () => {
    displayTime ? setDisplayTime(false) : ''
  }
  return (
    <View style={{ width: 300 }}>
      <DatePickerIOS date={date} onDateChange={setDate} onChange={handleDateChange} mode={'time'} />
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Find Clock Out Time</Text>
      </TouchableOpacity>
      <DisplayClockOutTime displayTime={displayTime} hours={hours} minutes={minutes} amPm={amPm} />
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
