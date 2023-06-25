// -------------------------------------------------------------------------------------------------------------------------------------------------
// 气压折线图
let min = 30,
  max = 40;
let table1;
let table2;
let pressY = [];
let tempY = [];
let x = [];
const modelInfo = {
  WF5803_1BAR: {
    min: 30 * u,
    max: 150 * u,
    url: "https://www.weifengheng.com/show-80.html"
  },
  WF5803_2BAR: {
    min: 30 * u,
    max: 250 * u,
    url: "https://www.weifengheng.com/show-442.html"
  },
  WF5803_7BAR: {
    min: 30 * u,
    max: 800 * u,
    url: "https://www.weifengheng.com/show-47.html"
  },
  WF5803_10BAR: {
    min: 30 * u,
    max: 1100 * u,
    url: "https://www.weifengheng.com/show-443.html"
  },
  WF5803_20BAR: {
    min: 30 * u,
    max: 2100 * u,
    url: "https://www.weifengheng.com/show-444.html"
  },
  WF5805_2BAR: {
    min: 30 * u,
    max: 250 * u,
    url: "https://www.weifengheng.com/show-98.html"
  },
  WF100D_5KPA: {
    min: -6 * u,
    max: 6 * u,
    url: "https://www.weifengheng.com/show-160.html"
  },
  WF100D_10KPA: {
    min: -12 * u,
    max: 12 * u
  },
  WF100D_40KPA: {
    min: -50 * u,
    max: 50 * u
  },
  WF100D_100KPA: {
    min: -120 * u,
    max: 120 * u
  },
  WF100D_200KPA: {
    min: -100 * u,
    max: 240 * u
  },
  WF100D_300KPA: {
    min: -100 * u,
    max: 360 * u,
    url: "https://www.weifengheng.com/show-160.html"
  },
  WF200D_5KPA: {
    min: -6 * u,
    max: 6 * u,
    url: "https://www.weifengheng.com/show-397.html"
  },
  WF200D_10KPA: {
    min: -12 * u,
    max: 12 * u,
    url: "https://www.weifengheng.com/show-397.html"
  },
  WF183D_11BAR: {
    min: 30 * u,
    max: 1200 * u,
    url: "https://www.weifengheng.com/show-195.html"
  },
};
// 气压折线图
var myChart1 = echarts.init(document.querySelector(".line .chart"));
(function () {
  // 2.指定配置
  var option = {
    // 通过这个color修改两条线的颜色
    color: ["#00f2f1"],
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        params = params[0];
        var time = params.value;
        return "气压：" + time + unit;
      },
    },
    // 图例组件
    legend: {
      // 如果series 对象有name 值，则 legend可以不用写data
      // 修改图例组件 文字颜色
      textStyle: {
        color: '#fff'
      },
      right: "10%",
    },
    grid: {
      top: "20%",
      left: "3%",
      right: "4%",
      bottom: "3%",
      show: true, // 显示边框
      borderColor: "#012f4a", // 边框颜色
      containLabel: true, // 包含刻度在内
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      // show: false,
      axisTick: {
        // show: false, // 去除刻度线
      },
      axisLabel: {
        color: "#4c9bfd", // 文本颜色
      },
      axisLine: {
        show: false, // 去除轴线
      },
      splitLine: {
        show: false,
      },
      show: false,
      data: x,
    },
    yAxis: {
      type: "value",
      //minInterval设置刻度的最小间距
      //只在数值轴或时间轴中有效，所以要保证type为value或time
      //minInterval: 1,
      boundaryGap: [0, "80%"],
      axisTick: {
        show: false, // 去除刻度线
      },
      axisLabel: {
        color: "#4c9bfd", // 文本颜色
        formatter: function (value, index) {
          return value.toFixed(1);
        },
      },
      splitLine: {
        show: false,
      },
      axisLine: {
        show: false, // 去除轴线
      },
      splitLine: {
        lineStyle: {
          color: "#012f4a", // 分割线颜色
        },
      },
    },
    // series中一条对象代表一条线
    series: [{
      name: "气压",
      type: "line",
      // true 可以折线显示带有弧度
      smooth: true,
      data: pressY,
      showSymbol: false,
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c}',
      },
    }, ],
  };
  // 3. 把配置给实例对象
  myChart1.setOption(option);
})();
var myChart2 = echarts.init(document.querySelector(".line2 .chart"));
// 温度折线图
(function () {
  var option = {
    tooltip: {
      trigger: "axis",
      formatter: function (params) {
        params = params[0];
        var time = params.value;
        return "温度：" + time + "℃";
      },
    },
    legend: {
      right: "10%",
      data: ["温度"],
      textStyle: {
        color: '#fff'
      },
      fontSize: "12",
    },
    grid: {
      left: "10",
      top: "30",
      right: "10",
      bottom: "10",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      // 文本颜色为rgba(255,255,255,.6)  文字大小为 12
      axisLabel: {
        color: "rgba(255,255,255,.6)",
        fontSize: 12,
      },
      show: false,
      // x轴线的颜色为   rgba(255,255,255,.2)
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,.2)",
        },
      },
      data: x,
    },
    yAxis: [{
      type: "value",
      minInterval: 1,
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: "rgba(255,255,255,.1)",
        },
      },
      axisLabel: {
        color: "rgba(255,255,255,.6)",
        fontSize: 12,
      },
      // 修改分割线的颜色
      splitLine: {
        lineStyle: {
          color: "rgba(255,255,255,.1)",
        },
      },
    }, ],
    series: [{
      name: "温度",
      type: "line",
      smooth: true,
      lineStyle: {
        color: "#00d887",
        width: 2,
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [{
              offset: 0,
              color: "rgba(0, 216, 135, 0.4)",
            },
            {
              offset: 0.8,
              color: "rgba(0, 216, 135, 0.1)",
            },
          ],
          false
        ),
        shadowColor: "rgba(0, 0, 0, 0.1)",
      },
      // 设置拐点 小圆点
      symbol: "circle",
      // 拐点大小
      symbolSize: 5,
      // 设置拐点颜色以及边框
      itemStyle: {
        color: "#00d887",
        borderColor: "rgba(221, 220, 107, .1)",
        borderWidth: 12,
      },
      // 开始不显示拐点， 鼠标经过显示
      showSymbol: false,
      data: TempChartList,
    }, ],
  };
  myChart2.setOption(option);
})();
// 气压仪表盘
var myChart3 = echarts.init(document.querySelector(".gauge1 .chart"));
(function () {
  var option;
  option = {
    series: [{
        type: "gauge",
        min: min,
        max: max,
        center: ["50%", "65%"],
        splitNumber: 10,
        radius: "85%",
        axisLine: {
          lineStyle: {
            color: [
              [1, "#4c9bfd"]
            ],
            width: 3,
          },
        },
        // 控制大刻度
        splitLine: {
          distance: -10,
          length: 10,
          lineStyle: {
            color: "#4c9bfd",
            width: 2,
          },
        },
        // 控制小刻度
        axisTick: {
          distance: -8,
          length: 6,
          lineStyle: {
            color: "#4c9bfd",
          },
        },
        // 刻度样式设置
        axisLabel: {
          distance: -38,
          color: "#4c9bfd",
          fontSize: 8,
          formatter: function (value, index) {
            return value.toFixed(1);
          },
        },
        anchor: {
          show: false,
        },
        pointer: {
          icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
          length: "12%",
          width: 20,
          offsetCenter: [0, "-60%"],
          itemStyle: {
            color: "auto",
          },
        },
        detail: {
          valueAnimation: true,
          precision: 1,
          color: "#00f2f1",
          offsetCenter: [0, "10%"],
          formatter: function (value, index) {
            return value.toFixed(1);
          },
        },
        title: {
          offsetCenter: [0, "-30%"],
          color: "#02a6b5",
        },
      },
      {
        type: "gauge",
        min: min,
        max: max,
        center: ["50%", "65%"],
        splitNumber: 4,
        axisLine: {
          lineStyle: {
            color: [
              [1, "#4c9bfd"]
            ],
            width: 3,
          },
        },
        // 控制大刻度
        splitLine: {
          distance: -3,
          length: 12,
          lineStyle: {
            color: "#4c9bfd",
            width: 2,
          },
        },
        // 控制小刻度
        axisTick: {
          distance: 0,
          length: 6,
          lineStyle: {
            color: "#4c9bfd",
          },
        },
        axisLabel: {
          distance: 10,
          fontSize: 8,
          color: "#4c9bfd",
          formatter: function (value, index) {
            return value.toFixed(1);
          },
        },
        pointer: {
          show: false,
        },
        title: {
          show: false,
        },
        anchor: {
          show: false,
        },
      },
    ],
  };
  myChart3.setOption(option);
})();
var myChart4 = echarts.init(document.querySelector(".gauge2 .chart"));
// 温度仪表盘
(function () {
  option = {
    series: [{
        type: "gauge",
        center: ["50%", "75%"],
        radius: "80%",
        startAngle: 200,
        endAngle: -20,
        min: -20,
        max: 120,
        splitNumber: 14,
        itemStyle: {
          color: "#4c9bfd",
        },
        progress: {
          show: true,
          width: 15,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            width: 15,
          },
        },
        axisTick: {
          distance: -35,
          splitNumber: 5,
          lineStyle: {
            width: 2,
            color: "#4c9bfd",
          },
        },
        splitLine: {
          distance: -42,
          length: 14,
          lineStyle: {
            width: 2,
            color: "#4c9bfd",
          },
        },
        axisLabel: {
          distance: -24,
          color: "#4c9bfd",
          fontSize: 12,
          formatter: function (value, index) {
            return value.toFixed(0);
          },
        },
        anchor: {
          show: false,
        },
        title: {
          show: false,
        },
        // data 数据显示
        detail: {
          valueAnimation: true,
          width: "60%",
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, "-10%"],
          fontSize: 30,
          fontWeight: "bolder",
          formatter: "{value}",
          color: "#00d887",
          formatter: function (value, index) {
            return value.toFixed(1);
          },
        },
        data: [
          // {
          //   value: 20,
          // },
        ],
      },
      {
        type: "gauge",
        center: ["50%", "75%"],
        startAngle: 200,
        endAngle: -20,
        min: -20,
        max: 120,
        splitNumber: 7,
        itemStyle: {
          color: "rgba(255,255,255,0.5)",
        },
        progress: {
          show: true,
          width: 10,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
          formatter: function (value, index) {
            return value.toFixed(0);
          },
        },
        detail: {
          show: false,
        },
        data: [
          // {
          //   value: 20,
          // },
        ],
      },
    ],
  };
  myChart4.setOption(option);
})();
// -----------------------------------------------------------------------------------------------------------------------------------------------------

