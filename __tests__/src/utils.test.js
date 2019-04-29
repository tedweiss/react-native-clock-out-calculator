import { calculateClockOutHours, calculateClockOutTime } from '../../src/utils'

describe('calculateClockOutHours', () => {
  test('should return the hour someone should clock out based on an 8 hour day', () => {
    expect(calculateClockOutHours(9)).toEqual(5)
  })
})

describe('calculateClockOutTime', () => {
  test('should return the hour someone should clock out based on an 8 hour day', () => {
    expect(calculateClockOutTime('9', '00').hours).toEqual(5)
  })
  test('should return the minute someone should clock out based on an 8 hour day', () => {
    expect(calculateClockOutTime('9', '30').minutes).toEqual(30)
  })
})
