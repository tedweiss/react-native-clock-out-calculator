export const calculateClockOutTime = (startHours, startMinutes, lunchMinutes, timeSoFar, daysSoFar) => {
  let handledMinutes
  let regularShiftHours = 8
  let shift = calculateShiftHours(regularShiftHours)
  if (timeSoFar) {
    let minutesSoFar = timeSoFar.split('.')[1]
    let hoursSoFar = timeSoFar.split('.')[0]
    shift = calculateShiftHours(regularShiftHours, daysSoFar, hoursSoFar)
    let convertedMinutesSoFar = convertDecimalToMinutes(minutesSoFar)
    handledMinutes = handleMinutes(lunchMinutes, startMinutes, convertedMinutesSoFar)
  } else {
    handledMinutes = handleMinutes(lunchMinutes, startMinutes)
  }
  let minutes = handledMinutes.minutes
  let calculatedClockOutHours = calculateClockOutHours(startHours, shift)
  let hours = calculatedClockOutHours.hours
  hours += handledMinutes.hour
  let amPm = calculatedClockOutHours.amPm
  let time = { hours, minutes, amPm }
  return time
}

export const calculateClockOutHours = (startHours, shift) => {
  let clockOutHours
  let startHoursAmPm = determineAmPm(startHours)
  let amPm = 'am'
  let hours = parseInt(startHours)
  let clockOutTime = hours + shift
  // morning clock in time && morning clock out time
  let morningShift = startHoursAmPm === 'am' && determineAmPm(clockOutTime) === 'am'
  // morning clock in time && afternoon clock out time
  let dayShift = startHoursAmPm === 'am' && determineAmPm(clockOutTime) === 'pm'
  // afternoon clock in time && afternoon clock out time
  let afternoonShift = startHoursAmPm === 'pm' && determineAmPm(clockOutTime) === 'pm'
  // afternoon clock in time && morning clock out time
  let midnightShift = startHoursAmPm === 'pm' && determineAmPm(clockOutTime) === 'am'
  if (morningShift) {
    clockOutHours = clockOutTime
  } else if (midnightShift) {
    clockOutHours = clockOutTime - 24
  } else if (dayShift || afternoonShift) {
    clockOutHours = clockOutTime - 12
    amPm = 'pm'
  }
  let midnight = clockOutHours === 0
  if (midnight) {
    clockOutHours = 12
  }
  return { hours: clockOutHours, amPm }
}

export const handleMinutes = (lunchMinutes, startMinutes, minutesSoFar, minutesIn, minutesOut) => {
  startMinutes = parseInt(startMinutes) || 0
  lunchMinutes = parseInt(lunchMinutes) || 0
  minutesSoFar = parseInt(minutesSoFar) || 0
  minutesIn = parseInt(minutesIn) || 0
  minutesOut = parseInt(minutesOut) || 0
  let minutes = minutesOut ? minutesIn + minutesOut - lunchMinutes : lunchMinutes + startMinutes - minutesSoFar
  let hour = 0
  if (minutes >= 60) {
    minutes -= 60
    hour = 1
  } else if (minutes < 0) {
    minutes = 60 + minutes
    hour = -1
  }
  return { hour, minutes }
}

export const calculateShiftHours = (regularShiftHours, daysSoFar, hoursSoFar) => {
  regularShiftHours = parseInt(regularShiftHours)
  daysSoFar = parseInt(daysSoFar) || 0
  hoursSoFar = parseInt(hoursSoFar) || 0
  // previous days
  let shiftHours = daysSoFar * regularShiftHours
  // add 8 hours for current day
  shiftHours = shiftHours + regularShiftHours
  // subtract hours so far
  shiftHours = shiftHours - hoursSoFar
  // return current day's shift hours needed
  return shiftHours
}

export const convertDecimalToMinutes = decimal => {
  let minute
  // to account for tenths appearing as single minute
  decimal = parseInt(decimal) < 10 ? decimal + '0' : decimal
  minute = (parseInt(decimal) / 100) * 60
  return minute
}

export const convertMinutesToDecimal = (minutes, minutesSoFar) => {
  let decimal
  decimal = minutes / 60
  decimal = parseFloat(decimal.toFixed(2))
  decimal = decimal + parseFloat('0.' + minutesSoFar)
  return decimal
}

export const determineAmPm = time => {
  let hour = parseInt(time)
  let afternoon = hour >= 12
  let beforeMidnight = hour < 24
  let amPm = afternoon && beforeMidnight ? 'pm' : 'am'
  return amPm
}

export const calculateTotalTime = (timeSoFar, hoursIn, minutesIn, hoursOut, minutesOut, lunchMinutes) => {
  hoursIn = parseInt(hoursIn) || 0
  hoursOut = parseInt(hoursOut) || 0
  minutesIn = parseInt(minutesIn) || 0
  minutesOut = parseInt(minutesOut) || 0
  let hoursSoFar = 0
  let minutesSoFar = 0
  if (timeSoFar) {
    hoursSoFar = timeSoFar.split('.')[0]
    minutesSoFar = timeSoFar.split('.')[1]
  }
  let totalTime
  let handledMinutes = handleMinutes(lunchMinutes, '', '', minutesIn, minutesOut)
  let minutes = handledMinutes.minutes
  minutes = convertMinutesToDecimal(minutes, minutesSoFar)
  hoursIn = hoursIn + handledMinutes.hour
  let hours = calculateTotalShiftHours(hoursIn, hoursOut)
  hours = hours + parseInt(hoursSoFar)
  totalTime = hours + minutes
  return totalTime
}

export const calculateTotalShiftHours = (hoursIn, hoursOut) => {
  let shiftHours
  // hours in and out are both before noon ||
  // hours in and out are both after noon
  if ((hoursIn <= 12 && hoursOut <= 12) || (hoursIn > 12 && hoursOut > 12)) {
    shiftHours = hoursOut - hoursIn
    // hours in is before noon and hours out is after noon
  } else if (hoursIn <= 12 && hoursOut > 12) {
    shiftHours = 12 - hoursIn + hoursOut - 12
    // hours in is after noon and hours out is before noon
  } else if (hoursIn > 12 && hoursOut <= 12) {
    shiftHours = hoursIn - hoursOut
  }
  return shiftHours
}
