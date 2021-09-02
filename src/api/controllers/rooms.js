const Tokbox = require(`../services/tokbox/tokbox`);
const OpenTok = require('opentok');
const apiKey = process.env.TOKBOX_API_KEY;
const secret = process.env.TOKBOX_API_SECRET;

var roomToSessionIdDictionary = {};

exports.test = (req, res) => {
    res.status(200).json({data: `TEST SUCCESSFULL!`});
}

exports.getSession = async (req, res) => {
    try {
        const opentok = new OpenTok(apiKey, secret);
        const roomName = req.params.name;
        let sessionId;
        let token;
        console.log('attempting to create a session associated with the room: ' + roomName);

        console.log("List of current rooms: ");
        console.log(roomToSessionIdDictionary);

        // if the room name is associated with a session ID, fetch that
        if (roomToSessionIdDictionary[roomName]) {
            sessionId = roomToSessionIdDictionary[roomName];
            console.log(sessionId);

            // generate token
            token = opentok.generateToken(sessionId);
            
            res.status(200).json({
                apiKey,
                sessionId,
                token,
                name: roomName,
            });
        }
        // if this is the first time the room is being accessed, create a new session ID
        else {
            opentok.createSession({ mediaMode: 'routed' }, function (err, session) {
                if (err) {
                    console.log(err);
                    res.status(500).send({ error: 'createSession error:' + err });
                    return;
                }

                roomToSessionIdDictionary[roomName] = session.sessionId;

                // generate token
                token = opentok.generateToken(session.sessionId);

                res.status(200).json({
                    apiKey: apiKey,
                    sessionId: session.sessionId,
                    token: token,
                    name: roomName
                });
            });
        }
    } catch (error) {
        console.log(error);
    }
}