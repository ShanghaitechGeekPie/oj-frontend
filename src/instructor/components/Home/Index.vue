<template>
  <div>
    <el-row class="row-main" :gutter="2" v-if="this.getAuth">
      <el-col :span="5" class="col-quarter">
          <el-menu class="el-menu-vertical-demo">
            <v-aside></v-aside>
          </el-menu>
      </el-col>
      <el-col :span="17">
        <v-main :passCoInfo="courseInfo"></v-main>
      </el-col>
    </el-row>
    <el-row v-else>
      <el-col class="car">
        <v-car></v-car>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import na from '../../../public/Navigation'
import main from '../../../public/MainCourse'
import aside from './Aside'
import { mapState } from 'vuex'
import car from '../../../public/Carousel'

export default {
  data () {
    return {
      courseInfo: []
    }
  },
  components: {
    'v-main': main,
    'v-na': na,
    'v-aside': aside,
    'v-car': car
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getBase: state => state.baseInfo,
    getState: state => state.baseInfo.isInstructor,
    getReq: state => state.isRequest,
    Api: state => state.api
  }),
  created () {
    if (this.getAuth) {
      if (!this.getReq) {
        this.axios({
          method: 'get',
          url: `/user/role` // todo: warning
        }).then((response) => {
          this.$store.commit('requested')
          console.log(response.data)
          if (!response.data.is_student && response.data.is_instructor) {
            this.$store.commit('updateState', response.data.uid, 2)
            if (this.$route.name === 'indexInstructor' || this.$route.name === 'homeInstructor') {
              window.location.reload()
            } else {
              window.location.href = `${this.Api}/instructor.html#/`
            }
          } else if (response.data.is_student && !response.data.is_instructor) {
            this.$store.commit('updateState', response.data.uid, 1)
            if (this.$route.name === 'indexStudent' || this.$route.name === 'homeStudent') {
              window.location.reload()
            } else {
              window.location.href = `${this.Api}/#/`
            }
          } else if (!response.data.is_student && !response.data.is_instructor) {
            this.$store.commit('updateState', response.data.uid, 4)
            this.$router.push('/uninitialized')
          } else {
            this.$store.commit('updateState', response.data.uid, 3)
            window.location.reload()
          }
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: err,
            showClose: true
          })
        })
      }
      this.axios({
        method: 'GET',
        url: `${this.Api}/instructor/${this.getBase.uid}/course/`
      }).then((response) => {
        this.courseInfo = response.data
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
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    min-width: 100px;
    min-height: 1000px;
  }
  .row-main {
    height: 100%;
  }
  .el-menu-vertical-demo {
    float: left!important;
    margin: 0 5% 0 0!important;
  }
  .col-quarter {
    margin-right: 5%;
  }
  .car {
    margin-top: 10%;
  }
</style>
