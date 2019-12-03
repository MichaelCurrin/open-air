---
layout: sensors
title: "Open Africa"
data_source: "api.sensors.africa/static/v2/data.json (Open Africa)."
description: "Average of measurements in the last 5 minutes."
countries: KE, NG, TZ & UG
---
<script>
    window.onload = function () {
        renderOpenAfrica();
    };

</script>


{% raw %}
<div id="target-output">Error fetching or processing data</div>
<script id="sensors-table" type="text/template">
    <table class="table table-dark">
        <tr>
            <th>Sensor ID</th>

            <th>Country</th>
            <th>City</th>
            <th>Location</th>
            <th>Co-ord</th>
            <th>Indoor</th>

            <th>PM1</th>
            <th>PM2</th>
            <th>Humidity</th>
            <th>Temp</th>

            <th>Traffic</th>
            <th>Oven</th>
            <th>Industry</th>

            <th>Type</th>
            <th>Manufacturer</th>
        </tr>
        {{#sensors}}
        <tr>
            <td>{{ id }}</td>

            <td>{{ country }}</td>
            <td>{{ city }}</td>
            <td>{{ location }}</td>
            <td>{{ coord }}</td>
            <td>{{ indoor }}</td>

            <td><b>{{ P1 }}</b></td>
            <td><b>{{ P2 }}</b></td>
            <td><b>{{ humidity }}</b></td>
            <td><b>{{ temperature }}</b></td>

            <td>{{ traffic_in_area }}</td>
            <td>{{ oven_in_area }}</td>
            <td>{{ industry_in_area }}</td>

            <td>{{ sensor_type }}</td>
            <td>{{ manufacturer }}</td>
        </tr>
        {{/sensors}}
    </table>
</script>
{% endraw %}
