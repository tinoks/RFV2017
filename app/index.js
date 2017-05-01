// Test kommentar
console.log("WORKS");
window.riot = riot;
window.KORTxyz = {
	settings: {
		followCompas:false
	}
};

window.Ps = require('perfect-scrollbar');
require('./css/perfect-scrollbar.css');
Ps.initialize(document.getElementById('top'));

window.iziToast = require('izitoast');
require('../node_modules/izitoast/dist/css/iziToast.css');


 // SPECIAL RULES FOR MOBILE! 

  if('ontouchstart' in document.documentElement) {

  	window.onerror = function(msg, url, linenumber) {
		iziToast.error({
			icon: 'material-icons',
			iconText: 'error',
		    message: 'Error message: '+msg+' <br> URL: '+url+' <br> Line Number: '+linenumber
		});

	    return true;
	}
	
    // Loop through each stylesheet
    for(var sheetI = document.styleSheets.length - 1; sheetI >= 0; sheetI--) {
      var sheet = document.styleSheets[sheetI];
      // Verify if cssRules exists in sheet
      if(sheet.cssRules) {
        // Loop through each rule in sheet
        for(var ruleI = sheet.cssRules.length - 1; ruleI >= 0; ruleI--) {
          var rule = sheet.cssRules[ruleI];
          // Verify rule has selector text
          if(rule.selectorText) {
            // Replace hover psuedo-class with active psuedo-class
            rule.selectorText = rule.selectorText.replace(":hover", ":active");
          }
        }
      }
    }
  }
require('./js/navigationControls.js');
require('./js/dataControls.js');
require('./js/bottomControls.js');



mapboxgl = require('leaflet');
require('../node_modules/leaflet/dist/leaflet.css');

map = L.map('map',{attributionControl: false,zoomControl:false}).setView([55.6,11.63], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
		'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="http://mapbox.com">Mapbox</a>',
	id: 'mapbox.streets'
}).addTo(map);
	

alasql = require('alasql');