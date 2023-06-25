# setSelectionData

setSelectionData(Models, WF183DComPort) 

//设置选择框的值 传入传感器型号数组、 WF183D 的通讯口

# addData

addData(press,temp);//传入新数据（气压、温度）

# 表单参数

{
"sensorModel": "WF5803_20BAR", //传感器型号---默认数组第一个值
"comPort": "0", // USB 通信
"sensorUnit": "1",//气压单位
"comMode": "0",//产品通讯
"PressOffset": "",//气压偏移量
"TempOffset": ""//温度偏移量
}
