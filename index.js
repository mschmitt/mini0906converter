var mymap = L.map('mapid');
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		id: 'mschmitt.pcbg57gh',
  		accessToken: 'pk.eyJ1IjoibXNjaG1pdHQiLCJhIjoiY2lsbTBvc3UxMDAzbzZ3bTQ4aTQ2c2V5aSJ9.4adQtL-4OsVPcVM4JnH_Vw'
}).addTo(mymap);
mymap.setZoom(13);

var markerGroup = L.layerGroup().addTo(mymap);
var marker = L.marker;

L.control.scale().addTo(mymap);

$(document).ready(function() {
  console.log("######################## document.ready ########################");
  $('.input').on('click input keyup propertychange', calculate);
  calculate();
});

function calculate(){
  console.log("calculate");
  console.log("lat: " + $('#lat').val());
  console.log("lon: " + $('#lon').val());

  var NS;
  var LatPlusMinus;  
  if ($('#n').prop('checked')){
    NS="N";
    LatPlusMinus="";
  }else{
    NS="S"
    LatPlusMinus="-";
  }
  
  var WE;
  var LonPlusMinus;
  if ($('#w').prop('checked')){
    WE="W";
    LonPlusMinus="-";
  }else{
    WE="E";
    LonPlusMinus="";
  }
  console.log("---")


  console.log("latdir: " + NS + " / \"" + LatPlusMinus + "\"");  
  console.log("londir: " + WE + " / \"" + LonPlusMinus + "\"");
  
  var BakedLatitude;
  BakedLatitude = mini0906CoordToDegMinMinFract($('#lat').val());
  $("#wgs84_deg_min_minfract").text(NS+BakedLatitude);
  BakedLatitude = mini0906CoordToDegDegFract($('#lat').val());
  $("#wgs84_deg_degfract").text(NS+BakedLatitude);
  $("#wgs84_deg_degfract_plusminus").text(LatPlusMinus+BakedLatitude);

  var BakedLongitude;
  BakedLongitude = mini0906CoordToDegMinMinFract($('#lon').val());
  $("#wgs84_deg_min_minfract").append(" " + WE + BakedLongitude);
  BakedLongitude = mini0906CoordToDegDegFract($('#lon').val());
  $("#wgs84_deg_degfract").append(" " + WE + BakedLongitude);
  $("#wgs84_deg_degfract_plusminus").append(" " + LonPlusMinus + BakedLongitude);

  mymap.setView([LatPlusMinus + BakedLatitude, LonPlusMinus + BakedLongitude]);
  
  // https://gis.stackexchange.com/a/201975
  markerGroup.clearLayers();
  marker([LatPlusMinus + BakedLatitude, LonPlusMinus + BakedLongitude]).addTo(markerGroup)
  
  $("#nswe").attr("href", "http://maps.google.de" + '?q=' + $("#wgs84_deg_degfract").html());
  $("#plusminus").attr("href", "http://maps.google.de" + '?q=' + $("#wgs84_deg_degfract_plusminus").html());
};

function mini0906CoordToDegMinMinFract(coord){
  // Input: 50.2764
  // Want: 50°27.64'
  console.log("function: mini906CoordToDegMinMinFract");
  console.log("raw: " + coord);
  // full degree
  var deg = Math.floor(coord);
  console.log("deg: " + deg);
  // minute
  var min = ((coord % 1) * 100).toFixed(4);
  console.log("min: " + min);
  // assemble output
  var baked = deg + '°' + min + "\'";
  console.log("baked: " + baked);
  console.log("---")
  return(baked);
}

function mini0906CoordToDegDegFract(coord){
  // Input: 50.2764
  // Want: 50.460667
  console.log("function: mini906CoordToDegDegFract");
  console.log("raw: " + coord);
  // full degree
  var deg = Math.floor(coord);
  console.log("deg: " + deg);
  // minute incl. fraction 
  var min = (coord % 1) * 100;
  console.log("min: " + min);
  // Convert min to degree fraction
  var degfract = min / 60;
  console.log("degfract: " + degfract)
  // Add fraction to degree, assemble output
  var baked = (deg + degfract).toFixed(6);
  console.log("baked: " + baked);
  console.log("---")
  return(baked);
}
