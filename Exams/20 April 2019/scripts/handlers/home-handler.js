handlers.getHome = async function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.names = sessionStorage.getItem('names');
    let main = ctx.isAuth ? './templates/views/all-recipes.hbs' : './templates/views/main.hbs';
    if (ctx.isAuth) {
        let allRecipes = await recipeService.getRecipes();
        ctx.hasRecipes = allRecipes.length !== 0;
        ctx.recipes = allRecipes;
    }

    let partials = {
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        recipe: './templates/recipes/recipe.hbs',
        main
    };

    ctx.loadPartials(partials).then(function () {
        this.partial('./templates/home.hbs');
    }).catch(function (err) {
        console.log(err);
    });
};