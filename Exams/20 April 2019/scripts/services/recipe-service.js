const recipeService = (() => {
    function getRecipes() {
        return kinvey.get('appdata', 'recipes', 'kinvey');
    }

    function addRecipe(data) {
        return kinvey.post('appdata', 'recipes', 'kinvey', data);
    }

    function getRecipe(id) {
        return kinvey.get('appdata', `recipes/${id}`, 'kinvey')
    }

    function removeRecipe(id) {
        return kinvey.remove('appdata', `recipes/${id}`, 'kinvey');
    }

    function updateRecipe(id, recipe) {
        return kinvey.update('appdata', `recipes/${id}`, 'kinvey', recipe);
    }

    return {
        getRecipes,
        addRecipe,
        getRecipe,
        removeRecipe,
        updateRecipe
    }
})();