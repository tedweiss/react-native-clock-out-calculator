import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const ClockOutButton = props => {
  const { updateTime } = props
  return (
    <TouchableOpacity onPress={updateTime} style={styles.button}>
      <Text style={styles.buttonText}>Find Clock Out Time</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 25,
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

export default ClockOutButton
