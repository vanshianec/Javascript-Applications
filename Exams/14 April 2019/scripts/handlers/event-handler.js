handlers.getCreateEvent = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/events/organize-event.hbs');
    }).catch(function (err) {
        console.log(err);
    });
};

handlers.getDetailEvent = async function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    let event = await eventService.getEvent(ctx.params.id);
    attachParamsToContext(ctx, event);
    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/events/detail-event.hbs');
    }).catch(function (err) {
        console.log(err);
    });
};

function attachParamsToContext(ctx, event) {
    ctx.imageURL = event.imageURL;
    ctx.name = event.name;
    ctx.description = event.description;
    ctx.dateTime = event.dateTime;
    ctx.interestCount = event.interestCount;
    ctx.organizer = event.organizer;
    ctx.id = event._id;
    ctx.isCreator = event._acl.creator === sessionStorage.getItem('id');
}


handlers.createEvent = function (ctx) {
    let data = getEventData(ctx);

    eventService.createEvent(data).then(() => {
        notifications.showSuccess('Event created successfully.');
        ctx.redirect('#/home');
    }).catch(function (err) {
        notifications.showError(err.responseJSON.description);
    });
};

handlers.getEditEvent = async function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    let event = await eventService.getEvent(ctx.params.id);
    ctx.id = event._id;
    ctx.imageURL = event.imageURL;
    ctx.name = event.name;
    ctx.description = event.description;
    ctx.dateTime = event.dateTime;
    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/events/edit-event.hbs');
    }).catch(function (err) {
        console.log(err);
    });
};

handlers.editEvent = function (ctx) {

    let data = getEventData(ctx);
    console.log(data);
    console.log(ctx.params.id);
    eventService.updateEvent(ctx.params.id, data).then(() => {
        notifications.showSuccess('Event updated successfully.');
        ctx.redirect('#/home');
    }).catch(function (err) {
        notifications.showError(err.responseJSON.description);
    });

};

handlers.joinEvent = async function (ctx) {
    let id = ctx.params.id;

    try {
        let event = await eventService.getEvent(id);
        event.interestCount = +event.interestCount + 1;

        eventService.updateEvent(id, event).then(function () {
            notifications.showSuccess('You joined the event successfully.');
            ctx.redirect('#/home');
        });
    } catch (err) {
        notify.showError(err.responseJSON.description);
    }

};

handlers.removeEvent = function (ctx) {
    eventService.removeEvent(ctx.params.id).then(function () {
        notifications.showSuccess('Event closed successfully.');
        ctx.redirect('#/home');
    }).catch(function (err) {
        notify.showError(err.responseJSON.description);
    })
};

handlers.getProfile = async function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');
    let events = await eventService.getMyEvents();
    ctx.hasEvents = events.length !== 0;
    ctx.count = events.length;
    ctx.events = events;
    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/profile/profile.hbs');
    }).catch(function (err) {
        console.log(err);
    });
};

function getEventData(ctx) {
    let name = ctx.params.name;
    let dateTime = ctx.params.dateTime;
    let description = ctx.params.description;
    let imageURL = ctx.params.imageURL;
    let organizer = sessionStorage.getItem('username');

    if (name.length < 6) {
        notifications.showError('The event name should be at least 6 characters long.');
        return;
    }

    if (typeof dateTime !== 'string') {
        notifications.showError('Invalid date.');
        return;
    }

    if (description.length < 10) {
        notifications.showError('The description should be at least 10 characters long.');
        return;
    }
    if (!(imageURL.startsWith('http://') || imageURL.startsWith('https://'))) {
        notifications.showError('Invalid URL.');
        return;
    }

    return {name, dateTime, description, imageURL, organizer, interestCount: 0};
}


