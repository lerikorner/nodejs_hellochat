var io = require('socket.io').listen(3000); 
var socket = io.listen(3000, '0.0.0.0');
var people = {};

//io.set('log level', 1);
socket.on('connection', function (client) {
    client.on('join', function (name) {
        people[client.id] = name;
        client.emit('update', '�� ������������ � �������.');
        socket.sockets.emit('update', name + ' ����������� � �������.');
        socket.sockets.emit('update-people', people);
    });

    client.on('send', function (msg) {
        socket.sockets.emit('chat', people[client.id], msg);
    });

    client.on('disconnect', function () {
        socket.sockets.emit('update', people[client.id] + ' ���������� �� �������.');
        delete people[client.id];
        socket.sockets.emit('update-people', people);
    });
});

