export const calculateClockOutTime = (startHours, startMinutes) => {
  let hours = calculateClockOutHours(startHours)
  let time = { hours, minutes: parseInt(startMinutes) }
  return time
}

export const calculateClockOutHours = startHours => {
  let hours = parseInt(startHours) + 8 - 12
  return hours
}

export const determineAmPm = hour => {
  let amPm = parseInt(hour) >= 12 ? 'pm' : 'am'
  return amPm
}
