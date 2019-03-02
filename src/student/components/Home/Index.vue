<template>
  <div>
    <el-row class="row-height" :gutter="2" v-if="this.getAuth">
      <el-col :span="4" class="col-one">
          <el-menu class="menu-only">
            <v-aside></v-aside>
          </el-menu>
      </el-col>
      <el-col :span="18">
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
    Api: state => state.api,
    getReq: state => state.isRequest
  }),
  mounted () {
    if (this.getAuth) {
      console.log('2 3:47')
      if (!this.getReq) {
        this.axios({
          method: 'get',
          url: `${this.Api}/user/role` // todo: warning
        }).then((response) => {
          this.$store.commit('requested')
          console.log(response.data)
          if (!response.data.is_student && response.data.is_instructor) {
            this.$store.commit('updateState', response.data.uid, 2)
            if (this.$route.name === 'indexInstructor' || this.$route.name === 'homeInstructor') {
              window.location.reload()
            } else {
              window.location.href = 'https://' + location.hostname + '/instructor.html#/' // todo: warning
            }
          } else if (response.data.is_student && !response.data.is_instructor) {
            this.$store.commit('updateState', response.data.uid, 1)
            if (this.$route.name === 'indexStudent' || this.$route.name === 'homeStudent') {
              window.location.reload()
            } else {
              window.location.href = 'https://' + location.hostname + '/#/' // todo: warning
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
        url: `${this.Api}/student/${this.getBase.uid}/course/`
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
  .row-height {
    height: 100%;
  }
  .col-one {
    margin-right: 5%;
  }
  .menu-only {
    float: left;
    margin-right: 5%;
    min-width: 100px;
    min-height: 1000px;
  }
  .car {
    margin-top: 10%;
  }
</style>
