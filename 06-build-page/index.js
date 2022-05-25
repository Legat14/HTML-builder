const fs = require('fs');
const path = require('path');
const eventEmitter = require('events');
const {
  emit
} = require('process');

const distFolderPath = path.join(__dirname, 'project-dist');
const htmlFilePath = path.join(distFolderPath, 'index.html');
const templatePath = path.join(__dirname, 'template.html');
const componentsFolderPath = path.join(__dirname, 'components');
const stylesFolderPath = path.join(__dirname, 'styles');

//------Create dir------//

function createDistFolder() {
  fs.mkdir(distFolderPath, {
    recursive: true
  }, error => {
    if (error) return console.log(error);
  });
}

//------HTML------//

async function htmlTemplateHandler() {
  let htmlContent = '';
  const readTemplate = await fs.promises.readFile(templatePath, 'utf-8');
  const readComponentsArr = await fs.promises.readdir(componentsFolderPath, {
    withFileTypes: true
  });
  htmlContent = readTemplate;

  for (let file of readComponentsArr) {
    if (file.isFile() && file.name.slice(-5) === '.html') {
      const fileWithoutExt = file.name.substring(0, file.name.length - 5);

      if (htmlContent.includes(`{{${fileWithoutExt}}}`)) {
        const readFile = await fs.promises.readFile(path.join(__dirname, 'components', file.name), 'utf-8');
        htmlContent = htmlContent.replace(`{{${fileWithoutExt}}}`, readFile);
      }
    }
  }
  await fs.promises.writeFile(htmlFilePath, htmlContent);
}

createDistFolder();
htmlTemplateHandler();

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

const assetsFolderPath = path.join(__dirname, 'assets');
const assetsCopyFolderPath = path.join(distFolderPath, 'assets');
let files = [];
const emitter = new eventEmitter();

fs.rm(assetsCopyFolderPath, {
  recursive: true
}, error => {
  if (error) {}
  recursiveContentCopy(assetsCopyFolderPath, assetsFolderPath);
});

async function recursiveContentCopy(copyFolderPath, originalFolderPath) {

  const createNewFolder = await fs.promises.mkdir(copyFolderPath, {
    recursive: true
  }, error => {
    if (error) {
      console.log(error);
    }
  });

  fs.readdir(originalFolderPath, {
    withFileTypes: true
  }, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      files = data;
    }
    for (let file of files) {
      const originalAssetPath = path.join(originalFolderPath, file.name);
      const copyAssetPath = path.join(copyFolderPath, file.name);
      if (file.isFile()) {
        fs.copyFile(originalAssetPath, copyAssetPath, error => {
          if (error) {
            console.log(error);
          }
        });
      } else if (file.isDirectory()) recursiveContentCopy(copyAssetPath, originalAssetPath);
    }
  });
}