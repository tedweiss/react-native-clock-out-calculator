import { calculateClockOutHours, calculateClockOutTime, determineAmPm } from '../../src/utils'

describe('calculateClockOutHours', () => {
  test('should return the hour someone should clock out based on a normal 8 hour day', () => {
    expect(calculateClockOutHours(9)).toEqual(5)
  })
  test('should return the hour someone should clock out based on an 8 hour day, if both clock in and clock out times are in the am', () => {
    expect(calculateClockOutHours(2)).toEqual(10)
  })
  test('should return the hour someone should clock out based on an 8 hour day, if both clock in and clock out times are in the pm', () => {
    expect(calculateClockOutHours(13)).toEqual(9)
  })
  test('should return the hour someone should clock out based on an 8 hour day, if clock in is before midnight and clock out is after midnight', () => {
    expect(calculateClockOutHours(20)).toEqual(4)
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

describe('determineAmPm', () => {
  test("should return 'am' when a number before '12' is given", () => {
    expect(determineAmPm(7)).toEqual('am')
  })
  test("should return 'pm' when a number after '12' is given", () => {
    expect(determineAmPm(19)).toEqual('pm')
  })
  test("should return 'am' when the number '0' for midnight is given", () => {
    expect(determineAmPm(0)).toEqual('am')
  })
  test("should return 'pm' when the number '12' for noon is given", () => {
    expect(determineAmPm(12)).toEqual('pm')
  })
})
