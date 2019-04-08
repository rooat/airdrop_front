import React, { Component } from 'react';
import '../styles/bindAddr.css';
import { I18n } from './i18n'
import history from './history';
import { cuns, qus } from 'esn'
import Vcode from './Vcode'
import { Button, notification } from 'antd';
import { SortNumber, getQueryString } from './bindAddr'
import copy from 'copy-to-clipboard';
const bg_en = require('../images/inv_bg_en.png')
const bg_zh = require('../images/inv_bg.png')
const title_zh = require('../images/pc_title_bg.png')
const title_en = require('../images/pc_title_bg_en.png')

class CopyInput extends Component {
	render() {
		return (
			<div className={'input_container'}>
				<input className={'input_box'} type="text" style={{ width: '72%' }} disabled defaultValue={this.props.value} />
				<div className={'ipt_btn'} onClick={this.props.onClickBtn}>
					<span className={'ipt_text'}>{this.props.copyText}</span>
				</div>
			</div>
		)
	}
}

class Btn extends Component {
	render() {
		return (
			<div onClick={this.props.onDownload} className={'btn_div'} style={this.props.style}>
				<img src={this.props.path} style={{ height: '15px', width: '15px', marginRight: '10px' }} alt="" />
				<span>{this.props.platform}</span>
			</div>
		)
	}
}

class Bgimages extends Component {
	render() {
		return (
			<img src={this.props.bg} className="img_bind_bg" alt="" style={{ width: this.props.clientW, height: this.props.clientH }} />

		)
	}
}

class Number extends Component {
	render() {
		return (
			<div className={'number_div'}>
				<p className={'number_text_1'}>{this.props.text_1}</p>
				<p className={'number_text_2'}>{this.props.text_2}</p>
				<p className={'number_text_3'}>{this.props.text_3}</p>
			</div>
		)
	}
}
export default class Airdrop extends Component {
	constructor(props) {
		super(props)
		this.state = {
			p1: I18n.cn_p1,
			p2: I18n.cn_p2,
			p3: I18n.cn_p3,
			p4: I18n.cn_p4,
			p5: I18n.cn_p5,
			p6: I18n.cn_p6,
			p7: I18n.cn_p7,
			p8: I18n.cn_p8,
			p9: I18n.cn_p9,
			p10: I18n.cn_p10,
			p11: I18n.cn_p11,
			p12: I18n.cn_p12,
			p13: I18n.cn_p13,
			p14: I18n.cn_p14,
			p15: I18n.cn_p15,
			p16: I18n.cn_p16,
			p17: I18n.cn_p17,
			bg: bg_zh,
			titlebg:title_zh,
			clientW: document.body.clientWidth,
			clientH: document.body.clientHeight,
			code: "",
			lanText: 'English',
			getetzconValue: '0',//etz奖励数量
			invitenumValue: '0',//邀请人数
			serverCode: '',
		}
	}
	componentWillMount() {
		if (localStorage.getItem('language') === 'en') {
			this.setEn()
		} else {
			this.setZh()
		}
	}
	componentDidMount() {
		let code = qus('server_code')

		this.setState({
			serverCode: code
		})

		this.fetchInvite(code)
	}

