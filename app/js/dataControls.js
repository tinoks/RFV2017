table = function(el){

    if(document.getElementsByTagName("tablebar").length == 1){
    document.getElementsByTagName("tablebar")[0].classList.toggle("show")
    el.classList.toggle("show");
  } else {
    require('../tags/tablebar_copy.tag');
    _ = require('underscore');
    document.getElementById('map').appendChild(document.createElement("tablebar"));

    alasql("ATTACH INDEXEDDB DATABASE KORTxyz; \
            USE KORTxyz; \
            SELECT * FROM marker", function(e){
              KORTxyz.tabledata = e[2]
               riot.mount('tablebar');
            }
    );

   // riot.mount('tablebar');
    Ps.initialize(document.getElementsByTagName("tablebar")[0]);
    document.getElementsByTagName("tablebar")[0].classList.toggle("show");
    el.classList.toggle("show");
  }
  /*
    if(document.getElementsByTagName("tablebar").length == 1){
      document.getElementsByTagName("tablebar")[0].classList.toggle("show")
      el.classList.toggle("show");
    } else {

    require('../tags/tablebar.tag');
    document.getElementById('map').appendChild(document.createElement("tablebar"));


    alasql("ATTACH INDEXEDDB DATABASE KORTxyz; \
            USE KORTxyz; \
            SELECT EjerNr FROM marker", function(e){
              KORTxyz.tabledata = e[2]
              riot.mount('tablebar');
            }
    );

    document.getElementsByTagName("tablebar")[0].classList.toggle("show");
    el.classList.toggle("show");
  }
*/
}

upload = function(){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
               KORTxyz.data = JSON.parse(xmlhttp.responseText);
               addData();
           }
           else if (xmlhttp.status == 400) {
          		iziToast.error({
					icon: 'material-icons',
					iconText: 'error',
				    message: 'Error message 400'
				});
           }
           else {
	   			iziToast.error({
					icon: 'material-icons',
					iconText: 'error',
				    message: 'something else other than 200 was returned'
				});
           }
        }
    };

    xmlhttp.open("GET", "http://jordbrugsanalyser.dk/geoserver/Jordbrugsanalyser/ows?service=WFS&request=GetFeature&typeName=Jordbrugsanalyser:Marker16&outputFormat=JSON&srsName=EPSG:4326&BBOX=662464.0001278251,6162387.19999875,668147.2001642366,6168940.799998963", true);
    xmlhttp.send();


    function addData(){

   // alasql("DROP INDEXEDDB DATABASE IF EXISTS KORTxyz");


	marker = L.geoJSON(KORTxyz.data).addTo(map);

	geomdb = KORTxyz.data.features.map(function(e) {
				obj=e.properties; obj["geom"] = e.geometry.coordinates; return obj
			});

    alasql("CREATE INDEXEDDB DATABASE IF NOT EXISTS KORTxyz;\
        ATTACH INDEXEDDB DATABASE KORTxyz; \
        USE KORTxyz; \
        DROP TABLE IF EXISTS marker; \
		CREATE TABLE marker; \
		SELECT * INTO marker FROM ?", [geomdb], function(){
			console.log("OK")
		});
		
	marker.on('mouseover', function(e){
		EjerNr = e.layer.feature.properties.EjerNr;
		marker.eachLayer(
			function(l){
				console.log(l);
				if(l.feature.properties.EjerNr = EjerNr){
					l.feature.setStyle({fillColor:'red'})
				}
			}
		)

	})
	

    }
}