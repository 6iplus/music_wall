var express = require('express');
var bodyParser = require('body-parser');
var mySongList = require('./songList.js');
var myUser = require('./mongoData.js');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Guid = require('Guid');
var cookieParser = require('cookie-parser');
var partyData = require('./partydata.js');
<<<<<<< Updated upstream
=======
var fs = require('fs');
>>>>>>> Stashed changes

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/assets', express.static('static'));
app.use(cookieParser());


<< << << < HEAD
var partyId = "party1";

app.get("/", function (req, res) {
    res.sendFile("./pages/index.html", {
        root: __dirname
    });
});
app.get("/partyConfig", function (req, res) {
    res.sendFile("./pages/partyConfig.html", {
        root: __dirname
    });
});

app.get("/songList", function (req, res) {
    res.sendFile("./pages/songList.html", {
        root: __dirname
    });
});

var testpid = "";
app.get("/party/:partyId", function (req, res) {

<<<<<<< Updated upstream







var partyId = "party1";

app.get("/party/:partyId", function (req, res) {
=======
>>>>>>> Stashed changes
    var partyId = req.params.partyId;
    testpid = partyId;
    //check if the partyId in partList
    //if not show error
<<<<<<< Updated upstream
    mySongList.findPartyByPartyID(partyId).then(function (party) {
        console.log(party);
=======

    io.on('connection', function (socket) {
        socket.join(testpid);
        console.log("user joined party: " + testpid);
    });
    mySongList.findPartyByPartyID(partyId).then(function (party) {
        //console.log(party);
>>>>>>> Stashed changes
        res.render('pages/party', {
            party: party
        });
    }, function (error) {
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
        console.log(error);
    });
});


//socket.io start

io.on('connection', function (socket) {
    socket.on('room', function (room) {
        socket.join(room);
        console.log("user joined room: " + room);
        // now, it's easy to send a message to just the clients in a given room
        socket.in(room).on('chat message', function (data) {
            console.log(room, data);
            io.in(room).emit('chat message', data);
        });
    });
});

//socket.io end


app.use(function (request, response, next) {
    console.log("The request has all the following cookies:");
    console.log(request.cookies);
    next();
});

app.use(function (request, response, next) {

    response.locals.user = undefined;
    var sessionId = request.cookies.currentSessionId;
    if (sessionId) {
        myUser.findSessionId(sessionId).then(function (user) {
            if (user == "" || user == undefined) {
                console.log("SessionId not found in database");
                var expiresAt = new Date();
                expiresAt.setHours(expiresAt.getHours() + 1);
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
                response.cookie("currentSessionId", "", {
                    expires: expiresAt
                });
                response.clearCookie("currentSessionId");

                next();

            } else {
                response.locals.user = user;
                console.log("SessionId found!");

                next();
            }
        }, function (errorMessage) {
            console.log(errorMessage);
            next();
        });
    } else {
        next();
    }

});



app.get("/login", function (request, response) {
    console.log("get/login");
    console.log(response.locals.user);
    if (response.locals.user) {
        response.redirect("/createparty");
    } else {
        response.render("pages/home", {
            error: null
        });
    }



});
app.post("/register", function (request, response) {

    myUser.createUser(request.body.username, request.body.password).then(function () {
            console.log("User created!" + request.body.username);
            response.redirect("/");
<<<<<<< Updated upstream
=======
            response.redirect("/login");
            return true;
>>>>>>> Stashed changes
        },
        function (errorMessage) {
            response.status(500).json({
                error: errorMessage
            });
        });


});


app.post("/login", function (request, response) {

    try {
        console.log("You entered login parts");
<<<<<<< Updated upstream

        myUser.findByUsername(request.body.loginname, request.body.loginpw).then(function (result) {
            var sessionId = Guid.create().toString();

            myUser.addSessionId(request.body.loginname, sessionId).then(function () {
                    //  console.log("sessionId", sessionId);
                    response.cookie("currentSessionId", sessionId, {});
                    response.locals.user = request.cookies.currentSessionId;
                    response.redirect("/createparty");
                },
                function (errorMessage) {
=======
        myUser.findByUsername(request.body.loginname, request.body.loginpw).then(function (result) {
                console.log(result);
                if (!result) response.render("pages/home", {
                    error: "Password or username not correct"
                });
                myUser.findByUsername(request.body.loginname, request.body.loginpw).then(function (result) {
                    var sessionId = Guid.create().toString();

                    myUser.addSessionId(request.body.loginname, sessionId).then(function () {
                            //  console.log("sessionId", sessionId);
                            response.cookie("currentSessionId", sessionId, {});
                            response.locals.user = request.cookies.currentSessionId;
                            response.redirect("/createparty");
                        },
                        function (errorMessage) {
                            response.status(500).json({
                                error: errorMessage
                            });
                        });

                }, function (errorMessage) {
>>>>>>> Stashed changes
                    response.status(500).json({
                        error: errorMessage
                    });
                });

<<<<<<< Updated upstream
        }, function (errorMessage) {
            response.status(500).json({
                error: errorMessage
            });
        });
=======
>>>>>>> Stashed changes

            } catch (e) {
                response.render("pages/home", {
                    error: e
                });
            }

        });
<<<<<<< Updated upstream
    }

=======
>>>>>>> Stashed changes
});


app.post("/logout", function (request, response) {
    myUser.removeSessionId(request.cookies.currentSessionId);
    var expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

<<<<<<< Updated upstream
=======
    << << << < HEAD
>>>>>>> Stashed changes
    response.cookie("currentSessionId", "", {
        expires: expiresAt
    });
    response.clearCookie("currentSessionId");

    response.render("pages/home", {
        error: ""
    });
});



app.post("/party/:partyId", function (request, response) {
    //console.log(request.params.partyId);
    mySongList.addSongbyUrl(request.params.partyId, request.body.Url).then(function () {
        //console.log(request.body.Url);
        response.render("pages/songList", {
            partyId: request.params.partyId
        });
    });
});
app.get("/party/:partyId/playList", function (request, response) {

    mySongList.findPartyByPartyID(request.params.partyId).then(function (party) {
        try {

            var songs = [];
            for (var i = 0; i < party.playList.length; i++) {
                var url = party.playList[i].url;
                if (url.indexOf("youtu.be/") != -1) {
                    songs.push(url.substr(url.indexOf("youtu.be/") + "youtu.be/".length, 11));
                }
                if (url.indexOf("v=") != -1)
                    songs.push(url.substr(url.indexOf("v=") + 2, 11));

            }
        } catch (err) {
            console.log(err);
        }
        response.jsonp({
            songs: songs
        });
    });
});

app.get("/party/songList/:id", function (req, res) {
    mySongList.addSongbyUrl(request.params.partyId, request.body.Url).then(function () {
        response.render("pages/songList", {
            pageTitle: "Song is added."
        });
    }, function () {
        var party = mySongList.findPartyByPartyID(request.params.partyId);
        console.log(party);
        response.redirect("pages/songList")
    });
});
app.get("/party/:partyId/playList", function (request, response) {

    mySongList.findPartyByPartyID(request.params.partyId).then(function (party) {
        try {

<<<<<<< Updated upstream
app.get("/", function (request, response) {
    if (response.locals.user == undefined) {
        response.redirect("/login");
    }

    response.render("pages/songList");
});


app.post("/party/:partyId", function (request, response) {
    //console.log(request.params.partyId);
    mySongList.addSongbyUrl(request.params.partyId, request.body.Url).then(function () {
        //console.log(request.body.Url);
        response.render("pages/songList", {
            partyId: request.params.partyId
        });
    });
});
app.get("/party/:partyId/playList", function (request, response) {

    mySongList.findPartyByPartyID(request.params.partyId).then(function (party) {
        try {

            var songs = [];
            for (var i = 0; i < party.playList.length; i++) {
                var url = party.playList[i].url;
                if (url.indexOf("youtu.be/") != -1) {
                    songs.push(url.substr(url.indexOf("youtu.be/") + "youtu.be/".length, 11));
                }
                if (url.indexOf("v=") != -1)
                    songs.push(url.substr(url.indexOf("v=") + 2, 11));

            }
        } catch (err) {
            console.log(err);
        }
        response.jsonp({
            songs: songs
        });
    });
});

app.get("/party/songList/:id", function (req, res) {
    mySongList.addSongbyUrl(request.params.partyId, request.body.Url).then(function () {
        response.render("pages/songList", {
            pageTitle: "Song is added."
        });
    }, function () {
        var party = mySongList.findPartyByPartyID(request.params.partyId);
        console.log(party);
        response.redirect("pages/songList")
    });
=======
            var songs = [];
            for (var i = 0; i < party.playList.length; i++) {
                var url = party.playList[i].url;
                if (url.indexOf("youtu.be/") != -1) {
                    songs.push(url.substr(url.indexOf("youtu.be/") + "youtu.be/".length, 11));
                }
                if (url.indexOf("v=") != -1)
                    songs.push(url.substr(url.indexOf("v=") + 2, 11));

            }
        } catch (err) {
            console.log(err);
        }
        response.jsonp({
            songs: songs
        });
    });
});


var partyId = "";

app.get("/party/addsong/:partyId", function (request, response) {
    partyId = request.params.partyId;

    //io.in(request.params.partyId).emit('chat message', 'helloooooooooooo');
    response.render("pages/songList", {
        partyId: request.params.partyId
    });
});

app.post("/party/addsong/:partyId", function (request, response) {
    //todo zhimeng
    var partyId = request.params.partyId;
    var songName = "new song",
        url = request.body.Url,
        owner = "sunny";
    io.in(partyId).emit('url', url);

    mySongList.addSongbyUrl(partyId, url).then(function () {
        response.render("pages/songList", {
            partyId: request.params.partyId
        });
    });

>>>>>>> Stashed changes
});

app.post("/party", function (req, res) {
    var result = mySongList.createParty(req.body.partyId);
    partyId = req.body.partyId; //todo remember to remove this later no way to write like this
    res.json(result);
});

//index
<<<<<<< Updated upstream
app.get("/", function (req, res) {
    res.render("pages/index", {
        Inf: "Welcome!"
    });
});
=======


>>>>>>> Stashed changes

//redirect to partyconfig
app.get("/createparty", function (request, response) {
    if (!response.locals.user || response.locals.user == undefined) {
        response.render("pages/index", {
            Inf: "please log in first!"
        });
    } else {
        response.render("pages/partyconfig", {
            Inf: "please input your party information"
        });
    }
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes

});

//create party
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
app.post("/createparty", function (request, response) {
    if (!response.locals.user || response.locals.user == undefined) {
        response.render("pages/index", {
            Inf: "please log in first!"
        });
    } else {
        var partyId = request.body.partyId;
        var partyName = request.body.partyName;
        if (!response.locals.user || response.locals.user == undefined) {
            var createdBy = "unknown user";
        } else {
<<<<<<< Updated upstream
            var createdBy = response.locals.user;
        }
        var playList = {};
=======
            var createdBy = response.locals.user; //todo tianchi
        }
        var playList = [];
>>>>>>> Stashed changes
        var config = {};
        partyData.getPartyById(partyId).then(function (partyList) {
            if (partyList.length > 0) {
                response.render("pages/partyconfig", {
                    Inf: "party id existed"
                });
            } else {
<<<<<<< Updated upstream
                partyData.createParty(partyId, partyName, createdBy, playList, config);
                response.render("pages/party/:partyId", {
                    partyId: partyId
                });
            }
        });
    }

=======
                partyData.createParty(partyId, partyName, createdBy, playList, config).then(function (thePartyId) {

                    response.redirect("/party/" + thePartyId);
                }, function (error) {
                    response.send(error);
                });


            }
        });
    }
>>>>>>> Stashed changes
});

// var listener = io.listen(http);
// listener.sockets.on('connection', function(socket){
//     setInterval(function(){
//              socket.emit('date', {'date': "hello socket"});
//         }, 1000);
//
// });


http.listen(3000, function () {
<<<<<<< Updated upstream
    console.log('Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it');
})
=======

        console.log('Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it');
    })
    // var listener = io.listen(http);
    // listener.sockets.on('connection', function(socket){
    //   socket.emit('date', {'date': "hello socket"});
    // });
>>>>>>> Stashed changes
