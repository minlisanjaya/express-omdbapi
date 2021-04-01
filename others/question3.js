// function findFirstStringInBracket(str) {
//   if (str.length > 0) {
//     let indexFirstBracketFound = str.indexOf('(');
//     if (indexFirstBracketFound >= 0) {
//       let wordsAfterFirstBracket = str.substr(indexFirstBracketFound);
//       if (wordsAfterFirstBracket) {
//         wordsAfterFirstBracket = wordsAfterFirstBracket.substr(1);
//         let indexClosingBracketFound = wordsAfterFirstBracket.indexOf(')');
//         if (indexClosingBracketFound >= 0) {
//           return wordsAfterFirstBracket.substring(0, indexClosingBracketFound);
//         } else {
//           return '';
//         }
//       } else {
//         return '';
//       }
//     } else {
//       return '';
//     }
//   } else {
//     return '';
//   }
// }

function findFirstStringInBracket(str) {
  let indexOpen = str.indexOf('(');
  let indexClose = str.indexOf(')');

  if (str.length === 0 || indexOpen < 0 || indexClose < 0) {
    return '';
  }

  return str.substring(indexOpen + 1, indexClose);
}