// 添加数据
let addData = function () {};
// 清空数据
function clearData() {
  tempY.length = 0;
  pressY.length = 0;
  x.length = 0;
  tableData.length = 0;
}
// 渲染表格
layui.use("table", function () {
  table1 = layui.table;
  table1.render({
    elem: "#table",
    id: "table",
    data: tableData,
    cols: [
      [{
          field: "tabelTime",
          title: "创建时间",
          align: "center"
        },
        {
          field: "pressUnit",
          title: "气压",
          align: "center"
        },
        {
          field: "tempUnit",
          title: "温度",
          align: "center"
        },
      ],
    ],
  });
});
start.addEventListener("click", function () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://api.app.local/Board/Start', true);
  xhr.send();
  clearData();
  addData = function (press, temp) {
    const modelInfoObj = modelInfo[params.sensorModel];
    if (modelInfoObj) {
      min = modelInfoObj.min;
      max = modelInfoObj.max;
    }
    if (typeof press === 'number') {
      press = press.toFixed(4);
    }
    pressY.push(Number(press));
    tempY.push(Number(temp));
    // x 轴自增
    x.push(x[x.length - 1] + 1);
    if (pressY.length > 200) {
      pressY.shift();
      tempY.shift();
      x.shift();
    }
    myChart1.setOption({
      xAxis: {
        data: x,
      },
      yAxis: {
        minInterval: 0.1,
        min: (value) => {
          return value.min - 0.5;
        },
        max: (value) => {
          return value.max + 0.5;
        },
      },
      series: [{
        data: pressY,
      }, ],
    });
    myChart2.setOption({
      xAxis: {
        data: x,
      },
      yAxis: {
        minInterval: 0.1,
        min: (value) => {
          return value.min - 0.5;
        },
        max: (value) => {
          return value.max + 0.5;
        },
      },
      series: [{
        data: tempY,
      }, ],
    });
    myChart3.setOption({
      series: [{
          type: "gauge",
          min: min,
          max: max,
          data: [{
            value: press,
            formatter: function (value, index) {
              return value.toFixed(4);
            },
          }, ],
        },
        {
          min: min,
          max: max,
        },
      ],
    });
    myChart4.setOption({
      series: [{
          data: [{
            value: temp,
          }, ],
        },
        {
          data: [{
            value: temp,
          }, ],
        },
      ],
    });
    let pressUnit = `${press} ${unit}`;
    let tempUnit = `${temp} ℃`;

    tabelTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
    tableData.unshift({
      pressUnit,
      tempUnit,
      tabelTime,
    });
    tableData = tableData.slice(0, 300);

    table1.reload("table", {
      data: tableData,
    });
  };
  $("#showPopup").addClass("layui-btn-disabled").attr("disabled", true);
  $(".export").addClass("layui-btn-disabled").attr("disabled", true);
  $("#start").css("display", "none");
  $(".stop").css("display", "block");
  //  Formium?.external.wfh.start(port, model, unit);
});

function stopApp() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://api.app.local/Board/Stop', true);
  xhr.send();
  //  Formium?.external.wfh.stop();
  $("#start").css("display", "block");
  $(".stop").css("display", "none");
  $("#showPopup").removeClass("layui-btn-disabled").attr("disabled", false);
  $(".export").removeClass("layui-btn-disabled").attr("disabled", false);
}

stop.addEventListener("click", stopApp);

setInterval(() => {
  let A = 49;
  let B = 50;
  let press = ((B - A) * Math.random() + A).toFixed(2);
  let temp = ((B - A) * Math.random() + A).toFixed(2);
  let rowData = "152,241,192,26,231,0,@,@";
  setData = addData(press, temp, rowData);
}, 1000);