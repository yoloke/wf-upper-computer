import api from '../utils/request.js'
// 在Vue组件中发送API请求
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
export function getcomPort(parameter) {
  return api({
      url: '/DemoTool/Ports',
    method: 'get',
    params: parameter
  })
}

/**
 * 更新配置
 *
 * @author zyn
 */
export function updatedSetting(parameter) {
  return api({
    url: '/DemoTool/Setting',
    method: 'get',
    params: parameter
  })
}

/**
 * 查询封装技术
 *
 * @author zyn
 */
export function PackagePage(parameter) {
  return api({
    url: '/Package/page',
    method: 'get',
    params: parameter
  })
}
/**
 * 查询品质保障
 *
 * @author zyn
 */
export function QualityAssurancePage(parameter) {
  return api({
    url: '/QualityAssurance/page',
    method: 'get',
    params: parameter
  })
}
