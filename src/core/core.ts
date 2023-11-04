import dayjs from 'dayjs'
import advanced from 'dayjs/plugin/advancedFormat'
import isBetween from 'dayjs/plugin/isBetween'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isBetween)
dayjs.extend(advanced)

// Add methods that will be used in the whole project
class Core {
  day = dayjs
  locale = 'en-US'
  // backend date format
  beDateFormat = 'YYYY-MM-DDTHH:mm:ssZ'
  // frontend date format
  feDateFormat = 'YYYY-MM-DD'

  delay(time = 300, value = null) {
    return new Promise(resolve => {
      setTimeout(resolve.bind(null, value), time)
    })
  }

  saveLocalStorage(prop: string, val: string, isObject = true) {
    val = isObject ? JSON.stringify(val) : val
    localStorage.setItem(prop, val)
  }

  getLocalStorage(prop: string) {
    let res
    // maybe it is json?
    try {
      res = JSON.parse(localStorage.getItem(prop) || '{}')
    } catch (err) {
      res = localStorage.getItem(prop)
      console.warn(err)
    }

    return res
  }

  removeLocalStorage(prop: string) {
    localStorage.removeItem(prop)
  }

  saveSessionStorage(prop: string, val: string, isObject = true) {
    val = isObject ? JSON.stringify(val) : val
    sessionStorage.setItem(prop, val)
  }

  getSessionStorage(prop: string) {
    let res
    // maybe it is json?
    try {
      res = JSON.parse(sessionStorage.getItem(prop) || '{}')
    } catch (err) {
      res = sessionStorage.getItem(prop)
      console.warn(err)
    }

    return res
  }

  removeSessionStorage(prop: string) {
    sessionStorage.removeItem(prop)
  }

  date(date: string | number | dayjs.Dayjs | Date | null | undefined, format = this.beDateFormat) {
    return this.day(date, format).format(this.feDateFormat)
  }
}

const core = new Core()
export default core
