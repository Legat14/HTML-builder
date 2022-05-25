const fs = require('fs');
const path = require('path');
const eventEmitter = require('events');
const {
  emit
} = require('process');

const distFolderPath = path.join(__dirname, 'project-dist');
const htmlFilePath = path.join(distFolderPath, 'index.html');
const templatePath = path.join(__dirname, 'template.html');
const stylesFolderPath = path.join(__dirname, 'styles');
const componentsFolderPath = path.join(__dirname, 'components');
const emitter = new eventEmitter();
const componentsContentObj = {};
let componentsFolderContent = [];
let componentsFolderFileNames = [];
let replacedData = [];
const inputTemplate = fs.createReadStream(templatePath, 'utf-8');

function replaceStringForContent(fileName) {
  filePath = path.join(componentsFolderPath, `${fileName}.html`);
  const componentStream = fs.createReadStream(filePath, 'utf-8');
  let data = '';
  componentStream.on('data', chunk => data += chunk);
  componentStream.on('end', () => {
    console.log(data);
    return data;
  });
}

function createDistFolder() {
  fs.mkdir(distFolderPath, {
    recursive: true
  }, error => {
    if (error) return console.log(error);
  });
  console.log('createDistFolder');
}

function readContent() {

  let templateData = '';
  inputTemplate.on('data', chunk => {
    templateData += chunk;
  });

  inputTemplate.on('end', () => {
    makeTemplateArr(templateData)
  });
}

function writeInConsole(item) {
  console.log(item);
}

function makeTemplateArr(templateData) {
  console.log('makeTemplateArr');
  templateData = templateData.replaceAll('\r', '');
  const templateDataArr = templateData.split('\n');
  recursiveAssemble(templateDataArr, 0, '');
}

