const fs = require('fs');
const path = require('path');

const getParty = (request, response) => {
    const file = path.resolve(__dirname, '../client/party.mp4');
    //doesnt load it, just creates a file obj

    //stat provides statistics, async
    //callback takes an err & stats obj
    //if err != null, no error
    //if ENOENT, file is not found
    fs.stat(file, (err, stats) => {
        if(err) {
            if(err.code === 'ENOENT') {
                response.writeHead(404);
            }
            return response.end(err);
        }

        let { range } = request.headers;

        if(!range) {
            range = 'bytes=0-';
        }

        const positions = range.replace(/bytes=/, '').split('-');

        let start = parseInt(positions[0], 10);

        //stats.size gives total file size in bytes
        const total = stats.size;
        const end = positions[1] ? parseInt(positions[1], 10) : total -1;

        if(start > end) {
            start = end - 1;
        }
    });
};

module.exports.getParty = getParty;
