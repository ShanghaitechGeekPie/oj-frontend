<template>
 <div class="line">
   <el-row type="flex" class="row-chicken" justify="space-between" align="middle">
          <el-col style="width: auto">
            <el-row type="flex" justify="center" align="middle" :gutter="20">
              <el-col type="flex" justify="center" align="middle">
                <img v-bind:src="img" class="img-logo" @click="this.backHome">
              </el-col>
              <el-col>
                <span class="text-logo">Online Judge</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="menu-top" v-if="this.getAuth">
             <el-menu
              class="menu"
              :default-active="$route.path"
              mode="horizontal"
              background-color="#A40006"
              text-color="#fff"
              active-text-color="#ffd04b"
              router>
                <el-submenu index="2" class="submenu">
                  <template slot="title">Account</template>
                  <el-menu-item index="/profile" v-if="!profilePage">Profile</el-menu-item>
                  <el-menu-item index="/" v-else>Dashboard</el-menu-item>
                  <el-menu-item index="/" v-if="profilePage" @click="goBack">Go back</el-menu-item>
                  <el-menu-item index="/changeProfile">Change profile</el-menu-item>
                  <el-menu-item index="/" @click="logout">Logout</el-menu-item>
                </el-submenu>
              </el-menu>
          </el-col>
         <el-col v-else>
           <el-button @click="login" class="button-login">Login</el-button>
         </el-col>
   </el-row>
 </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      img: require('../assets/logo.png')
    }
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getID: state => state.baseInfo.uid,
    getUid: state => state.coInfo.uid,
    getCoInfo: state => state.coInfo,
    getReq: state => state.isRequest,
    Api: state => state.api,
    getLogout: state => state.logout_url,
    profilePage () {
      return (this.$route.name === 'instrProfile') || (this.$route.name === 'profile' || this.$route.name === 'changeProfile')
    }
  }),
  methods: {
    logout () {
      this.$store.commit('logOut')
      this.$store.commit('refreshReq')
      this.axios({
        method: 'post',
        url: `${this.getLogout}`,
        headers: {'X-CSRFToken': this.getCookie('csrftoken')}
      })
      // todo: clear cookie
      this.$router.push('/')
    },
    goBack () {
      this.$router.go(-2)
    },
    backHome () {
      this.$router.push('/')
    },
    login () {
      if (!this.getAuth) {
        this.axios({
          method: 'get',
          url: `${this.Api}/user/login/oauth/param`, // todo: warning
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'get',
            'Access-Control-Allow-Headers': 'x-requested-with,content-type'
          }
        }).then((response) => {
          this.$store.commit('login', response.data.logout_url)
          window.location.href = response.data.login_url // todo: warning
          // window.location.reload()
        }).catch((error) => {
          this.$message({type: 'error',
            message: error,
            showClose: true
          })
        })
      }
    },
    getCookie (name) {
      let value = '; ' + document.cookie
      let parts = value.split('; ' + name + '=')
      if (parts.length === 2) return parts.pop().split(';').shift()
    }
  },
  created () {
    let that = this
    this.$store.commit('updateApi', 'https://' + location.hostname + '/api') // todo:warning
    if (this.getAuth && !this.getReq) {
      this.axios({
        method: 'get',
        url: `https://${location.hostname}/api/user/role` // todo:warning
      }).then((response) => {
        this.$store.commit('requested')
        if (!response.data.is_student && response.data.is_instructor) {
          that.$store.commit('updateState', {
            uid: response.data.uid,
            role: 2
          })
          if (that.$route.name === 'indexInstructor' || that.$route.name === 'homeInstructor') {
            window.location.reload()
          } else {
            window.location.href = 'https://' + location.hostname + '/instructor.html#/' // todo:warning
            // window.location.reload()
          }
        } else if (response.data.is_student && !response.data.is_instructor) {
          that.$store.commit('updateState', {
            uid: response.data.uid,
            role: 1
          })
          if (that.$route.name === 'indexStudent' || that.$route.name === 'homeStudent') {
            window.location.reload()
          } else {
            window.location.href = 'https://' + location.hostname + '/#/' // todo:warning
            // window.location.reload()
          }
        } else if (!response.data.is_student && !response.data.is_instructor) {
          that.$store.commit('updateState', {
            uid: response.data.uid,
            role: 4
          })
          this.$router.push('/uninitialized')
        } else {
          that.$store.commit('updateState', {
            uid: response.data.uid,
            role: 3
          })
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
  }
}
</script>

<style scoped>
  .line {
    background: #A40006;
  }
  .row-chicken {
    background-color: #A40006;
    padding:0 1rem;
  }
  .img-logo {
    width: 100%;
    height: 100% !important;
  }
  .text-logo {
    color: white;
  }
  .submenu {
    float: right;
  }
  .button-login {
    float: right;
    height: 40px;
    margin: 10px;
  }
  .menu-top {
    width: auto;
  }
  .menu {
    height: 100% !important;
    border-bottom: 0 !important;
    margin-bottom: 0 !important;
    color: #A40006 !important;
  }
</style>
