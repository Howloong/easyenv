<template>
  <div>
    <el-row type="flex">
      <el-col :span="9">
        <span>将要安装的环境：</span>
      </el-col>
      <el-col :span="15" :pull=3>
        <el-checkbox-group v-model="urls" size="large">
          <el-checkbox-button v-for="version in versions" :key="version" :label="version">
            {{ version.name }}
          </el-checkbox-button>
        </el-checkbox-group>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
      </el-col>
      <el-col>
        <el-input
            v-model="downloadDestPath"
            placeholder="Please input"
            :disabled=true
        >
          <template #prepend>文件缓存位置：</template>
          <template #append>
            <el-button :icon="FolderOpened"
                       @click="chooseDirPath('open-directory-dialog',res => this.downloadDestPath = res)"/>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-input
            v-model="installDestPath"
            placeholder="Please input"
            :disabled=true
        >
          <template #prepend>jdk安装位置：</template>
          <template #append>
            <el-button :icon="FolderOpened"
                       @click="chooseDirPath('open-directory-dialog',res => this.installDestPath = res)"/>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="7">
        <el-button type="primary" @click="install"
                   :disabled="isDisabled">安装所选环境
        </el-button>
      </el-col>
      <el-button @click="test(3)">
        test
      </el-button>
    </el-row>

    <el-dialog
        v-model="centerDialogVisible"
        title="提示"
        width="50%"
        align-center
        center
    >
      <span>{{ statusMsg }}</span>
      <el-progress
          :text-inside="true"
          color="#000000"
          :stroke-width="20"
          :percentage="percentage"
          status="success"
      />
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="js">

import {ipcRenderer} from "electron";
import {FolderOpened, Search} from "@element-plus/icons-vue";
import {join} from "node:path";
import {editRegedit} from "../../utils/editRegedit";
import {unzip} from "../../utils/unzip";
import {
  chooseDirPath,
  downloadComplete,
  downloadStart,
  updateDownloadProgress
} from "../../utils/ipcRendererManage";

const fs = require("fs");
export default {
  data() {
    return {
      urls: [],
      versions: [
        // this.version("jdk-8", "http://localhost:8080/download?fileName=test.zip"),
        // this.version("jdk-11", "http://localhost:8080/download?fileName=test.zip"),
        this.version("jdk-11", "https://cdn.azul.com/zulu/bin/zulu11.62.17-ca-jdk11.0.18-win_x64.zip"),
        this.version("jdk-8", "https://cdn.azul.com/zulu/bin/zulu8.68.0.21-ca-jdk8.0.362-win_x64.zip"),
        this.version("jdk-17", "http://localhost:8080/download?fileName=test.zip"),
        // this.version("jdk-17", "https://cdn.azul.com/zulu/bin/zulu17.40.19-ca-jdk17.0.6-win_x64.zip"),
      ],
      percentage: 0,
      nowProgressing: 0,
      centerDialogVisible: false,
      statusMsg: "",
      downloadDestPath: "",
      installDestPath: "",
    }
  },
  methods: {
    chooseDirPath,
    install() {
      this.centerDialogVisible = true;
      for (let i = 0; i < this.urls.length; i++) {
        const url = this.urls[i].url;
        this.percentage = 0;
        this.nowProgressing = (i + 1);
        let filePath;
        this.statusMsg = "正在处理……(正在下载第" + this.nowProgressing + "个包)";
        downloadStart({
          url: url,
          directory: this.downloadDestPath,
          // onCompleted:
        });
        downloadComplete((path, name) => {
          this.urls[i].filename = name;
          this.statusMsg = "正在处理……第" + this.nowProgressing + "个包下载完毕"
          filePath = path;
        })
        updateDownloadProgress(progress => this.percentage = progress.percent * 100);
        unzip(this.downloadDestPath, this.installDestPath, this.urls[i].filename, this.urls[i].name);
      }
    },
    version(name, url, filename = "") {
      return {
        name: name,
        url: url,
        fileName: filename
      }
    },
    test() {
      let file = "F:/test.zip"
      // const targetName = "3"
      unzip(file, "F:/", "test.zip",  "3", err => console.log(err));
      editRegedit(join(this.installDestPath, "/", "3"));
    },
  },
  computed: {
    FolderOpened() {
      return FolderOpened
    },
    isDisabled: function () {
      return this.urls.length === 0;
    },
  },
   mounted() {
     ipcRenderer.invoke("getSystemPath")
        .then(data => {
          this.downloadDestPath = data.download;
          this.installDestPath = data.program;
        })
  },
}
</script>

<style>
div.el-row {
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>