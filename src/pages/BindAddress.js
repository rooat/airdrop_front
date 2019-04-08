import React, { Component } from 'react';
import './App.css';
import { I18n } from './i18n'
import history from './history';
import {cuns} from 'esn'
import Vcode from './Vcode'
import { Button, notification } from 'antd';
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}


class BindAddress extends Component {
  constructor(props){
    super(props)
    this.state = {
      code: '',
      lanText: 'English',
      language_p1_zh: I18n.p1_zh,
      p9_zh: I18n.p9_zh,
      p10_zh: I18n.p10_zh,
      vcode: '',
      subBtnTouable: false
    }
  }

  componentWillMount(){
    let code = getQueryString('code')

    this.setState({
      code: code || 'tQnu7dSVtl',
    })



  }

  componentDidMount(){
    let w = document.body.clientWidth
    if(w < 750){
      let leftW = (w-72)/2
      document.getElementById('img1').style.left = leftW
    }else{

    }

  }

   async onFetch(addr){
    // let url = '/airdropapi/api/v1/bindwallet'
    let url = '/airdropapi/api/v1/bindwallet'
    let res = await fetch(url,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: addr,
        code: this.state.code
      })
    })

    let resJson = await res.json()
    if(resJson.status === "Success") {
        cuns('code',`${resJson.code}`)
        history.push(`/airdrop/activity`)
    }else{
      alert(JSON.stringify(resJson.failure_reason))
    }
  }

  onSubmit = () => {
    let addr = document.getElementById("token").value
    if(/^0x(\d|\w{40})$/.test(addr)){
      this.onFetch(addr)
    }else{
      notification.open({
        message: 'invalid wallet address!',
        description: '钱包地址无效!',
      })
    }



  }
  onSwitchLan = () => {

      if(localStorage.getItem('language') === 'zh'){
        this.setState({
          lanText: 'English',
          language_p1_zh: I18n.p1_zh,
          p9_zh: I18n.p9_zh,
          p10_zh: I18n.p10_zh,
        })
        localStorage.setItem('language','en')
      }else{
        this.setState({
          lanText: '中文',
          language_p1_zh: I18n.p1_en,
          p9_zh: I18n.p9_en,
          p10_zh: I18n.p10_en,
        })
        localStorage.setItem('language','zh')
      }
  }

  onChangeVCode = (value) => {
    this.setState({
      vcode: value
    })
  }
  onSubVrify = () => {
    const { vcode, subBtnTouable} = this.state

    let viptCode = document.getElementById('code_input').value

    if(vcode.toLowerCase() !== viptCode.toLowerCase()){
      notification.open({
        message: 'Verification code error!',
        description: '验证码不正确!',
      })
      this.setState({
        subBtnTouable: false
      })
      return
    }else{
      notification.open({
        message: 'Verification code error!',
        description: '验证码正确!',
      })
      this.setState({
        subBtnTouable: true
      })
    }
  }

  onSubmitAlert = () => {
    notification.open({
        message: 'input verification code!',
        description: '请输入验证码!',
    })
  }
  render(){
    const { p9_zh, p10_zh, subBtnTouable} = this.state
  	return(
  		<div className="App">
         <img src={require("./img2.jpg")} className="img2" alt=""/>
          <img src={require('./img1.png')} className="img1" alt="" id="img1"/>
          <div className="headText">
            <span className="lanTextStyle" onClick={this.onSwitchLan}>{this.state.lanText}</span>
              <p className="text1">
                  {this.state.language_p1_zh}
              </p>
          </div>
          <Vcode
            length={6}
            onChange={this.onChangeVCode}
          />
          <input type="text" id="code_input"/>
          <button id="my_button" onClick={this.onSubVrify}>验证</button>
	        <input type="text" placeholder={p9_zh} className="iptText" id="token" />
	        <input type="button" value={p10_zh} className="iptbtn" id="tokenbtn" onClick={subBtnTouable ? this.onSubmit : this.onSubmitAlert }/>
  		</div>
  	)
  }
}

export {
  getQueryString,
  BindAddress

}
