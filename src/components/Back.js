import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const Back = props => {
  const { updateScreen } = props
  return (
    <TouchableOpacity
      onPress={() => {
        updateScreen(0)
      }}>
      <Text style={{ fontSize: 16 }}>{'<'} Back</Text>
    </TouchableOpacity>
  )
}

export default Back
