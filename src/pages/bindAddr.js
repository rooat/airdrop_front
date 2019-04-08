import React, { Component } from 'react';
import '../styles/bindAddr.css';
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

class SortNumber extends Component {
	render(){
		return(
			<div style={{flexDirection:'row',display:'flex',marginTop:'16px'}}>
				<div className={'sort_icon'}>
					<span style={{color:'#8A00F4',fontSize:'1em'}}>{this.props.number}</span>
				</div>
				<div>
					<span style={{color:'#fff',fontSize:'.9em',textAlign:'center'}}>{this.props.text}</span>
          <span style={{color:'yellow'}}>{this.props.getbo}</span>
          <span style={{color:'#fff'}}>{this.props.ands}</span>
          <span style={{color:'yellow'}}>{this.props.getetz}</span>
          <a style={{color:'yellow',fontSize:'.9em',textAlign:'center'}} href="http://blockoptions.com/">{this.props.texturl}</a>
          <br/><span style={{color:'#fff',fontSize:'.9em',textAlign:'center'}}> {this.props.youtube}</span>
           <a style={{color:'yellow'}} href="https://www.youtube.com/watch?v=dFR1dw0rXog&feature=youtu.be" target="_blank">{this.props.youtubeurl}</a>
				</div>
			</div>
		)
	}
}

class Btn extends Component{
	render(){
		return(
			<div onClick={this.props.onDownload} className={'btn_div'}>
				<img src={this.props.path} style={{height:'15px',width:'15px',marginRight:'10px'}} alt=""/>
				<span>{this.props.platform}</span>
			</div>
		)
	}
}

class BindAddr extends Component{
	constructor(props){
		super(props)
		this.state={
			clientW: document.body.clientWidth,
			clientH: document.body.clientHeight,
			lanText: "中文",
			p1: I18n.en_p2,
			p2: I18n.en_p3,
			p3: I18n.en_p4,
			p4: I18n.en_p5,
			p5: I18n.en_p6,
			p6: I18n.en_p7,
			p7: I18n.en_p8,
      p12: I18n.en_p12,
      p18: I18n.en_p18,
      p19: I18n.en_p19,
      p20: I18n.en_p20,
      p21: I18n.en_p21,
			bgsrc: require("../images/bg_en.png"),
      titlebg : require('../images/title_bg_en.png'),
			marginTopStyle: '20px',
			originVCode: '',
			serverCode: '',
		}
	}

	componentWillMount(){
		localStorage.setItem('language', 'en')
	    let code = getQueryString('code')

	    this.setState({
	      serverCode: code || 'tQnu7dSVtl',
	    })
	}


	onDownloadChrome = () => {
		window.open('https://goo.gl/FQi5yo')
	}
	onDownloadFired = () => {
		window.open('https://addons.mozilla.org/zh-CN/firefox/addon/goetz/?src=search')
	}
	onChangeVCode = (val) => {
		this.setState({
			originVCode: val
		})
	}
	onSubmitBtn = () => {
		const { originVCode } = this.state
		let addr = document.getElementById("addr_id").value
	//	let v_code = document.getElementById('v_code_id').value//输入的验证码

	    if(/^0x(\d|\w{40})$/.test(addr)){
  		  // if(originVCode.toLowerCase() !== v_code.toLowerCase()){
  		  // 	notification.open({
  		  //       message: 'Verification code error!',
  		  //       description: '验证码不正确!',
  	    //     })
  	    //     return
  		  // }else{
  		  // 	//验证码正确
  		  // 	this.onSubFetch(addr)
  		  // }
        this.onSubFetch(addr)
	    }else{
	      notification.open({
	        message: 'invalid wallet address!',
	        description: '钱包地址无效!',
	      })
	    }
	}

	async onSubFetch(addr){
		// let url = 'http://openetz.org/airdropapi/api/v1/bindwallet'
    const url = '/airdropapi/api/v1/bindwallet'
	//	const url = 'http://localhost:8080/api/v1/bindwallet'
	    let res = await fetch(url,{
	      method: 'POST',
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json',
	      },
	      body: JSON.stringify({
	        address: addr,
	        code: this.state.serverCode
	      })
	    })

