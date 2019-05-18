export const calculateClockOutTime = (startHours, startMinutes) => {
  let hours = calculateClockOutHours(startHours).hours
  let amPm = calculateClockOutHours(startHours).amPm
  let time = { hours, minutes: parseInt(startMinutes), amPm }
  return time
}

export const calculateClockOutHours = startHours => {
  let clockOutHours
  let startHoursAmPm = determineAmPm(startHours)
  let amPm = 'am'
  let hours = parseInt(startHours)
  let clockOutTime = hours + 8
  let morningClockInTime = startHoursAmPm === 'am'
  let morningClockOutTime = determineAmPm(clockOutTime) === 'am'
  let afternoonClockInTime = startHoursAmPm === 'pm'
  let afternoonClockOutTime = determineAmPm(clockOutTime) === 'pm'
  let morningShift = morningClockInTime && morningClockOutTime
  let dayShift = morningClockInTime && afternoonClockOutTime
  let afternoonShift = afternoonClockInTime && afternoonClockOutTime
  let midnightShift = afternoonClockInTime && morningClockOutTime
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

export const determineAmPm = time => {
  let hour = parseInt(time)
  let afternoon = hour >= 12
  let beforeMidnight = hour < 24
  let amPm = afternoon && beforeMidnight ? 'pm' : 'am'
  return amPm
}

export const handleLunchMinutes = minutes => {
  return minutes
}
