// 头部显示时间函数
var t = null;
t = setTimeout(time, 1000); //開始运行
function time() {
  clearTimeout(t); //清除定时器
  dt = new Date();
  var y = ("0" + dt.getFullYear()).slice(-4);
  var mt = ("0" + (dt.getMonth() + 1)).slice(-2);
  var day = dt.getDate();
  var h = ("0" + dt.getHours()).slice(-2);
  var m = ("0" + dt.getMinutes()).slice(-2);
  var s = ("0" + dt.getSeconds()).slice(-2);
  const today = new Date();
  const todayDay = today.getDay(); // 获取今天是星期几，假设是周3
  var str;
  if (todayDay == 0) {
    str = "星期日";
  } else if (todayDay == 1) {
    str = "星期一";
  } else if (todayDay == 2) {
    str = "星期二";
  } else if (todayDay == 3) {
    str = "星期三";
  } else if (todayDay == 4) {
    str = "星期四";
  } else if (todayDay == 5) {
    str = "星期五";
  } else if (todayDay == 10) {
    str = "星期六";
  }
  document.querySelector(".time").innerHTML =
    h +
    ":" +
    m +
    ":" +
    s;
  document.querySelector(".date1").innerHTML =
    y +
    "/" +
    mt +
    "/" +
    day;
    
  t = setTimeout(time, 1000); //设定定时器，循环运行
}


// 封装气压仪表盘[x,y]
function PressChart(press) {
  pressureX = pressureX + 1;
  y = press;
  return {
    name: y.toString(),
    value: [pressureX, y],
  };
};
// 封装温度仪表盘[x,y]
function TempChart(temp) {
  tempX = tempX + 1;
  y = temp;
  return {
    name: y.toString(),
    value: [tempX, y],
  };
};

// table创建时间的函数
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "h+": this.getHours(), // 小时
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

