"use strict";

const API_ENDPOINT = '//data.sensor.community/airrohr/v1/filter/country=ZA';

function parseSensorData(value) {
    var output = {
        id: `#${value.sensor.id}`,
        timestamp: value.timestamp,

        pin: value.sensor.pin,

        sensor_type: value.sensor.sensor_type.name,

        manufacturer: value.sensor.sensor_type.manufacturer,

        location: value.location.country,
        coord: `${Number(value.location.latitude).toFixed(3)}, ${Number(value.location.longitude).toFixed(3)}`,
        altitude: value.location.altitude,
        indoor: value.location.indoor ? 'Yes' : 'No',
    }

    for (var m of value.sensordatavalues) {
        output[m.value_type] = m.value;
    }

    return output;
}

function getData(url, countryCode) {
    return $.getJSON(url)
        .then(result => result.filter(value => value.location.country === countryCode).map(parseSensorData));
}

function render(countryCode) {
    // While the /filter endpoint can be pre-filtered to one or more locations, additionally a
    // country country can be applied here. This is also works on an endpoint which has no country
    // filter.
    if (typeof countryCode === 'undefined') {
        throw new Error('Country code must be set');
    }
    document.getElementById('country').innerHTML = countryCode;

    document.getElementById('target-output').innerHTML = 'Loading...';

    getData(API_ENDPOINT, countryCode)
        .then(data => {
            var content = {
                "sensors": data
            }
            var template = $("#sensors-table").html();
            var html = Mustache.to_html(template, content);
            $('#target-output').html(html);
        });
}
