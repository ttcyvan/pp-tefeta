var fs  = require('fs');

const files = fs.readdirSync('data/maps');

const rect1 = fs.readFileSync('data/maps/' + files[2], 'utf-8');

const fileAsArray = rect1.split('\n');

console.log('fileAsArray:', fileAsArray)

let start = 0;
let end = 0;

fileAsArray.forEach((line :any, key: any) => {
  if (line == fileAsArray[0]) {
    console.log('not this line');
    return true;
  } else {
    const arrayLine = line.split('');
    arrayLine.find((e :any) => {
      if (e == '1') {
        start = key;
      }
      if (e == '2') {
        end = key;
      }
    });
  }
});

console.log(start);
console.log(end);

function resolve(startLine: number, nextLine: number): any {
  const line = fileAsArray[startLine];
  const next = fileAsArray[nextLine];
  let continueRight = true;
  let continueLeft = true;

  const arrayStartLine = line.split('');
  const arrayNextLine = next.split('');
  let startingPointIndex: number | undefined;


  if (startLine == start) {
    startingPointIndex = arrayStartLine.findIndex((e :any) => e == '1');
  } else {
    startingPointIndex = arrayStartLine.findIndex((e :any) => e == '0');
  }

  for (let i = startingPointIndex; i < arrayStartLine.length; i++) {
    if (arrayStartLine[i] == '*' || arrayStartLine[i] == '\n') {
      continueRight = false;
    } else if (arrayStartLine[i] == '2') {
      return true;
    } else {
      if (continueRight != false) {
        if (arrayNextLine[i] == ' ') {
          arrayNextLine[i] = '0';
          return resolve(startLine + 1, nextLine + 1);
        }
      }
    }
  }

  for (let i = startingPointIndex; i < 9; i) {
    console.log('ok');
    if (arrayStartLine[i] == '*' || arrayStartLine[i] == '\n') {
      continueLeft = false;
    } else if (arrayStartLine[i] == '2') {
      console.log('ok');
      return true;
    } else {
      if (continueLeft != false) {
        if (arrayNextLine[i] == ' ') {
          arrayNextLine[i] = '0';
          return resolve(startLine + 1, nextLine + 1);
        }
      }
    }
  }
}

resolve(start, start + 1);