<template>
  <div>
    <el-row class="row-half">
      <el-col>
        <span class="title-main">Assignment Judges:</span>
      </el-col>
    </el-row>
    <el-row class="row-half">
      <el-col>
        <el-transfer
          style="text-align: left; display: inline-block"
          v-model="value"
          :titles="['Available Judges', 'Existing Judges']"
          @change="handleChange"
          :data="transData">
        </el-transfer>
      </el-col>
    </el-row>
    <el-row class="row-half">
      <el-col>
        <el-tooltip class="item" effect="dark" content="You are going to submit the judges on the right " placement="top-start">
          <el-button @click="submit" class="button-out">submit</el-button>
        </el-tooltip>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      transData: [],
      value: []
    }
  },
  methods: {
    submit () {
      this.steps += 1
      this.axios({
        method: 'post',
        url: `${this.Api}/course/${this.getUid}/assignment/${this.passReply.uid}`,
        data: {state: 2},
        headers: {'X-CSRFToken': this.getCookie('csrftoken')}
      })
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
        window.location.href = this.passReply.ssh_url_to_repo
      }, 500)
    },
    getCookie (name) {
      let value = '; ' + document.cookie
      let parts = value.split('; ' + name + '=')
      if (parts.length === 2) return parts.pop().split(';').shift()
    },
    handleChange (cv, direction, value) {
      let that = this
      if (direction === 'right') {
        value.map(function (uid) {
          that.axios({
            method: 'post',
            url: `${that.Api}/course/${that.getUid}/assignment/${that.passReply.uid}/judge/`,
            data: {uid},
            headers: {'X-CSRFToken': that.getCookie('csrftoken')}
          }).then((response) => {
            if (response.status === 200) {
              alert('submit!')
            }
          })
        })
      } else {
        value.map(function (uid) {
          that.axios({
            method: 'delete',
            url: `${that.Api}/course/${that.getUid}/assignment/${that.passReply.uid}/judge/${uid}`,
            headers: {'X-CSRFToken': that.getCookie('csrftoken')}
          }).then((response) => {
            if (response.status === 200) {
              alert('delete!')
            }
          })
        })
      }
    }
  },
  props: ['passReply'],
  created () {
    let that = this
    let len = 0
    if (this.getAuth) {
      this.axios.get(`${this.Api}/course/${this.getUid}/judge/`)
        .then((response) => {
          if (response.status === 200) {
            len = response.data.length
            for (let i = 0; i < response.data.length; i++) {
              that.axios.get(`${this.Api}/judge/${response.data[i].uid}`)
                .then((response2) => {
                  if (response2.status === 200) {
                    that.value.push(response2.data.uid)
                    that.$set(that.transData, i + len, {
                      key: response2.data.uid,
                      label: response2.data.host,
                      disable: false
                    })
                  } else if (response2.status === 401) {
                    that.$router.push('/unauthorized')
                  } else {
                    that.$router.push('/error')
                  }
                })
                .catch((err) => {
                  console.log(err)
                })
            }
          } else if (response.status === 401) {
            this.$router.push('/unauthorized')
          } else {
            this.$router.push('/error')
          }
        })
        .catch((err) => {
          console.log(err)
        })
      this.axios.get(`${this.Api}/judge/`)
        .then((response) => {
          if (response.status === 200) {
            for (let i = 0; i < response.data.length; i++) {
              that.$set(that.transData, i, {
                key: response.data[i].uid,
                label: response.data[i].host,
                disable: false
              })
            }
          } else if (response.status === 401) {
            this.$router.push('/unauthorized')
          } else {
            this.$router.push('/error')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed: mapState({
    getUid: state => state.coInfo.uid,
    getAuth: state => state.isAuthorized,
    getID: state => state.baseInfo.uid,
    Api: state => state.api
  })
}
</script>
<style>
  .button-out {
    background-color: #A40004;
    color: white;
  }
  .row-half {
    margin-top: 5%;
  }
  .title-main {
    font-size: 25px;
  }
</style>
