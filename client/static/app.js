  function getBathValue() {
    var uiBathrooms = document.getElementsByName("uiBathrooms");
    for (var i = 0; i < uiBathrooms.length; i++) {
        if (uiBathrooms[i].checked) {
            return parseInt(uiBathrooms[i].value);
        }
    }
    return -1; // Invalid Value
}

function getBHKValue() {
    var uiBHK = document.getElementsByName("uiBHK");
    for (var i = 0; i < uiBHK.length; i++) {
        if (uiBHK[i].checked) {
            return parseInt(uiBHK[i].value);
        }
    }
    return -1; // Invalid Value
}

function onClickedEstimatePrice() {
    console.log("Estimate price button clicked");

    var sqft = document.getElementById("uiSqft");
    var bhk = getBHKValue();
    var bathrooms = getBathValue();
    var location = document.getElementById("uiLocations");
    var estPrice = document.getElementById("uiEstimatedPrice");

    var url = "http://127.0.0.1:5001/predict_home_price"; // Use this if you are NOT using nginx

    var requestData = {
        total_sqft: parseFloat(sqft.value),
        bhk: bhk,
        bath: bathrooms,
        location: location.value
    };

    $.ajax({
        url: url,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(requestData), // Sending JSON data
        success: function(data, status) {
            console.log(data.estimated_price);
            estPrice.innerHTML = "<h2>" + data.estimated_price.toString() + " Lakh</h2>";
            console.log(status);
        },
        error: function(xhr, status, error) {
            console.log('Error:', error);
            estPrice.innerHTML = "<h2>Error occurred. Please try again later.</h2>";
        }
    });
}


function onPageLoad() {
    console.log("document loaded");

    var url = "http://127.0.0.1:5001/get_location_names"; // Use this if you are NOT using nginx

    $.get(url, function(data, status) {
        console.log("got response for get_location_names request");
        if (data) {
            var locations = data.locations;
            var uiLocations = document.getElementById("uiLocations");
            $('#uiLocations').empty();
            var defaultOption = new Option("Choose a Location", "", true, false);
            uiLocations.appendChild(defaultOption); // Add default option
            for (var i in locations) {
                var opt = new Option(locations[i]);
                $('#uiLocations').append(opt);
            }
        }
    });
}

window.onload = onPageLoad;
