function attachEvents() {
    let url = 'https://first-testing-project-e4620.firebaseio.com/phonebook';
    $('#btnLoad').on('click', loadContacts);
    $('#btnCreate').on('click', createContact);

    function loadContacts() {
        $.get(url + '.json').then(displayContacts).catch(displayError);
    }

    function displayContacts(response) {
        $('#phonebook').empty();
        for (let key in response) {
            let li = $('<li>').text(`${response[key]['person']}: ${response[key]['phone']} `);
            li.append($('<button>Delete</button>').on('click', deleteContact.bind(this, key)));
            $('#phonebook').append(li);
        }
    }

    function deleteContact(key) {
        let request = {
            method: 'DELETE',
            url: url + '/' + key + '.json'
        };
        $.ajax(request).then(loadContacts).catch(displayError);
    }

    function createContact() {
        let data = JSON.stringify({person: $('#person').val(), phone: $('#phone').val()});
        $.post(url + '.json', data).then(loadContacts).catch(displayError);
        $('#person').val('');
        $('#phone').val('');
    }

    function displayError(error) {
        $("#phonebook").append($("<li>Error</li>"));
    }
}