$(() => {
    let source = $('#monkey-template').html();
    let template = Handlebars.compile(source);
    let html = template({monkeys});
    $('.monkeys').html(html);
});

function showInfo(id) {
    $(`#${id}`).toggle();
}