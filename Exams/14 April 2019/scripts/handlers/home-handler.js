handlers.getHome = async function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    if (ctx.isAuth) {
        let allEvents = await eventService.getEvents();
        ctx.hasEvents = allEvents.length !== 0;
        ctx.events = allEvents;
    }

    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        events: './templates/views/home/events.hbs',
        guest: './templates/views/home/guest.hbs',
        event: './templates/views/home/event.hbs'
    }).then(function () {
        this.partial('./templates/home.hbs');
    }).catch(function (err) {
        console.log(err);
    });
};