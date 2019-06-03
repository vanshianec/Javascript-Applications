$(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        let cats = window.cats;
        let source = $('#cat-template').html();
        let template = Handlebars.compile(source);
        let html = template({cats});
        $('#allCats').html(html);
    }

});

function showInfo(id) {
    $(`#${id}`).toggle();
}
