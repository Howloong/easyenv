import {ipcRenderer} from "electron";

function chooseDirPath(channel, callback) {
    ipcRenderer.send(channel, 'openDirectory');
    ipcRenderer.on("selectedDir", (e, path) => callback(path))
}

function downloadStart(options) {
    ipcRenderer.send("download", options);
}

function downloadComplete(callback) {
    ipcRenderer.on("download complete", (event, path, name) => {
        callback(path, name);
    })
}

function updateDownloadProgress(callback) {
    ipcRenderer.on("download progress", (event, progress) => {
        callback(progress);
    })
}

export {chooseDirPath, downloadStart, downloadComplete, updateDownloadProgress};