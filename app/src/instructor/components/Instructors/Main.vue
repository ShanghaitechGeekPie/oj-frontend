<template>
    <div>
      <el-row :gutter="16">
        <el-col class="col-half" :span="4">
          <span class="title-main">Instructors</span>
        </el-col>
        <el-col :span="4" class="col-one">
          <el-tooltip class="item" effect="dark" content="Add New Instructor" placement="left">
              <el-button @click="addInstructor()" class="button-only"><i class="el-icon-plus"></i></el-button>
          </el-tooltip>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-table
          :data="instructorList"
          style="width: 100%"
          v-loading="loading"
          stripe>
          <el-table-column
            prop="name"
            align="center"
            label="name">
          </el-table-column>
          <el-table-column
            prop="enroll_email"
            align="center"
            label="email">
          </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="deleteRow(scope.$index, instructorList)"
                type="text"
                size="small">
                移除助教
              </el-button>
            </template>
          </el-table-column>
          </el-table>
        </el-col>
    </el-row>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      instructorList: [{
        uid: '',
        name: '',
        enroll_email: ''
      }],
      childChange: false,
      loading: true
    }
  },
  methods: {
    deleteRow (index, rows) {
      this.$confirm('此操作将永久删除该助教, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.getAuth) {
          this.axios({
            method: 'delete',
            url: `${this.Api}/course/${this.getUid}/instructor/${rows[index].enroll_email}`,
            headers: {'X-CSRFToken': this.$cookies.get('csrftoken')}
          }).then((response) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            rows.splice(index, 1)
          })
            .catch((err) => {
              this.$message({
                type: 'error',
                message: err,
                showClose: true
              })
            })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    addInstructor () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      setTimeout(() => {
        loading.close()
        this.$emit('changeState', this.childChange)
      }, 500)
    }
  },
  created () {
    if (this.getAuth) {
      this.axios.get(`${this.Api}/course/${this.getUid}/instructor/`)
        .then((response) => {
          this.instructorList = response.data
          this.loading = false
        })
        .catch((err) => {
          this.$message({
            type: 'error',
            message: err,
            showClose: true
          })
        })
    }
  },
  computed: mapState({
    getAuth: state => state.isAuthorized,
    getUid: state => state.coInfo.uid,
    Api: state => state.api
  })
}
</script>

<style scoped>
  .col-half {
    margin-top: 5%;
  }
  .title-main {
    font-family: inherit;
    font-size: 30px;
  }
  .col-one {
    float: right;
    margin-top: 5%;
    padding-left: 35px !important;
  }
  .button-only {
    background-color: #A40004;
  }
  .el-icon-plus {
    color: white!important;
  }
</style>
