import ajax from './ajax'
const BASE_URL = '/api'

// 1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)
// 2、获取食品分类列表
export const reqCatgorys = () => ajax(BASE_URL+'/index_category')
//3. 获取商品列表
export const reqShops = (longitude, latitude) => ajax(BASE_URL+'/shops', {longitude, latitude})

//4. 获取短信验证码
export const reqSendcode = (phone) => ajax(BASE_URL+'sendcode',{phone})

//5. 根据短信验证码登录
export const reqSmsLogin = (phone,code) =>　ajax(BASE_URL+'/login_sms',{phone,code},'POST')

//6. 获取用户信息
export const reqUserInfo = () => ajax(BASE_URL+'/userinfo')

//7. 用户名密码登录
export const reqPwdLogin = (name,pwd,captcha) => ajax(BASE_URL+'/login_pwd',{name,pwd,captcha},'POST')

//8. 退出登录
export const logout = () => ajax(BASE_URL+'/logout')
