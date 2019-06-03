function attachEvents() {
    $('#btnLoadTowns').click(loadTowns);

    function loadTowns() {
        $('#root').empty();
        let towns = $('#towns').val().split(',');
        let source = $('#towns-template').html();
        let template = Handlebars.compile(source);
        let html = template({towns});
        $('#root').html(html);
        $('#towns').val('');
    }
}