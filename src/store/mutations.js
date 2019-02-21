import {
  REQURE_ADDRESS,
  RECEVIE_CATGORYS,
  RECEVIE_SHOPS,
  REVEVIE_USERINFO,
  RESET_USERINFO
} from './mutation-types'

export default {
  [REQURE_ADDRESS] (state,{address}){
    state.address = address
  },
  [RECEVIE_CATGORYS] (state,{categorys}){
    state.categorys = categorys
  },
  [RECEVIE_SHOPS] (state,{shops}){
    state.shops = shops
  },
  [REVEVIE_USERINFO] (state,{userInfo}){
    state.userInfo = userInfo
  },
  [RESET_USERINFO] (state){
    state.userInfo = ''
  },
}
