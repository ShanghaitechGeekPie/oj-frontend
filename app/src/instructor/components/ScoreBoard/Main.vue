<template>
  <div>
    <el-row class="row-main">
      <el-col>
        <span class="title-main">ScoreBoard</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table
        :data="scoreInfo.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        class="table-only"
        highlight-current-row
        border-top
        v-loading="loading"
        >
        <el-table-column
          type="index"
          align="center"
          :index="ranking"
          width="50">
        </el-table-column>
        <el-table-column
          prop="nickname"
          align="center"
          label="Nickname">
        </el-table-column>
        <el-table-column
          prop="score"
          align="center"
          label="Score">
        </el-table-column>
        <el-table-column
          prop="overall_score"
          align="center"
          label="Overall Score">
          </el-table-column>
          <el-table-column
          prop="submission_count"
          align="center"
          label="Submission times">
          </el-table-column>
          <el-table-column
          prop="submission_time"
          align="center"
          label="Submission Time">
        </el-table-column>
        <el-table-column
          label="Delta"
          align="center">
          <template slot-scope="scope">
            <ScoreDelta :delta="scope.row.delta"></ScoreDelta>
          </template>
        </el-table-column>
     </el-table>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-pagination
        background
        :page-size="pagesize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="total">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import ScoreDelta from '../../../public/ScoreDelta'

export default {
  components: {
    ScoreDelta
  },
  data () {
    return {
      scoreInfo: [],
      loading: true,
      currentPage: 1,
      pagesize: 20,
      total: 0
    }
  },
  created () {
    if (this.getAuth) {
      this.axios.get(`${this.Api}/course/${this.$route.query.coUid}/assignment/${this.$route.query.assUid}/scores/`)
        .then((response) => {
          this.scoreInfo = this.getSubmission(response.data)
          this.total = response.data.length
          this.loading = false
        }).catch((err) => {
          this.$message({
            type: 'error',
            message: err,
            showClose: true
          })
        })
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.currentPage = val
    },
    handleSizeChange (val) {
      this.pagesize = val
    },
    ranking (index) {
      return (this.currentPage - 1) * 20 + index
    },
    getSubmission (data) {
      let that = this
      if (!data) {
        return data
      }
      let result = []
      data.map(function (a) {
        if (a.submission_time) {
          a.submission_time = that.formatUTC(a.submission_time)
        } else {
          a.submission_time = '(not yet submitted)'
        }
        result.push(a)
      })
      return result
    },
    formatUTC (utcdatetime) {
      let Tpos = utcdatetime.indexOf('T')
      let Zpos = utcdatetime.indexOf('Z')
      let yearmonthday = utcdatetime.substr(0, Tpos)
      let hourminutesecond = utcdatetime.substr(Tpos + 1, Zpos - Tpos - 1)
      let newdatetime = yearmonthday + ' ' + hourminutesecond
      let timestamp = new Date(Date.parse(newdatetime))
      timestamp = timestamp.getTime()
      timestamp = timestamp / 1000
      timestamp = timestamp + 8 * 60 * 60
      let date = new Date(parseInt(timestamp) * 1000)
      let hours = date.toString().split(' ')[4]
      let days = date.toLocaleString().split(' ')[0]
      return `${days} ${hours}`
    }
  },
  computed: {
    ...mapState({
      getAuth: state => state.isAuthorized,
      Api: state => state.api
    })
  }
}
</script>
<style scoped>
  .row-main {
    margin: 5% 0 2% 0;
  }
  .title-main {
    font-size: 35px;
    font-style: inherit;
  }
  .table-only {
    width: 100%;
    background-color: #606266;
  }
</style>