	async fetchInvite(code) {
		// let url = 'http://openetz.org/airdropapi/api/v1/showinvite'
	//	const url = 'http://localhost:8080/api/v1/showinvite'
		const url = '/airdropapi/api/v1/showinvite'
		let res = await fetch(url, {
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
		if (resJson.status === "Success") {
			this.setState({
				getetzconValue: resJson.getetzcon,
				invitenumValue: resJson.invitenum,
			})
		} else {
			// console.log('Fail',resJson.failure_reason)

		}
	}
	setEn() {
		this.setState({
			p1: I18n.en_p1,
			p2: I18n.en_p2,
			p3: I18n.en_p3,
			p4: I18n.en_p4,
			p5: I18n.en_p5,
			p6: I18n.en_p6,
			p7: I18n.en_p7,
			p8: I18n.en_p8,
			p9: I18n.en_p9,
			p10: I18n.en_p10,
			p11: I18n.en_p11,
			p12: I18n.en_p12,
			p13: I18n.en_p13,
			p14: I18n.en_p14,
			p15: I18n.en_p15,
			p16: I18n.en_p16,
			p17: I18n.en_p17,
			bg: bg_en,
			titlebg:title_en,
			lanText: '中文',
		})
		localStorage.setItem('language', 'en')
	}
	setZh() {
		this.setState({
			p1: I18n.cn_p1,
			p2: I18n.cn_p2,
			p3: I18n.cn_p3,
			p4: I18n.cn_p4,
			p5: I18n.cn_p5,
			p6: I18n.cn_p6,
			p7: I18n.cn_p7,
			p8: I18n.cn_p8,
			p9: I18n.cn_p9,
			p10: I18n.cn_p10,
			p11: I18n.cn_p11,
			p12: I18n.cn_p12,
			p13: I18n.cn_p13,
			p14: I18n.cn_p14,
			p15: I18n.cn_p15,
			p16: I18n.cn_p16,
			p17: I18n.cn_p17,
			bg: bg_zh,
			titlebg:title_zh,
			lanText: 'English',
		})
		localStorage.setItem('language', 'zh')
	}

	onSwitchLan = () => {
		if (localStorage.getItem('language') === 'zh') {
			this.setEn()
		} else {
			this.setZh()
		}
	}

	toTele1 = () => {
		window.open('https://t.me/joinchat/IzbNDBBDlbHXDd69lO8_hQ', '_blank')
	}
	toTele2 = ()=>{
		window.open('https://t.me/blockoptions_com2', '_blank')

	}
	toTele3 = ()=>{
		window.open('https://t.me/blockoptions_com3', '_blank')

	}
	toTele4 = ()=>{
		window.open('https://t.me/blockoptions_com4', '_blank')

	}

	toTele5 = ()=>{
                window.open('https://t.me/blockoptions_com5', '_blank')

        }

	onCopyCode = () => {
		copy(`/${this.state.serverCode}`);
		this.onNotice()
	}
	onCopyUrl = () => {
		copy(`${window.location.origin}/airdrop/?code=${qus('server_code')}`)
		this.onNotice()
	}
	onNotice = () => {
		notification.open({
			message: 'Copy successfully',
			description: '',
		});
	}
	render() {
		let { clientW, clientH } = this.state
		// console.log("容器宽度:",clientW);
		// console.log("容器高度:",clientH);
		let lan_style = {}
		let containerDiv1_style = {}
		let reward_bg_style = {}
		let number_row_style = {}
		let title_style = {}
		let get_etz_div = {}
		let sugar_1_style = {}
		let span_text_1_style = {}
		let center_con_style = {}
		let tele_div = {}
		let tele_btn_style = {}
		let telbtn_style = {}
		if (clientW > 1366 && localStorage.getItem('language') === 'zh') {
			this.state.bg = require('../images/invitepc_bg_cn.jpg')
			this.state.titlebg = require('../images/pc_title_bg.jpg')
			clientH = 'auto'
			lan_style = {
				width: '100px',
				height: '40px'
			}
			containerDiv1_style = {
				top: '35%'
			}
			reward_bg_style = {
				width: '35%',
				marginLeft: '32%',
			}
			number_row_style = {
				width: '23%',
				left: '37%'
			}
			title_style = {
				width: '100%',
			}
			get_etz_div = {
				marginTop: '5%',
			}
			sugar_1_style = {
				top: '15%',
				left: '29%'
			}
			span_text_1_style = {
				top: '15%',
				left: '40%'
			}
			center_con_style = {
				width: '35%',
				left: '32%',
				top: '55%'
			}
			tele_div = {
				paddingBottom: '10px',
			}
			tele_btn_style = {
				width:'20%',
				marginLeft:'4px'
			}
			telbtn_style = {
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'center',
			}
		}
		if (clientW > 1366 && localStorage.getItem('language') === 'en') {
			this.state.bg = require('../images/invitepc_bg_en.jpg')
			this.state.titlebg = require('../images/pc_title_bg_en.jpg')
			clientH = 'auto'
			lan_style = {
				width: '100px',
				height: '40px'
			}
			containerDiv1_style = {
				top: '35%'
			}
			reward_bg_style = {
				width: '35%',
				marginLeft: '32%',
			}
			number_row_style = {
				width: '23%',
				left: '37%'
			}
			title_style = {
				width: '100%',
			}
			get_etz_div = {
				marginTop: '5%',
			}
			sugar_1_style = {
				top: '15%',
				left: '29%'
			}
			span_text_1_style = {
				top: '15%',
				left: '40%'
			}
			center_con_style = {
				width: '35%',
				left: '32%',
				top: '55%'
			}
			tele_div = {
				paddingBottom: '10px',
			}
			tele_btn_style = {
				width:'20%',
				marginLeft:'4px'
			}
			telbtn_style = {
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'center',
			}
		}
		return (
			<div>
				<Bgimages
					bg={this.state.bg}
					clientW={clientW}
					clientH={'auto'}
				/>
				<div className={'language_div'} style={lan_style}>
					<span style={{ color: '#FFFFFF', fontSize: '.45em' }} onClick={this.onSwitchLan}>{this.state.lanText}</span>
				</div>
				<div className="containerDiv1" style={containerDiv1_style}>
					<img src={require("../images/reward_bg.png")} className="reward_bg" style={reward_bg_style} alt="" />
					<div className={'number_row'} style={number_row_style}>
						<Number
							text_1={this.state.p13}
							text_2={this.state.invitenumValue}
							text_3={this.state.p15}
						/>
						<Number
							text_1={this.state.p14}
							text_2={this.state.getetzconValue}
							text_3={this.state.p16}
						/>
					</div>
				</div>
				<div className={'center_con'} style={center_con_style}>
					<div className={'get_etz_div'} style={get_etz_div}>
						<img src={this.state.titlebg} className={"title_bg"} style={title_style} alt="" />
						{/* <img src={require('../images/reward.png')} className={"sugar_1"} style={sugar_1_style} alt="" /> */}
						{/* <span className={'span_text_1'} style={span_text_1_style}>{this.state.p2}</span> */}
					</div>
					<div className={'tele_div'} style={tele_div}>
						<SortNumber
							number={'1'}
							text={this.state.p10}
						/>
					</div>

					<div style={telbtn_style}>
						<Btn
							path={require('../images/ten_iocn.png')}
							platform={'Group 1(Full)'}
							onDownload={this.toTele1}
							style={tele_btn_style}
						/>
						<Btn
							path={require('../images/ten_iocn.png')}
							platform={'Group 2(Full)'}
							onDownload={this.toTele2}
							style={tele_btn_style}
						/>
						<Btn
							path={require('../images/ten_iocn.png')}
							platform={'Group 3(Full)'}
							onDownload={this.toTele3}
							style={tele_btn_style}
						/>
						<Btn
							path={require('../images/ten_iocn.png')}
							platform={'Group 4(Full)'}
							onDownload={this.toTele4}
							style={tele_btn_style}
						/>
						<Btn
                                                    	path={require('../images/ten_iocn.png')}
                                                       	platform={'Group 5(New)'}
                                                       	onDownload={this.toTele5}
                                                       	style={tele_btn_style}
                                                />
					</div>

					<SortNumber
						number={'2'}
						text={this.state.p11}
					/>
					<CopyInput
						value={`/${qus('server_code')}`}
						onClickBtn={this.onCopyCode}
						copyText={this.state.p17}
					/>
					<SortNumber
						number={'3'}
						text={this.state.p12}
					/>
					<div><a href="https://www.youtube.com/watch?v=dFR1dw0rXog&feature=youtu.be" target="_blank">https://www.youtube.com/watch?v=dFR1dw0rXog&feature=youtu.be</a></div>
					<CopyInput
						value={`${window.location.origin}/airdrop/?code=${qus('server_code')}`}
						onClickBtn={this.onCopyUrl}
						copyText={this.state.p17}
					/>
				</div>
			</div>
		)
	}
}
