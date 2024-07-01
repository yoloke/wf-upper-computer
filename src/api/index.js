import api from '../utils/request.js'
/**
 * 开始运行
 *
 * @author zyn
 */
export function startData(parameter) {
  return api({
    url: '/Start',
    method: 'post',
    data: parameter
  })
}
/**
 * 停止运行
 *
 * @author zyn
 */
export function stopData(parameter) {
  return api({
    url: '/Stop',
    method: 'post',
    data: parameter
  })
}

/**
 * 获取传感器型号
 *
 * @author zyn
 */
export function getSensorList(parameter) {
  return api({
    url: '/Models',
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
    url: '/Units',
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
      url: '/Ports',
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
    url: '/Setting',
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
    url: '/UpdateSetting',
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
    url: '/SensorData',
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
    url: '/Export',
    method: 'post',
    data: parameter
  })
}
