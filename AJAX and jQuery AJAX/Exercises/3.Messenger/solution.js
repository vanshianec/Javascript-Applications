function attachEvents() {
    let url = 'https://messenger-1a621.firebaseio.com/messenger/.json';
    $('#submit').on('click', addMessage);
    $('#refresh').on('click', displayMessages);

    function addMessage() {
        let data = JSON.stringify({
            author: $('#author').val(),
            content: $('#content').val(),
            timestamp: Date.now()
        });

        $.post(url, data);
    }

    function displayMessages() {
        $('#messages').empty();
        $.get(url).then(displayMessages);

        function displayMessages(response) {
            let messages = Object.values(response);
            messages.sort((m1, m2) => m1['timestamp'] - m2['timestamp']).forEach(message => {
                console.log(message);
                $('#messages').text($('#messages').text() + `${message['author']}: ${message['content']}\n`);
            });
        }
    }
}