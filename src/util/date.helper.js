exports.formatSeconds = value => { 
  var theTime = parseInt(value);// 需要转换的时间秒 
  var minute = 0; // 分 
  var hour = 0; // 小时 
  var day = 0; // 天

  if (theTime > 60) { 
    minute = parseInt(theTime % 60) > 0 ? parseInt(theTime / 60 + 1) : parseInt(theTime / 60); 

    if (minute > 60) { 
      hour = parseInt(minute / 60); 
      minute = parseInt(minute % 60); 

      if (hour > 24) {
        //大于24小时
        day = parseInt(hour / 24);
        hour = parseInt(hour % 24);
      }
    } 
  } 

  var result = '';

  if (minute > 0) { 
    result = '' + parseInt(minute) + '分钟' + result; 
  } 

  if (hour > 0) { 
    result = '' + parseInt(hour) + '小时' + result; 
  } 

  if (day > 0) { 
    result = '' + parseInt(day) + '天' + result; 
  }

  return result; 
}