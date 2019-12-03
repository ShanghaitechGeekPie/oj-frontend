<template>
  <div>
    <el-row class="row-main">
      <el-col>
        <el-card shadow="always">
          <el-row class="margins">
            <el-col>
               <span class="title-main">{{ assignmentDetail.name }} Submission </span>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-row class="row-only">
        <el-col>
          <el-card>
            <el-row class="margins">
              <el-col>
                <span>
                  <span class="code-two">git@oj.geekpie.club:{{this.lower(this.getCoInfo.code)}}-{{this.lower(this.getCoInfo.year + this.getCoInfo.semester)}}/{{this.lower(this.getAss.short_name)}}/{{this.lower(this.email)}}.git </span>
                    is the repo for your homework. To access
                  your repo and submit your homework, clone it use
                  <span class="code-two"> git clone git@oj.geekpie.club:{{this.lower(this.getCoInfo.code)}}-{{this.lower(this.getCoInfo.year + this.getCoInfo.semester)}}/{{this.lower(this.getAss.short_name)}}/{{this.lower(this.email)}}.git </span>
                  {{this.getAss.short_name}} and follow the instruction of your TAs in discussion.</span>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row class="row-only">
        <el-col>
          <el-card class="card-only">
            <el-row class="margins">
              <el-col class="code-box">
                <span class="code" v-html="renderMultipleLines(message)"></span>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
      <el-row class="row-only">
        <el-col>
            <el-table
            :data="submission"
            v-loading="loading"
            class="table-only"
            :default-sort = "{prop: 'date', order: 'descending'}">
            <el-table-column
              prop="submission_time"
              label="When"
              align="center"
              sortable>
            </el-table-column>
            <el-table-column
              prop="commit_tag"
              align="center"
              label="Git ID">
            </el-table-column>
            <el-table-column
              prop="score"
              align="center"
              label="Score"
              sortable>
            </el-table-column>
            <el-table-column
              prop="overall_score"
              align="center"
              label="Full score">
            </el-table-column>
              <el-table-column
              prop="status"
              align="center"
              label="Status">
              <template slot-scope="scope" >
                <el-button :style="getStatus(scope.row.state, 'style')">
                  {{ getStatus(scope.row.state, 'title') }}
                </el-button>
              </template>
              </el-table-column>
            <el-table-column
              prop="delta"
              align="center"
              label="Delta">
              <template slot-scope="scope">
                <ScoreDelta :delta="scope.row.delta"></ScoreDelta>
              </template>
            </el-table-column>
              <el-table-column
                fixed="right"
                align="center"
                label="Outputs">
                <template slot-scope="scope">
                  <el-button @click="showMessage(scope.row)" size="small">check</el-button>
                </template>
              </el-table-column>
          </el-table>
          </el-col>
        </el-row>
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
      submission: [
        {
          commit_tag: '',
          course_uid: '',
          message: '',
          score: 0,
          overall_score: 0,
          submission_time: 0,
          delta: 0
        }
      ],
      assignmentDetail: {
        uid: '',
        course_uid: '',
        name: '',
        deadline: 0,
        release_date: 0,
        descr_link: ''
      },
      message: '',
      email: '',
      loading: true
    }
  },
  computed: mapState({
    getAss: state => state.assignments,
    getCoInfo: state => state.coInfo,
    getID: state => state.baseInfo.uid,
    Api: state => state.api
  }),
  props: ['deliverDetail', 'deliverInfo'],
  mounted () {
    this.submission = this.deliverDetail
    this.assignmentDetail = this.deliverInfo
    this.axios({
      method: 'GET',
      url: `${this.Api}/student/${this.getID}`
    }).then((response) => {
      let index = response.data.email.indexOf('@')
      this.email = response.data.email.slice(0, index)
    }).catch((err) => {
      this.$message({
        type: 'error',
        message: err,
        showClose: true
      })
    })
  },
  methods: {
    showMessage (data) {
      this.message = data.message
    },
    lower (word) {
      if (word === undefined) {
        return ''
      } else {
        return word.toLowerCase()
      }
    },
    renderMultipleLines (content) {
      return content.trim().replace(/\n/g, '<br/>')
    },
    getStatus (statusCode, cate) {
        if (cate === 'title') {
            switch (statusCode) {
              case 0:
                  return 'NONE';
              case 1:
                  return 'PENDING';
              case 2:
                  return 'JUDGED';
              case 3:
                  return 'INVALID';
            }
        } else {
            let bgColor = '';
            switch (statusCode) {
              case 0:
                  bgColor = 'black';
                  break;
              case 1:
                  bgColor = '#E6A23C';
                  break;
              case 2:
                  bgColor = '#67C23A';
                  break;
              case 3:
                  bgColor = bgColor = '#F56C6C';
                  break;
            }
            return `background-color:${bgColor}; color:white; width:110px;opacity: 0.7;`
        }
    }
  },
  watch: {
    deliverDetail: function (newValue) {
      this.loading = false
      this.submission = newValue
      this.message = this.submission[0].message
    }
  }
}
</script>

<style scoped>
.margins{
  margin: 1% 0 1% 2%;
}
  .code {
    font-size: 15px;
    font-family: Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
    color: white;
    min-height: 400px;
  }
  .row-main {
    margin-bottom: 10px;
  }
  .title-main {
    font-size: 25px;
  }
  .card-only {
    background-color: black;
  }
  .table-only {
    width: 100%;
  }
  .row-only {
    margin-top: 2%;
  }
  .code-two {
    font-family: Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
    font-size: 15px;
  }
  .code-box {
    min-height: 150px;
    max-height: 450px;
    overflow-y:auto;
  }
  .code-box::-webkit-scrollbar{
    display:none;
  }
</style>
