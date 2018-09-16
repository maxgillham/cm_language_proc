// test version
exports.test = function(req, res) {
  res.send('Greetings from test controller');
};

exports.voice_submit = function(req, res, next) {
  res.send('Voice submitting');
};
