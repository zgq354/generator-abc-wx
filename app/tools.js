'use strict';
const fs = require('fs');

module.exports = {
  fileExist: (name, dirPath) => {
    let dirInfo;

    try {
      dirInfo = fs.readdirSync(dirPath);
    } catch (e) {
      // 要检测的冲突目录不存在，直接返回“无冲突”
      return false;
    }

    return dirInfo.indexOf(name) > -1;
  }
}
