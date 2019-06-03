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

    if (username.length < 3) {
        notify.showError('Username should be at least 3 characters long');
        return;
    }

    if (password.length < 6) {
        notify.showError('Password should be at least 6 characters long');
        return;
    }

    userService.register(username, password).then((res) => {
        userService.saveSession(res);
        notify.showInfo('User registration successful');
        ctx.redirect('#/home');
    }).catch(function (err) {
        console.log(err);
        notify.showError(err.responseJSON.description);
    });
};

handlers.logoutUser = function (ctx) {
    userService.logout().then(() => {
        sessionStorage.clear();
        notify.showInfo('Logout successful.');
        ctx.redirect('#/register');
    })
};

handlers.loginUser = function (ctx) {
    let username = ctx.params.username;
    let password = ctx.params.password;
    userService.login(username, password).then((res) => {
        userService.saveSession(res);
        notify.showInfo('Login successful.');
        ctx.redirect('#/home');
    }).catch(function (err) {
        notify.showError(err.responseJSON.description);
    });
};