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

export const handleMinutes = (lunchMinutes, startMinutes, minutesSoFar) => {
  startMinutes = parseInt(startMinutes) || 0
  lunchMinutes = parseInt(lunchMinutes) || 0
  minutesSoFar = parseInt(minutesSoFar) || 0
  let minutes = lunchMinutes + startMinutes - minutesSoFar
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

export const determineAmPm = time => {
  let hour = parseInt(time)
  let afternoon = hour >= 12
  let beforeMidnight = hour < 24
  let amPm = afternoon && beforeMidnight ? 'pm' : 'am'
  return amPm
}

export const calculateTotalTime = (timeSoFar, hoursIn, minutesIn, hoursOut, minutesOut,lunchMinutes) => {
  hoursIn = parseInt(hoursIn) || 0
  hoursOut = parseInt(hoursOut) || 0
  let totalTime
  hoursIn = parseInt(hoursIn)
  hoursOut = parseInt(hoursOut)
  // hours in and out both before noon
  if (hoursIn <= 12 && hoursOut <= 12) {
    totalTime = hoursOut - hoursIn}
  return totalTime
}