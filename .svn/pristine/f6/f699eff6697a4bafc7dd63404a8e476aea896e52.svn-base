
// 设置audio的组件函数
function AddTamplat (appendEle,src,allImages) {
	this.appendEle = appendEle
  this.allImages = allImages
	this.state = {
		src,
		eleId:'',
		controlId:'',
		thisAudio:'',
		playFlag:true,    //  暂停和播放的控制
		duration:0,       //  获取整个音频的时间/秒
		durationNum:0,    //  获取和设置range的时间
		durationTime:'00:00',
		PlayDurationTime:'00:00',
		mutesFlag:true,     //  是否静音
		readyStateFlag: false,    // 音频初始化
		Interval:''         ,//  实时监视播放时间
	}
}
/*
 ** randomWord 产生任意长度随机字母数字组合
 ** 用法  randomWord(leng);规定位数
 * arr变量可以把其他字符加入，如以后需要小写字母，直接加入即可
 */
AddTamplat.prototype.randomWord = function (leng) {
    var range = leng,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a','b','c','d','e','f','g','h','i','j','k','l','n','m','o','p','q','r','s','t','u','v','w','y','z','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    // 随机产生开头是字母的值
	let exp = /^[a-zA-Z]/
	var str = ""
	for (var i = 0; i < range; i++) {
		let pos = Math.round(Math.random() * (arr.length - 1));
		str += arr[pos];
	}
	if (!exp.test(str)) {
		str = str.replace(/^[0-9]/,letter[Math.round(Math.random() * (letter.length - 1))])
	}
	return str;
}
// 把所有的state挂载到this下并实现数据观察
AddTamplat.prototype.ApplyThis = function () {
	let data = this.state
	for (let key in data) {
		let val = data[key]
		this[key] = data[key]
		Object.defineProperty(this,key,{
			enumerable:true,
			get(){
				return val
			},
			set(newVal){
				if (newVal!=val){
					val = newVal
					if (key == 'durationTime'||key == 'PlayDurationTime') {
						document.getElementById(this.controlId).children[2].innerText = this.PlayDurationTime +'/'+ this.durationTime
					}else if (key == 'durationNum') {
						document.getElementById(this.controlId).children[1].children[0].value = this.durationNum
					}else if (key == 'playFlag'){
						if (this[key]) {
							document.getElementById(this.controlId).children[0].innerHTML = `<img src="${this.allImages.play}" alt="">`
						}else{
							document.getElementById(this.controlId).children[0].innerHTML = `<img src="${this.allImages.stop}" alt="">`
						}
					}else if (key == 'mutesFlag'){
						if (this[key]) {
							document.getElementById(this.controlId).children[3].innerHTML = `<img src="${this.allImages.trumpet}" alt="" style="height:18px;width:16px;">`
						}else{
							document.getElementById(this.controlId).children[3].innerHTML = `<img src="${this.allImages.ziyuan}" alt=""  style="height:18px;width:16px;">`
						}
					}
				}
			}
		})
	}
}
// 构造模板
AddTamplat.prototype.tamplat = function () {
	this.ApplyThis()
	this.eleId = this.randomWord(11)
	this.controlId = this.randomWord(11)
	return `<div class="audio_wrap">
      <audio id="${this.eleId}" style="visibility: hidden;"  >
        <source src="" type="audio/ogg">
        <source src="" type="audio/mpeg">
        您的浏览器不支持 audio 元素。
      </audio>
      <div class="control_wrap " id="${this.controlId}" >
        <div class="playImg">
          <img src="${this.allImages.play}" alt="">
        </div>
		<!--播放进度控制-->
        <div class="schedule" >
		    <input type="range" max="${this.duration}" min="0" value="0" />
        </div>
		<!--播放时间显示-->
        <div class="timeDis">${this.PlayDurationTime +'/'+ this.durationTime}</div>
		<!--静音-->
        <div class="mute" @click="mutes">
           <img src="${this.allImages.trumpet}" alt="" style="width:18px;height:16px;">
        </div>
		<!--下载-->
        <div class="downloadAuido"></div>
      </div>
    </div>`
}
// 显示
AddTamplat.prototype.ifNumBigTen = function (data) {
	if (Number(data)<10) {
		return '0'+Number(data)
	}
	return data
}
AddTamplat.prototype.minute = function (Time) {
	// 分钟以上级别
	if (Time >= 60 ) {
		let AllTimeNum = Number(Time)
		let minutes = parseInt(AllTimeNum/60)
		let second = parseInt(AllTimeNum%60)
		return this.ifNumBigTen(minutes) + ":" + this.ifNumBigTen(second)
	}else if (Time <60 ) {
	//    秒一下级别
		return '00:'+this.ifNumBigTen(parseInt(Time))
	}
}
//小时以上级别
AddTamplat.prototype.hour = function (Time) {
	let hourTimeNum = Time/3600;
	let remainder = Time%3600;
	let minutes = this.minute(parseInt(remainder));
	return this.ifNumBigTen(parseInt(hourTimeNum)) + ':' + minutes
}

