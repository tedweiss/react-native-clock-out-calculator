import React, { useState } from 'react'
import { DatePickerIOS, TextInput, View} from 'react-native'

import DisplayClockOutTime from './DisplayClockOutTime'
import ClockOutButton from './ClockOutButton'
import { calculateClockOutTime } from '../utils'

const TimePicker = () => {
  const [date, setDate] = useState(new Date())
  const [hours, setHours] = useState()
  const [minutes, setMinutes] = useState()
  const [amPm, setAmPm] = useState()
  const [displayTime, setDisplayTime] = useState(false)
  const [lunchTime, setLunchTime] = useState(0)
  let dateHours = date.getHours()
  let dateMinutes = date.getMinutes()

  const updateTime = () => {
    let clockOutTime = calculateClockOutTime(dateHours, dateMinutes,lunchTime)
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
  const handleChangeText = minutes => {
    setLunchTime(minutes)
  }
  return (
    <View style={{ width: 300 }}>
      <DatePickerIOS date={date} onDateChange={setDate} onChange={handleDateChange} mode={'time'} />
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginTop: 25
        }}>
        <TextInput
          placeholder={'Minutes for Lunch'}
          keyboardType={'numeric'}
          onChangeText={handleChangeText}
          style={{
            textAlign: 'center',
            paddingTop: 15,
            paddingBottom: 15,
            marginBottom: 25,
            width: 238,
            fontSize: 20,
            borderWidth: 1,
            borderColor: 'powderblue'
          }}
        />
      </View>
      <ClockOutButton updateTime={updateTime} />
      <DisplayClockOutTime displayTime={displayTime} hours={hours} minutes={minutes} amPm={amPm} />
    </View>
  )
}

export default TimePicker
