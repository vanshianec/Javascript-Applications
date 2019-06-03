(function () {
    $('#facebook-btn').click(loadFacebook);
    $('#google-btn').click(loadGoogle);

    function loadFacebook() {
        swal({
                title: "Leave this site?",
                text: "If you click 'OK', you will be redirected to https://facebook.com",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-primary",
                confirmButtonText: "OK",
                cancelButtonText: "Cancel",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    window.location.href = "https://facebook.com";
                }
            });
    }

    function loadGoogle() {
        swal({
                title: "Leave this site?",
                text: "If you click 'OK', you will be redirected to https://google.com",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-primary",
                confirmButtonText: "OK",
                cancelButtonText: "Cancel",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    window.location.href = "https://google.com";
                }
            });
    }

})();