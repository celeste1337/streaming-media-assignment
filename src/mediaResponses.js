const fs = require('fs');
const path = require('path');

const getParty = (request, response) => {
    const file = path.resolve(__dirname, '../client/party.mp4');
    //doesnt load it, just creates a file obj

    //stat provides statistics, async
    //callback takes an err & stats obj
    //if err != null, no error
    //if ENOENT, file is not found
    fs.stat(file, (err, stats)) => {
        if(err) {
            if(err.code === 'ENOENT') {
                response.writeHead(404);
            }
            return response.end(err);
        }
    }
};

module.exports.getParty = getParty;
