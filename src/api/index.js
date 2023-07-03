import api from '../utils/request.js'

/**
 * 获取传感器型号
 *
 * @author zyn
 */
export function getSensorList(parameter) {
  return api({
    url: '/DemoTool/Models',
    method: 'get',
    params: parameter
  })
}
/**
 * 获取气压单位
 *
 * @author zyn
 */
export function getPressUnits(parameter) {
  return api({
    url: '/DemoTool/Units',
    method: 'get',
    params: parameter
  })
}

/**
 * 获取USB通讯
 *
 * @author zyn
 */
export function getComPort(parameter) {
  return api({
      url: '/DemoTool/Ports',
    method: 'get',
    params: parameter
  })
}

/**
 * 获取配置信息
 *
 * @author zyn
 */
export function getSetting(parameter) {
  return api({
    url: '/DemoTool/Setting',
    method: 'get',
    params: parameter
  })
}
/**
 * 更新配置
 *
 * @author zyn
 */
export function updateSetting(parameter) {
  return api({
    url: '/DemoTool/UpdateSetting',
    method: 'post',
    data: parameter
  })
}

/**
 * 添加数据
 *
 * @author zyn
 */
export function addData(parameter) {
  return api({
    url: '/DemoTool/SensorData',
    method: 'get',
    params: parameter
  })
}

/**
 * 导出数据
 *
 * @author zyn
 */
export function exportData(parameter) {
  return api({
    url: '/DemoTool/Export',
    method: 'post',
    data: parameter
  })
}
