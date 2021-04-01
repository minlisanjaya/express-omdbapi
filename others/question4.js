const words = ['kita', 'atik', 'tika', 'aku', 'kia', 'makan', 'kua'];
const tempGroup = {};

for (let i = 0; i < words.length; i++) {
  const word = words[i];
  const key = word.split('').sort().join();

  if (tempGroup.hasOwnProperty(key)) {
    tempGroup[key].push(word);
  } else {
    tempGroup[key] = [word];
  }
}

const finalGroup = [];
for (const item in tempGroup) {
  finalGroup.push(tempGroup[item]);
}

console.log(finalGroup);
