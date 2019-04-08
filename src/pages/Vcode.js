import React from 'react';

class Vcode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id || `${new Date().getTime()}_${Math.random().toFixed(4)}`, // 需要一个唯一的ID，因为vcode要直接操作dom
      width: this.props.width || 150,   // vcode宽度
      height: this.props.height || 40,  // vcode高度
      len: this.props.length || 4,      // 生成几位code
      style: (() => {                   // vcode容器样式
        const a = {
          position: 'relative',
          backgroundColor: '#fff',
          overflow: 'hidden',
          width: this.props.width ? `${this.props.width}px` : '150px',
          height: this.props.height ? `${this.props.height}px` : '40px',
          cursor: 'pointer',
          verticalAlign: 'middle',
          userSelect: 'none',
        };
        if (this.props.style) {
          return Object.assign({}, a, this.props.style);
        }
        return a;
      })(),
      options: (() => {     // 初始化参数
        const a = {
          codes: [          // 所有可能出现的字符
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
            'o', 'p', 'q', 'r', 's', 't', 'x', 'u', 'v', 'y', 'z', 'w', 'n',
            'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
          ],
          fontSizeMin: 22,  // 字体尺寸最小值
          fontSizeMax: 26,  // 字体尺寸最大值
          fonts: [          // 可能的字体
            'Times New Roman', 'Georgia', 'Serif', 'sans-serif', 'arial', 'tahoma', 'Hiragino Sans GB',
          ],
          lines: 18,         // 生成多少根线
          lineHeightMin: 1, // 线的粗细最小值
          lineHeightMax: 3, // 线的粗细最大值
          lineWidthMin: 10, // 线的长度最小值
          lineWidthMax: 60, // 线的长度最大值
        };
        if (this.props.options) {
          return Object.assign({}, a, this.props.options);
        }
        return a;
      })(),
    };
  }

  /** 组件初始化完毕时触发 **/
  componentDidMount() {
    this.onDraw()
  }

  /** 组件参数改变 **/
  componentWillReceiveProps(nextP, nextS) {
    
    if(this.props.width !== nextP.width || this.props.height !== nextP.height) {
      this.setState({
        width: nextP.width,
        height: nextP.height,
      });
    }
  }

  /** 用户点击的验证码图片 **/
  onClick() {
    const div = document.getElementById(this.state.id);
    div.innerHTML = '';
    this.onDraw();
  }

  /** 随机生成一个Code的CSS样式 **/
  codeCss(uW,i) {
    return [
    `font-size:${this.randint(this.state.options.fontSizeMin,
        this.state.options.fontSizeMax)}px`,
      `color:${this.randomColor(30,200)}`,
      'position: absolute',
      `left:${this.randint(uW * i, ((uW * i) + uW) - (uW / 2))}px`,
      'top:50%',
      `transform:rotate(${this.randint(-15, 15)}deg) translateY(-50%)`,
      `-o-transform:rotate(${this.randint(-15, 15)}deg) translateY(-50%)`,
      `-ms-transform:rotate(${this.randint(-15, 15)}deg) translateY(-50%)`,
      `-moz-transform:rotate(${this.randint(-15, 15)}deg) translateY(-50%)`,
      `-webkit-transform:rotate(${this.randint(-15, 15)}deg) translateY(-50%)`,
      `font-family:${this.state.options.fonts[this.randint(0,
        this.state.options.fonts.length - 1)]}`,
      'font-weight:bold',
      'z-index:0',
    ].join(';');
  }

  //随机生成color
  randomColor(min, max) {
    var r = this.randomNum(min, max);
    var g = this.randomNum(min, max);
    var b = this.randomNum(min, max);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
  randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  /** 随机生成一条线的CSS样式 **/
  lineCss() {
    return [
        'position: absolute',
        'z-index:999',
        `opacity:${this.randint(1, 8) / 10}`,
        `width:${this.randint(this.state.options.lineWidthMin, this.state.options.lineWidthMax)}px`,
        `height:${this.randint(this.state.options.lineHeightMin,
          this.state.options.lineHeightMax)}px`,
        `background:${this.randomColor(10, 210)}`,
        `left:${this.randint(-this.state.options.lineWidthMin, this.state.width)}px`,
        `top:${this.randint(0, this.state.height)}px`,
        `transform:rotate(${this.randint(-120, 120)}deg)`,
        `-o-transform:rotate(${this.randint(-120, 120)}deg)`,
        `-ms-transform:rotate(${this.randint(-120, 120)}deg)`,
        `-moz-transform:rotate(${this.randint(-120, 120)}deg)`,
        `-webkit-transform:rotate(${this.randint(-120, 120)}deg)`,
        `font-family:${this.state.options.fonts[this.randint(0,
          this.state.options.fonts.length - 1)]}`,
        `font-weight:${this.randomNum(200,600)}`,
      ].join(';');
  }
  pointCss(){
    return [
        'position: absolute',
        'z-index:999',
        'height:4px',
        'width:4px',
        'border-radius:100px',
        `opacity:${this.randint(1, 8) / 10}`,
        `background:${this.randomColor(40, 180)}`,
        `left:${this.randint(-this.state.options.lineWidthMin, this.state.width)}px`,
        `top:${this.randint(0, this.state.height)}px`,
      ].join(';');
  }

  onDraw(value) {
    let c = '';                                             // 存储生成的code
    const div = document.getElementById(this.state.id);
    div.innerHTML = '';    
    //生成code值
    const uW = this.state.width / this.state.len;        // 每个字符占的宽度

    for (let i = 0; i < this.state.len; i++) {
      const dom = document.createElement('span');
      const codeCss = this.codeCss(uW,i);
      dom.style.cssText = codeCss;
      const temp = this.state.options.codes[(Math.round(Math.random() * (this.state.options.codes.length - 1)))];
      dom.innerHTML = temp;
      c = `${c}${temp}`;
      div.appendChild(dom);
    }

    // 生成线条
    for (let i = 0; i < this.state.options.lines; i++) {
      const dom = document.createElement('div');

      dom.style.cssText = this.lineCss();

      div.appendChild(dom);
    }

    //生成点
    for (let i = 0; i < 50; i++) {
      const dom = document.createElement('div');

      dom.style.cssText = this.pointCss();

      div.appendChild(dom);
    }

    if (this.props.onChange) {
      this.props.onChange(c);
    }


  }

  /** 生成范围随机数 **/
  randint(n, m) {
    const c = (m - n) + 1;
    const num = (Math.random() * c) + n;
    return Math.floor(num);
  }

  render() {
    return (
      <div
        id={this.state.id}
        style={this.state.style}
        className={this.props.className}
        onClick={() => this.onClick()}
      />
    );
  }
}

export default Vcode;
