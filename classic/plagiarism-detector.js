const notes = [
  ['C', 'B#'],
  ['C#', 'Db'],
  ['D'],
  ['D#', 'Eb'],
  ['E', 'Fb'],
  ['F', 'Eb'],
  ['F#', 'Gb'],
  ['G'],
  ['G#', 'Ab'],
  ['A'],
  ['A#', 'Bb'],
  ['B', 'A#'],
];
const findDistanceBetweenTwoNotes = (noteA, noteB) => {
  const noteAIndex = notes.findIndex(n => n.includes(noteA));
  if (noteAIndex === -1) {
    return undefined;
  }
  let semiTons = 0;
  for (let i = noteAIndex; i < notes.length; i++) {
    if (notes[i].includes(noteB)) {
      return semiTons;
    }
    semiTons++;
  }
  for (let i = 0; i < noteAIndex; i++) {
    if (notes[i].includes(noteB)) {
      return semiTons;
    }
    semiTons++;
  }
};
const mapNoteDistances = (note, i, notes) => {
  if (i + 1 < notes.length) {
    return findDistanceBetweenTwoNotes(note, notes[i + 1]);
  }
  return -1;
};

const input = require('fs').readFileSync('/dev/stdin', 'utf8');
const lines = input.split('\n');
let i = 0;
while (lines[i].trim() !== '0 0') {
  const original = lines[i + 1].trim().split(' ');
  const originalDistances = original.map((note, i) => mapNoteDistances(note, i, original));
  const copy = lines[i + 2].trim().split(' ');
  const copyDistances = copy.map((note, i) => mapNoteDistances(note, i, copy));
  originalDistances.pop();
  copyDistances.pop();
  console.log(originalDistances.join('').includes(copyDistances.join('')) ? 'S' : 'N');
  i += 3;
}
