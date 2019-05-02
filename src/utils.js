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
  let afternoonClockInTime = startHoursAmPm === 'pm'
  let afternoonClockOutTime = determineAmPm(clockOutTime) === 'pm'
  let dayShift = morningClockInTime && afternoonClockOutTime
  let afternoonShift = afternoonClockInTime && afternoonClockOutTime
  let midnightShift = afternoonClockInTime && morningClockOutTime
  if (morningShift) {
    clockOutHours = clockOutTime
  } else if (midnightShift) {
    clockOutHours = clockOutTime - 24
  } else if (dayShift || afternoonShift) {
    clockOutHours = clockOutTime - 12
  }
  return clockOutHours
}

export const determineAmPm = time => {
  let hour = parseInt(time)
  let afternoon = hour >= 12
  let beforeMidnight = hour < 24
  let amPm = afternoon && beforeMidnight ? 'pm' : 'am'
  return amPm
}
