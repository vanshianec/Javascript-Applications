const handlers = {};

$(() => {
    const app = Sammy('#rooter', function () {
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

        //recipes routes

        this.get('#/share-recipe', handlers.getShareRecipe);
        this.post('#/share-recipe', handlers.addRecipe);
        this.get('#/view-recipe/:id', handlers.getViewRecipe);
        this.get('#/archive/:id', handlers.removeRecipe);
        this.get('#/edit-recipe/:id', handlers.getEditRecipe);
        this.post('#/edit-recipe/:id', handlers.editRecipe);
        this.get('#/like/:id', handlers.likeRecipe);

    });
    app.run('#/home');
});