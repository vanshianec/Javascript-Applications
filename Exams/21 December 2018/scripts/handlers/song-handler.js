handlers.getAllSongs = async function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    let songs = await songService.getAllSongs();
    let userId = sessionStorage.getItem('id');
    songs.forEach((song) => song.isCreator = song._acl.creator === userId);
    ctx.songs = songs;

    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs',
        song: './templates/songs/song.hbs'
    }).then(function () {
        this.partial('./templates/songs/all-songs.hbs');
    }).catch(function (err) {
        console.log(err);
    });
};

handlers.getCreateSong = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    ctx.loadPartials({
        header: './templates/common/header.hbs',
        footer: './templates/common/footer.hbs'
    }).then(function () {
        this.partial('./templates/songs/create-song.hbs');
    }).catch(function (err) {
        console.log(err);
    });
};

handlers.getMySongs = function (ctx) {
    ctx.isAuth = userService.isAuth();
    ctx.username = sessionStorage.getItem('username');

    songService.getAllMySongs().then(function (res) {

        let userId = sessionStorage.getItem('id');
        res.forEach((song) => song.isCreator = song._acl.creator === userId);

        ctx.songs = res;
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
            song: './templates/songs/song.hbs'
        }).then(function () {
            this.partial('./templates/songs/my-songs.hbs');
        }).catch(function (err) {
            console.log(err);
        });
    })
};

handlers.createSong = function (ctx) {

    let data = {...ctx.params, likeCounter: 0, listenCounter: 0};

    if (data.title.length < 6) {
        notifications.showError('The title should be at least 6 characters long!');
    } else if (data.artist.length < 3) {
        notifications.showError('The artist should be at least 3 characters long!');
    } else if (!data.imageURL.startsWith('http')) {
        notifications.showError('The image should start with "http://" or "https://"');
    } else {

        songService.createSong(data).then(function (res) {
            notifications.showSuccess('Song created successfully!');
            ctx.redirect('#/my-songs');
        }).catch(function (err) {
            notify.showError(err.responseJSON.description);
        })
    }
};

handlers.removeSong = function (ctx) {
    songService.removeSong(ctx.params.id).then(function (res) {
        notifications.showSuccess('Song was removed successfully!');
        ctx.redirect('#/my-songs');
    }).catch(function (err) {
        notify.showError(err.responseJSON.description);
    })
};

handlers.likeSong = async function (ctx) {
    let id = ctx.params.id;

    try {
        let song = await songService.getASong(id);
        song.likeCounter = +song.likeCounter + 1;

        songService.likeSong(id, song).then(function () {
            notifications.showSuccess('Song was liked successfully!');
            ctx.redirect('#/all-songs');
        }).catch(function (err) {
            console.log(err);
        })
    } catch (err) {
        notify.showError(err.responseJSON.description);
    }
};
