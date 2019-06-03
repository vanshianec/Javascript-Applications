function attachEvents() {
    const kinveyAppId = "kid_BJ26qxvs4";
    const serviceUrl = "https://baas.kinvey.com/appdata/" + kinveyAppId;
    const kinveyUsername = "guest";
    const kinveyPassword = "guest";
    const base64auth = btoa(kinveyUsername + ":" + kinveyPassword);
    const authHeaders = {"Authorization": "Basic " + base64auth};
    $('#btnLoadPosts').click(loadPosts);
    $('#btnViewPost').click(viewPost);

    function loadPosts() {
        let request = {
            url: serviceUrl + "/posts",
            headers: authHeaders,
        };

        $.ajax(request).then(displayPosts).catch(displayError);

        function displayPosts(response) {
            $("#posts").empty();
            for (let post of response) {
                let option = $("<option>").text(post['title']).val(post['_id']);
                $("#posts").append(option);
            }
        }
    }

    function viewPost() {
        let postId = $("#posts").val();
        let requestPosts = $.ajax({
            url: serviceUrl + "/posts/" + postId,
            headers: authHeaders
        });
        let requestComments = $.ajax({
            url: serviceUrl + `/comments/?query={"post_id":"${postId}"}`,
            headers: authHeaders
        });
        Promise.all([requestPosts, requestComments]).then(displayPostWithComments).catch(displayError);
    }

    function displayPostWithComments([post, comments]) {
        $("#post-title").text(post['title']);
        $("#post-body").text(post['body']);
        $("#post-comments").empty();
        for (let comment of comments) {
            let li = $("<li>").text(comment['text']);
            $("#post-comments").append(li);

        }

    }

    function displayError(error) {
        let errorDiv = $("<div>").text("Error: " +
            error['status'] + ' (' + error['statusText'] + ')');
        $(document.body).prepend(errorDiv);
        setTimeout(function () {
            $(errorDiv).fadeOut(function () {
                $(errorDiv).remove();
            });
        }, 3000);
    }
}