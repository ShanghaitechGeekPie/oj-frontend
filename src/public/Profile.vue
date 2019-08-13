<template>
    <div>
    <el-row class="rows">
      <el-col align="middle" v-if="!this.getState"><span class="title">{{ this.Info.nickname }}</span></el-col>
    </el-row>
    <el-row :gutter="2" class="rows">
      <el-col :span="24" align="middle">
        <el-card class="cards">
          <img v-bind:src="imgInstructor" class="img-profile" v-if="this.getState">
          <img v-bind:src="imgStudent" class="img-profile" v-else>
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
              <el-col :span="8">
                <el-input class="shortInput" v-model="Info.name" :disabled="true"></el-input>
              </el-col>
              <el-col :span="5">
                <span class="sub-title">Student ID:</span>
              </el-col>
              <el-col :span="5">
                <el-input class="shortInput" v-model="Info.student_id" :disabled="true"></el-input>
              </el-col>
              <el-col :span="2"></el-col>
            </el-row>
            <el-row type="flex" align="middle" class="card-row2">
              <el-col :span="4">
                <span class="sub-title">Email:</span>
              </el-col>
              <el-col :span="18">
                <el-input class="shortInput" v-model="Info.email" :disabled="true"></el-input>
              </el-col>
              <el-col :span="2"></el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import na from './Navigation'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      imgStudent: require('../assets/student.jpg'),
      imgInstructor: require('../assets/instructor.jpg'),
      Info: {
        uid: 'dlsakhdiagsfdcbhkagcu2',
        name: '王大锤',
        nickname: 'hammerwang',
        email: 'sjbdkjas@shanghaitech.edu.cn',
        student_id: 0
      }
    }
  },
  components: {
    'v-na': na
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getID: state => state.baseInfo.uid,
    getState: state => state.baseInfo.isInstructor,
    getStu: state => state.baseInfo.isStudent,
    Api: state => state.api
  }),
  methods: {
    axiosInstr () {
      this.axios({
        method: 'GET',
        url: `${this.Api}/instructor/${this.getID}`
      }).then((response) => {
        this.Info = response.data
      }).catch((err) => {
        this.$message({
          type: 'error',
          message: err,
          showClose: true
        })
      })
    },
    axiosStu () {
      this.axios({
        method: 'GET',
        url: `${this.Api}/student/${this.getID}`
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
  },
  created () {
    if (this.getAuth) {
      if (this.getStu && this.getState) {
        if (this.$route.path.includes('instr')) {
          this.axiosInstr()
        } else {
          this.axiosStu()
        }
      } else {
        if (this.getState) {
          this.axiosInstr()
        } else {
          this.axiosStu()
        }
      }
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
  .title {
    font-size: 40px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
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
    margin: 3% 0 2% 5%;
  }
  .card-row2 {
    margin: 3% 0 2% 5%;
  }
  .rows {
    margin-top: 2%;
  }
</style>
