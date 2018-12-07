<template>
  <div>
    <el-row>
      <el-table
        :data="coState"
        style="width: 100%"
        stripe>
        <el-table-column
          prop="name"
          label="NAME"
          >
        </el-table-column>
        <el-table-column
          prop="state"
          label="STATUS"
          width="180">
        </el-table-column>
        <el-table-column
          prop="release"
          label="RELEASE">
        </el-table-column>
        <el-table-column
          prop="due"
          label="DUE(CST"
          width="180"
          >       <!-- v-bind:style="classcolor(costate.state)" -->
        </el-table-column>
     </el-table>
    </el-row>
    <el-row style="justify-content: center" type="flex">
      <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      coState: [{
        name: 'dasdas',
        state: 'asdasd',
        release: 'fsfda',
        due: '12323',
        check: true
      }]
    }
  }
}
</script>
<style>
</style>
