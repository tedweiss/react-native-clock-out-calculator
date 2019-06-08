import {
  calculateClockOutHours,
  calculateClockOutTime,
  determineAmPm,
  handleMinutes,
  convertDecimalToMinutes,
  calculateShiftHours,
  calculateTotalTime,
  calculateTotalShiftHours,
  convertMinutesToDecimal
} from '../../src/utils'

describe('calculateClockOutHours', () => {
  test('should return the hour someone should clock out based on a normal 8 hour day', () => {
    expect(calculateClockOutHours(9, 8).hours).toEqual(5)
  })
  test('should return the hour someone should clock out based on an 8 hour day, if both clock in and clock out times are in the am', () => {
    expect(calculateClockOutHours(2, 8).hours).toEqual(10)
  })
  test('should return the hour someone should clock out based on an 8 hour day, if both clock in and clock out times are in the pm', () => {
    expect(calculateClockOutHours(13, 8).hours).toEqual(9)
  })
  test('should return the hour someone should clock out based on an 8 hour day, if clock in is before midnight and clock out is after midnight', () => {
    expect(calculateClockOutHours(20, 8).hours).toEqual(4)
  })
  test("should return '12' for midnight instead of '0'", () => {
    expect(calculateClockOutHours(16, 8).hours).toEqual(12)
  })
  test("should return 'am' when clocking in and out before noon", () => {
    expect(calculateClockOutHours(2, 8).amPm).toEqual('am')
  })
  test("should return 'am' when clocking in before midnight and out before noon", () => {
    expect(calculateClockOutHours(20, 8).amPm).toEqual('am')
  })
  test("should return 'pm' when clocking in before noon and out after noon", () => {
    expect(calculateClockOutHours(9, 8).amPm).toEqual('pm')
  })
  test("should return 'pm' when clocking in and out after noon", () => {
    expect(calculateClockOutHours(14, 8).amPm).toEqual('pm')
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
  test('should return the minute someone should clock out including time for lunch and time so far', () => {
    expect(calculateClockOutTime('9', '15', '30', '32.45').minutes).toEqual(18)
  })
  test('should return the hour someone should clock out including time for lunch and time so far', () => {
    expect(calculateClockOutTime('9', '15', '30', '33.45', '4').hours).toEqual(4)
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
  test('should return the total minutes of start minutes plus lunch minutes minus minutes so far', () => {
    let startMinutes = 45
    let lunchMinutes = 50
    let minutesSoFar = 20
    let returnedMinutes = 15
    expect(handleMinutes(lunchMinutes, startMinutes, minutesSoFar).minutes).toEqual(returnedMinutes)
  })
  test('should return the total minutes if minutesIn and minutesOut are passed in', () => {
    let lunchMinutes = 50
    let minutesIn = 30
    let minutesOut = 45
    let returnedMinutes = 25
    expect(handleMinutes(lunchMinutes, '', '', minutesIn, minutesOut).minutes).toEqual(returnedMinutes)
  })
})

describe('convertDecimalToMinutes', () => {
  test('should return the minutes after converting from decimal', () => {
    expect(convertDecimalToMinutes('25')).toEqual(15)
  })
  test('should return the minutes after converting from decimal when the minutes being passed in is a single digit', () => {
    expect(convertDecimalToMinutes('5')).toEqual(30)
  })
})

describe('convertMinutesToDecimal', () => {
  test('should return a decimal when minutes are passed in', () => {
    expect(convertMinutesToDecimal('45')).toEqual(0.75)
  })
  test('should return a decimal rounded to 2 place values', () => {
    expect(convertMinutesToDecimal('45')).toEqual(0.75)
  })
  test('should return a decimal greater than 1 when minutesSoFar passed in makes the minutes more than 60', () => {
    expect(convertMinutesToDecimal('45','50')).toEqual(1.25)
  })
})

describe('calculateShiftHours', () => {
  test('should return the regular shift hours', () => {
    let regularShiftHours = 8
    expect(calculateShiftHours(regularShiftHours)).toEqual(8)
  })
  test('should return the shift hours after passing in the number of days worked', () => {
    let regularShiftHours = 8
    let daysSoFar = '2'
    expect(calculateShiftHours(regularShiftHours, daysSoFar)).toEqual(24)
  })
  test('should return the shift hours adding the number of days worked subtracting the hours worked so far', () => {
    let regularShiftHours = 8
    let daysSoFar = '2'
    let hoursSoFar = '18'
    expect(calculateShiftHours(regularShiftHours, daysSoFar, hoursSoFar)).toEqual(6)
  })
})

describe('calculateTotalTime', () => {
  test('should return total hours worked', () => {
    expect(calculateTotalTime('', '2', '', '10', '', '')).toEqual(8)
  })
  test('should return total time worked with just hours and minutes in and out passed in', () => {
    expect(calculateTotalTime('', '2', '30', '9', '22', '')).toEqual(7.87)
  })
  test('should return total time worked with lunch minutes and hours and minutes in and out passed in', () => {
    expect(calculateTotalTime('', '2', '30', '9', '22', '30')).toEqual(7.37)
  })
  test('should return total time worked with time so far and lunch minutes and hours and minutes in and out passed in', () => {
    expect(calculateTotalTime('16.33', '2', '20', '9', '50', '30')).toEqual(24)
  })
})

describe('calculateTotalShiftHours', () => {
  test('should return the hours when hours in and out are both before noon', () => {
    expect(calculateTotalShiftHours(2, 10)).toEqual(8)
  })
  test('should return the hours when hours in and out are both after noon', () => {
    expect(calculateTotalShiftHours(13, 21)).toEqual(8)
  })
  test('should return the hours when hours in is before noon and hours out is after noon', () => {
    expect(calculateTotalShiftHours(9, 17)).toEqual(8)
  })
  test('should return the hours when hours in is after noon and hours out is before noon', () => {
    expect(calculateTotalShiftHours(17, 9)).toEqual(8)
  })
})
