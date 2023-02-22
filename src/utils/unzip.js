const admZip = require("adm-zip");
const fs = require("fs");
const {join} = require("node:path");

/**
 *
 *    @param url - zip下载路径
 *    @param dst - 目标解压位置
 *    @param fileName - 文件名
 *    @param targetName - 重命名后的文件名
 *    @param callback  -回调函数
 **/

function unzip(url, dst, fileName, targetName, callback) {
    var sourcePath = join(dst, "/", removeExt(fileName));
    var targetPath = join(dst, "/", targetName);
    const zip = new admZip(url);
    /*
          fs.mkdir(dst, function (err) {
            if (err.errno === -4048) {
              ElMessageBox.alert('您当前所选安装位置为系统路径，需要使用管理员权限重新打开本程序（右键-以管理员身份运行）', '提示', {
                confirmButtonText: '好的',
                center: true,
                callback: (action) => {
                  ElMessage({
                    type: 'info',
                    message: `action: ${action}`,
                    //TODO 加入使用管理员权限重启逻辑
                  })
                },
              })
            }

            // console.log(err.code);
          });*/
    //解压到原文件名的文件夹
    zip.extractAllTo(dst, true);
    //如果改名后的文件夹存在 则删除
    if (fs.existsSync(targetPath))
        fs.rmdirSync(targetPath, {recursive: true, force: true})
    try {
        //将原文件夹更名
        fs.renameSync(sourcePath, targetPath);
    } catch (e) {
        callback(e);
    }
}

function removeExt(fileName) {
    return fileName.substring(0, fileName.lastIndexOf("."))
}

export {unzip};