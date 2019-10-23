<template>
 <div class="line">
   <el-row type="flex" class="row-chicken" justify="space-between" align="middle">
          <el-col style="width: auto">
            <el-row type="flex" justify="center" align="middle" :gutter="14">
              <el-col :col="4" type="flex" justify="center" align="middle">
                <img v-bind:src="piegon" class="img-piegon" @click="this.backHome">
              </el-col>
              <el-col :col="2">
                <img v-bind:src="gang" class="img-gang" @click="this.backHome">
              </el-col>
              <el-col :col="4" type="flex" justify="center" align="middle">
                <img v-bind:src="img" class="img-logo" @click="this.backHome">
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
                  <el-menu-item index="/" v-if="this.checkRoleInstr">Student Version</el-menu-item>
                  <el-menu-item index="/instr" v-if="this.checkRoleStu">Instructor Version</el-menu-item>
                  <el-menu-item :index=getProfile() v-if="!this.profilePage">Profile</el-menu-item>
                  <el-menu-item :index=getDashboard() v-else>Dashboard</el-menu-item>
                  <el-menu-item index="/" v-if="this.profilePage" @click="goBack">Go back</el-menu-item>
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
      img: require('../assets/logo.png'),
      piegon: require('../assets/piegon.jpg'),
      gang: require('../assets/gang.jpg')
    }
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getBase: state => state.baseInfo,
    getUid: state => state.coInfo.uid,
    getCoInfo: state => state.coInfo,
    Api: state => state.api,
    getLogout: state => state.logout_url,
    profilePage () {
      return (this.$route.name === 'inProfile') || (this.$route.name === 'profile' || this.$route.name === 'changeProfile')
    },
    checkRoleStu () {
      return this.getBase.isInstructor && this.getBase.isStudent && (this.$route.name === 'homeStudent' || this.$route.name === 'indexStudent')
    },
    checkRoleInstr () {
      return this.getBase.isInstructor && this.getBase.isStudent && this.$route.name === 'indexInstructor'
    }
  }),
  methods: {
    logout () {
      this.$store.commit('logOut')
      this.$cookies.remove('sessionid')
      window.location.href = `${this.getLogout}`
    },
    getDashboard () {
      if (this.$route.path.includes('instr')) {
        return '/instr'
      } else {
        return '/'
      }
    },
    getProfile () {
      if (this.$route.path.includes('instr')) {
        return '/instr/profile'
      } else {
        return '/profile'
      }
    },
    goBack () {
      this.$router.go(-2)
    },
    backHome () {
      if (this.getBase.isStudent && !this.getBase.isInstructor) {
        this.$router.push('/home')
      } else if (!this.getBase.isStudent && this.getBase.isInstructor) {
        this.$router.push('/instr')
      } else {
        if (this.$route.path.includes('instr')) {
          this.$router.push('/instr')
        } else {
          this.$router.push('/home')
        }
      }
    },
    login () {
      if (!this.getAuth) {
        this.axios({
          method: 'get',
          url: `${this.Api}/user/login/oauth/param`,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'get',
            'Access-Control-Allow-Headers': 'x-requested-with,content-type'
          }
        }).then((response) => {
          if (window.location.hostname === '1localhost') {
            window.location.reload()
          } else {
            window.location.href = response.data.login_url
          }
          this.$store.commit('login', response.data.logout_url)
        }).catch((error) => {
          this.$message({
            type: 'error',
            message: error,
            showClose: true
          })
        })
      }
    }
  },
  created () {
    let that = this
    if (window.location.hostname === '1localhost') {
      this.$store.commit('updateApi', location.hostname)
    } else {
      this.$store.commit('updateApi', 'https://' + location.hostname + '/api')
    }
    const loading = this.$loading({
      lock: true,
      text: 'Initializing!',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    setTimeout(() => {
      this.axios({
        method: 'get',
        url: `https://${location.hostname}/api/user/role`
      }).then((response) => {
        loading.close()
        this.$store.commit('login', 'login')
        this.$notify({
          title: 'Success!',
          message: 'Connection with potato server established!',
          type: 'success',
          offset: 50
        })
        if (!response.data.is_student && response.data.is_instructor) {
          that.$store.commit('updateState', {
            uid: response.data.uid,
            role: 2
          })
        } else if (response.data.is_student && !response.data.is_instructor) {
          that.$store.commit('updateState', {
            uid: response.data.uid,
            role: 1
          })
        } else if (!response.data.is_student && !response.data.is_instructor) {
          that.$store.commit('updateState', {
            uid: response.data.uid,
            role: 4
          })
          setTimeout(() => {
            this.$notify({
              title: 'Warning!',
              message: 'No role detected, you will be redirect to another page!',
              type: 'warning',
              offset: 50
            })
            setTimeout(() => {
              this.$router.push('/uninitialized')
            }, 3000)
          }, 1000)
        } else {
          setTimeout(() => {
            this.$notify({
              title: 'Tips!',
              message: 'Double roles detected! Version switch is available in the account menu.',
              type: 'info',
              offset: 50
            })
          }, 1000)
          that.$store.commit('updateState', {
            uid: response.data.uid,
            role: 3
          })
        }
      }).catch(() => {
        loading.close()
        if (this.$store.state.baseInfo.uid === 'logout') {
        } else {
          this.$notify({
            title: 'Failure!',
            message: 'Lost synchronism with potato server!',
            type: 'error',
            offset: 50
          })
          this.$store.commit('logOut')
          this.$cookies.remove('sessionid')
          setTimeout(() => {
            this.$notify({
              title: 'Info!',
              message: 'Please login again!',
              type: 'info',
              offset: 50
            })
            setTimeout(() => {
              this.$router.push('/')
            }, 3000)
          }, 1000)
        }
      })
    }, 1000)
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
    width: 143px !important;
    height: 35px !important;
  }
  .img-piegon {
    height: 45px !important;
  }
  .img-gang {
    height: 45px !important;
    width: 2px !important;
    margin: 0 10px 0 10px;
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
