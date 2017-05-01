
rotation = function(){
	if(map.getPitch() == 0){
	map.easeTo({pitch: 60})
	} else{
	map.easeTo({pitch: 0})
	}
}

fullscreen = function(el){
	innerText = el.children[0].innerText;
	
	if(innerText == "fullscreen"){
		var i = document.body;
		// go full-screen
		if (i.requestFullscreen) {
			i.requestFullscreen();
		} else if (i.webkitRequestFullscreen) {
			i.webkitRequestFullscreen();
		} else if (i.mozRequestFullScreen) {
			i.mozRequestFullScreen();
		} else if (i.msRequestFullscreen) {
			i.msRequestFullscreen();
		}
		
		el.children[0].innerText = "fullscreen_exit"
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
		el.children[0].innerText = "fullscreen"
	}

}

gps = function(el){
	if(el.classList[0] == "off"){
		el.classList = "on";

		if(typeof GPSpoint == "undefined"){
		 	GPSpoint = L.circleMarker([0, 0], 100).addTo(map);
		 	GPSpoint.setStyle({color:"red",fillColor:"red"});
		}


			var options = {
			  enableHighAccuracy: true,
			  timeout: 60000,
			  maximumAge: 60000
			};



			function success(pos) {
			  var crd = pos.coords;
			  map.panTo([crd.latitude,crd.longitude]);
				GPSpoint.setLatLng([crd.latitude,crd.longitude]);
			}
			function error(err) {
				iziToast.error({
					icon: 'material-icons',
					iconText: 'error',
				    message: err.message
				});
				el.classList = "off";
			};

			id = navigator.geolocation.watchPosition(success, error, options);
			
		}
	else {
		navigator.geolocation.clearWatch(id);
		el.classList = "off";
	}

}

