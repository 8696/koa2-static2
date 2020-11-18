const fs = require('fs');

module.exports = {
  fsStat(filePath, options = {}) {
    return new Promise((resolve, reject) => {
      fs.stat(filePath, options,
        (err, stat) => {
          if (err) return reject(err);
          resolve(stat);
        });
    });
  },
  fsStatSync(filePath, options = {}) {
    return fs.statSync(filePath, options);
  },
  getValueType(value) {
    return /\[object ([\w\W]+)\]/.exec(({}).toString.call(value))[1].toLowerCase();
  },
  checkExtension(extensions, filePath) {
    return extensions.some(item => {
      return new RegExp('.' + item + '$').test(filePath);
    });
  }
};
