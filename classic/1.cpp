#include <iostream>
#include <utility>
#include <string>
#include <vector>

using namespace std;

int main() {
   pair<string, int> notes[] = {
      make_pair("C", 0),
      make_pair("B#", 0),
      make_pair("Db", 1),
      make_pair("C#", 1),
      make_pair("D", 2),
      make_pair("D#", 3),
      make_pair("Eb", 3),
      make_pair("E", 4),
      make_pair("Fb", 4),
      make_pair("F", 5),
      make_pair("E#", 5),
      make_pair("F#", 6),
      make_pair("Gb", 6),
      make_pair("G", 7),
      make_pair("G#", 8),
      make_pair("Ab", 8),
      make_pair("A", 9),
      make_pair("A#", 10),
      make_pair("Bb", 10),
      make_pair("B", 11),
      make_pair("Cb", 11),
   };
   while (1) {
      unsigned int originalNotesCount, copyNotesCount;
      string originalTrack, copyTrack;
      cin >> originalNotesCount >> copyNotesCount;
      getchar();
      getline(cin, originalTrack);
      getline(cin, copyTrack);
      if (originalNotesCount == copyNotesCount && originalNotesCount == 0) {
         break;
      }
      string originalNotes, copyNotes;
      int previousNoteValue = -1;
      for (int i = 0, s = originalTrack.length(); i < s; i++) {
         char currentChar = originalTrack[i], nextChar = '1';
         int nextI = i + 1;
         if (nextI < s) {
            nextChar = originalTrack[nextI];
         }
         if (currentChar == ' ' || currentChar == '#' || currentChar == 'b') {
            continue;
         }
         string note(1, currentChar);
         if (nextChar != '1' && (nextChar == 'b' || nextChar == '#')) {
            note += nextChar;
         }
         int noteValue = -1;
         for (int j = 0; j < 20; j++) {
            if (notes[j].first == note) {
               noteValue = notes[j].second;
               break;
            }
         }
         if (previousNoteValue != -1) {
            originalNotes += to_string(previousNoteValue - noteValue) + " ";
         }
         previousNoteValue = noteValue;
      }
      previousNoteValue = -1;
      for (int i = 0, s = copyTrack.length(); i < s; i++) {
         char currentChar = copyTrack[i], nextChar = '1';
         int nextI = i + 1;
         if (nextI < s) {
            nextChar = copyTrack[nextI];
         }
         if (currentChar == ' ' || currentChar == '#' || currentChar == 'b') {
            continue;
         }
         string note(1, currentChar);
         if (nextChar != '1' && (nextChar == 'b' || nextChar == '#')) {
            note += nextChar;
         }
         int noteValue = -1;
         for (int j = 0; j < 20; j++) {
            if (notes[j].first == note) {
               noteValue = notes[j].second;
               break;
            }
         }
         if (previousNoteValue != -1) {
            copyNotes += to_string(previousNoteValue - noteValue) + " ";
         }
         previousNoteValue = noteValue;
      }
      cout << "Original notes distances" << endl;
      cout << originalNotes << endl;
      cout << "Copy notes distances" << endl;
      cout << copyNotes << endl;
      if (originalNotes.find(copyNotes) != string::npos) {
         cout << "S" << endl;
         continue;
      }      
      cout << "N" << endl;
   }
   return 0;
}