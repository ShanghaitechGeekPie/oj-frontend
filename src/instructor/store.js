import VuexPersistence from 'vuex-persist'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const store = new Vuex.Store({
  state: {
    isRequest: false,
    isAuthorized: false,
    coInfo: {
      uid: '',
      instructor: [''],
      name: '',
      code: '',
      semester: '',
      year: 0,
      homepage: ''
    },
    assignments: {
      name: '',
      uid: '',
      deadline: 0,
      release_date: 0,
      descr_link: '',
      score: 0,
      overall_socre: 0
    },
    baseInfo: {
      uid: '23123',
      isInstructor: false
    }
  },
  mutations: {
    updateCoInfo (state, value) {
      state.coInfo = value
    },
    updateAss (state, value) {
      state.assignments = value
    },
    login (state) {
      state.isAuthorized = true
    },
    logOut (state) {
      state.isAuthorized = false
    },
    updateInstructor (state, uid) {
      state.baseInfo.uid = uid
      state.baseInfo.isInstructor = true
    },
    updateStudent (state, uid) {
      state.baseInfo.uid = uid
      state.baseInfo.isInstructor = false
    },
    changeRequest (state) {
      state.isRequest = !state.isRequest
    }
  },
  plugins: [vuexLocal.plugin]
})

export default store