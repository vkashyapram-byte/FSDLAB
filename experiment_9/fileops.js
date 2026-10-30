const fs = require('fs');
// Write to a file
fs.writeFile('students.txt', 'Student 1: Rohit Kumar\nStudent 2: Ananya Sharma\n', (err) => {
 if (err) throw err;
 console.log('File written successfully.');
});
// Read from the file
fs.readFile('students.txt', 'utf8', (err, data) => {
 if (err) throw err;
 console.log('File Content:\n' + data);
});
// Append data to the file
fs.appendFile('students.txt', 'Student 3: Vikram Rao\n', (err) => {
 if (err) throw err;
 console.log('Data appended successfully.');
});

fs.access('students.txt', fs.constants.F_OK, (err) => {
 if (!err) {
 fs.unlink('students.txt', (err) => {
 if (err) throw err;
 console.log('File deleted successfully.');
 });
 }
});

fs.writeFileSync('temp.txt', 'Temporary file');
fs.renameSync('temp.txt', 'renamed_temp.txt');
console.log('File renamed successfully.');
