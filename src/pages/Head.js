import React, { Component } from 'react';

import './App.css';
import { I18n } from './i18n'
export default class Head extends Component{
	constructor(props){
		super(props)
		this.state={
			lanText: 'English',
			language_p1_zh: I18n.p1_zh
		}
		localStorage.setItem('language','zh')
	}
	componentWillMount(){

	}
	onSwitchLan = () => {
		
	    if(localStorage.getItem('language') === 'zh'){
	      this.setState({
	        lanText: 'English',
	        language_p1_zh: I18n.p1_zh
	      })
	      localStorage.setItem('language','en')
	    }else{
	      this.setState({
	        lanText: '中文',
	        language_p1_zh: I18n.p1_en
	      })
	      localStorage.setItem('language','zh')
	    }
	    this.props.switchLan()
	}
	render(){
		return(
			<div>
				<img src={require("./img2.jpg")} className="img2" alt=""/>
	        	<img src={require('./img1.png')} className="img1" alt=""/>
	        	<div className="headText">
		        	<span className="lanTextStyle" onClick={this.onSwitchLan}>{this.state.lanText}</span>
		  			  	<p className="text1">
			          		{this.state.language_p1_zh}
			        	</p>
			       
	        	</div>
			</div>
		)
	}
}