// 添加和读取音频
AddTamplat.prototype.addIncident = function () {
	this.appendEle.innerHTML=this.tamplat()
	const _that = this
	let x = document.getElementById(this.eleId)
	this.thisAudio = x
	x.ontimeupdate= function (e) {
		let currentTime = e.currentTarget.currentTime
		if (currentTime >= 3600) {
			_that.PlayDurationTime = _that.hour(currentTime)
		}else if (currentTime < 3600){
			_that.PlayDurationTime = _that.minute(currentTime)
		}
		_that.durationNum = currentTime
	}
	x.src = this.src
	x.load()
	let readyStateInterval = setInterval(()=>{
	    if (x.readyState == 4){
	        _that.readyStateFlag = true
	        _that.duration = x.duration  // 获得整个音频的时长
			// 设置整个音频的时长
			document.getElementById(_that.controlId).children[1].children[0].setAttribute('max',x.duration)
	        if (Number(x.duration) >=3600 ) {
	            _that.durationTime = _that.hour(x.duration)
	        }else{
	            _that.durationTime = _that.minute(x.duration)
	        }
	        clearInterval(readyStateInterval)
	    }else {
	        _that.readyStateFlag = false
	    }
	},200)
	this.playAudio()
}

// 绑定事件
AddTamplat.prototype.playAudio = function (slae) {
	const that = this
	let playImg = document.getElementById(this.controlId).children[0]
	let rangeInp = document.getElementById(this.controlId).children[1].children[0]
	playImg.addEventListener('click',function(){
		if (that.playFlag&&that.readyStateFlag) {
		    that.thisAudio.play()
        that.playFlag = !that.playFlag
		}else if(!that.playFlag&&that.readyStateFlag){
		    that.thisAudio.pause()
        that.playFlag = !that.playFlag
		}
	})
	// 点击选择播放时间
	rangeInp.oninput = function (e) {
		if (that.readyStateFlag) {
			if(that.thisAudio.currentTime >= that.duration){
				that.durationNum = 0
				that.playFlag = true
			}
			if (parseInt(that.thisAudio.currentTime) != parseInt(e.target.value)) {
				// console.log(e.target.value)
				that.thisAudio.currentTime = e.target.value
				that.thisAudio.play()
				that.playFlag = false
			}
		}
	}
	// 静音
	let allChildren = document.getElementById(this.controlId).children
	allChildren[allChildren.length-2].onclick = function () {
		if (that.mutesFlag) {
			that.thisAudio.muted = true
		}else{
			that.thisAudio.muted = false
		}
		that.mutesFlag = !that.mutesFlag
	}
	// 下载
	document.getElementById(this.controlId).lastElementChild.onclick = function () {
		var link = document.createElement('a');
		link.download = '电话录音.wav'
		link.href = that.src;
		link.click();
	}
}
export default {AddTamplat}
