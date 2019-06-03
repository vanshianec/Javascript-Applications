function loadRepos() {
    let url = `https://api.github.com/users/${$("#username").val()}/repos`;
    $.ajax({
        url,
        method: 'GET',
        success: displayRepos,
        error: displayError
    });

    function displayRepos(respond) {
        respond.forEach(repo => {
            let link = $('<a>').text(repo['full_name']);
            link.attr('href', repo['html_url']);
            $('#repos').append($('<li>').append(link));
        })
    }

    function displayError(error) {
        $('#repos').append($('<li>').text(error))
    }
}