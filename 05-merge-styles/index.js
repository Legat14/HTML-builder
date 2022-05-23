const fs = require('fs');
const path = require('path');
const eventEmitter = require('events');

const distFolderPath = path.join(__dirname, 'project-dist');
const bundleFilePath = path.join(distFolderPath, 'bundle.css');
const stylesFolderPath = path.join(__dirname, 'styles');
const emitter = new eventEmitter();
let stylesFolderContent = [];
const output = fs.createWriteStream(bundleFilePath);

fs.readdir(stylesFolderPath, (error, data) => {
  if (error) console.log(error);
  else stylesFolderContent = data;
  stylesFolderContent.forEach(file => {
    const filePath = path.join(stylesFolderPath, file);
    const fileExt = file.slice(-4);
    fs.stat(filePath, (error, stats) => {
      if (error) console.log(error);
      if (fileExt === '.css' && stats.isFile()) {
        const readableStream = fs.createReadStream(filePath, 'utf-8');
        readableStream.on('data', chunk => {
          output.write(chunk + '\n\n');
        });
      }
    });
  });
});