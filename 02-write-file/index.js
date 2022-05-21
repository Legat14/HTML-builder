const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'console-text.txt');
const output = fs.createWriteStream(filePath);
const { stdin } = process;

console.log('Hello, user. Please enter your message, or type "exit" to quit program:');

stdin.on('data', data => {
  if (data.toString() === 'exit\r\n' || data.toString() === 'exit\n' || data.toString() === 'exit\r' || data.toString() === 'exit') {
    console.log('Exit program. Bye!');
    process.exit();
  }
  console.log('Written in the file console-text.txt: ', data.toString());
  console.log('Type something more, or type "exit" to quit program:');
});

stdin.on('data', chunk => {
  output.write(chunk);
});

stdin.on('error', () => {
  console.log('Error while input');
});

output.on('error', () => {
  console.log('Error while output');
});