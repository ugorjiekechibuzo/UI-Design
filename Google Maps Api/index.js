
function initialize(){
  let mapOptions = {
    //initialize map with center at NYC
    center: new google.maps.LatLng(40.7128, -74.0060),
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    minZoom: 2
  };

  let map = new google.maps.Map(document.getElementById("map"), mapOptions);



  let infoWindow = new google.maps.InfoWindow();

  let marker = new google.maps.Marker({
    position: new google.maps.LatLng(40.7128, -74.0060),
    map: map,

    // Tooltip on hover
   title: 'Iran, Zanjan'
  });

   // Add click event listener for marker
   marker.addListener('click', function () {
    infoWindow.setContent(marker.title);
    infoWindow.open(map, marker);
  });

  // Adjust map center when the window is resized
  google.maps.event.addDomListener(window, "resize", function () {
    map.setCenter(mapOptions.center);
  });
}

// Initialize the map when window loading finished
google.maps.event.addDomListener(window, 'load', initialize);
