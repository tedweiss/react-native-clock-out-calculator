import React, { useState } from 'react'
import { DatePickerIOS, View } from 'react-native'

import DisplayClockOutTime from './DisplayClockOutTime'
import { calculateClockOutTime } from '../utils'
import ClockOutButton from './ClockOutButton'

const TimePicker = () => {
  const [date, setDate] = useState(new Date())
  const [hours, setHours] = useState()
  const [minutes, setMinutes] = useState()
  const [amPm, setAmPm] = useState()
  const [displayTime, setDisplayTime] = useState(false)
  let dateHours = date.getHours()
  let dateMinutes = date.getMinutes()

  const updateTime = () => {
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
      <ClockOutButton updateTime={updateTime} />
      <DisplayClockOutTime displayTime={displayTime} hours={hours} minutes={minutes} amPm={amPm} />
    </View>
  )
}

export default TimePicker
