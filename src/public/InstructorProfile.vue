<template>
    <div>
    <el-row class="rows">
      <el-col type="flex" justify="center" align="middle"><span class="title">Instructor</span></el-col>
    </el-row>
    <el-row :gutter="2" class="rows">
      <el-col :span="24" align="middle">
        <el-card class="cards">
          <img v-bind:src="imgInstructor" class="img-profile">
        </el-card>
      </el-col>
    </el-row>
      <el-row>
        <el-col align="middle">
          <el-card class="cards">
            <el-row type="flex" justify="center" align="middle" class="card-row">
              <el-col :span="4">
                <span class="sub-title">Name:</span>
              </el-col>
              <el-col :span="9">
                <el-input class="shortInput" v-model="Info.name" :disabled="true"></el-input>
              </el-col>
              <el-col :span="4">
                <span class="sub-title">Email:</span>
              </el-col>
              <el-col :span="9">
                <el-input class="shortInput" v-model="Info.enroll_email" :disabled="true"></el-input>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      imgInstructor: require('../assets/instructor.jpg'),
      Info: {
        uid: '',
        name: '',
        enroll_email: ''
      }
    }
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getID: state => state.baseInfo.uid,
    getCourseUid: state => state.coInfo.uid,
    Api: state => state.api
  }),
  created () {
    if (this.getAuth) {
      this.axios({
        method: 'GET',
        url: `${this.Api}/course/${this.getCourseUid}/instructor/${this.$route.query.instr_uid}`
      }).then((response) => {
        this.Info = response.data
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: err,
          showClose: true
        })
      })
    }
  }
}
</script>

<style scoped>
  .img-profile {
    padding: 2%;
    height: 500px !important;

  }
  .cards {
    width: 700px;
  }
  .el-icon-menu {
    display: none;
  }
  .sub-title {
    font-size: 20px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    float: right;
    margin-right: 8%;
    text-decoration: none;
    color: white;
    padding: 0.3em 1.2em;
    border-radius: 2em;
    box-sizing: border-box;
    text-decoration: none;
    font-weight: 300;
    color: #FFFFFF;
    background-color: #bf6970;
    text-align: center;
    transition: all 0.2s;
  }
  .sub-title:hover{
    background-color: #b5555d;
  }
  .card-row {
    margin: 3% 3% 3% 0;
  }
  .title {
    font-size: 40px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  .rows {
    margin-top: 2%;
  }
</style>
