handlers.getRegister = function (ctx) {
    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/register.hbs');
    }).catch(function (err) {
        console.log(err);
    });
};

handlers.getLogin = function (ctx) {
    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/login.hbs');
    }).catch(function (err) {
        console.log(err);
    });
};

handlers.registerUser = function (ctx) {
    let username = ctx.params.username;
    let password = ctx.params.password;
    let repeatPassword = ctx.params.rePassword;

    if (username.length < 3) {
        notifications.showError('Username should be at least 3 characters long.');
        return;
    }

    if (password.length < 6) {
        notifications.showError('Password should be at least 6 characters long.');
        return;
    }

    if (repeatPassword !== password) {
        notifications.showError('Passwords must match');
        return;
    }
    userService.register(username, password).then((res) => {
        userService.saveSession(res);
        notifications.showSuccess('User registration successful.');
        ctx.redirect('#/home');
    }).catch(function (err) {
        console.log(err);
        notifications.showError(err.responseJSON.description);
    });
};

handlers.logoutUser = function (ctx) {
    userService.logout().then(() => {
        sessionStorage.clear();
        notifications.showSuccess('Logout successful.');
        ctx.redirect('#/home');
    })
};

handlers.loginUser = function (ctx) { 
    let username = ctx.params.username;
    let password = ctx.params.password;
    userService.login(username, password).then((res) => {
        userService.saveSession(res);
        notifications.showSuccess('Login successful.');
        ctx.redirect('#/home');
    }).catch(function (err) {
        notifications.showError(err.responseJSON.description);
    });
};