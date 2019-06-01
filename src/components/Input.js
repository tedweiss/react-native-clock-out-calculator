import React from 'react'
import { TextInput, StyleSheet, View } from 'react-native'

const Input = props => {
  const { placeholder, changeText } = props
  const handleChangeText = minutes => {
    changeText(minutes)
  }
  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholder={placeholder}
        keyboardType={'numeric'}
        onChangeText={handleChangeText}
        style={styles.text}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 25
  },
  text: {
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 0,
    width: 238,
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'blue'
  }
})

export default Input
