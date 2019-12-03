---
layout: sensors
title: "Luftdaten - South Africa"
data_source: "data.sensor.community (Luftdaten API)."
description: "Average of measurements in the last 5 minutes."
countries: ZA
---
<script>
    window.onload = function () {
        renderLuftdaten();
    };

</script>


{% raw %}
<div id="target-output">Error fetching or processing data</div>
<script id="sensors-table" type="text/template">
    <table class="table table-dark">
        <tr>
            <th>Sensor ID</th>

            <th>Co-ord</th>
            <th>Altitude</th>
            <th>Indoor</th>

            <th>PM1</th>
            <th>PM2</th>
            <th>Humidity</th>
            <th>Temp</th>

            <th>Type</th>
            <th>Manufacturer</th>

            <th>Timestamp</th>
        </tr>
        {{#sensors}}
        <tr>
            <td>{{ id }}</td>

            <td>
                {{ coord }} <a href="{{ mapUrl}}" target="_blank"><span class="fa fa-external-link"></span></a>
            </td>
            <td>{{ altitude }}</td>
            <td>{{ indoor }}</td>

            <td><b>{{ P1 }}</b></td>
            <td><b>{{ P2 }}</b></td>
            <td><b>{{ humidity }}</b></td>
            <td><b>{{ temperature }}</b></td>

            <td>{{ sensor_type }}</td>
            <td>{{ manufacturer }}</td>

            <td>{{ timestamp }}</td>
        </tr>
        {{/sensors}}
    </table>
</script>
{% endraw %}
