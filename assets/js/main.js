"use strict";

function render_template(data) {
    var content = {
        "sensors": data
    }
    var template = $("#sensors-table").html();
    var html = Mustache.to_html(template, content);
    $('#target-output').html(html);
}

function render_luftdaten() {
    var countryCodes = 'ZA';
    var url = `//data.sensor.community/airrohr/v1/filter/country=${countryCodes}`;

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

    function render() {
        document.getElementById('target-output').innerHTML = 'Loading...';

        $.getJSON(url)
            .then(result => result.map(parseSensorData))
            .then(data => render_template(data));
    }

    render();
}
