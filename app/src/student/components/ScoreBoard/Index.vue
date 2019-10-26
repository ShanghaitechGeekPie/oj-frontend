<template>
  <div>
    <el-row >
      <el-col :span="24" class="main-center" align="middle" justify="center">
         <v-main></v-main>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import na from '../../../public/Navigation'
import main from './Main'

export default {
  data () {
    return {
      coInfo: {
      }
    }
  },
  components: {
    'v-main': main,
    'v-na': na
  },
  methods: {
  },
  created () {
    this.coInfo = this.$store.state.coInfo
  }
}
</script>
<style scoped>
 .main-center {
   width: 80%;
   margin: 30px 0 300px 160px;
 }
</style>
