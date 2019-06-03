$(() => {
    const app = Sammy('#main', function () {
        this.use('Handlebars', 'hbs');
        this.get('#/home', loadHomePage);
        this.get('#/about', loadAboutPage);
        this.get('#/catalog', loadCatalogPage);
        this.get('#/login', loadLoginPage);
        this.post('#/login', saveLogin);
        this.get('#/logout', logout);
        this.get('#/register', loadRegisterPage);
        this.post('#/register', register);
        this.get('#/create', loadCreatePage);
        this.post('#/create', create);

    });

    function loadHomePage(context) {
        context.loggedIn = sessionStorage.getItem("authtoken") !== null;
        context.hasTeam = sessionStorage.getItem("teamId") !== "undefined" && sessionStorage.getItem("teamId") !== null;
        context.teamId = sessionStorage.getItem("teamId");
        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/home/home.hbs');
        })
    }

    function loadAboutPage(context) {
        context.loggedIn = sessionStorage.getItem("authtoken") !== null;
        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs'
        }).then(function () {
            this.partial('./templates/about/about.hbs');
        })
    }

    async function loadCatalogPage(context) {
        context.loggedIn = sessionStorage.getItem("authtoken") !== null;
        context.hasNoTeam = sessionStorage.getItem("teamId") === "undefined";
        if (!context.hasNoTeam) {
            context.teams = await teamsService.loadTeams();
        }
        this.loadPartials({
            header: "./templates/common/header.hbs",
            footer: './templates/common/footer.hbs',
            team: './templates/catalog/team.hbs'
        }).then(function () {
            this.partial('./templates/catalog/teamCatalog.hbs');
        })

    }


    function loadLoginPage(context) {
        context.loggedIn = sessionStorage.getItem("authtoken") !== null;
        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            loginForm: './templates/login/loginForm.hbs'
        }).then(function () {
            this.partial('./templates/login/loginPage.hbs');
        })
    }

    function saveLogin(context) {
        let username = context.params.username;
        let password = context.params.password;

        auth.login(username, password).then((res) => {
            auth.saveSession(res);
            context.redirect("#/home");
            auth.showInfo("Logged in.");
        }).catch((error) => {
            auth.showError(`Failed to log In. Error: ${error}`)
        })
    }

    function logout(context) {
        auth.logout().then(() => {
            sessionStorage.removeItem("authtoken");
            auth.showInfo("You logged out.");
            context.redirect("#/home");
        }).catch((error) => {
            auth.showError(error);
        })
    }

    function loadRegisterPage(context) {
        context.loggedIn = sessionStorage.getItem("authtoken") !== null;
        this.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            registerForm: './templates/register/registerForm.hbs'
        }).then(function () {
            this.partial('./templates/register/registerPage.hbs');
        })
    }

    function register(context) {
        let username = context.params.username;
        let password = context.params.password;
        let repeatPassword = context.params.repeatPassword;
        if (password !== repeatPassword) {
            auth.showError("Passwords must match");
            context.redirect("#/register");
            return;
        }
        if (!password || !repeatPassword) {
            auth.showError("Fields cannot be empty!");
            context.redirect("#/register");
            return;
        }

        auth.register(username, password, repeatPassword).then((res) => {
            auth.saveSession(res);
            context.redirect("#/home");
            auth.showInfo("Registered and logged in.");
        }).catch((error) => {
            auth.showError(`Failed to register. Error: ${error}`)
        })
    }

    function loadCreatePage(context) {
        context.loggedIn = sessionStorage.getItem("authtoken") !== null;
        context.loadPartials({
            header: "../templates/common/header.hbs",
            footer: "../templates/common/footer.hbs",
            createForm: "../templates/create/createForm.hbs"
        }).then(function () {
            this.partial("../templates/create/createPage.hbs");
        })
    }

    function create(context){
        let name = context.params.name;
        let comment = context.params.comment;
        if (!name || !comment) {
            auth.showError("Fields cannot be empty");
            context.redirect("#/create");
            return;
        }

        teamsService.createTeam(name, comment).then((res) => {
            teamsService.joinTeam(res._id).then(res => {
                sessionStorage.setItem("teamId", res.teamId);
                context.redirect("#/catalog");
                auth.showInfo("Team created and joined.");
            });
        }).catch((error) => {
            auth.showError(`Failed to create team. Error: ${error}`)
        })
    }

    app.run();
});