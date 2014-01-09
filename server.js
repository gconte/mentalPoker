var http    =   require('http');
var fs      =   require('fs');
var io 		= 	require('socket.io');

var messages = [];

// Creation du serveur
var app = http.createServer(function (req, res) 
{
    // On lit notre fichier app.html
    fs.readFile('./client.html', 'utf-8', function(error, content) 
    {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(content);
    });
});

io = io.listen(app);

io.sockets.on('connection', function (socket) 
{
	console.log('Nouveau client connecté');
	
    socket.emit('retConnect', 'Vous êtes connecté au serveur');
    socket.on('nouveauMessage', function (mess) 
    {
    	console.log(mess);
        messages.push(mess);
    });
});

app.listen(8080);
console.log('Serveur en écoute');