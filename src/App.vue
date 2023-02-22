<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu router
                 @open="handleOpen"
                 @close="handleClose"
                 :default-openeds="opened"
        >
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <location/>
              </el-icon>
              <span>后端常用</span>
            </template>
            <el-menu-item index="/java" @click="handleOpen">Java</el-menu-item>
            <el-menu-item index="/python">Python</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import {
  Location,
} from '@element-plus/icons-vue'

const handleOpen = (key: string, keyPath: string[]) => {
}
const handleClose = (key: string, keyPath: string[]) => {
}


</script>
<script lang="ts">

import * as child_process from "child_process";
import {Action, ElMessage, ElMessageBox} from "element-plus";
import {ipcRenderer} from "electron";

const remote = require('electron').remote

export default {
  data() {
    return {
      opened: ['1'],
    }
  },
  mounted() {
    let isElevated;
    try {
      child_process.execFileSync("net", ["session"], {"stdio": "ignore"});
      isElevated = true;
    } catch (e) {
      isElevated = false;
    }
    if (!isElevated) {
      ElMessageBox.alert('本应用涉及到注册表的修改，因此必须以管理员身份启动。请重新打开本程序（右键-以管理员身份运行）', '警告', {
        confirmButtonText: '退出',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        callback: () => {
          ipcRenderer.send('closeApp')
        }
      })
    }
  }
}
</script>