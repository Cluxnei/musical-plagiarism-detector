const notes = [
  ['C', 'B#'],
  ['C#', 'Db'],
  ['D'],
  ['D#', 'Eb'],
  ['E', 'Fb'],
  ['F', 'E#'],
  ['F#', 'Gb'],
  ['G'],
  ['G#', 'Ab'],
  ['A'],
  ['A#', 'Bb'],
  ['B', 'Cb'],
];
const findDistanceBetweenTwoNotes = (noteA, noteB) => {
  if (noteA === noteB) {
    return 0;
  }
  const noteAIndex = notes.findIndex(n => n.includes(noteA));
  let semiTons = 0, i = noteAIndex;
  while(1) {
    if (i > 11) {
      i = 0;
    }
    if (notes[i].includes(noteB)) {
      return semiTons;
    }
    i++;
    semiTons++;
  }
};
const mapNoteDistances = (note, i, notes) => {
  if (i + 1 < notes.length) {
    return findDistanceBetweenTwoNotes(note, notes[i + 1]);
  }
  return -1;
};
const input = require('fs').readFileSync('./1.txt', 'utf8');
const lines = input.split('\n');
let i = 0;
while (lines[i].trim() !== '0 0') {
  const original = lines[i + 1].trim().split(' ');
  const originalDistances = original.map((note, i) => mapNoteDistances(note, i, original));
  const copy = lines[i + 2].trim().split(' ');
  const copyDistances = copy.map((note, i) => mapNoteDistances(note, i, copy));
  originalDistances.pop();
  copyDistances.pop();
  const originalDistancesString = originalDistances.join('');
  const copyDistancesString = copyDistances.join('');
  console.log(originalDistancesString);
  console.log(copyDistancesString);
  const isCopy = originalDistancesString.includes(copyDistancesString);
  console.log(isCopy ? 'S' : 'N');
  i += 3;
}