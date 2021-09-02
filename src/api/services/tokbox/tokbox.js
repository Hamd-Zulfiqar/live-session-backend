const { token } = require('morgan');
const OpenTok = require('opentok');
const apiKey = process.env.TOKBOX_API_KEY;
const secret = process.env.TOKBOX_API_SECRET;

if (!apiKey || !secret) {
  console.error('=========================================================================================================');
  console.error('');
  console.error('Missing TOKBOX_API_KEY or TOKBOX_SECRET');
  console.error('Find the appropriate values for these by logging into your TokBox Dashboard at: https://tokbox.com/account/#/');
  console.error('');
  console.error('=========================================================================================================');
  process.exit();
}

var opentok = new OpenTok(apiKey, secret);
var roomToSessionIdDictionary = {};
let room;

module.exports = {
  createSession: async function(name){
    if(roomToSessionIdDictionary[name]){
      console.log(`Room already exists!`);
      return false;
    } else {
      await opentok.createSession({ mediaMode: 'routed' }, function (err, session) {
        if (err) {
          console.log(err);
          res.status(500).send({ error: 'createSession error:' + err });
          console.log(`Failed to Create Session!`);
          return false;
        }
  
        roomToSessionIdDictionary[name] = session.sessionId;
        room = JSON.parse(JSON.stringify(session));
        return room;
      });
    }
  },
  generateToken: async function(sessionId) {
    const token = await opentok.generateToken(sessionId);
    return token;
  }
}