const handlers = {};

$(() => {
    const app = Sammy('#root', function () {
        this.use('Handlebars', 'hbs');
        // home page routes
        this.get('/index.html', handlers.getHome);
        this.get('/', handlers.getHome);
        this.get('#/home', handlers.getHome);

        // user routes
        this.get('#/register', handlers.getRegister);
        this.get('#/login', handlers.getLogin);

        this.post('#/register', handlers.registerUser);
        this.post('#/login', handlers.loginUser);
        this.get('#/logout', handlers.logoutUser);

        this.get('#/organize-event', handlers.getCreateEvent);
        this.post('#/organize-event', handlers.createEvent);
        this.get('#/detail-event/:id', handlers.getDetailEvent);
        this.get('#/edit-event/:id', handlers.getEditEvent);
        this.post('#/edit-event/:id', handlers.editEvent);
        this.get('#/join-event/:id', handlers.joinEvent);
        this.get('#/remove-event/:id', handlers.removeEvent);
        this.get('#/profile', handlers.getProfile);

    });
    app.run('#/home');
});