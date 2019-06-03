function attachEvents() {
    const url = 'https://baas.kinvey.com/appdata/kid_BJ26qxvs4/biggestCatches';
    const kinveyUsername = "guest";
    const kinveyPassword = "guest";
    const base64auth = btoa(kinveyUsername + ":" + kinveyPassword);
    const headers = {"Authorization": "Basic " + base64auth, "Content-type": "application/json"};
    $('.load').click(listAllCatches);
    $('.add').click(createNewCatch);

    function listAllCatches() {
        let request = {url, headers};
        $.ajax(request).then(loadCatches).catch(displayError);
    }

    function loadCatches(catches) {
        $('#catches').empty();
        for (let c of catches) {
            let container = createCatchElement(c);
            $('#catches').append(container);
        }
        $('.delete').click(deleteCatch);
        $('.update').click(updateCatch);
    }

    function createCatchElement(c) {
        let container = $(`<div class="catch" data-id=${c['_id']}>`);
        container.append($('<label>').text('Angler'))
            .append($(`<input type="text" class="angler" value=${c['angler']}>`))
            .append($('<label>').text('Weight'))
            .append($(`<input type="number" class="weight" value=${c['weight']}>`))
            .append($('<label>').text('Species'))
            .append($(`<input type="text" class="species" value=${c['species']}>`))
            .append($('<label>').text('Location'))
            .append($(`<input type="text" class="location" value=${c['location']}>`))
            .append($('<label>').text('Bait'))
            .append($(`<input type="text" class="bait" value=${c['bait']}>`))
            .append($('<label>').text('Capture Time'))
            .append($(`<input type="number" class="captureTime" value=${c['captureTime']}>`))
            .append($('<button class="update">Update</button>'))
            .append($('<button class="delete">Delete</button>'));
        return container;
    }

    function createNewCatch() {
        let [angler, weight, species, location, bait, captureTime] = $("#addForm input");
        let data = JSON.stringify({
            angler: $(angler).val(),
            weight: $(weight).val(),
            species: $(species).val(),
            location: $(location).val(),
            bait: $(bait).val(),
            captureTime: $(captureTime).val()
        });
        let request = {
            url,
            method: 'POST',
            headers,
            data
        };
        $.ajax(request).then(listAllCatches).catch(displayError);
    }

    function deleteCatch() {
        let request = {
            url: url + '/' + $(this).parent().attr('data-id'),
            method: 'DELETE',
            headers
        };
        $.ajax(request).then(listAllCatches).catch(displayError);
    }

    function updateCatch() {
        let container = $(this).parent();
        let [angler, weight, species, location, bait, captureTime] = container.find('input');
        let data = JSON.stringify({
            angler: $(angler).val(),
            weight: $(weight).val(),
            species: $(species).val(),
            location: $(location).val(),
            bait: $(bait).val(),
            captureTime: $(captureTime).val()
        });
        let request = {
            url: url + '/' + $(this).parent().attr('data-id'),
            method: 'PUT',
            headers,
            data
        };
        $.ajax(request).then(listAllCatches).catch(displayError);
    }


    function displayError(error) {
        $('#main').text(error);
    }
}