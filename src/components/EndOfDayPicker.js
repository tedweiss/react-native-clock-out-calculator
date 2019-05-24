import React, { useState } from 'react'
import { DatePickerIOS, Text, TouchableOpacity, View } from 'react-native'

import DisplayClockOutTime from './DisplayClockOutTime'
import Input from './Input'
import ClockOutButton from './ClockOutButton'
import { calculateClockOutTime } from '../utils'

const EndOfDayPicker = props => {
  const { updateScreen } = props
  const [date, setDate] = useState(new Date())
  const [hours, setHours] = useState()
  const [minutes, setMinutes] = useState()
  const [amPm, setAmPm] = useState()
  const [displayTime, setDisplayTime] = useState(false)
  const [lunchTime, setLunchTime] = useState(0)
  let dateHours = date.getHours()
  let dateMinutes = date.getMinutes()

  const updateTime = () => {
    let clockOutTime = calculateClockOutTime(dateHours, dateMinutes, lunchTime)
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
  const updateLunchTime = minutes => {
    setLunchTime(minutes)
  }
  return (
    <View style={{ width: 300 }}>
      <TouchableOpacity
        onPress={() => {
          updateScreen(0)
        }}>
        <Text style={{ fontSize: 16 }}>{'<'} Back</Text>
      </TouchableOpacity>
      <DatePickerIOS date={date} onDateChange={setDate} onChange={handleDateChange} mode={'time'} />
      <Input changeText={updateLunchTime} placeholder={'Minutes for Lunch'} />
      <ClockOutButton updateTime={updateTime} />
      <DisplayClockOutTime displayTime={displayTime} hours={hours} minutes={minutes} amPm={amPm} />
    </View>
  )
}

export default EndOfDayPicker
