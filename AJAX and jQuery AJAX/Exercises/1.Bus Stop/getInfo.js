function getInfo() {
    let stopId = $('#stopId').val();
    let url = `https://judgetests.firebaseio.com/businfo/${stopId}.json`;
    $.ajax({
        url,
        method: 'GET',
        success: displayBusData,
        error: displayError
    });

    function displayBusData(response) {
        let name = response['name'];
        let buses = response['buses'];
        $('#stopName').text(name);
        for (let key in buses) {
            let li = $('<li>').text(`Bus ${key} arrives in ${buses[key]} minutes`);
            $('#buses').append(li);
        }
        $('#stopId').val('');
    }

    function displayError(error) {
        $('#stopName').text('Error');
    }
}