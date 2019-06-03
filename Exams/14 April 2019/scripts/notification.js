const notifications = (() => {
    $(document).on({
        ajaxStart: () => $('#loadingBox').fadeIn(),
        ajaxStop: () => $('#loadingBox').fadeOut()
    });

    function showSuccess(message) {
        let successBox = $('#successBox');
        successBox.text(message);
        successBox.fadeIn();
        successBox.click(function () {
            $(this).fadeOut();
        });
        setTimeout(function () {
            successBox.fadeOut();
        }, 5000);
    }

    function showError(message) {
        let errorBox = $('#errorBox');
        errorBox.text(message);
        errorBox.fadeIn();
        errorBox.click(function () {
            $(this).fadeOut();
        })
    }

    return {
        showSuccess,
        showError
    }
})();