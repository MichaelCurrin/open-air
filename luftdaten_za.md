---
layout: sensors
title: "Luftdaten - South Africa"
data_source: "data.sensor.community (Luftdaten API)."
description: "Average of measurements in the last 5 minutes."
countries: ZA
---
<script>
    window.onload = function () {
        render_luftdaten();
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

            <td>{{ coord }}</td>
            <td>{{ altitude }}</td>
            <td>{{ indoor }}</td>

            <td>{{ P1 }}</td>
            <td>{{ P2 }}</td>
            <td>{{ humidity }} </td>
            <td>{{ temperature }} </td>

            <td>{{ sensor_type }}</td>
            <td>{{ manufacturer }}</td>

            <td>{{ timestamp }}</td>
        </tr>
        {{/sensors}}
    </table>
</script>
{% endraw %}
