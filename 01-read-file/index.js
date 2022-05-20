const fs = require('fs');
const path = require('path');

const dirPath = path.dirname(__filename);
const textPath = path.join(dirPath, 'text.txt');
const stream = fs.createReadStream(textPath, 'utf-8');

let data = '';

stream.on('data', chunk => {
  data += chunk;
});

stream.on('end', () => {
  console.log(data);
});

stream.on('error', () => {
  console.log('Error');
});