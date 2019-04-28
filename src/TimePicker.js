import React, { useState } from 'react'
import { DatePickerIOS, View } from 'react-native'

const TimePicker = () => {
  const [date, setDate] = useState(new Date())
  return (
    <View style={{ width: 300 }}>
      <DatePickerIOS date={date} onDateChange={setDate} mode={'time'} />
    </View>
  )
}

export default TimePicker
