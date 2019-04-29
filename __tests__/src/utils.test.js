import { calculateClockOutHours } from '../../src/utils'

describe('calculateClockOutHours', () => {
  test('should return the hour someone should clock out based on an 8 hour day', () => {
    expect(calculateClockOutHours(9)).toEqual(5)
  })
})
