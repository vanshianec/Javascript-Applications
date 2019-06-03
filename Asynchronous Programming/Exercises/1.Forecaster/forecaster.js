function attachEvents() {
    $('#submit').click(getLocation);

    function getLocation() {
        let selectedLocation = $('#location').val();
        let url = 'https://judgetests.firebaseio.com/locations.json';
        $.get(url).then(getConditions).catch(displayError);

        function getConditions(response) {
            let code = response
                .filter(location => location['name'] === selectedLocation)[0]['code'];
            let currentConditionRequest = $.ajax({url: `https://judgetests.firebaseio.com/forecast/today/${code}.json`});
            let threeDayConditionRequest = $.ajax({url: `https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`});
            Promise.all([currentConditionRequest, threeDayConditionRequest]).then(displayConditions).catch(displayError);
        }

        function displayConditions(responses) {
            $('#forecast').attr('style', 'display:block');
            displayCurrentCondition(responses[0]);
            displayUpcomingConditions(responses[1]);
        }

        function displayCurrentCondition(conditionResponse) {
            let forecast = conditionResponse['forecast'];
            let weatherIcon = getWeatherIcon(forecast['condition']);
            let location = conditionResponse['name'];
            let temperatures = `${forecast['low']}&#176 / ${forecast['high']}&#176`;
            let weather = forecast['condition'];

            $('#current').append($(`<span class = "condition symbol" >${weatherIcon}</span>`));
            let locationSpan = $(`<span class = "forecast-data" >${location}</span>`);
            let temperaturesSpan = $(`<span class = "forecast-data" >${temperatures}</span>`);
            let weatherSpan = $(`<span class = "forecast-data" >${weather}</span>`);
            $('#current').append($('<span class = "condition"></span>')
                .append(locationSpan, temperaturesSpan, weatherSpan));

        }

        function displayUpcomingConditions(conditionsResponse) {
            for (let forecast of conditionsResponse['forecast']) {
                let weatherIcon = getWeatherIcon(forecast['condition']);
                let temperatures = `${forecast['low']}&#176 / ${forecast['high']}&#176`;
                let weather = forecast['condition'];

                let weatherIconSpan = $(`<span class = "symbol" >${weatherIcon}</span>`);
                let temperaturesSpan = $(`<span class = "forecast-data" >${temperatures}</span>`);
                let weatherSpan = $(`<span class = "forecast-data" >${weather}</span>`);
                $('#upcoming').append($('<span class = "upcoming"></span>')
                    .append(weatherIconSpan, temperaturesSpan, weatherSpan));
            }
        }

        function getWeatherIcon(condition) {
            switch (condition) {
                case 'Sunny':
                    return '&#x2600';
                case 'Partly sunny':
                    return '&#x26C5';
                case 'Overcast':
                    return '&#x2601';
                case 'Rain':
                    return '&#x2614';
                case 'Degrees':
                    return '&#176';
            }
        }
    }

    function displayError(error) {
        $('#forecast').attr('style', 'display:block');
        $('.label').text('Error');
    }
}