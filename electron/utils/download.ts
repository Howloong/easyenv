import {download} from "electron-dl";
import {app, BrowserWindow, ipcMain} from 'electron'

const { dialog } = require('electron');

function listenDownload(win) {
    ipcMain.on("download", (event, info) => {
        info.properties.onProgress = status => win.webContents.send("download progress", status);
        info.properties.overwrite = true;
        //TODO 添加错误、取消的回调函数
        download(BrowserWindow.getFocusedWindow(), info.url, info.properties,)
            .then(dl => win.webContents.send("download complete", dl.getSavePath(), dl.getFilename()));
    })
}

function handleGetSystemPath() {
    ipcMain.handle('getSystemPath', async () => {
        return {
            download: app.getPath('downloads'),
            program: "C:\\Program Files",
            unzip: app.getPath('downloads'),
        };
    })
}

function listenOpenDirectoryDialog(callback) {
    ipcMain.on('open-directory-dialog', function (event, p) {
        callback(event,p);
    });
}

export {
    listenDownload,
    handleGetSystemPath,
    listenOpenDirectoryDialog
};