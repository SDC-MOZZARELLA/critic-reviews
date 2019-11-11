function generateRandomNumber(context, events, done) {
  let random = Math.floor(Math.random() * 10000000) + 1;
  context.vars['query'] = random;
  return done();
}

module.exports = {
  generateRandomNumber: generateRandomNumber,
};
