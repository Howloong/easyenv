<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <el-menu router
                 @open="handleOpen"
                 @close="handleClose"
                 :default-openeds="opened"
                 :default-active="$router.path"
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
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<script lang="ts">

export default {
  data() {
    return {
      opened: ['1']
    }
  }
}
</script>