function recursiveAssemble(templateDataArr, i, write) {
  console.log('temp - ', templateDataArr);
  write = fs.writeFile(htmlFilePath, '', error => {
    if (error) console.log(error);
  });
  while (i < templateDataArr.length) {
    write += fs.writeFile(htmlFilePath, templateDataArr[i], true, error => {
        i++;
      }
    }
  }

  // function replaceTampleteComands(templateDataArr) {
  //   templateDataArr.forEach((str, srtNumber) => {
  //     const stringWithoutSpaces = str.replaceAll(' ', '');
  //     if (stringWithoutSpaces.substring(0, 2) === '{{' && stringWithoutSpaces.slice(-2) === '}}') {
  //       const templateString = stringWithoutSpaces.substring(2, stringWithoutSpaces.length - 2);
  //       replacedData[srtNumber] = replaceStringForContent(templateString, srtNumber);
  //     } else {
  //       replacedData[srtNumber] = str + '\n';
  //     }
  //   });
  //   console.log(replacedData);
  // }

  async function launchFunction() {
    createDistFolder();
    readContent();
  }

  launchFunction();

  // function replaceContent() {
  //   console.log('function runs');

  //   let templateData = '';
  //   inputTemplate.on('data', chunk => {
  //     console.log('reading template');
  //     templateData += chunk;
  //   });

  //   inputTemplate.on('end', () => {
  //     iterateTemplateData();
  //   });

  //   async function iterateTemplateData() {
  //     console.log('reading template is over');
  //     templateData = templateData.replaceAll('\r', '');
  //     const templateDataArr = templateData.split('\n');
  //     templateDataArr.forEach((str, srtNumber) => {
  //       const stringWithoutSpaces = str.replaceAll(' ', '');
  //       if (stringWithoutSpaces.substring(0, 2) === '{{' && stringWithoutSpaces.slice(-2) === '}}') {
  //         const templateString = stringWithoutSpaces.substring(2, stringWithoutSpaces.length - 2);
  //         replaceStringForContent(templateString, srtNumber);
  //       } else {
  //         replacedData[srtNumber] = str + '\n';
  //       }
  //     });
  //     //console.log(replacedData);
  //   }

  //   inputTemplate.on('error', error => console.log(error));
  // }

  // function writeInConsole(item) {
  //   console.log(item);
  // }


  // async function launchFunction() {
  //   replaceContent();
  //   await writeInConsole(replacedData);
  // }

  // launchFunction();

  // async function launchFunction() {
  //   console.log(componentsContentObj);
  //   getContentData();
  //   emitter.on('components-readed', () => {
  //     console.log('callback runs');
  //     replaceContent();
  //   });
  //   await emitter.emit('components-readed');
  //   await console.log(componentsContentObj);
  // }

  // launchFunction();


  // function getContentData() {
  //   fs.readdir(componentsFolderPath, (error, data) => {
  //     if (error) console.log(error);
  //     else componentsFolderContent = data;
  //     componentsFolderContent.forEach(file => {
  //       const filePath = path.join(componentsFolderPath, file);
  //       const fileExt = file.slice(-5);
  //       fs.stat(filePath, (error, stats) => {
  //         if (error) console.log(error);
  //         if (fileExt === '.html' && stats.isFile()) {
  //           componentsFolderFileNames.push(file.substring(0, file.length - 5));
  //           const componentStream = fs.createReadStream(filePath, 'utf-8');
  //           let data = ''
  //           componentStream.on('data', chunk => data += chunk);
  //           componentStream.on('end', () => {
  //             componentsContentObj[file] = data;
  //           });
  //         }
  //       });
  //     });
  //   });
  // }

  // function replaceContent() {
  //   console.log('function runs');

  //   let templateData = '';
  //   inputTemplate.on('data', chunk => {
  //     templateData += chunk;
  //   });

  //   inputTemplate.on('end', () => {
  //     console.log(componentsContentObj);
  //     templateData = templateData.replaceAll('\r', '');
  //     const templateDataArr = templateData.split('\n');
  //     templateDataArr.forEach(str => {
  //       const stringWithoutSpaces = str.replaceAll(' ', '');
  //       if (stringWithoutSpaces.substring(0, 2) === '{{' && stringWithoutSpaces.slice(-2) === '}}') {
  //         const templateString = stringWithoutSpaces.substring(2, stringWithoutSpaces.length - 2);
  //         componentsFolderFileNames.forEach(fileName => {
  //           if (fileName === templateString) {
  //             const filePath = path.join(componentsFolderPath, `${fileName}.html`);
  //             replacedData.push(stringWithoutSpaces);
  //           }
  //         });
  //       } else {
  //         replacedData.push(str + '\n');
  //       }
  //     });
  //     console.log(replacedData);
  //   });

  // inputTemplate.on('error', error => console.log(error));
  // }


  //---------------CSS--------------//

  const bundleFilePath = path.join(distFolderPath, 'style.css');
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
          readableStream.on('end', () => output.write('\n'));
        }
      });
    });
  });

  //---------------Coty files--------------//

  // const assetsFolderPath = path.join(__dirname, 'assets');
  // const assetsCopyFolderPath = path.join(distFolderPath, 'assets');
  // let files = [];

  // fs.mkdir(assetsCopyFolderPath, {
  //   recursive: true
  // }, error => {
  //   if (error) {
  //     console.log(error);
  //   }
  //   emitter.emit('folderExists');
  // });

  // emitter.on('folderExists', () => {
  //   fs.readdir(assetsFolderPath, (error, data) => {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       files = data;
  //     }
  //     files.forEach(file => {
  //       const assetCopyPath = path.join(assetsCopyFolderPath, file);
  //       fs.unlink(assetCopyPath, error => {
  //         if (error) {
  //           console.log(error);
  //         }
  //       });
  //     });
  //     emitter.emit('dirClean');
  //   });
  // });

  // emitter.on('dirClean', () => {
  //   fs.readdir(assetsFolderPath, (error, data) => {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       files = data;
  //     }
  //     console.log('copied files:')
  //     files.forEach(file => {
  //       const assetsPath = path.join(assetsFolderPath, file);
  //       const assetsCopyPath = path.join(assetsCopyFolderPath, file);
  //       fs.copyFile(assetsPath, assetsCopyPath, error => {
  //         if (error) {
  //           console.log(error);
  //         }
  //         console.log(file);
  //       });
  //     });
  //   });
  // });