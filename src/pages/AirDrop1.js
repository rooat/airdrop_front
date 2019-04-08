import React, { Component } from 'react';
import './App.css';
import {getQueryString} from './BindAddress'
import Clipboard from 'react-clipboard';
import { I18n } from './i18n'
import history from './history';
import {qus} from 'esn'
import copy from 'copy-to-clipboard';
import { Button, notification } from 'antd';
class AirDrop extends Component {
  constructor(props){
    super(props)
    this.state = {
      code:"",
      p2_zh: I18n.p2_zh,
      p3_zh: I18n.p3_zh,
      p4_zh: I18n.p4_zh,
      p5_zh: I18n.p5_zh,
      p6_zh: I18n.p6_zh,
      p7_zh: I18n.p7_zh,
      p8_zh: I18n.p8_zh,
      lanText: 'English',
      language_p1_zh: I18n.p1_zh,
      getetzconValue: '0',
      invitenumValue: '0',
    }
    localStorage.setItem('language','zh')
    this.onSuccess = this.onSuccess.bind(this);
    this.getText = this.getText.bind(this);
  }

  componentDidMount(){
      // let code = getQueryString('code')
      let code = qus('code')
      this.setState({
        code
      })

      localStorage.setItem('language','zh')

      this.fetchInvite(code)

  }

  componentDidMount(){
    let w = document.body.clientWidth
    if(w < 750){
      let leftW = (w-72)/2
      document.getElementById('img1').style.left = leftW
    }
  }

  async fetchInvite(code){
    let url = '/airdropapi/api/v1/showinvite'
    let res = await fetch(url,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: code
      })
    })


    let resJson = await res.json()
    if(resJson.status === "Success") {
      this.setState({
        getetzconValue: resJson.getetzcon,
        invitenumValue: resJson.invitenum,
      })
    }else{
      // console.log('Fail',resJson.failure_reason)

    }


  }
  onSuccess() {

  }

  getText() {
    return 'I\'ll be copied';
  }

  OpenNewTarget = () => {
    window.open('https://t.me/joinchat/IzbNDBBDlbHXDd69lO8_hQ','_blank')
  }

  onSwitchLan = () => {
    if(localStorage.getItem('language') === 'zh'){
      this.setState({
        p2_zh: I18n.p2_zh,
        p3_zh: I18n.p3_zh,
        p4_zh: I18n.p4_zh,
        p5_zh: I18n.p5_zh,
        p6_zh: I18n.p6_zh,
        p7_zh: I18n.p7_zh,
        p8_zh: I18n.p8_zh,
        lanText: 'English',
        language_p1_zh: I18n.p1_zh
      })
      localStorage.setItem('language','en')
    }else{
      this.setState({
          p2_zh: I18n.p2_en,
          p3_zh: I18n.p3_en,
          p4_zh: I18n.p4_en,
          p5_zh: I18n.p5_en,
          p6_zh: I18n.p6_en,
          p7_zh: I18n.p7_en,
          p8_zh: I18n.p8_en,
          lanText: '中文',
          language_p1_zh: I18n.p1_en
        })
      localStorage.setItem('language','zh')
    }
  }

  onClick1 = () => {
    copy(`/${this.state.code}`);
    this.onNotice()
  }
  onNotice = () => {
    notification.open({
      message: 'Copy successfully',
      description: '复制成功',
    });
  }
  onClick2 = () => {
    copy(`${window.location.origin}/airdrop/?code=${qus('code')}`)
    this.onNotice()
  }
  render() {
    const { p2_zh,p3_zh, p4_zh, p5_zh, p6_zh, p7_zh, p8_zh, getetzconValue, invitenumValue } = this.state
    return (
      <div className="App">
          <img src={require("./img2.jpg")} className="img2" alt=""/>
          <img src={require('./img1.png')} className="img1" alt="" id="img1"/>
          <div className="headText">
             <span className="lanTextStyle" onClick={this.onSwitchLan}>{this.state.lanText}</span>
              <p className="text1">
                  {this.state.language_p1_zh}
              </p>

          </div>
        <div className="container">
          <div className="rowline">
            <div className="rowline1">
              <span className="rowline1_p">1</span>
            </div>
            <p className="rowline1text">
              {p2_zh}
              <a className="aStyle" onClick={this.OpenNewTarget}>Telegram</a>
              {p3_zh}
            </p>
          </div>

          <div className="rowline">
            <div className="rowline1">
              <span className="rowline1_p">2</span>
            </div>
            <p className="rowline1text">
              {p4_zh}
              <a className="aStyle">ETZ</a>
            </p>
          </div>
          <div className="inputContaier">
            <input className="mainLeft" type="text" id="codeUrl" disabled value={`/${qus('code')}`}/>
            <div className="mainBtn" id="copyCode1" onClick={this.onClick1}>
              <span className="btnText">{p5_zh}</span>
            </div>
          </div>

          <div className="rowline">
            <div className="rowline1">
              <span className="rowline1_p">3</span>
            </div>
            <p className="rowline1text">
              {p6_zh}<a className="aStyle">ETZ</a>
            </p>
          </div>
          <div className="inputContaier">
            <input className="mainLeft" type="text" id="codeUrl1" disabled value={`${window.location.origin}/airdrop/?code=${qus('code')}`}/>
            <div className="mainBtn" id="copyCode1" onClick={this.onClick2}>
              <span className="btnText">{p5_zh}</span>
            </div>
          </div>
        </div>

        <div className="boxContainer">
          <div className="box box2">
            <p className="box1_style_1">{p8_zh}</p>
            <p className="box1_style_2">{getetzconValue}</p>
          </div>
          <div className="box box1">
            <p className="box1_style_1">{p7_zh}</p>
            <p className="box1_style_2">{invitenumValue}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default AirDrop;
