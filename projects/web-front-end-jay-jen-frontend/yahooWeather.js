"use strict";


var getForecast = function() {
    var location = $('#city').val();
    $.get('https://query.yahooapis.com/v1/public/yql', {
        q: 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + location + '")',
        format: 'json',
        u: 'f'
    }, function(data) {
        var dataChannel = data.query.results.channel;
        var dataItem = data.query.results.channel.item;
        if (!data.query.results) {
            alert("Location not found: " + location + "!");
        } else {
            $('.result-container1').html('<h2><em>' + dataChannel.title + '</em></h2>' + '<h3><b>' +
            "Forecast for " + dataItem.forecast[0].day + ", " + dataItem.forecast[0].date + ":" + '</b></h3>' +
            '<h4>' + "Current Condition: " + dataItem.forecast[0].text + '</h4>' + '<h4>' + "Low: " +
            dataItem.forecast[0].low + "°" + dataChannel.units.temperature + '</h4>' + '<h4>' +
            "High: " + dataItem.forecast[0].high + "°" + dataChannel.units.temperature + '</h4>');
            $('.day1-day').html(dataItem.forecast[1].day);
            $('.day2-day').html(dataItem.forecast[2].day);
            $('.day3-day').html(dataItem.forecast[3].day);
            $('.day4-day').html(dataItem.forecast[4].day);
            $('.day5-day').html(dataItem.forecast[5].day);
            $('.day6-day').html(dataItem.forecast[6].day);
            $('.day1-forecast').html(getForecastByDay(1, dataItem, dataChannel));
            $('.day2-forecast').html(getForecastByDay(2, dataItem, dataChannel));
            $('.day3-forecast').html(getForecastByDay(3, dataItem, dataChannel));
            $('.day4-forecast').html(getForecastByDay(4, dataItem, dataChannel));
            $('.day5-forecast').html(getForecastByDay(5, dataItem, dataChannel));
            $('.day6-forecast').html(getForecastByDay(6, dataItem, dataChannel));
            $('.result-container2').html('<p>' + "Chill: " + dataChannel.wind.chill + "°" + dataChannel.units.temperature +
            '</p>' + '<p>' + "Direction: " + dataChannel.wind.direction + "°" + dataChannel.units.temperature + '</p>' +
            '<p>' + "Speed: " + dataChannel.wind.speed + dataChannel.units.speed + '</p>');
            $('.result-container3').html('<p>' + "Humidity: " + dataChannel.atmosphere.humidity + "%" + '</p>' +
            '<p>' + "Visibility: " + dataChannel.atmosphere.visibility + dataChannel.units.distance + '</p>' +
            '<p>' + "Pressure: " + dataChannel.atmosphere.pressure + dataChannel.units.pressure + '</p>' +
            '<p>' + "Rising: " + dataChannel.atmosphere.rising + '</p>');
            $('.result-container4').html('<h2>' + '<img src="Sunrise.svg">' +
            'Sunrise: ' + dataChannel.astronomy.sunrise + '</h2>');
            $('.result-container5').html('<h2>' + '<img src="Sunrise.svg">' +
            'Sunset: ' + dataChannel.astronomy.sunset + '</h2>');
            $('.result-container6').html('<h3>' + '<a href="' + dataItem.link + '"> Yahoo Weather Site </a>' + '</h3>' +
            '<h3>' + "latitude " + dataItem.lat + '</h3>' + '<h3>' + " longitide " + dataItem.long + '</h3>');
        }
    });
    return false;
};
var getForecastByDay = function(i, dataItem, dataChannel){
    return '<h3>' + "Forecast for " + dataItem.forecast[i].day + ", " + dataItem.forecast[i].date + ":" + '</h3>' +
    '<h4>' + "Current Condition: " + dataItem.forecast[i].text + '</h4>' +
    '<h4>' + "Low: " + dataItem.forecast[i].low + "°" + dataChannel.units.temperature + '</h4>' +
    '<h4>' + "High: " + dataItem.forecast[i].high + "°" + dataChannel.units.temperature + '</h4>';
};
$(document).ready(function() {
    $(".nav-tabs a").click(function() {
        $(this).tab('show');
    });
});

$("#Forecast").submit(getForecast);
