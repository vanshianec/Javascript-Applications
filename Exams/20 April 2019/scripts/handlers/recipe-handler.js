handlers.getShareRecipe = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.names = sessionStorage.getItem('names');
    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/recipes/share-recipe.hbs');
    }).catch(function (err) {
        console.log(err);
        notifications.showError(err.responseJSON.description);
    });
};

handlers.getViewRecipe = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.names = sessionStorage.getItem('names');
    let id = ctx.params.id;
    recipeService.getRecipe(id).then(function (res) {
        ctx.isCreator = res._acl.creator === sessionStorage.getItem('id');
        ctx.id = res._id;
        ctx.foodImageURL = res.foodImageURL;
        ctx.meal = res.meal;
        ctx.prepMethod = res.prepMethod;
        ctx.description = res.description;
        ctx.ingredients = res.ingredients;
        ctx.likesCounter = res.likesCounter;
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/recipes/view-recipe.hbs');
        }).catch(function (err) {
            notifications.showError(err.responseJSON.description);
        });
    }).catch(function (err) {
        notifications.showError(err.responseJSON.description);
    });
};

handlers.addRecipe = function (ctx) {
    let data = getRecipeData(ctx);
    recipeService.addRecipe(data).then(() => {
        notifications.showSuccess('Recipe shared successfully!');
        ctx.redirect('#/home');
    }).catch(function (err) {
        console.log(err);
        notifications.showError(err.responseJSON.description);
    });
};

handlers.removeRecipe = function (ctx) {
    recipeService.removeRecipe(ctx.params.id).then(function () {
        notifications.showSuccess('Your recipe was archived.');
        ctx.redirect('#/home');
    }).catch(function (err) {
        notify.showError(err.responseJSON.description);
    })
};

handlers.getEditRecipe = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.names = sessionStorage.getItem('names');
    let id = ctx.params.id;
    recipeService.getRecipe(id).then(function (res) {
        ctx.id = res._id;
        ctx.foodImageURL = res.foodImageURL;
        ctx.meal = res.meal;
        ctx.prepMethod = res.prepMethod;
        ctx.description = res.description;
        ctx.ingredients = res.ingredients;
        ctx.category = res.category;
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/recipes/edit-recipe.hbs');
        }).catch(function (err) {
            notifications.showError(err.responseJSON.description);
        });
    }).catch(function (err) {
        notifications.showError(err.responseJSON.description);
    });
};

handlers.editRecipe = function (ctx) {

    let data = getRecipeData(ctx);
    recipeService.updateRecipe(ctx.params.id, data).then(() => {
        notifications.showSuccess('Recipe updated successfully!');
        ctx.redirect('#/home');
    }).catch(function (err) {
        console.log(err);
        notifications.showError(err.responseJSON.description);
    });
};

handlers.likeRecipe = async function (ctx) {
    let id = ctx.params.id;

    try {
        let recipe = await recipeService.getRecipe(id);
        recipe.likesCounter = +recipe.likesCounter + 1;

        recipeService.updateRecipe(id, recipe).then(function () {
            notifications.showSuccess('You liked that recipe.');
            ctx.redirect('#/home');
        }).catch(function (err) {
            console.log(err);
        })
    } catch (err) {
        notify.showError(err.responseJSON.description);
    }
};

function getRecipeData(ctx) {
    let meal = ctx.params.meal;
    let ingredients = ctx.params.ingredients.split(',');
    let prepMethod = ctx.params.prepMethod;
    let description = ctx.params.description;
    let foodImageURL = ctx.params.foodImageURL;
    let category = ctx.params.category;

    if (meal.length < 4) {
        notifications.showError('Meal should be at least 4 characters long.');
        return;
    }

    if (ingredients.length < 2) {
        notifications.showError('Ingredients should be at least 2.');
        return;
    }

    if (prepMethod.length < 10) {
        notifications.showError('Preparation method should be at least 10 characters long.');
        return;
    }

    if (!(foodImageURL.startsWith('http://') || foodImageURL.startsWith('https://'))) {
        notifications.showError('Invalid URL.');
        return;
    }

    if (category === 'Select category...') {
        notifications.showError('You must select a category.');
        return;
    }

    let categoryImageURL = getCategoryImageURL(category);

    return {
        meal,
        ingredients,
        prepMethod,
        description,
        foodImageURL,
        category,
        likesCounter: 0,
        categoryImageURL
    };
}

function getCategoryImageURL(category) {
    switch (category) {
        case 'Vegetables and legumes/beans':
            return 'https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549__340.jpg';
        case 'Fruits':
            return 'https://cdn.pixabay.com/photo/2017/06/02/18/24/fruit-2367029__340.jpg';
        case 'Grain Food':
            return 'https://cdn.pixabay.com/photo/2014/12/11/02/55/corn-syrup-563796__340.jpg';
        case 'Milk, cheese, eggs and alternatives':
            return 'https://image.shutterstock.com/image-photo/assorted-dairy-products-milk-yogurt-260nw-530162824.jpg';
        case 'Lean meats and poultry, fish and alternatives':
            return 'https://t3.ftcdn.net/jpg/01/18/84/52/240_F_118845283_n9uWnb81tg8cG7Rf9y3McWT1DT1ZKTDx.jpg';
    }
}
