const SECONDS_IN_MINUTE = 60
const MILLISECONDS_IN_SECOND = 1000

class TimeUtil {
  static isOutdated(timestamp, expirationTime) {
    return Date.now() - timestamp >= expirationTime
  }

  static convertMinutesToMilliseconds(minutes) {
    return minutes * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND
  }
}

export default TimeUtil
