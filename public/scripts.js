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
    users.sort().forEach(user => {
        $('#boxContent').append(`<div class='useronline'>${user}</div>`)
    });
});

socket.on('server send current', data => {
    $('#listMessages').append(`<div class="message-item-left"><span>${data}</span></div>`);
});

socket.on('server send', data => {
    $('#listMessages').append(`<div class="message-item-right"><span>${data}</span></div>`);
});

socket.on('server-send-message', data => {
    $('#listMessages').append(`<div class='msg'>${data.un}: ${data.nd}</div>`);
});

socket.on('ai-do-dang-go-chu', data => {
    $('#thongbao').html(data);
});

socket.on('ai-do-stop-go-chu', () => {
    $('#thongbao').html("");
});

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
        socket.emit('user-send-message', $('#txtMessage').val());
        $('#txtMessage').val("");
    })

    // $('#txtMessage').on(() => {
    //     console.log(e);
    //     socket.emit('toi-dang-go-chu');
    // })
    $('#txtMessage').on('input', (e) => {
        if ($('#txtMessage').val()) {
            socket.emit('toi-dang-go-chu');
        } else {
            socket.emit('toi-stop-go-chu');
        }
    });
});