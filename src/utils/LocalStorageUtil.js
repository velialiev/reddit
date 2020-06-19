class LocalStorageUtil {
  static get(key, fallbackValue = null) {
    try {
      return JSON.parse(localStorage.getItem(key)) || fallbackValue
    } catch {
      return fallbackValue
    }
  }

  static set(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  }
}

export default LocalStorageUtil
