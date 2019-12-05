<template>
  <div class="fix-float-bottom">
    <div id="app">
      <img v-bind:src="imgGif" draggable="false" @mouseenter="mouse_move_on_img" @mouseleave="mouse_move_out_img" @mousedown="move" ref="img" width=100/>
      <a href="#"><img v-bind:src="imgCross" ref="cross" style="display:none;" @mouseenter="mouse_move_on_cross"
                       @mouseleave="mouse_move_out_cross" @click="close_img" width=20/></a>
      <a href="#" ref="com" style="display:none;" @click="communicate" @mouseenter="mouse_move_on_img"
         @mouseleave="mouse_move_out_img">
      </a>
      <div class="com" ref="bubble" style="display:none;" @mouseenter="mouse_move_on_img"
           @mouseleave="mouse_move_out_img" align="center">想和我交流吗？
        <div class="arrow"></div>
      </div>
      <div>
        <input type="text" class="mytxt" ref="inp" placeholder="和咕凉交流" @keyup.enter="communicate">
        <button ref="but" type="button"  class="gulia-button" @click="communicate">talk</button>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                imgGif: require('../assets/img.gif'),
                imgCross: require('../assets/cross.png'),
                imgPng2: require('../assets/img2.png'),
            }
        },
        mounted() {
            let moveImage = () => {
                let moveId = this.$refs.img;
                let cross = this.$refs.cross;
                let com = this.$refs.com;
                let bubble = this.$refs.bubble;
                let inp = this.$refs.inp;
                let but = this.$refs.but;
                moveId.style.top = "200px";
                moveId.style.left = "200px";
                moveId.style.position = "absolute";
                cross.style.top = "200px";
                cross.style.left = "290px";
                cross.style.position = "absolute";
                com.style.top = "420px";
                com.style.left = "210px";
                com.style.position = "absolute";
                bubble.style.top = "150px";
                bubble.style.left = "70px";
                bubble.style.position = "absolute";
                inp.style.top = "446px";
                inp.style.left = "165px";
                inp.style.position = "absolute";
                but.style.top = "444px";
                but.style.left = "280px";
                but.style.position = "absolute";

            }
            moveImage()
        },
        methods: {
            move(e){
            let odiv = e.target;        //获取目标元素
            let cross = this.$refs.cross;
            let com = this.$refs.com;
            let bubble = this.$refs.bubble;
            let inp = this.$refs.inp;
            let but = this.$refs.but;

            //算出鼠标相对元素的位置
            let disX = e.clientX - odiv.offsetLeft;
            let disY = e.clientY - odiv.offsetTop;

            let cdisX = 90;
            let cdisY = 0;

            let codisX = 10;
            let codisY = 220;

            let bdisX = -130;
            let bdisY = -50;

            let idisX = -35;
            let idisY = 246;

            let budisX = 80;
            let budisY = 244;
            document.onmousemove = (e)=>{       //鼠标按下并移动的事件
                //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                let left = e.clientX - disX;    
                let top = e.clientY - disY;

                let cleft = left + cdisX;    
                let ctop = top + cdisY;

                let coleft = left + codisX;   
                let cotop = top + codisY;

                let bleft = left + bdisX;
                let btop = top + bdisY;

                let ileft = left + idisX;   
                let itop = top + idisY;
                
                let buleft = left + budisX;
                let butop = top + budisY;

                //绑定元素位置到positionX和positionY上面


                //移动当前元素
                odiv.style.left = left + 'px';
                odiv.style.top = top + 'px';

                cross.style.left = cleft + 'px';
                cross.style.top = ctop + 'px';

                com.style.left = coleft + 'px';
                com.style.top = cotop + 'px';

                bubble.style.left = bleft + 'px';
                bubble.style.top = btop + 'px';

                inp.style.left = ileft + 'px';
                inp.style.top = itop + 'px';

                but.style.left = buleft + 'px';
                but.style.top = butop + 'px';
            };
            document.onmouseup = (e) => {
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },
            mouse_move_on_img: function () {
                let element = this.$refs.img;
                element.src = this.imgGif;
                let cross = this.$refs.cross;
                cross.style.display = "";
                let com = this.$refs.com;
                com.style.display = "none";
                let bubble = this.$refs.bubble;
                bubble.style.display = "none";
            },
            mouse_move_out_img: function () {
                let element = this.$refs.img;
                element.src = this.imgPng2;
                let cross = this.$refs.cross;
                cross.style.display = "none";
                let com = this.$refs.com;
                com.style.display = "";
                let bubble = this.$refs.bubble;
                bubble.style.display = "";
            },
            mouse_move_on_cross: function () {
                let element = this.$refs.img;
                element.src = this.imgPng2;
                let cross = this.$refs.cross;
                cross.style.display = "";
            },
            mouse_move_out_cross: function () {
                let element = this.$refs.img;
                element.src = this.imgGif;
                let cross = this.$refs.cross;
                cross.style.display = "none";
            },
            close_img: function () {
                let element = this.$refs.img;
                element.style.display = "none";
                let cross = this.$refs.cross;
                cross.style.display = "none";
                let bubble = this.$refs.bubble;
                bubble.style.display = "none";
                this.$refs.inp.style.display = "none";
                this.$refs.but.style.display = "none";
            },
            communicate: function () {
                let t = this.$refs.inp.value;
                if (t != null && t !== "") {
                    let txt = [];
                    let text = t.replace("吗", "").replace("？", "！").replace("?", "！");
                    for (let i = 0; i < text.length; i++) {
                        if (text[i] === "我") txt[i] = "你";
                        else if (text[i] === "你") txt[i] = "我";
                        else txt[i] = text[i]
                    }
                    let bubble = this.$refs.bubble;
                    bubble.innerHTML = txt.join('') + "<div class=\"arrow\"></div>";
                    if(t.indexOf("张启煊") != -1){
                      bubble.innerHTML = "哦你说张启煊啊，他可是大佬，人家可喜欢他了。<div class=\"arrow\"></div>";
                    }
                    if(t.indexOf("鸽子王") != -1 || t.indexOf("王鸽子") != -1){
                      bubble.innerHTML = "鸽子王是我的男朋友，他现在在我怀里，等你AC 了我就让你抱抱他。<div class=\"arrow\"></div>";
                    }
                    this.$refs.bubble.style.display = "";
                    // talk完后清空输入框
                    this.$refs.inp.value = ''
                } else {
                    this.$refs.bubble.innerHTML = "想和我交流吗？";
                }
            },
        }
    }
