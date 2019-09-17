function formateDate (time, ISOformat) {
  const pad = n => n<10 ? '0'+n : n
  const sgn = n => n<0 ? '-' : '+'
  const useISO = ISOformat || false

  const tz = time.getTimezoneOffset(),
        tzH = parseInt(Math.abs(tz/60)),
        tzM = Math.abs(tz%60)

  const YYYY = useISO ? time.getUTCFullYear() : time.getFullYear(),
        MM = useISO ? time.getUTCMonth() : time.getMonth(),
        DD = useISO ? time.getUTCDate() : time.getDate(),
        hh = useISO ? time.getUTCHours() : time.getHours(),
        mm = useISO ? time.getUTCMinutes() : time.getMinutes(),
        ss = useISO ? time.getUTCSeconds() : time.getSeconds()

  return YYYY+'-'
  + pad(MM+1)+'-'
  + pad(DD)+'T'
  + pad(hh)+':'
  + pad(mm)+':'
  + pad(ss)+(
    useISO?'Z':(sgn(-tz)+pad(tzH)+':'+pad(tzM))
  )
}

export default formateDate
