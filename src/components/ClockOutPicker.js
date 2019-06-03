import React, { useState } from 'react'
import { DatePickerIOS, View } from 'react-native'

import Back from './Back'
import ClockOutButton from './ClockOutButton'
import DisplayClockOutTime from './DisplayClockOutTime'
import Input from './Input'
import { calculateClockOutTime } from '../utils'

const ClockOutPicker = props => {
  const { endOfWeek, getOnTrack, updateScreen } = props
  const [date, setDate] = useState(new Date())
  const [hours, setHours] = useState()
  const [minutes, setMinutes] = useState()
  const [amPm, setAmPm] = useState()
  const [displayTime, setDisplayTime] = useState(false)
  const [lunchTime, setLunchTime] = useState(0)
  const [timeSoFar, setTimeSoFar] = useState(0)
  const [daysSoFar, setDaysSoFar] = useState(endOfWeek ? 4 : 0)
  let dateHours = date.getHours()
  let dateMinutes = date.getMinutes()

  const updateTime = () => {
    let clockOutTime = calculateClockOutTime(dateHours, dateMinutes, lunchTime, timeSoFar, daysSoFar)
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
  const updateTimeSoFar = minutes => {
    setTimeSoFar(minutes)
  }
  const updateDaysSoFar = days => {
    setDaysSoFar(days)
  }
  return (
    <View style={{ width: 300 }}>
      <Back updateScreen={updateScreen} />
      {(endOfWeek || getOnTrack) && <Input changeText={updateTimeSoFar} placeholder={'Total Time so Far:'} />}
      {getOnTrack && <Input changeText={updateDaysSoFar} placeholder={'Work Days so Far:'} />}
      <DatePickerIOS date={date} onDateChange={setDate} onChange={handleDateChange} mode={'time'} />
      <Input changeText={updateLunchTime} placeholder={'Minutes for Lunch'} />
      <ClockOutButton updateTime={updateTime} />
      <DisplayClockOutTime displayTime={displayTime} hours={hours} minutes={minutes} amPm={amPm} />
    </View>
  )
}

export default ClockOutPicker
