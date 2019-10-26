<template>
  <div class="aside">
    <el-row class="row-two">
      <el-col>
        <span class="title-main">{{ coInfo.name }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <span class="subtitle">{{ coInfo.code }}</span>
      </el-col>
    </el-row>
    <el-row class="row-quarter" type="flex" align="middle" justify="center">
        <el-col>
          <span class="title-msg">{{ getMsg(this.msgs)}}</span>
        </el-col>
      </el-row>
    <el-row class="mt-10percent">
      <el-col :span="5">
        <i class="el-icon-menu"></i>
      </el-col>
      <el-col :span="18">
        <router-link :to="{ path: `/instr`}" class="sub-title">Dashboard</router-link>
      </el-col>
    </el-row>
    <el-row class="mt-10percent">
      <el-col :span="5">
        <i class="el-icon-menu"></i>
      </el-col>
      <el-col :span="18">
          <router-link :to="{ path: `/instr/course/${this.coInfo.code}/assignment`}" class="sub-title">Assignments</router-link>
      </el-col>
    </el-row>
    <el-row class="mt-10percent">
      <el-col :span="5">
        <i class="el-icon-menu"></i>
      </el-col>
      <el-col :span="18">
          <router-link :to="{ path: `/instr/course/${this.coInfo.code}`}" class="sub-title">Student List</router-link>
      </el-col>
    </el-row>
    <el-row class="mt-10percent">
      <el-col :span="5">
        <i class="el-icon-menu"></i>
      </el-col>
      <el-col :span="18">
          <router-link :to="{ path: `/instr/course/${this.coInfo.code}/judge`}" class="sub-title">Judges List</router-link>
      </el-col>
    </el-row>
    <el-row class="mt-10percent">
      <el-col :span="5">
        <i class="el-icon-menu"></i>
      </el-col>
      <el-col :span="18">
          <router-link :to="{ path: `/instr/course/${this.coInfo.code}/instructor`}" class="sub-title">Instructors</router-link>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      coInfo: {
      },
      msgs: {
        msgAss: 'You may check students\' assignments state and add new assignment here.',
        msgInstr: 'You may manage instructors belong to this course and add new instructor.',
        msgStu: 'You may manage students belong to this course and add new student.',
        msgJudge: 'You may manage judges belong to this course and add more judge from your personal judge library.'
      }
    }
  },
  created () {
    this.coInfo = this.getCoInfo
  },
  computed: {
    getCoInfo () {
      return this.$store.state.coInfo
    }
  },
  methods: {
    getMsg (msg) {
      if (this.$route.name === 'instrCourses') {
        return msg.msgStu
      } else if (this.$route.name === 'instructorAddHomework') {
        return msg.msgAss
      } else if (this.$route.name === 'judge') {
        return msg.msgJudge
      } else {
        return msg.msgInstr
      }
    }
  }
}
</script>
<style scoped>
  .aside {
    padding: 0 20px 0 20px;
    min-width: 280px;
  }
  .mt-10percent {
    margin-top: 10%;
  }
  .subtitle {
    font-size: 15px;
    font-style: italic;
  }
  .el-icon-menu {
    display: none !important;
  }
  .sub-title {
    font-size: 25px;
    text-decoration: none;
    padding: 0.3em 1.2em;
    border-radius: 2em;
    box-sizing: border-box;
    font-weight: 300;
    color: #FFFFFF;
    background-color: #bf6970;
    text-align: center;
    transition: all 0.2s;
    /* temporarily fix navbutton width */
    /* consider set background to its parent? */
    display: inline-block;
    width: 100%;
  }
  .sub-title:hover{
    background-color: #b5555d;
  }
  .row-two {
    margin-top: 40px;
  }
  .title-main {
    font-size: 30px;
    font-style: inherit;
  }
  .el-icon-menu {
    margin-left: 10px!important;
    margin-top: 3px !important;
    font-size: 20px !important;
  }
  .title-msg {
    margin-top: 5%;
    font-size: 20px;
  }
</style>
