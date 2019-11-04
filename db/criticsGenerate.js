const faker = require('faker');
const Randomly = require('./randomGenerate.js');

module.exports.generateCritics = (arrToTransform) => {
  const firstNames = ['Daron', 'Dan', 'Swefski', 'May', 'Author', 'Julia', 'Pon', 'Tarro', 'Envy', 'Lust', 'Lunia', 'Ron', 'Tinny'];
  const lastNames = ['Smith', 'Faber', 'Welthy', 'December', 'White', 'Denney', 'Tomato', 'Conny', 'Envy', 'Lust', 'Fon', 'Jocuse', 'Mini'];

  for (let i = 0; i < firstNames.length; i++) {
    for (let j = 0; j < lastNames.length; j++) {
      arrToTransform.push([firstNames[i] + ' ' + lastNames[j], Randomly.RandomPhoto(), faker.internet.domainName()])
    }
  }
}




