"use strict";

function asMapUrl(lat, long) {
    var zoomLevel = 12;
    return `https://www.openstreetmap.org/#map=${zoomLevel}/${lat}/${long}`;
}

function renderTemplate(data) {
    var content = {
        "sensors": data
    }
    var template = $("#sensors-table").html();
    var html = Mustache.to_html(template, content);
    $('#target-output').html(html);
}

function renderLuftdaten(url) {
    function parseSensorData(value) {
        var output = {
            id: `#${value.sensor.id}`,
            timestamp: value.timestamp,

            pin: value.sensor.pin,

            sensor_type: value.sensor.sensor_type.name,

            manufacturer: value.sensor.sensor_type.manufacturer,

            // country: value.location.country, // Not used for single country view.
            coord: `${Number(value.location.latitude).toFixed(3)}, ${Number(value.location.longitude).toFixed(3)}`,
            mapUrl: asMapUrl(value.location.latitude, value.location.longitude),
            altitude: value.location.altitude,
            indoor: value.location.indoor ? 'Yes' : 'No',
        }

        // A sensor typically has 2 of the 4 known measurement types, so add them dynamically here.
        for (var m of value.sensordatavalues) {
            output[m.value_type] = Number(m.value).toFixed(1);
        }

        return output;
    }

    function render() {
        document.getElementById('target-output').innerHTML = 'Loading...';

        $.getJSON(url)
            .then(result => result.map(parseSensorData))
            .then(data => renderTemplate(data));
    }

    render();
}


function renderOpenAfrica(url) {
    function parseSensorData(value) {
        // Skip altitude as it looks to be always null.
        var output = {
            id: `#${value.sensor.id}`,

            sensor_type: value.sensor.sensor_type.name,
            manufacturer: value.sensor.sensor_type.manufacturer,
            pin: value.sensor.pin,

            country: value.location.country,
            city: value.location.city,
            location: value.location.location,
            coord: `${Number(value.location.latitude).toFixed(3)}, ${Number(value.location.longitude).toFixed(3)}`,
            mapUrl: asMapUrl(value.location.latitude, value.location.longitude),
            indoor: value.location.indoor ? 'Yes' : 'No',

            traffic_in_area: value.location.traffic_in_area,
            oven_in_area: value.location.oven_in_area,
            industry_in_area: value.location.industry_in_area,
        }

        for (var m of value.sensordatavalues) {
            output[m.value_type] = m.value.toFixed(2);
        }

        return output;
    }

    function render() {
        document.getElementById('target-output').innerHTML = 'Loading...';

        $.getJSON(url)
            .then(result => result.map(parseSensorData))
            .then(data => renderTemplate(data));
    }

    render();
}
