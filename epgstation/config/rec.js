var request = require('request');

h2z = str => {
    tmp = str.replace(/[！-～]/g, function(s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    });
    return tmp.replace(/　/g," ");
}

head = "The recording has been updated.";

switch(process.argv[2]) {
    case 'add':
        head = "The recording has been added.";
        break;
}

request({
    url: 'https://api.daco.dev/w/?key=dm5nT4nshQ1KxZwFv4A9EQ',
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({text: `${head}
Title:${process.env.NAME?h2z(process.env.NAME):process.env.NAME}
Channel:${process.env.CHANNELNAME?h2z(process.env.CHANNELNAME):process.env.CHANNELNAME}
Duration:${process.env.DURATION/1000/60}m
Description:${process.env.DESCRIPTION}
@5yuim`})}, (error, response, body) => {
    if (!error && response.statusCode == 200) {
        console.log(body);
    } else {
        console.log(response.statusCode);
    }
});
