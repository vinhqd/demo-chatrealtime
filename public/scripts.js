const socket = io('http://localhost:3000/');

socket.on('server-send-fail', () => {
    alert('Co nguoi da dang ky roi!!!');
})

socket.on('server-send-success', (data) => {
    $('#loginForm').hide(2000);
    $('#chatForm').show(1000);
    $('#currentUser').html(data)
});

socket.on('server-send-users', users => {
    $('#boxContent').html("");
    users.forEach(user => {
        // useronline
        $('#boxContent').append(`<div class='useronline'>${user}</div>`)
    });
})

$(document).ready(() => {
    $('#loginForm').show();
    $('#chatForm').hide();

    $('#btnRegister').click(() => {
        socket.emit('client-send-username', $('#txtUsername').val());
    });

    $('#btnLogout').click(() => {
        socket.emit('logout');
        $('#chatForm').hide(2000);
        $('#loginForm').show(1000);
    });

    $("#btnSendMessage").click(() => {
        
    })
});