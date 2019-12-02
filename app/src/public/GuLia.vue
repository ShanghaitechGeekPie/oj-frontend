<template>
  <div class="fix-float-bottom">
    <img id="img" @mouseenter="mouse_move_on_img()" @mouseleave="mouse_move_out_img()" v-bind:src="imgGif" width=100/>
    <a href="#"><img id="cross" @click="close_img()" @mouseenter="mouse_move_on_cross()"
                     @mouseleave="mouse_move_out_cross()"
                     style="display:none;" v-bind:src="imgCross" width=20/></a>
    <a href="#" id="com" @click="communicate()" @mouseenter="mouse_move_on_img()" @mouseleave="mouse_move_out_img()"
       style="display:none;">

    </a>
    <div align="center" class="com" id="bubble" @mouseenter="mouse_move_on_img()"
         @mouseleave="mouse_move_out_img()" style="display:none;">想和我交流吗？
      <div class="arrow"></div>
    </div>
  </div>
</template>
<script>
        function moveImage() {
                let moveId = document.getElementById("img");
                let cross = document.getElementById("cross");
                let com = document.getElementById("com");
                let bubble = document.getElementById("bubble");
                let inp = document.getElementById("inp");
                let but = document.getElementById("but");
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
                inp.style.top = "450px";
                inp.style.left = "160px";
                inp.style.position = "absolute";
                but.style.top = "450px";
                but.style.left = "280px";
                but.style.position = "absolute";

                document.onmousedown = coordinates;
                document.onmouseup = mouseup;

                let leftp = undefined;
                let topp = undefined;
                let cleftp = undefined;
                let ctopp = undefined;
                let nleftp = undefined;
                let ntopp = undefined;
                let bleftp = undefined;
                let btopp = undefined;
                let inpleftp = undefined;
                let inptopp = undefined;
                let butleftp = undefined;
                let buttopp = undefined;
                let xcoor = undefined;
                let ycoor = undefined;

                function coordinates(e) {
                    if (e === null) {
                        e = window.event;
                    }
                    let sender = (typeof (window.event) != "undefined") ? e.srcElement : e.target;

                    if (sender.id === "img") {
                        mouseover = true;
                        leftp = parseInt(moveId.style.left);
                        topp = parseInt(moveId.style.top);
                        cleftp = parseInt(cross.style.left);
                        ctopp = parseInt(cross.style.top);
                        nleftp = parseInt(com.style.left);
                        ntopp = parseInt(com.style.top);
                        bleftp = parseInt(bubble.style.left);
                        btopp = parseInt(bubble.style.top);
                        inpleftp = parseInt(inp.style.left);
                        inptopp = parseInt(inp.style.top);
                        butleftp = parseInt(but.style.left);
                        buttopp = parseInt(but.style.top);
                        xcoor = e.clientX;
                        ycoor = e.clientY;
                        document.onmousemove = moveImg;
                    }
                }

                function moveImg(e) {
                    if (e === null) {
                        e = window.event;
                    }
                    moveId.style.left = leftp + e.clientX - xcoor + "px";
                    moveId.style.top = topp + e.clientY - ycoor + "px";
                    cross.style.left = cleftp + e.clientX - xcoor + "px";
                    cross.style.top = ctopp + e.clientY - ycoor + "px";
                    com.style.left = nleftp + e.clientX - xcoor + "px";
                    com.style.top = ntopp + e.clientY - ycoor + "px";
                    bubble.style.left = bleftp + e.clientX - xcoor + "px";
                    bubble.style.top = btopp + e.clientY - ycoor + "px";
                    inp.style.left = inpleftp + e.clientX - xcoor + "px";
                    inp.style.top = inptopp + e.clientY - ycoor + "px";
                    but.style.left = butleftp + e.clientX - xcoor + "px";
                    but.style.top = buttopp + e.clientY - ycoor + "px";
                    return false;
                }

                function mouseup(e) {
                    document.onmousemove = "";
                }
            }
    export default {
        data() {
            return {
                imgGif: require('../assets/img.gif'),
                imgCross: require('../assets/cross.png')
            }
        },
        created () {
            moveImage()
        },
        methods: {
            mouse_move_on_img () {
                element = document.getElementById('img');
                element.src = "img/img2.png";
                cross = document.getElementById('cross');
                cross.style.display = "";
                com = document.getElementById('com');
                com.style.display = "";
                bubble = document.getElementById('bubble');
                bubble.style.display = "";
            },
            mouse_move_out_img() {
                element = document.getElementById('img');
                element.src = "img/img.gif";
                cross.style.display = "none";
                com = document.getElementById('com');
                com.style.display = "none";
                bubble = document.getElementById('bubble');
                bubble.style.display = "none";
            },
            mouse_move_on_cross() {
                element = document.getElementById('img');
                element.src = "img/img2.png";
                cross = document.getElementById('cross');
                cross.style.display = "";
            },
            mouse_move_out_cross() {
                element = document.getElementById('img');
                element.src = "img/img.gif";
                cross.style.display = "none";
            },
            close_img() {
                element = document.getElementById('img');
                element.style.display = "none";
                cross = document.getElementById('cross');
                cross.style.display = "none";
                document.getElementById('inp').style.display = "none";
                document.getElementById('but').style.display = "none";
            },
            communicate() {
                var t = document.getElementById("inp").value;
                if (t != null && t != "") {
                    var txt = new Array();
                    text = t.replace("吗", "").replace("？", "！").replace("?", "！");
                    for (var i = 0; i < text.length; i++) {
                        if (text[i] === "我") txt[i] = "你";
                        else if (text[i] == "你") txt[i] = "我";
                        else txt[i] = text[i]
                    }
                    bubble = document.getElementById('bubble');
                    bubble.innerHTML = txt.join('') + "<div class=\"arrow\"></div>";
                    document.getElementById('bubble').style.display = "";
                } else {
                    document.getElementById('bubble').innerHTML = "想和我交流吗？";
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
    height: 30px; /* 高度 */
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
    position:fixed;
    bottom: 20px;
    width: 90%;
    height: 450px;
    z-index: 9999;
  }
</style>
