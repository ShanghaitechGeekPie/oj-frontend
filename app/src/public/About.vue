<template>
  <div>
    <el-row>
      <el-col>
        <GuLia />
      </el-col>
    </el-row>
    <el-row class="margin-top-big">
      <el-col type="flex" justify="center" align="middle">
        <span class="title black">PIEGON</span><span class="title"> is where people WA PAC and AC</span>
      </el-col>
    </el-row>
    <el-row class="margin-top-small">
      <el-col type="flex" justify="center" align="middle">
        <span class="about-sub-title">Geekpie are developing and maintaining this online judge system where students and TAs</span>
        <br><span class="about-sub-title">work together to dealing with homework from the start to the end. </span>
      </el-col>
    </el-row>
    <el-row class="margin-top-big">
      <el-col class="fake-table" :span="5" :offset="5" type="flex" justify="center" align="middle">
        <span class="table-title black">December 2018</span><br><span class="table-title-sub">First commit</span>
      </el-col>
      <el-col class="fake-table" :span="5" type="flex" justify="center" align="middle">
        <span class="table-title black">SIST 1B 203</span><br><span class="table-title-sub">Headquarters</span>
      </el-col>
      <el-col class="fake-table" :span="5" type="flex" justify="center" align="middle">
        <span class="table-title black">ZERO</span><br><span class="table-title-sub">Classes served</span>
      </el-col>
    </el-row>
    <el-row class="margin-top-small">
      <el-col type="flex" justify="center" align="middle">
        <span class="table-title-sub">* As of November 2019</span>
      </el-col>
    </el-row>
    <el-row class="margin-top-small">
      <el-col type="flex" justify="center" align="middle">
        <span class="about-sub-title">We’re working hard to build a supportive, welcoming place for Students and TAs alike</span>
        <br>
        <a href="https://github.com/ShanghaitechGeekPie"><span
          class="link">Learn more about us to offer help and advice</span></a>
      </el-col>
    </el-row>
    <el-row class="margin-top-small">
      <el-col :span="18" :offset="3" type="flex" justify="center" align="middle">
        <hr/>
      </el-col>
    </el-row>
    <el-row class="margin-top-small">
      <el-col :span="4" :offset="3" type="flex" justify="center" align="middle"><span class="title">Contributors</span>
      </el-col>
    </el-row>
    <el-row class="margin-top-small">
      <el-col :offset="3" :span="4" type="flex" justify="center" align="middle">
        <img v-bind:src="imgXia" class="img"/>
      </el-col>
      <el-col :span="5" type="flex" justify="center" align="left">
        <span class="table-title black">Min.</span><br><span class="table-title-sub">philipxyc</span>
      </el-col>
      <el-col :span="4" type="flex" justify="center" align="middle">
        <img v-bind:src="imgDio" class="img"/>
      </el-col>
      <el-col :span="5" type="flex" justify="center" align="left">
        <span class="table-title black">Diao Zihao</span><br><span class="table-title-sub">EricDiao</span>
      </el-col>
    </el-row>
    <el-row class="margin-top-small">
      <el-col :offset="3" :span="4" type="flex" justify="center" align="middle">
        <img v-bind:src="imgWang" class="img"/>
      </el-col>
      <el-col :span="5" type="flex" justify="center" align="left">
        <span class="table-title black">llk89</span><br><span class="table-title-sub"></span>
      </el-col>
      <el-col :span="4" type="flex" justify="center" align="middle">
        <img v-bind:src="imgZhang" class="img"/>
      </el-col>
      <el-col :span="5" type="flex" justify="center" align="left">
        <span class="table-title black">QixuanZhang</span><br><span class="table-title-sub">eEhyQx</span>
      </el-col>
    </el-row>
    <el-row class="margin-top-small">
      <el-col :offset="3" :span="4" type="flex" justify="center" align="middle">
        <img v-bind:src="imgQiu" class="img"/>
      </el-col>
      <el-col :span="5" type="flex" justify="center" align="left">
        <span class="table-title black">Artanic30</span><br><span class="table-title-sub"></span>
      </el-col>
      <el-col :span="4" type="flex" justify="center" align="middle">
        <img v-bind:src="imgYao" class="img"/>
      </el-col>
      <el-col :span="5" type="flex" justify="center" align="left">
        <span class="table-title black">nekowink</span><br><span class="table-title-sub"></span>
      </el-col>
    </el-row>
    <el-row class="margin-top-small">
      <el-col :offset="3" :span="4" type="flex" justify="center" align="middle">
        <img v-bind:src="imgZhang2" class="img"/>
      </el-col>
      <el-col :span="5" type="flex" justify="center" align="left">
        <span class="table-title black">ZoneLikeWonderland</span><br><span class="table-title-sub"></span>
      </el-col>
      <el-col :span="4" type="flex" justify="center" align="middle">
      </el-col>
      <el-col :span="5" type="flex" justify="center" align="left">
      </el-col>
    </el-row>
    <el-row class="margin-top-small">
      <el-col :span="18" :offset="3" type="flex" justify="center" align="middle">
        <hr/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
    import GuLia from './GuLia'

    export default {
        data() {
            return {
                imgXia: require('../assets/1.jpg'),
                imgDio: require('../assets/2.jpg'),
                imgWang: require('../assets/3.jpg'),
                imgZhang: require('../assets/4.jpg'),
                imgQiu: require('../assets/5.jpg'),
                imgYao: require('../assets/6.jpg'),
                imgZhang2: require('../assets/7.jpg')
            }
        },
        components: {
            'GuLia': GuLia
        }
    }
</script>
<style>
  .title {
    font-size: 50px;
  }

  .black {
    font-weight: bold;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  .margin-top-big {
    margin-top: 80px;
  }

  .margin-top-small {
    margin-top: 40px;
  }

  .about-sub-title {
    color: #596068;
    background: white;
    font-size: 25px;
  }

  .link {
    font-size: 25px;
  }

  .fake-table {
    border-style: solid;
    border-color: #8c939d;
    border-width: 1px;
    min-height: 150px;
    padding-top: 35px;
  }

  .table-title {
    font-size: 30px;
  }

  .table-title-sub {
    color: #596068;
    font-size: 15px;
  }

  .img {
    height: 150px;
  }
</style>