	    let resJson = await res.json()
	    if(resJson.status === "Success") {
	        cuns('server_code',`${resJson.code}`)
	        history.push(`/airdrop/activity`)
	    }else{
	    	notification.open({
		        message: 'Error',
		        description: JSON.stringify(resJson.failure_reason),
	      	})
	    }
	}

	onSwitchLan = () => {
		if (localStorage.getItem('language') === 'zh'){
			this.setState({
				lanText:'中文',
				p1: I18n.en_p2,
				p2: I18n.en_p3,
				p3: I18n.en_p4,
				p4: I18n.en_p5,
				p5: I18n.en_p6,
				p6: I18n.en_p7,
				p7: I18n.en_p8,
        p12: I18n.en_p12,
        p18: I18n.en_p18,
        p19: I18n.en_p19,
        p20: I18n.en_p20,
        p21: I18n.en_p21,
				bgsrc: require("../images/bg_en.png"),
        titlebg : require('../images/title_bg_en.png'),
				marginTopStyle: '10px'
			})
			localStorage.setItem('language', 'en')
		}else{
			this.setState({
				lanText:'English',
				p1: I18n.cn_p2,
				p2: I18n.cn_p3,
				p3: I18n.cn_p4,
				p4: I18n.cn_p5,
				p5: I18n.cn_p6,
				p6: I18n.cn_p7,
				p7: I18n.cn_p8,
        p12: I18n.cn_p12,
        p18: I18n.en_p18,
        p19: I18n.cn_p19,
        p20: I18n.cn_p20,
        p21: I18n.cn_p21,
				bgsrc: require("../images/bg.png"),
        titlebg : require('../images/title_bg.png'),
				marginTopStyle: '20px',
			})
			localStorage.setItem('language', 'zh')
		}
	}
	render(){
		const { clientW, clientH } = this.state
		// console.log("容器宽度:",clientW);
		// console.log("容器高度:",clientH);
		let lan_style = {}
		let title_style = {}
		let sugar_style = {}
		let containerDiv_style = {}
		let span_text_style = {}
    let titlepic_style = {}
		if(clientW > 1366 && localStorage.getItem('language') === 'zh'){
			this.state.bgsrc = require('../images/pc_bg_cn.jpg')
      this.state.titlebg = require('../images/pc_title_bg.jpg')
			lan_style = {
				width: '100px',
				height:'40px'
			}
			title_style = {
				width: '100%'
			}
			sugar_style = {
				width: '2em',
				height:'2em',
                left:'26%'
			}
			containerDiv_style = {
				top: '67%',
				width:'20%',
				left:'38%',
			}
			span_text_style = {
				left:'38%',
				fontSize:'1.2em'
			}
      titlepic_style = {
        position: 'absolute',
        top: '45%',
        left: '30%',
      }
		}
		if(clientW > 1366 && localStorage.getItem('language') === 'en'){
			this.state.bgsrc = require('../images/pc_bg_en.jpg')
      this.state.titlebg = require('../images/pc_title_bg_en.jpg')
			lan_style = {
				width: '100px',
				height:'40px'
			}
			title_style = {
				width: '100%'
			}
			sugar_style = {
				width: '2em',
				height:'2em',
                left:'26%'
			}
			containerDiv_style = {
				top: '67%',
				width:'20%',
				left:'38%',
			}
			span_text_style = {
				left:'38%',
				fontSize:'1.2em'
			}
      titlepic_style = {
        position: 'absolute',
        top: '45%',
        left: '30%',
      }
		}

		return(
			<div>
				<img src={this.state.bgsrc} className="img_bind_bg" alt="" style={{width:'100%',height:'auto'}}/>
				<div className={'language_div'} style={lan_style}>
					<span style={{color:'#FFFFFF',fontSize:'.45em'}} onClick={this.onSwitchLan}>{this.state.lanText}</span>
				</div>
        <div className="titlepicDiv" style={titlepic_style}>
          <img src={this.state.titlebg} className={"title_bg"} style={title_style} alt=""/>
          {/* <img src={require('../images/sugar.png')} className={"sugar"} style={sugar_style} alt=""/> */}
          {/* <span className={'span_text'} style={span_text_style}>{this.state.p1}</span> */}
        </div>
				<div className="containerDiv" style={containerDiv_style}>

            <SortNumber
  						number={'1'}
  						text={this.state.p2}
              getbo="10 BO"
              ands =" and "
              getetz= "0.01 ETZ"
  					/>
					<div className={'btn_container'}>
						<Btn
							path={require('../images/google.png')}
							platform={'GoETZ'}
							onDownload={this.onDownloadChrome}
						/>
						<Btn
							path={require('../images/firefox.png')}
							platform={'GoETZ'}
							onDownload={this.onDownloadFired}
						/>
					</div>
					<SortNumber
						number={'2'}
            text={this.state.p12}
            texturl={this.state.p20}
            youtube={this.state.p19}
            youtubeurl={this.state.p21}
					/>


					<input type="text" className={'addr_input'} id={'addr_id'} placeholder={this.state.p4}/>
					{/* <SortNumber
						number={'3'}
						text={this.state.p5}
					/> */}
					{/* // <div style={{marginTop:'15px',display:'flex',justifyContent:'space-between',width:'100%'}}>
					// 	<input type="text" className={'code_input'} id={'v_code_id'} placeholder={this.state.p5}/>
					// 	<Vcode
				  //           length={4}
				  //           onChange={this.onChangeVCode}
				  //           width={130}
					// 		height={45}
				  //       />
					// </div> */}
			        <div className={'sub_btn'} onClick={this.onSubmitBtn}>
			        	<span style={{color:'#8400F4',fontSize:'1em'}}>{this.state.p6}</span>
			        </div>

			        <div className={'bottom_text'} style={{marginTop:this.state.marginTopStyle}}>
			        	<span style={{color:'#E2CFFF',fontSize:'1.2em',textAlign:'center'}}>
		        			{this.state.p7}
						</span>
			        </div>
				</div>
			</div>
		)
	}
}

export {
	SortNumber,
	BindAddr,
	Btn,
	getQueryString
}
