<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay = !loginWay">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay = !loginWay">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form>
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!judgePhone" class="get_verification" :class="{color_blk: judgePhone}" @click="getSendcode">
                {{computedTime>0? `已发送${computedTime}` : '获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="密码" v-model="pwd">
                <div class="switch_button off">
                  <div class="switch_circle"></div>
                  <span class="switch_text">...</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" ref="captcha" @click="getCaptcha">
              </section>
            </section>
          </div>
          <mt-button class="login_submit" @click="login">登录</mt-button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </span>
    </div>
  </div>
</template>

<script>
  import {reqSendcode,reqSmsLogin,reqPwdLogin} from "../../api";
  import {MessageBox} from 'mint-ui'
  export default {
    data() {
      return {
        loginWay: true,   //登录方式  true为短信登录
        phone: '',
        code: '',
        computedTime: 0,
        name: '',
        pwd: '',
        captcha: '',
        title: ''
      }
    },
    computed:{
      judgePhone(){//手机号是否正确
        const {phone} = this
        return /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/.test(phone)
      }
    },
   methods:{
      getCaptcha(){
        this.$refs.captcha.src = 'http://localhost:4000/captcha?' + Date.now()
      },

     async getSendcode(){
       //修改定时器
       if(this.computedTime===0) {
         this.computedTime = 30
         this.intervalId = setInterval(()=>{
           this.computedTime--
           if(this.computedTime===0){
             clearInterval(this.intervalId)
           }
         },1000)
         //发送ajax请求
         const result = await reqSendcode(this.phone)
         if (result.code === 1) {  //失败
           this.computedTime = 0
           clearInterval(this.intervalId)
           this.intervalId = 0
         }
       }
     },

     async login(){
       let ajaxState = false  //是否已经发送过ajax请求
       let result
       if(this.loginWay){
         const {phone,judgePhone,code} = this
         if(!this.judgePhone){
           MessageBox.alert('手机号错误')
         }else if (!/^\d{6}$/.test(code)) {
           MessageBox.alert('短信验证码必须为6位数')
         }
         if(judgePhone && /^\d{6}$/.test(code)){
           result = await reqSmsLogin(phone,code)
           ajaxState = true
         }
       }else {
         const {name,pwd,captcha,title} = this
         if (!name) {//用户名不正确
           this.setTitle('用户名不正确')
         } else if (!pwd) {//密码不正确
           this.setTitle('密码不正确')
         } else if (!captcha) {//验证码不正确
           this.setTitle('验证码不正确')
         }
         result = await reqPwdLogin(name,pwd,captcha)
         ajaxState = true
       }
       if(ajaxState){
         if(result.code===0){  //成功
           const userInfo = result.data
           this.$store.dispatch('setUserInfo',userInfo)
           this.$router.replace('/mine')
         }
         else {
           if(this.loginWay){
             MessageBox.alert('登录失败,验证码错误')
           }else{
             this.setTitle('验证码不正确')
           }
         }
         ajaxState = false
       }
     },
     setTitle(title){
       MessageBox.alert(title).then(
         action =>{
           this.getCaptcha()
         }
       )
     }
   }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.color_blk
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.translate_x
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
