var express = require('express');
var bodyParser = require('body-parser');
var mySongList = require('./songList.js');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine','ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/assets', express.static('static'));
var partyId = "party1";

app.get("/", function (req,res) {
	res.sendFile("./pages/index.html", {root:__dirname});
});
app.get("/partyConfig", function (req,res) {
	res.sendFile("./pages/partyConfig.html", {root:__dirname});
});

app.get("/songList", function (req,res) {
	res.sendFile("./pages/songList.html", {root:__dirname});
});

app.get("/party/:partyId", function (req,res) {
    
    var pid = req.params.partyId;
    //check if the partyId in partList
    //if not show error
    
    
    
	res.render('pages/party',{partyId: pid});
});

//socket.io start

io.on('connection', function(socket){
     socket.on('room', function(room) {
         socket.join(room);
         console.log("user joined room: " + room);
              // now, it's easy to send a message to just the clients in a given room
         socket.in(room).on('chat message', function(data){
            console.log(room , data);
            io.in(room).emit('chat message', data);
        });
     });
  });

//socket.io end




app.get("/party/songList/:id", function (req,res) {
	var id = req.params.id;
	var result = mySongList.get(partyId, id);
	res.json(result);
});

app.post("/party", function(req,res) {
	var result = mySongList.createParty(req.body.partyId);
    partyId = req.body.partyId;//todo remember to remove this later no way to write like this
	res.json(result);
});


app.post("/party/songList", function(req,res) {
	var  songName = req.body.songName,
		 url = req.body.url,
		 owner = 'Sunny';
	var result = mySongList.create(partyId,songName,url,owner);
    io.in(partyId).emit('chat message', result);
	res.json(result);
});

app.delete("/party/songList/:id", function (req,res) {
	var id = req.params.id;
	var result = mySongList.delete(partyId, id);
	res.json(result);
});

http.listen(3000, function () {
	console.log('Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it');
})