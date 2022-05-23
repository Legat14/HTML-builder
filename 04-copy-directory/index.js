const fs = require('fs');
const path = require('path');
const events = require('events');
const EventEmitter = require('events');
const {
  emit
} = require('process');

const filesFolderPath = path.join(__dirname, 'files');
const filesCopyFolderPath = path.join(__dirname, 'files-copy');
let files = [];
const emitter = new EventEmitter();

fs.mkdir(filesCopyFolderPath, {
  recursive: true
}, error => {
  if (error) {
    console.log(error);
  }
  emitter.emit('folderExists');
});

emitter.on('folderExists', () => {
  fs.readdir(filesCopyFolderPath, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      files = data;
    }
    files.forEach(file => {
      const fileCopyPath = path.join(filesCopyFolderPath, file);
      fs.unlink(fileCopyPath, error => {
        if (error) {
          console.log(error);
        }
      });
    });
    emitter.emit('dirClean');
  });
});

emitter.on('dirClean', () => {
  fs.readdir(filesFolderPath, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      files = data;
    }
    console.log('copied files:')
    files.forEach(file => {
      const filePath = path.join(filesFolderPath, file);
      const fileCopyPath = path.join(filesCopyFolderPath, file);
      fs.copyFile(filePath, fileCopyPath, error => {
        if (error) {
          console.log(error);
        }
        console.log(file);
      });
    });
  });
});