const express = require("express");
const https = require('https');
const bodyparser = require("body-parser");
const request = require('request');


const app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', function (req, res) {
    const Fname = req.body.fname;
    const Lname = req.body.lname;
    const Email = req.body.email;

    var data = {
        members: [
            {
                email_address: Email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: Fname,
                    LNAME: Lname
                }
            }
        ]
    };

    const jsondata = JSON.stringify(data);

    const url = "https://us18.api.mailchimp.com/3.0/lists/e22023729b"

    const options = {
        method: "POST",
        auth: 'neerajnegi1:ce992c16b865f07cc052e440cfbe968c-us18'
    }

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + '/sucess.html');
        }
        else {
            res.sendFile(__dirname + '/failure.html');
        }

        response.on('data', function (data) {
            console.log(JSON.parse(data));
        });

    });
    request.write(jsondata);
    request.end();
});

app.post('/failure', function (req, res) {
    res.redirect('/');
});


app.listen(process.env.PORT || 3000, function () {

    console.log("Server Is Running");

});




// ce992c16b865f07cc052e440cfbe968c-us18
// e22023729b