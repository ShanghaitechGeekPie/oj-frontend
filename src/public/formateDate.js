function formateDate (time) {
  // todo:截取日期数字前的上下午表示各种语言文字
  let Hours = time.toLocaleTimeString().replace(/AM/, '上午').replace(/PM/, '下午')
  if (Hours[0] === '上') {
    Hours = Hours.replace(/上午/, '').length === 7 ? '0' + Hours.replace(/上午/, '') : Hours.replace(/上午/, '')
  } else {
    Hours = Hours.replace(/下午[0-9]+:/, (Hours) => {
      return `${Number(Hours.slice(Hours.search(/午/) + 1, Hours.search(/:/))) + 12}:`
    })
  }
  let date = ''
  time.toLocaleDateString().split('/').map((item, index) => {
    if (index === 0) {
      date += item
    } else {
      if (item.length === 1) {
        date += '-0' + item
      } else {
        date += '-' + item
      }
    }
  })
  return `${date}T${Hours}+08:00`
}

export default formateDate
