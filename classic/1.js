const notes = {
  'C': 0,
  'B#': 0,
  'Db': 1,
  'C#': 1,
  'D': 2,
  'D#': 3,
  'Eb': 3,
  'E': 4,
  'Fb': 4,
  'F': 5,
  'E#': 5,
  'F#': 6,
  'Gb': 6,
  'G': 7,
  'G#': 8,
  'Ab': 8,
  'A': 9,
  'A#': 10,
  'Bb': 10,
  'B': 11,
  'Cb': 11,
  // 'A#': 11,
};
const input = require('fs').readFileSync('./2.txt', 'utf8'); // .readFileSync('/dev/stdin', 'utf8');
const lines = input.split('\n');
let i = 0;
while (lines[i].trim() !== '0 0') {
  const original = lines[i + 1].trim().split(' ');
  const originalDistances = [];
  for (let j = 0; j < original.length - 1; j++) {
    originalDistances[j] = notes[original[j]] - notes[original[j + 1]];
  }
  const originalDistancesString = originalDistances.join('');
  let copy = lines[i + 2].trim().split(' ');
  let copyDistances = [];
  for (let j = 0; j < copy.length - 1; j++) {
    copyDistances[j] = notes[copy[j]] - notes[copy[j + 1]];
  }
  let copyDistancesString = copyDistances.join('');
  let toCompare = originalDistancesString + (originalDistancesString.substring(0, copyDistancesString.length));
  if (toCompare.includes(copyDistancesString)) {
    console.log('S');
    continue;
  }
  let yep = false;
  let transposition = [];
  for (let t = 1; t <= 14; t++) {
    for (let j = 0; j < copyDistances.length; j++) {
      transposition[j] = copyDistances[j]  + (t <= 7 ? t : (t % 7) * -1);
    }
    copyDistancesString = transposition.join('');
    toCompare = originalDistancesString + (originalDistancesString.substring(0, copyDistancesString.length));
    if (toCompare.includes(copyDistancesString)) {
      console.log('S');
      yep = true;
      break;
    }
  }
  if (!yep) {
    console.log('N');
  }
  i += 3;
}