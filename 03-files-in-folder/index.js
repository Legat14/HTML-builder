const fs = require('fs');
const path = require('path');

const secretFolderPath = path.join(__dirname, 'secret-folder');

let secretFolderContent = [];

try {
  fs.readdir(secretFolderPath, {
      withFileTypes: true
    }, (error, data) => {
      if (error) throw error;
      secretFolderContent = data;
      let secretFolderFiles = [];
      secretFolderContent.forEach(file => {
        if (file.isFile()) {
          secretFolderFiles.push(file);
        }
      });
      secretFolderFiles.forEach(file => {
        let name = '';
        let ext = '';
        let pointPosition = 0;
        let size = '';
        const filePath = path.join(secretFolderPath, file.name);
        for (let i = file.name.length - 1; i >= 0; i--) {
          if (file.name[i] === '.') {
            pointPosition = i;
            break;
          }
        }
        name = file.name.substring(0, pointPosition);
        ext = file.name.substring(pointPosition + 1);
        fs.stat(filePath, (error, stats) => {
          if (error) {
            console.log(error);
          } else {
            size = (Math.floor((stats.size / 1024) * 100) / 100) + 'Kb';
          }
          console.log(`${name} - ${ext} - ${size}`);
        });
      });
    }
  )}
  catch (error) {
    console.log(error);
  }