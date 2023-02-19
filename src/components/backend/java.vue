<template>
  <div>
    <el-checkbox-group v-model="checkboxGroup1" size="large">
      <el-checkbox-button v-for="version in versions" :key="version" :label="version">
        {{ version.name }}
      </el-checkbox-button>
    </el-checkbox-group>
    <el-container>
      <el-tag v-for="v in checkboxGroup1">
        {{ v.name }}
      </el-tag>
    </el-container>
    <el-button type="primary" @click="install">安装所选环境</el-button>
  </div>

</template>

<script lang="js">
import {ref} from 'vue'
import axios from "axios";

export default {
  data() {
    return {
      versions: [
        this.version("jdk-1.8", ""),
        this.version("jdk-11", ""),
        this.version("jdk-17", ""),
      ],
      checkboxGroup1:ref([])
    }
  },
  methods: {
    install(url) {
      axios({
        url:url,
        method: 'POST',
        responseType:'blob'
      }).then(function (response) {

      })
    },
    version: function (name, url) {
      return {
        name: name,
        url: url
      }
    },
  },
}
</script>

<style scoped>

</style>