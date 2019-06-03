const userService = (() => {
    function isAuth() {
        return sessionStorage.getItem('authtoken') !== null;
    }

    function saveSession(res) {
        sessionStorage.setItem('names', res.firstName + ' ' + res.lastName);
        sessionStorage.setItem('authtoken', res._kmd.authtoken);
        sessionStorage.setItem('id', res._id);
    }

    function register(firstName, lastName, username, password) {
        return kinvey.post('user', '', 'basic', {
            firstName,
            lastName,
            username,
            password
        })
    }

    function login(username, password) {
        return kinvey.post('user', 'login', 'basic', {
            username,
            password
        });
    }

    function logout() {
        return kinvey.post('user', '_logout', 'kinvey');
    }

    return {
        register,
        login,
        logout,
        saveSession,
        isAuth
    }
})();