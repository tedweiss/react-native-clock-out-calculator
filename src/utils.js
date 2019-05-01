export const calculateClockOutTime = (startHours, startMinutes) => {
  let hours = calculateClockOutHours(startHours)
  let time = { hours, minutes: parseInt(startMinutes) }
  return time
}

export const calculateClockOutHours = startHours => {
  let clockOutHours
  let startHoursAmPm = determineAmPm(startHours)
  let hours = parseInt(startHours)
  let clockOutTime = hours + 8
  let morningClockInTime = startHoursAmPm === 'am'
  let morningClockOutTime = determineAmPm(clockOutTime) === 'am'
  let morningShift = morningClockInTime && morningClockOutTime
  if (morningShift) {
    clockOutHours = clockOutTime
  } else {
    clockOutHours = parseInt(startHours) + 8 - 12
  }
  return clockOutHours
}

export const determineAmPm = hour => {
  let amPm = parseInt(hour) >= 12 ? 'pm' : 'am'
  return amPm
}
