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

export const handleMinutes = (lunchMinutes, startMinutes) => {
  startMinutes = parseInt(startMinutes) || 0
  lunchMinutes = parseInt(lunchMinutes) || 0
  let minutes = lunchMinutes + startMinutes
  let hour = 0
  if (minutes >= 60) {
    minutes -= 60
    hour = 1
  }
  return { hour, minutes }
}

export const determineAmPm = time => {
  let hour = parseInt(time)
  let afternoon = hour >= 12
  let beforeMidnight = hour < 24
  let amPm = afternoon && beforeMidnight ? 'pm' : 'am'
  return amPm
}
