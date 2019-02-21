import {
  REQURE_ADDRESS,
  RECEVIE_CATGORYS,
  RECEVIE_SHOPS,
  REVEVIE_USERINFO,
  RESET_USERINFO
} from './mutation-types'
import {
  reqAddress,
  reqCatgorys,
  reqShops,
  reqSendcode,
  reqSmsLogin,
  reqUserInfo,
  logout
} from '../api'

export default {
  async getAddress({commit,state}){
    //获取state的经纬状态值
    const geohash = state.latitude+ ',' + state.longitude
    //发送ajax请求并保存返回数据
    const result = await reqAddress(geohash)
    //发布mutation更新state状态
    if(result.code===0){
      const address = result.data
      commit(REQURE_ADDRESS,{address})
    }
  },

  async getCategorys({commit}){
    const result = await reqCatgorys()
    if(result.code===0){
      const categorys = result.data
      commit(RECEVIE_CATGORYS,{categorys})
    }
  },

  async getShops({commit,state}){
    const result = await reqShops(state.longitude,state.latitude)
    if(result.code===0){
      const shops = result.data
      commit(RECEVIE_SHOPS,{shops})
    }
  },

  //同步更新用户信息
  setUserInfo({commit},userInfo){
    commit(REVEVIE_USERINFO,{userInfo})
  },

  //异步请求得到用户信息
  async getUserInfo({commit}){
    const result = await reqUserInfo()
    if(result.code===0){
      const userInfo = result.data
      commit(REVEVIE_USERINFO,{userInfo})
    }
  },

  //异步退出
  async logout({commit}){
    const result = await logout()
    if(result.code===0){
      commit(RESET_USERINFO)
    }
  }
}
