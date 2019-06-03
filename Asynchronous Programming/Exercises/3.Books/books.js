function attachEvents() {
    const url = 'https://baas.kinvey.com/appdata/kid_BJ26qxvs4/books';
    const kinveyUsername = "guest";
    const kinveyPassword = "guest";
    const base64auth = btoa(kinveyUsername + ":" + kinveyPassword);
    const headers = {"Authorization": "Basic " + base64auth, "Content-type": "application/json"};

    $('#add').click(addBook);

    loadBooks();

    function loadBooks() {
        let request = {url, headers};
        $.ajax(request).then(displayBooks).catch(displayError);
    }

    function displayBooks(books) {
        $('#books').empty();
        for (let book of books) {
            let id = book['_id'];
            let author = book['author'];
            let title = book['title'];
            let isbn = book['isbn'];
            let bookContainer = createBookElement(id, author, title, isbn);
            $('#books').append(bookContainer);
        }
    }

    function createBookElement(id, author, title, isbn) {
        let container = $('<div class="book">');
        container.append($('<label>Author</label>'))
            .append($(`<input type="text" class="author" value=${author}>`))
            .append($('<label>Title</label>'))
            .append($(`<input type="text" class="title" value=${title}>`))
            .append($('<label>ISBN</label>'))
            .append($(`<input type="number" class="isbn" value=${isbn}>`));
        let deleteButton = $('<button>').click(deleteBook.bind(this, id));
        let updateButton = $('<button>').click(updateBook.bind(container, id));
        container.append(deleteButton);
        container.append(updateButton);
        return container;
    }

    function addBook() {
        [author, title, isbn] = $('#addForm input').map((i, item) => $(item).val());
        let data = JSON.stringify({author, title, isbn});
        let request = {
            url,
            method: 'POST',
            headers,
            data
        };
        $.ajax(request).then(loadBooks).catch(displayError);
    }

    function deleteBook(id) {
        let request = {
            url: url + '/' + id,
            method: 'DELETE',
            headers
        };
        $.ajax(request).then(loadBooks).catch(displayError);
    }

    function updateBook(id) {
        let parent = $(this).parent();
        [author, title, isbn] = parent.find('input').map((i, item) => $(item).val());
        let data = JSON.stringify({author, title, isbn});
        let request = {
            url: url + '/' + id,
            method: 'PUT',
            headers,
            data
        };
        $.ajax(request).then(loadBooks).catch(displayError);
    }

    function displayError(error) {
        alert(error);
    }

}