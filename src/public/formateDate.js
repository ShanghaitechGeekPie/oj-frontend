function formateDate (time, ISOformat = false) {
  const pad = n => n < 10 ? '0' + n : n
  const sgn = n => n < 0 ? '-' : '+'
  const useISO = ISOformat || false

  let tz = time.getTimezoneOffset()
  let tzH = parseInt(Math.abs(tz / 60), 10)
  let tzM = Math.abs(tz % 60)

  let YYYY = useISO ? time.getUTCFullYear() : time.getFullYear()
  let MM = useISO ? time.getUTCMonth() : time.getMonth()
  let DD = useISO ? time.getUTCDate() : time.getDate()
  let hh = useISO ? time.getUTCHours() : time.getHours()
  let mm = useISO ? time.getUTCMinutes() : time.getMinutes()
  let ss = useISO ? time.getUTCSeconds() : time.getSeconds()

  return YYYY + '-' +
    pad(MM + 1) + '-' +
    pad(DD) + 'T' +
    pad(hh) + ':' +
    pad(mm) + ':' +
    pad(ss) + (
    useISO ? 'Z' : (sgn(-tz) + pad(tzH) + ':' + pad(tzM))
  )
}

export default formateDate
