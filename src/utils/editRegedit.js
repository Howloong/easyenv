const regedit = require("regedit");
const fs = require("fs");

function editRegedit(installDst) {
    //备份原Path
    let defaultValue = process.env.Path;
    // 新增键值对
    const newVaulesPut = {
        "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment": {
            'TEST': {
                value: installDst,
                type: 'REG_SZ'
            }
        }
    };
    var pathValue = defaultValue.charAt(defaultValue.length - 1)
    if (pathValue === ";") {
        defaultValue = defaultValue.substr(0, defaultValue.length - 1)
    }
    var appendVaulesPut = {
        "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Environment": {
            'PATH': {
                value: defaultValue + ";%JAVA_HOME%\\bin;%JAVA_HOME%\\jre\\bin;",
                type: 'REG_SZ'
            }
        }
    }
        //新建一个子项
    regedit.putValue(newVaulesPut, (err) => {
        console.log(err)
    })
        //将刚才新建的子项附加到PATH子项中
    regedit.putValue(appendVaulesPut, (err) => {
        console.log(err)
    })
    fs.writeFile('backup.txt', defaultValue, (error) => {
        if (error) {
            console.log(error)
            return false
        }
    })
}

export {editRegedit}
