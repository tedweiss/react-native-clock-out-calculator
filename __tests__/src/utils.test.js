import { calculateClockOutHours, calculateClockOutTime, determineAmPm, handleMinutes } from '../../src/utils'

describe('calculateClockOutHours', () => {
  test('should return the hour someone should clock out based on a normal 8 hour day', () => {
    expect(calculateClockOutHours(9).hours).toEqual(5)
  })
  test('should return the hour someone should clock out based on an 8 hour day, if both clock in and clock out times are in the am', () => {
    expect(calculateClockOutHours(2).hours).toEqual(10)
  })
  test('should return the hour someone should clock out based on an 8 hour day, if both clock in and clock out times are in the pm', () => {
    expect(calculateClockOutHours(13).hours).toEqual(9)
  })
  test('should return the hour someone should clock out based on an 8 hour day, if clock in is before midnight and clock out is after midnight', () => {
    expect(calculateClockOutHours(20).hours).toEqual(4)
  })
  test("should return '12' for midnight instead of '0'", () => {
    expect(calculateClockOutHours(16).hours).toEqual(12)
  })
  test("should return 'am' when clocking in and out before noon", () => {
    expect(calculateClockOutHours(2).amPm).toEqual('am')
  })
  test("should return 'am' when clocking in before midnight and out before noon", () => {
    expect(calculateClockOutHours(20).amPm).toEqual('am')
  })
  test("should return 'pm' when clocking in before noon and out after noon", () => {
    expect(calculateClockOutHours(9).amPm).toEqual('pm')
  })
  test("should return 'pm' when clocking in and out after noon", () => {
    expect(calculateClockOutHours(14).amPm).toEqual('pm')
  })
})

describe('calculateClockOutTime', () => {
  test('should return the hour someone should clock out based on an 8 hour day', () => {
    expect(calculateClockOutTime('9', '00').hours).toEqual(5)
  })
  test('should return the minute someone should clock out based on an 8 hour day', () => {
    expect(calculateClockOutTime('9', '30').minutes).toEqual(30)
  })
  test('should return the minute someone should clock out including time for lunch', () => {
    expect(calculateClockOutTime('9', '15', '30').minutes).toEqual(45)
  })
  test("should return the '0' when the start minutes and lunch time combine to '60'", () => {
    expect(calculateClockOutTime('9', '30', '30').minutes).toEqual(0)
  })
  test("should return the hour someone should clock out increased by one when the minutes combine to '60' or more", () => {
    expect(calculateClockOutTime('9', '30', '30').hours).toEqual(6)
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

describe('handleMinutes', () => {
  test('should return the minutes that are passed in if less than 60', () => {
    let minutes = 45
    let returnedMinutes = 45
    expect(handleMinutes(minutes).minutes).toEqual(returnedMinutes)
  })
  test('should return the minutes that are passed in minus 60 if more than 60', () => {
    let minutes = 80
    let returnedMinutes = 20
    expect(handleMinutes(minutes).minutes).toEqual(returnedMinutes)
  })
  test('should return 1 hour if the minutes that are passed in are more than 60', () => {
    let minutes = 80
    let hour = 1
    expect(handleMinutes(minutes).hour).toEqual(hour)
  })
  test('should return the total minutes of start minutes plus lunch minutes that are passed in if total is less than 60', () => {
    let startMinutes = 15
    let lunchMinutes = 10
    let returnedMinutes = 25
    expect(handleMinutes(lunchMinutes, startMinutes).minutes).toEqual(returnedMinutes)
  })
  test('should return the total minutes of start minutes plus lunch minutes that are passed in if total is more than 60', () => {
    let startMinutes = 45
    let lunchMinutes = 50
    let returnedMinutes = 35
    expect(handleMinutes(lunchMinutes, startMinutes).minutes).toEqual(returnedMinutes)
  })
})
