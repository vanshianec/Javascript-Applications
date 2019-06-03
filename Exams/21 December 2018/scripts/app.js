const handlers = {};

$(() => {
    const app = Sammy('#container', function () {
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

        this.get('#/all-songs', handlers.getAllSongs);
        this.get('#/create-song', handlers.getCreateSong);
        this.get('#/my-songs', handlers.getMySongs);
        this.get('#/remove/:id', handlers.removeSong);
        this.get('#/like/:id', handlers.likeSong);



        this.post('#/create-song', handlers.createSong)



        // ADD YOUR ROUTES HERE
    });
    app.run('#/home');
});