</script>
<style>
  #img {
    position: absolute;
    left: 200px;
    top: 200px
  }

  #cross {
    position: absolute;
    left: 290px;
    top: 200px
  }

  #com {
    color: orchid;
    font-family: "宋体";
    text-decoration: none;
    position: absolute;
    left: 210px;
    top: 420px
  }

  .com {
    color: white;
    font-family: "微软雅黑";
    position: absolute;
    left: 70px;
    top: 150px;
    width: 150px;
    height: auto;
    background: gray;
    border-radius: 5px; /* 圆角 */
    margin: 30px auto 0;
    padding: 4px;
  }

  .com .arrow {
    position: absolute;
    top: 10px;
    right: -12px; /* 圆角的位置需要细心调试哦 */
    width: 0;
    height: 0;
    font-size: 0;
    border: solid 7px;
    border-color: rgba(77, 73, 72, 0) rgba(77, 73, 72, 0) rgba(77, 73, 72, 0) gray;
  }

  .mytxt {
    color: #333;
    line-height: normal;
    font-family: "微软雅黑";
    font-style: normal;
    font-variant: normal;
    font-size-adjust: none;
    font-stretch: normal;
    font-weight: normal;
    padding: 4px;
    font-size: 15px;
    outline-width: medium;
    outline-style: none;
    outline-color: invert;
    border-radius: 3px;
    text-shadow: 0 1px 2px #fff;
    background-attachment: scroll;
    background-repeat: repeat-x;
    background-position-x: left;
    background-position-y: top;
    background-size: auto;
    background-origin: padding-box;
    background-clip: border-box;
    background-color: rgb(255, 255, 255);
    margin-right: 8px;
    border-top-color: #ccc;
    border-right-color: #ccc;
    border-bottom-color: #ccc;
    border-left-color: #ccc;
    border-top-width: 1px;
    border-right-width: 1px;
    border-bottom-width: 1px;
    border-left-width: 1px;
    border-top-style: solid;
    border-right-style: solid;
    border-bottom-style: solid;
    border-left-style: solid;
    width: 100px;
    left: 160px;
    top: 450px;
    position: absolute;
  }

  .mytxt:focus {
    border: 1px solid #fafafa;
    -webkit-box-shadow: 0px 0px 6px #007eff;
    -moz-box-shadow: 0px 0px 5px #007eff;
    box-shadow: 0px 0px 5px #007eff;

  }

  #but { /* 按钮美化 */
    width: 50px; /* 宽度 */
    height: 26px; /* 高度 */
    border-width: 0px; /* 边框宽度 */
    border-radius: 3px; /* 边框半径 */
    background: #1E90FF; /* 背景颜色 */
    cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
    outline: none; /* 不显示轮廓线 */
    font-family: Microsoft YaHei; /* 设置字体 */
    color: white; /* 字体颜色 */
    font-size: 15px; /* 字体大小 */
    left: 280px;
    top: 450px;
    position: absolute;
  }

  #but:hover { /* 鼠标移入按钮范围时改变颜色 */
    background: #5599FF;
  }

  .fix-float-bottom {
    position: fixed;
    bottom: 20px;
    height: 550px;
    z-index: 9999;
  }

  .gulia-button {
    margin-top: 2px;
    width: 50px; /* 宽度 */
    height: 30px; /* 高度 */
    border-width: 0px; /* 边框宽度 */
    border-radius: 3px; /* 边框半径 */
    background: #870d0d; /* 背景颜色 */
    cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
    outline: none; /* 不显示轮廓线 */
    font-family: Microsoft YaHei; /* 设置字体 */
    color: white; /* 字体颜色 */
    font-size: 15px; /* 字体大小 */
    left: 280px;
    top: 450px;
    position: absolute;
  }

  .gulia-button:hover { /* 鼠标移入按钮范围时改变颜色 */
    background: #f56069;
  }
</style>
